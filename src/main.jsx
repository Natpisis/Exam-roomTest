import React from 'react'
import ReactDOM from 'react-dom/client'
import Pageform from './Pageform.jsx'
import Loginpage from './Loginpage.jsx'
import PageSearch from './PageSearch.jsx'
import { createBrowserRouter ,RouterProvider, Route } from 'react-router-dom'

const router = createBrowserRouter([
    {
      path : "/",
      element : <Loginpage />

    },
    {
       path : "Pageform",
       element : <Pageform />
    },
    {
      path : "PageSearch",
      element : <PageSearch />
    }
])

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
