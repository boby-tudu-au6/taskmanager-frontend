import { 
    handleError, axios, base, 
    START_LOADING, STOP_LOADING,
    DO_LOGIN,
} from '.';
import { DO_LOGOUT, SHOW_MESSAGE } from './type.action';

export const doLogin = ({state, history}) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await axios.post(`${base}/auth/login`, state);
        localStorage.setItem("TOKEN", JSON.stringify(data));
        dispatch({ type: STOP_LOADING });
        dispatch({ type: DO_LOGIN, payload: data });
        return history.push('/');
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const doRegister = ({state, history}) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        await axios.post(`${base}/auth/register`, state);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_MESSAGE, payload: { type: 'ok', text: 'Registration success' }});
        return history.push('/login');
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const checkLogin = () => dispatch => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
        const { user } = JSON.parse(token);
        dispatch({ type: DO_LOGIN, payload: { user }});
    }
}

export const doLogout = history => dispatch => {
    localStorage.removeItem("TOKEN");
    dispatch({ type: DO_LOGOUT });
    return history.push('/login');
}