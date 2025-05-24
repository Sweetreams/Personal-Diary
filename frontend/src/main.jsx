import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import '@ant-design/v5-patch-for-react-19';
import LoginPage from './page/loginPage/LoginPage.jsx'
import RegistrationPage from './page/registrationPage/RegistrationPage.jsx';
import PasswordRecoveryPage from './page/passwordRecoveryPage/PasswordRecoveryPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './page/errorPage/ErrorPage.jsx';
import PagesDiary from './page/pagesDiary/PagesDiary.jsx';
import Template from './components/template/Template.jsx';
import CreateNewPost from './page/createNewPost/CreateNewPost.jsx';
import EditingNewDiary from './page/editingPageDiary/EditingNewDiary.jsx';
import ProfilePage from './page/profilePage/ProfilePage.jsx';
import SettingPage from './page/settingPage/SettingPage.jsx';
import StatisticPage from './page/statisticPage/StatisticPage.jsx';
import App from "./App.jsx"
import SecurityAdminPage from './page/securityPage/SecurityAdminPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/main",
        element: <App />
      },
      {
        path: "/pagesdiary/:date",
        element: <PagesDiary />
      },
      {
        path: "/createPost",
        element: <CreateNewPost />,
      },
      {
        path: "/profilePage",
        element: <ProfilePage />,
      },
      {
        path: "/settingPage",
        element: <SettingPage />,
      },
      {
        path: "/editingPost/:id",
        element: <EditingNewDiary />,
      },
      {
        path: "/statistica",
        element: (
          <StatisticPage />
          // <SecurityAdminPage>
            
          // </SecurityAdminPage>
        ),
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/recoveryPassword",
    element: <PasswordRecoveryPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
