import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from 'components/Layout'
import { AuthProvider } from 'hoc/AuthProvider'
import { RequireAuth } from 'hoc/RequireAuth'
import './reset.css'
import { CheckUserInStorage } from 'hoc/CheckUserInStorage'
import { RequireRole } from 'hoc/RequireRole'
import { NewApplication } from 'components/client/NewApplication'
import { Applications } from 'components/client/Applications'
import { Acceptance } from 'components/worker/Acceptance'
import { Delivery } from 'components/worker/Delivery'
import { ToLoginPage } from 'hoc/ToLoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ToLoginPage />
      },
      {
        path: 'applications',
        element: (
          <RequireAuth>
            <RequireRole role="сотрудник">
              <Applications />
            </RequireRole>
          </RequireAuth>
        )
      },
      {
        path: 'newApplication',
        element: (
          <RequireAuth>
            <RequireRole role="сотрудник">
              <NewApplication />
            </RequireRole>
          </RequireAuth>
        )
      },
      {
        path: 'acceptance',
        element: (
          <RequireAuth>
            <RequireRole role="кладовщик">
              <Acceptance />
            </RequireRole>
          </RequireAuth>
        )
      },
      {
        path: 'delivery',
        element: (
          <RequireAuth>
            <RequireRole role="кладовщик">
              <Delivery />
            </RequireRole>
          </RequireAuth>
        )
      },
      {
        path: 'login',
        element: <ToLoginPage />
      }
    ]
  },
  {
    path: '*',
    element: <div>Not found page</div>
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <CheckUserInStorage>
      <RouterProvider router={router} />
    </CheckUserInStorage>
  </AuthProvider>
)
