import { SHOW_MESSAGE, CLOSE_MESSAGE } from 'actions'

const initialState = {
    open: false,
    type: null,
    text: null,
}

const messageReducer = (state = initialState, action) => {
    const {type,payload} = action
    switch (type) {
        case SHOW_MESSAGE: return {...state, open: true, ...payload }
        case CLOSE_MESSAGE: return { ...state, open: false}
        default: {
            return state
        }
    }
}

export default messageReducer
