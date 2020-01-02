import React from 'react'
import ReactDOM from 'react-dom'
// import Router from './router'
import './global.scss'
import ComponentTest from './test'
const routes = <ComponentTest title='jee' paragraph='2' />

ReactDOM.render(routes, document.getElementById('app'))
