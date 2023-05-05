import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.tsx'
import Urls from './Pages/Urls.tsx'

const routes = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/:url',
    element:<Urls/>
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={routes} />  
)
