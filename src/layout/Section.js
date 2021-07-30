import React from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import EditDorayaki from "../pages/EditDorayaki.js";
import EditStore from "../pages/EditStore.js";

const Section = () =>{

  return(    
    <section style={{margin:"6%"}}>
      <Switch>
        <Route exact path="/" component={EditDorayaki}/>
        <Route exact path="/edit-dorayaki" component={EditDorayaki}/>
        <Route exact path="/edit-store" component={EditStore}/>
        {/* <Route exact path="/about" component={About}/> */}
      </Switch>
    </section>
  )
}

export default Section