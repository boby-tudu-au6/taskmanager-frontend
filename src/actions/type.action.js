export const base = 'http://localhost:8000/api';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const SET_TASK = 'SET_TASK';
export const DO_LOGIN = 'DO_LOGIN';
export const DO_LOGOUT = 'DO_LOGOUT';
export const SET_USERS = 'SET_USERS';

export const handleError = (error, dispatch) => {
    dispatch({ type: STOP_LOADING });
    if (error.response) console.log(error.response.data);
    if (error.response && error.response.data && error.response.data.data) {
        return dispatch({ type: SHOW_MESSAGE, payload: { type: 'error', text: error.response.data.data } });
    }
    return dispatch({ type: SHOW_MESSAGE, payload: { type: 'error', text: error.message } });
}

export const getToken = () => {
    const TOKEN = localStorage.getItem("TOKEN");
    const token = TOKEN ? JSON.parse(TOKEN).token : ''
    return token;
}

export const getUserid = () => {
    const TOKEN = localStorage.getItem("TOKEN");
    const userid = TOKEN ? JSON.parse(TOKEN).user._id : ''
    return userid;
}