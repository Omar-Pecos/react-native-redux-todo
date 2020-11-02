const { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAIL, MARK_AS_FAVORITE_SUCCESS, MARK_AS_DONE_SUCCESS, ADD_TODO_SUCCESS, ADD_TODO_FAIL } = require("../utils/actionTypes")

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
        case MARK_AS_FAVORITE_SUCCESS:
            var [type,value,index] = action.payload;
            var newTodos =  state.todos.map( (todo,i) =>{
                todo[type] = false;
                if(index === i){
                    todo[type] = value;
                }
                return todo;
            });
                
            return {
                ...state,
                todos : newTodos,
            }
        case MARK_AS_DONE_SUCCESS:
            var [type,value,index] = action.payload;
            var newTodos =  state.todos.map( (todo,i) =>{
                if(index === i){
                    todo[type] = value;
                }
                return todo;
            });
            
            return {
                ...state,
                todos : newTodos
            }
        case ADD_TODO_SUCCESS:
            var todo = action.payload;
            todo.favorite = false;
            todo.done = false;

            return{
                ...state,
                todos : [ todo, ...state.todos],
                status : 'success',
                hasError : false,
                error : null
            }
            case ADD_TODO_FAIL:
                return{
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