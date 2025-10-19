import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router'
import SignUp from './page/signup.jsx'
import Login from './page/login.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/signup", element: <SignUp />},
  {path: "/login", element: <Login />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
