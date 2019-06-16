import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers';
import rootSaga from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development'  &&   
                         (window ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__               
    ? (window ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;    

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, 
    composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
       <BrowserRouter>
          <App />
       </BrowserRouter>
    </Provider>,
    document.getElementById('root')
 );

registerServiceWorker();

