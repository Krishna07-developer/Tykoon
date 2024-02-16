import { useContext, useEffect, useState } from "react"
import { END_POINT } from "../Constants"
import useNetwork from "../hooks/useNetwork"
import Loader from "../components/Loader"
import { useParams } from "react-router-dom"
import Theme1 from "../card-themes/Theme1"
import Theme7 from "../card-themes/Theme7"


function Card() {

  const { id }       = useParams()
  const { fetchApi } = useNetwork()
  const [card, setCard]                         = useState(null)
  const [loading, setLoading]                   = useState(true)

  useEffect(() => {
    getCardData()
  }, [])

  const getCardData = async() => {
    let endPoint = window.location.pathname
    if (endPoint.includes('viewCard')) endPoint = '/'+endPoint.split("/")[2]
    const resp = await fetchApi(END_POINT.GET_CARD_BY_URL, {tykoonUrl : endPoint})
    setLoading(false)
    if (!resp) return

    setCard(resp.cardData)
  }

  const renderTheme = () => {
    switch(card.theme) {
      case 1:
        return <Theme1 card={card} />
      case 2:
        return <Theme7 card={card} />
      default:
        return <Theme1 card={card} />
    }
  }

  return(<>
  {
    loading ? <Loader /> : <>
    
    {
      card ? <> 
        {
          renderTheme()
        }
      </>: 
      <>
        Card Not Found
      </>
    }
    </>
  }
  </>)
}

export default Card