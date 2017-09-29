import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App,{cardsList} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App cards={cardsList}/>, document.getElementById('root'));
registerServiceWorker();
