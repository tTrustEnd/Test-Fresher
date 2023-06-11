import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { store,persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.css';
import { PersistGate } from 'redux-persist/lib/integration/react';



ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>

  </Provider>

)
