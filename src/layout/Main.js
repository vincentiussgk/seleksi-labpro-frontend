import React from "react"
import { BrowserRouter as Router } from "react-router-dom";

import Nav from "./Nav.js"
import Section from "./Section.js"
import Footer from "./Footer.js"

const Main = () =>{
  return(
    <>
      <Router>        
        <Nav/>
        <Section/>
        <Footer/>
      </Router>
    </>
  )
}

export default Main