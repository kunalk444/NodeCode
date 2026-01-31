import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './components/Slices/store.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import InsideProblem from './components/InsideProblem.jsx';
import ProgressPage from './components/ProgressPAge.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <GoogleOAuthProvider clientId={'1077019201006-o087ojud2fm2qsu6lc4oc3mn8shetohv.apps.googleusercontent.com'}>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/insideproblem' element={<InsideProblem />} />
          <Route path='/progresspage' element={<ProgressPage />} />
        </Routes>
      </Provider>
    </GoogleOAuthProvider>
    </BrowserRouter>
)

