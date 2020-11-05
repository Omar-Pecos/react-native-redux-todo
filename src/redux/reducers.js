const {FETCH_TODOS, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAIL, MARK_AS_FAVORITE_SUCCESS, MARK_AS_DONE_SUCCESS, ADD_TODO_SUCCESS, ADD_TODO_FAIL, SET_ERROR,ADD_TODO, DELETE_TODO, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL, SET_RELOAD_TIME, EDIT_TODO, EDIT_TODO_SUCCESS, EDIT_TODO_FAIL } = require("../utils/actionTypes")

const initialState = {
    todos : [],
    status : 'init',
    hasError : false,
    error : null,
    favorite : null,
    doneTodos : [],
    reloadTime : 1
}

// auxiliary function to append favorite,done to todos objects
function appendProperties(dataArray,fav,doneTodos){
    return dataArray.map(el =>{
        el.favorite = false;
        if (fav != null && el._id == fav._id)
            el.favorite = true;
        el.done = false;
            if (doneTodos.includes(el._id))
                el.done = true;
        return el;
    });
}

const todos = (state = initialState,action) =>{
    switch(action.type){
        case FETCH_TODOS:
            return{
                ...state,
                status : 'loading'
            }
        case FETCH_TODOS_SUCCESS:
            var newTodos = appendProperties(action.payload,state.favorite,state.doneTodos);

            return {
                ...state,
                todos : newTodos,
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
            var fav = null;
            var [type,value,index] = action.payload;
            var newTodos =  state.todos.map( (todo,i) =>{
                todo[type] = false;
                if(index === i){
                    todo[type] = value;
                    if (value === true)
                        fav = todo;
                }
                return todo;
            });
                
            return {
                ...state,
                todos : newTodos,
                favorite : fav
            }
        case MARK_AS_DONE_SUCCESS:
            var finishedTodos = state.doneTodos;
            var [type,value,index] = action.payload;
            
            //maybe we can here access directy to elemento with state.todos[index]
            var newTodos =  state.todos.map( (todo,i) =>{
                if(index === i){
                    todo[type] = value;
                    if (value === true)
                        finishedTodos.push(todo._id);
                    else
                        finishedTodos = finishedTodos.filter(id => id != todo._id)
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
                    status : 'error',
                    hasError : true,
                    error : action.payload
                }
            case SET_RELOAD_TIME:
                return{
                    ...state,
                    hasError : false,
                    error : 'Reload data every '+ action.payload + ' minutes',
                    reloadTime : action.payload 
                }
            case EDIT_TODO:
                return{
                    ...state,
                    status : 'loading'
                }
            case EDIT_TODO_SUCCESS:
                var todo = action.payload;
                var newTodo = appendProperties([todo], state.favorite, state.doneTodos)[0];

                var newArray = state.todos.map(el =>{
                    if (el._id == todo._id)
                        el = newTodo;
                    return el;
                })
                return{
                    ...state,
                    todos : newArray,
                    hasError : false,
                    status : 'success',
                    error : 'Edited "'+ todo.title+'" todo!'
                }
            case EDIT_TODO_FAIL:
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