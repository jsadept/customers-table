import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./components/App/App";
import { store } from './store/store';
import { saveState } from './store/browserStorage';
import { Provider } from 'react-redux';


store.subscribe(() => {
    saveState(store.getState()).then(() => {
        console.log('saved');
    });
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
              <App/>
      </Provider>
  </React.StrictMode>
)
