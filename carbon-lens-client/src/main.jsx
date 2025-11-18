import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from "react-router";
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ActivityProvider } from './context/ActivityContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
        <ActivityProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ActivityProvider>
      </AuthProvider>
    </StrictMode>,
)
