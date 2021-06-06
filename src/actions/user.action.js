import { base, handleError, SET_USERS, axios, getToken } from "."

export const loadUsers = () => async dispatch => {
    try {
        const token = getToken();
        const { data: { data } } = await axios.get(`${base}/user/all`, {
            headers: { token }
        });
        const test = data.map(item => ({ label: item.name, value: item._id }));
        return dispatch({ type: SET_USERS, payload: test })
    } catch (error) {
        handleError(error, dispatch);
    }
}