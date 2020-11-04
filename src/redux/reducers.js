const {FETCH_TODOS, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAIL, MARK_AS_FAVORITE_SUCCESS, MARK_AS_DONE_SUCCESS, ADD_TODO_SUCCESS, ADD_TODO_FAIL, SET_ERROR,ADD_TODO, DELETE_TODO, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL } = require("../utils/actionTypes")

const initialState = {
    todos : [],
    status : 'init',
    hasError : false,
    error : null
}

const todos = (state = initialState,action) =>{
    switch(action.type){
        case FETCH_TODOS:
            return{
                ...state,
                status : 'loading'
            }
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos : action.payload,
                status : 'success',
                hasError : false,
                error : 'Loaded all todos!',
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
        case ADD_TODO:
            return{
                ...state,
                status : 'loading'
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
                error : 'Added new todo!'
            }
            case ADD_TODO_FAIL:
                return{
                    ...state,
                    status : 'error',
                    hasError : true,
                    error : action.payload
                }
            case SET_ERROR:
                return{
                    ...state,
                    hasError : false,
                    error : null
                }
            case DELETE_TODO:
                return{
                    ...state,
                    status : 'loading'
                }
            case DELETE_TODO_SUCCESS:
                var id = action.payload._id;
               
                var newArray = state.todos.filter(todo =>{
                    return todo._id != id
                })

                return{
                    ...state,
                    todos : newArray,
                    status : 'success',
                    hasError : false,
                    error : 'Deleted todo!'
                }
            case DELETE_TODO_FAIL:
                return{
                    ...state,
                    hasError : true,
                    error : action.payload
                }
        default :
            return state;
    }
}

export default todos