import { GET_TOKEN_LOADING, GET_TOKEN_SUCCESS, GET_TOKEN_FAIL, REMOVE_TOKEN, UserDispatchTypes, User } from "./UserActionTypes";
import { Dispatch } from "redux";
import { getToken, validateToken } from "../../providers/userProvider";


export const GetUserToken = (user: User) => async (dispatch: Dispatch<UserDispatchTypes>): Promise<void> => {
    try {
        dispatch({
            type: GET_TOKEN_LOADING
        })
        let res = await getToken(user)
        if (res.data.success === true) {
            let tokenReturn = await validateToken(res.data.data.token)
                .then(res => res.data);
            if (tokenReturn.success === true) {
                dispatch({
                    type: GET_TOKEN_SUCCESS,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: GET_TOKEN_FAIL,
                    payload: tokenReturn.data
                })
            }


        } else {
            dispatch({
                type: GET_TOKEN_SUCCESS,
                payload: res.data

            })

        }

    } catch (error) {
        dispatch({ type: GET_TOKEN_FAIL, payload: error.response.data });
    }
}

export const RemoveToken = () => async (dispatch: Dispatch<UserDispatchTypes>): Promise<void> => {
    try {
        await dispatch({
            type: REMOVE_TOKEN
        })
    } catch (error) {

    }
}

