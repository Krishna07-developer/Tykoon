export const END_POINT = {
    GET_USER_DATA : `${process.env.REACT_APP_SERVER_URL}/getUserData`,
    CHECK_USER_EXISTS : `${process.env.REACT_APP_SERVER_URL}/checkUserExists`,
    GENERATE_SIGNUP_OTP : `${process.env.REACT_APP_SERVER_URL}/generateSignupOtp`,
    VALIDATE_SIGNUP_OTP : `${process.env.REACT_APP_SERVER_URL}/validateSignupOtp`,
    CREATE_NEW_USER : `${process.env.REACT_APP_SERVER_URL}/createNewUser`,
    GET_LANDING : `${process.env.REACT_APP_SERVER_URL}/getLanding`,
    GET_CARD_BY_URL : `${process.env.REACT_APP_SERVER_URL}/getCardByUrl`,
    NEW_APPOINTMENT : `${process.env.REACT_APP_SERVER_URL}/newAppointment`,
    NEW_ENQUIRY : `${process.env.REACT_APP_SERVER_URL}/newEnquiry`,
    UPDATE_USER_PROFILE : `${process.env.REACT_APP_SERVER_URL}/updateUserData`,
    FILE_UPLOAD : `${process.env.REACT_APP_SERVER_URL}/fileUpload`,
    GET_APPOINTMENTS : `${process.env.REACT_APP_SERVER_URL}/getAppointments`,
    GET_ENQUIRIES : `${process.env.REACT_APP_SERVER_URL}/getEnquiries`,
    GET_NETWORK : `${process.env.REACT_APP_SERVER_URL}/getNetwork`,
    SEARCH_NETWORK : `${process.env.REACT_APP_SERVER_URL}/searchNetwork`,
    ADD_TASK : `${process.env.REACT_APP_SERVER_URL}/newTask`,
    GET_POSTERS : `${process.env.REACT_APP_SERVER_URL}/getPosters`,
    GET_THEMES : `${process.env.REACT_APP_SERVER_URL}/getThemes`,
}

export const ERROR_CODES = {
    USER_NOT_FOUND : `USER_NOT_FOUND`
}

export const ACTION_BLOCKED_ROUTES = [`/auth`, `/`]