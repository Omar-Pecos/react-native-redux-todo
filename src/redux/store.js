import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import todos from './reducers';
//import { composeWithDevTools } from 'remote-redux-devtools';

//code to setup redux dev tools for windows/web I guess
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*const composeEnhancers = composeWithDevTools({realtime : true, port : 8000});*/

const store = createStore(todos, composeEnhancers(
    applyMiddleware(thunk)
));

export default store