import React, { Suspense } from 'react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import Layout from './components/layout'
// import Loader from 'components/layout/Loader'
import NotFoundPage from './pages/404'
import routes from './routes'

setConfig({ pureSFC: true, logLevel: 'debug' })

class Router extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Layout>
            <Route exact path='/' render={() => <Redirect to='/' />} />
            {routes.map(({ path, Component, exact }) => (
              <Route path={path} key={path} exact={exact}>
                <Suspense fallback={<div>cargando...</div>}>
                  <Component />
                </Suspense>
              </Route>
            ))}
            <Route component={NotFoundPage} />
          </Layout>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default hot(Router, { errorBoundary: false })
