import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './provider/AuthProvider.jsx'
import { RerenderProvider } from './provider/RerenderProvider.jsx'
import { TaskProvider } from './provider/TaskProvider.jsx'
import { FormProvider } from './provider/FormProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RerenderProvider>
        <TaskProvider>
          <FormProvider>
            <App />
          </FormProvider>
        </TaskProvider>
      </RerenderProvider>
    </AuthProvider>
  </StrictMode>
)
