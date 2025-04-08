import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import '@ant-design/v5-patch-for-react-19';
import LoginPage from './page/loginPage/LoginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
)
