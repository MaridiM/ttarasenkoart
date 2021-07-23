import ReactDOM from 'react-dom'
import {  BrowserRouter as Router } from 'react-router-dom' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App'
import 'styles/index.sass'
import '@fortawesome/fontawesome-free/css/all.min.css'

ReactDOM.render(
    <Router>
      <App />
      <ToastContainer />
    </Router>,
  document.getElementById('root')
)