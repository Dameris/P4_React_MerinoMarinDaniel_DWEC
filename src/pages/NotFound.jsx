import React from 'react'
import logo from "../images/logo.png"
import Header from "./Header"
import Footer from "./Footer"


export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="error404">
        <img className="mainLogo" src={logo} alt="Main Logo" />
        <section>
          <h1>ERROR 404</h1>
          <h5>PAGE NOT FOUND</h5>
        </section>
        <img className="mainLogo" src={logo} alt="Main Logo" />
      </div>
      <Footer />
    </div>
  )
}