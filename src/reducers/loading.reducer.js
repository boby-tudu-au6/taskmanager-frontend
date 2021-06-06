import { START_LOADING, STOP_LOADING } from 'actions'

const initialState = false

const loadingReducer = (state = initialState, action) => {
    const {type} = action
    switch (type) {
        case START_LOADING: return true;
        case STOP_LOADING: return false;
        default: return state;
    }
}

export default loadingReducer
