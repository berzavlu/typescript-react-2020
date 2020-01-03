import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import './styles/main.scss'
// import ComponentTest from './test'

// const routes = <ComponentTest title='jee' paragraph='2' />
const routes = <Router />

ReactDOM.render(routes, document.getElementById('app'))
