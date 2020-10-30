import axios from 'axios';
import { FETCH_TODOS_SUCCESS,FETCH_TODOS_FAIL } from '../utils/actionTypes';
import { apiUrl } from '../utils/constants';

//sync job
const fetchToDosSuccess = todos => ({
    type : FETCH_TODOS_SUCCESS,
    payload : todos
})
const fetchToDosFail = data => ({
    type : FETCH_TODOS_FAIL,
    payload : data
})

//async call to API with thunk
export const fetchToDos = () =>{
    return async dispatch =>{
        try {
            const res = await axios.get(`${apiUrl}todo`);
            if (res.data.status == 'fail'){
                dispatch(fetchToDosFail(res.data.error));
            }
            dispatch(fetchToDosSuccess(res.data.todos));
        } catch (error) {
            console.log(error);
        }
    }
}