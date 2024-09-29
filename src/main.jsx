import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>,
)
