import React, { lazy, Suspense } from 'react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import Switch from 'react-router-transition-switch'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { setConfig } from 'react-hot-loader'
import Layout from 'components/layout'
import Loader from 'components/layout/Loader'
import NotFoundPage from 'pages/404'
import { Store } from 'store'

setConfig({ pureSFC: true })

const routes = [
  {
    path: '/login',
    Component: lazy(() => import('./pages/login')),
    exact: true,
  },
  {
    path: '/register',
    Component: lazy(() => import('./pages/register')),
    exact: true,
  },
  {
    path: '/forgot-password',
    Component: lazy(() => import('./pages/forgot-password')),
    exact: true,
  },
  {
    path: '/new-password',
    Component: lazy(() => import('./pages/new-password')),
    exact: true,
  },
  {
    path: '/dashboard',
    Component: lazy(() => import('./pages/dashboard')),
    exact: true,
  },
  {
    path: '/comprar-vuelo',
    Component: lazy(() => import('./pages/comprar-vuelo')),
    exact: true,
  },
  {
    path: '/comisiones',
    Component: lazy(() => import('./pages/comisiones')),
    exact: true,
  },
  {
    path: '/mis-puntos',
    Component: lazy(() => import('./pages/mis-puntos')),
    exact: true,
  },
  {
    path: '/canjear-puntos',
    Component: lazy(() => import('./pages/canjear-puntos')),
    exact: true,
  },
  {
    path: '/promociones',
    Component: lazy(() => import('./pages/promociones')),
    exact: true,
  },
  {
    path: '/mi-perfil',
    Component: lazy(() => import('./pages/mi-perfil')),
    exact: true,
  },
]
class Router extends React.PureComponent {
  render() {
    const settings = { routerAnimation: 'slide-fadein-up' }
    return (
      <BrowserRouter>
        <React.Fragment>
          <Store>
            <Layout>
              <Switch
                render={(props) => {
                  const {
                    children,
                    location: { pathname },
                  } = props
                  return (
                    <SwitchTransition>
                      <CSSTransition
                        key={pathname}
                        classNames={settings.routerAnimation}
                        timeout={settings.routerAnimation === 'none' ? 0 : 300}
                      >
                        {children}
                      </CSSTransition>
                    </SwitchTransition>
                  )
                }}
              >
                <Route
                  exact
                  path='/'
                  render={() => <Redirect to='/dashboard' />}
                />
                {routes.map(({ path, Component, exact }) => (
                  <Route path={path} key={path} exact={exact}>
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  </Route>
                ))}
                <Route component={NotFoundPage} />
              </Switch>
            </Layout>
          </Store>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default hot(Router, { errorBoundary: false })
