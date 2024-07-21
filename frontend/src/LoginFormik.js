import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Formulario from './components/Form';
class LoginFormik extends Component {
  constructor(props){
    super(props);
  }
    render(){
        return(
            <div className="contenedorLogin"> 
              <div className="vertical-center"> 
                <Formulario/>
              </div>  
            </div>  
      )
    }
}
export default withRouter(LoginFormik);
