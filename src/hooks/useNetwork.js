import { useContext, useEffect, useReducer, useState } from "react"
import { CommonContext } from "../contexts/CommonContext"
import { END_POINT, ERROR_CODES } from "../Constants"
import { Capacitor } from "@capacitor/core"
import { AuthContext } from "../contexts/AuthContext"


export function useNetwork() {
    
	const { showAlert } = useContext(CommonContext)
	const { userId }    = useContext(AuthContext)

	const fetchApi = (url, data) => {
	
		let paramsData = data
		paramsData.timeStamp = Date.now()
		paramsData.platform  = Capacitor.getPlatform()
		
		if (userId) paramsData.userId    = userId

		return new Promise((resolve, reject) => {
			fetch(url, {
				"method": "POST",
				"headers": {
					"content-type" : "application/json",
					"accept"       : "application/json"
				},
				"body": JSON.stringify(paramsData)
			})
			.then(async(res) => {
				const resp = await res.json()
				if (resp.errCode) {
					showAlert(resp.errDescription)
					resolve(null)
				} else {
					resolve(resp)
				}
			})
			.catch((err) => {
				showAlert("Something went wrong, Please try again later.")
				resolve(null)
			})
		}) 
	}

	const uploadFile = async(e) => {

		e.preventDefault()

    let formData = new FormData()
    formData.append('file', e.target.files[0])

		return new Promise((resolve, reject) => {
			fetch(END_POINT.FILE_UPLOAD, {
				method : 'POST',
				body   : formData 
			}).then(async(resp) => {
				const uploadResp = await resp.json()
				resolve(uploadResp.downloadUrl)
			})
		})
	}
	
	return { fetchApi, uploadFile }
}

export default useNetwork