import axios from 'axios';
import { FETCH_TODOS,FETCH_TODOS_SUCCESS,FETCH_TODOS_FAIL, MARK_AS_FAVORITE_SUCCESS, MARK_AS_DONE_SUCCESS, ADD_TODO_SUCCESS,ADD_TODO_FAIL, SET_ERROR, ADD_TODO, DELETE_TODO, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL } from '../utils/actionTypes';
import { apiUrl } from '../utils/constants';

//sync job
const fetchToDos = () => ({
    type : FETCH_TODOS,
})
const fetchToDosSuccess = todos => ({
    type : FETCH_TODOS_SUCCESS,
    payload : todos
})
const fetchToDosFail = error => ({
    type : FETCH_TODOS_FAIL,
    payload : error
})

const markAsFavSuccess = data =>({
    type : MARK_AS_FAVORITE_SUCCESS,
    payload : data
})

const markAsDoneSuccess = data =>({
    type : MARK_AS_DONE_SUCCESS,
    payload : data
})

const addToDoAction = () =>({
    type : ADD_TODO
})
const addToDoSuccess = todo =>({
    type : ADD_TODO_SUCCESS,
    payload : todo
})

const addToDoFail = error =>({
    type : ADD_TODO_FAIL,
    payload : error
})

const deleteToDoAction = () =>({
    type : DELETE_TODO
})

const deleteToDoSuccess = todo =>({
    type : DELETE_TODO_SUCCESS,
    payload : todo
})

const deleteToDoFail = error =>({
    type : DELETE_TODO_FAIL,
    payload : error
})

export const setError = () =>({
    type : SET_ERROR
})

//async call to API with thunk
export const getToDos = () =>{
    return async dispatch =>{
        try {
            dispatch(fetchToDos())
            const res = await axios.get(`${apiUrl}todo`);
            if (res.data.status == 'fail'){
                dispatch(fetchToDosFail(res.data.error));
            }
            var todos = appendProperties(res.data.todos);
            dispatch(fetchToDosSuccess( todos ));
        } catch (error) {
            dispatch(fetchToDosFail(error.message));
        }
    }
}

export const markAs = (type,value,index) =>{
    return (dispatch) =>{
        const data = [type,value,index];
        if (type == 'favorite')
            dispatch( markAsFavSuccess(data));
        else{
            dispatch( markAsDoneSuccess(data));
        }
           
    }
    
}

export const addToDo = (body) =>{
    return async dispatch =>{
        try {
            dispatch(addToDoAction());
            const response = await axios.post(`${apiUrl}todo`, body);
                //console.log(response);
            dispatch(addToDoSuccess(response.data.todo));
        } catch (error) {
            dispatch(addToDoFail(error.message));
        }
    }
}

export const deleteToDo = ID =>{
    return async dispatch =>{
        try {
            dispatch(deleteToDoAction());
            const res = await axios.delete(`${apiUrl}todo/${ID}`);
            dispatch(deleteToDoSuccess(res.data.todo));
        } catch (error) {
            dispatch(addToDoFail(error.message));
        }
    }
}


// auxiliary function to append favorite,done to todos objects
function appendProperties(dataArray){
    return dataArray.map(el =>{
        el.favorite = false;
        el.done = false;
        return el;
    });
}