
import React from 'react';
import Logo from '../logo.svg'
import '../pages/bootstrap.css'
import { Dropdown } from 'react-bootstrap'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//
const Nav = () => {

    return(    
      <AppBar style={{position:"static", height: "10rem"}}>
        <Toolbar style={{background:"#041624",padding:"0.25%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"0.5%",position:"fixed",top:0,width:"100%", height:"10rem",zIndex:1, position: 'sticky'}}>
          <img className="App-logo" id="logo" src={Logo} width="125px" height="125px"/>
          <span style={{justifyContent:"center"}}></span>
          <nav class="navbar">                               
              <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-split-variants-primary" size="lg">
                      Menu
                  </Dropdown.Toggle> 
                  <Dropdown.Menu>
                      <Dropdown.Header>Edit and View Items</Dropdown.Header>                    
                      <Dropdown.Item href="/edit-dorayaki">Edit Dorayaki</Dropdown.Item>
                      <Dropdown.Item href="/edit-store">Edit Store</Dropdown.Item>
                      {/* <Dropdown.Item href="/editmovies">Edit</Dropdown.Item> } */}
                                      
                  </Dropdown.Menu>                   
              </Dropdown>
          </nav>           
        </Toolbar>

      </AppBar>
    )
}
//
export default Nav;
