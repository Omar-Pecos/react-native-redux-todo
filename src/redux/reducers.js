const { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAIL } = require("../utils/actionTypes")

const initialState = {
    todos : [],
    status : 'loading',
    hasError : false,
    error : null
}

const todos = (state = initialState,action) =>{
    switch(action.type){
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos : action.payload,
                status : 'success'
            }
        case FETCH_TODOS_FAIL:
            return {
                ...state,
                status : 'error',
                hasError : true,
                error : action.payload
            }
        default :
            return state;
    }
}

export default todos