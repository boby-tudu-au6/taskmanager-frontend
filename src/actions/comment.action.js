import { getToken, base, axios, START_LOADING, STOP_LOADING, SHOW_MESSAGE, handleError } from '.'

export const createComment = data => async dispatch => {
    try {
        console.log(data)
        const token = getToken();
        dispatch({ type: START_LOADING });
        await axios.post(`${base}/comment`, data, { headers: { token } });
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_MESSAGE, payload: { type: 'ok', text: 'Comment created successfully' }});
    } catch (error) {
        handleError(error, dispatch)
    }
};
export const loadComments = _id => async dispatch => {
    try {
        const token = getToken();
        dispatch({ type: START_LOADING });
        const { data: { data } } = await axios.get(`${base}/comment/${_id}`, { headers: { token } });
        dispatch({ type: STOP_LOADING });
        return data;
    } catch (error) {
        handleError(error, dispatch)
    }
};
