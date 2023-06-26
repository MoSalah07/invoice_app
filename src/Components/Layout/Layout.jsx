import React from 'react'
import './layout.css';
import { CTXForm } from '../../Context/ContextForm';
function Layout() {
    const { show } = CTXForm();
  return (
    <div className={`layout ${!show ? 'hidden' : ''}`}></div>
  )
}

export default Layout