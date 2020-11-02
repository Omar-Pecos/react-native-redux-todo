import axios from 'axios';
import { FETCH_TODOS_SUCCESS,FETCH_TODOS_FAIL, MARK_AS_FAVORITE_SUCCESS, MARK_AS_DONE_SUCCESS, ADD_TODO_SUCCESS,ADD_TODO_FAIL } from '../utils/actionTypes';
import { apiUrl } from '../utils/constants';

//sync job
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

const addToDoSuccess = todo =>({
    type : ADD_TODO_SUCCESS,
    payload : todo
})

const addToDoFail = error =>({
    type : ADD_TODO_FAIL,
    payload : error
})

//async call to API with thunk
export const fetchToDos = () =>{
    return async dispatch =>{
        try {
            const res = await axios.get(`${apiUrl}todo`);
            if (res.data.status == 'fail'){
                dispatch(fetchToDosFail(res.data.error));
            }
            var todos = appendProperties(res.data.todos);
            dispatch(fetchToDosSuccess( todos ));
        } catch (error) {
            console.log(error.message);
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
            const response = await axios.post(`${apiUrl}todo`, body);
                console.log(response);
            dispatch(addToDoSuccess(response.data.todo));
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