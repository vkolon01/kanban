import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import KanbanBoardContainer from './KanbanBoardContainer'
import KanbanBoard from './KanbanBoard';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//import createBrowserHistory from 'history/es/createBrowserHistory';
import {createBrowserHistory as history} from 'history';
//import history from './history';

ReactDOM.render((
  <Router history={history}>
    <Route component={KanbanBoardContainer}/>
  </Router>), document.getElementById('root'));
registerServiceWorker();
