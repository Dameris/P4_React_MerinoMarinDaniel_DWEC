import React from "react"
import logo from "../images/logo.png"

export default function Contact() {
    return (
        <div className="contactWallpaper">
            <img className="mainLogo" src={logo} alt="Main Logo" />
            <form className="formContact" method="get" action="recived">
                <div className="formBlock">
                    <label htmlFor="name">
                        <input className="contact" type="text" id="name" name="name" placeholder="Name" required />
                    </label>
                    <label htmlFor="email">
                        <input className="contact" type="text" id="email" name="email" placeholder="Email" required />
                    </label>
                    <label htmlFor="phone">
                        <input className="contact" type="text" id="phone" name="phone" placeholder="Phone" required />
                    </label>
                    <label htmlFor="problem">
                        <textarea id="problem" name="problem" placeholder="Problem description" required />
                    </label>
                    <input className="submit" type="submit" name="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}