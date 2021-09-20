import ReactDOM from 'react-dom'
import {  BrowserRouter as Router } from 'react-router-dom' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'


import { store } from 'store'
import App from './App'
import 'styles/index.sass'
import '@fortawesome/fontawesome-free/css/all.min.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
)