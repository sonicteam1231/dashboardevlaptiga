import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './app/store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

axios.defaults.withCredentials = true;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App /> 
      </Provider>
  </StrictMode>,
)
