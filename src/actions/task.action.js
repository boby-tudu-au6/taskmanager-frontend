import { base, axios, handleError, START_LOADING, 
    STOP_LOADING, getToken, DELETE_TASK,
    SET_TASK, SHOW_MESSAGE  } from 'actions';


export const loadTasks = (_id) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const token = getToken();
        const { data: { data } } = await axios.get(`${base}/task`, { headers: { token }});
        dispatch({ type: STOP_LOADING });
        const myTask = data.filter(item => item.user._id === _id && !item.deleted);
        const myHistory = data.filter(item => item.user._id === _id && item.deleted);
        const otherTask = data.filter(item => item.user._id !== _id && !item.deleted);
        const otherHistory = data.filter(item => item.user._id !== _id && item.deleted);
        const test = { myTask, myHistory, otherTask, otherHistory, data };
        dispatch({ type: SET_TASK, payload: test });
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const createTask = data => async dispatch => {
    try {
        const token = getToken();
        dispatch({ type: START_LOADING });
        await axios.post(`${base}/task`, data, { headers: { token } });
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_MESSAGE, payload: { type: 'ok', text: 'Task created successfully' }});
    } catch (error) {
        handleError(error, dispatch)
    }
};
export const editTask = data => async dispatch => {
    try {
        const token = getToken();
        dispatch({ type: START_LOADING });
        await axios.post(`${base}/task/edit`, data, { headers: { token } });
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_MESSAGE, payload: { type: 'ok', text: 'Task Edited successfully' }});
    } catch (error) {
        handleError(error, dispatch)
    }
};
export const deleteTask = formdata => async dispatch => {
    try {
        const token = getToken();
        dispatch({ type: START_LOADING });
        await axios.post(`${base}/task/delete`, formdata, { headers: { token } });
        const { data: { data } } = await axios.get(`${base}/task`, { headers: { token }});
        dispatch({ type: STOP_LOADING });
        dispatch({ type: DELETE_TASK });
        dispatch({ type: SHOW_MESSAGE, payload: { type: 'ok', text: 'Task Deleted successfully' }});
        dispatch({ type: SET_TASK, payload: data });
    } catch (error) {
        return handleError(error, dispatch)
    }
};