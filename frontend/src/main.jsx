import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Home from './pages/Home/index';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Home />
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        closeButton={false}
        theme="dark"
      />
    </div>
  </StrictMode>
);
