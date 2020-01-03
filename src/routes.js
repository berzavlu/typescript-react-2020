import { lazy } from 'react'

const routes = [
  {
    path: '/login',
    Component: lazy(() => import('./pages/login')),
    exact: true,
  },
]

export default routes
