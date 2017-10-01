import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import KanbanBoardContainer from './KanbanBoardContainer'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<KanbanBoardContainer/>, document.getElementById('root'));
registerServiceWorker();
