import React from 'react'
import logo from "../images/logo.png"
import Header from "./Header"
import Footer from "./Footer"


export default function NotFound() {
  return (
    <div>
      <Header />
      <div className='Error'>
        <section className="ErrorS">
              <h1>
                  ERROR 404
              </h1>
        </section>
        <img className="mainLogo" src={logo} alt="Main Logo"/>
      </div>
      <Footer />
    </div>
  )
}