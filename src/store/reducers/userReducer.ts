import {
    GET_TOKEN_LOADING,
    GET_TOKEN_FAIL,
    GET_TOKEN_SUCCESS,
    REMOVE_TOKEN,
    UserDispatchTypes,
    UserTokenReturn
} from "../actions/UserActionTypes";

interface InitialState {
    loading: boolean;
    userToken?: UserTokenReturn;
    message?: {}
}

const initialState: InitialState = {
    loading: false,
}




export const userReducer = (state = initialState, action: UserDispatchTypes) => {
    switch (action.type) {
        case GET_TOKEN_LOADING:
            return {
                loading: true
            }
        case GET_TOKEN_SUCCESS:
            return {
                loading: false,
                token: action.payload
            };
        case GET_TOKEN_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case REMOVE_TOKEN:
            return initialState;
        default:
            return state;
    }
}

