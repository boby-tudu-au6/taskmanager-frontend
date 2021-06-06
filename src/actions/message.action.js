import { CLOSE_MESSAGE, SHOW_MESSAGE } from 'actions'

export const closeMessage = () => dispatch => dispatch({
    type: CLOSE_MESSAGE
})

export const showMessage = data => dispatch => dispatch({
    type: SHOW_MESSAGE,
    payload: data
})
