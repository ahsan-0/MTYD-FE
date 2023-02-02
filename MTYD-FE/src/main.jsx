import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GameControlsProvider } from './contexts/GameControlsContext';
import { Provider } from 'react-redux';
import store from './app/store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <GameControlsProvider>
    <Provider store={store}>
     <App />
    </Provider>
    </GameControlsProvider>
    </BrowserRouter>
)
