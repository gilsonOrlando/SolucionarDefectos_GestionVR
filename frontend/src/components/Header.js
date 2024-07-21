import React, {Component} from 'react';
import Navbar from './Navbar';
import {withRouter} from 'react-router-dom';
import ServiceAxios from "./ServiceAxios";
import { Link } from 'react-router-dom';
import logo from '../logorv.png';
class Header extends Component{
  constructor(props){
    super(props);
  }
  verifyToken = () => {
    if (!localStorage.getItem('id')) {
      localStorage.removeItem('tipo'); 
      localStorage.removeItem('id'); 
      localStorage.removeItem('accesstoken'); 
      return this.props.history.push('/login');
    }else{
      ServiceAxios.getId("user",localStorage.getItem('id')).then(response => {
      },error => {
        if(error.response.status==409){
          localStorage.removeItem('tipo'); 
          localStorage.removeItem('id'); 
          localStorage.removeItem('accesstoken'); 
          alert("La sesión ha caducado por favor ingrese de nuevo");
          this.props.history.push('/login');
        }
      });
    }
  };
  logOut= () => {
    localStorage.removeItem('tipo'); 
    localStorage.removeItem('id'); 
    localStorage.removeItem('accesstoken'); 
    this.props.history.push('/login');
  };
  render(){
  this.verifyToken();
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" /> 
        </Link>
        <Navbar />
        <button className="button-3" onClick={this.logOut}>Salir</button>
      </div>
    </header>
  );
  }
};
export default withRouter (Header);
