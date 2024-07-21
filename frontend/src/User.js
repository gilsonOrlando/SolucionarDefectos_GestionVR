import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Header from './components/Header';
import ServiceAxios from "./components/ServiceAxios";
class AdminUser extends Component {
  constructor(props){
    super(props);
    this.state={
      usuario:{},
    }
  }
  componentWillMount() {
    ServiceAxios.getId("user",localStorage.getItem('id')).then(response => {
        this.setState({usuario: response.data.items});
      },error => {console.log(error.response.data.message);});
  }
  redirectEditar(index){
    return this.props.history.push(`/user/${index}`);
  }
  render() {
    return (
      <div>
      <Header />
      <div className="wrapper">
        <div className='card'>
            <div className="card__body">
            <h2 className="card__title">{this.state.usuario.nombre}</h2>
            <p className="card__description"><b>Correo:</b> {this.state.usuario.email}</p>
            <p className="card__description"><b>Tipo:</b> {this.state.usuario.tipo}</p>
            <button className="card__btn3" onClick={this.redirectEditar.bind(this,this.state.usuario._id)}>Editar</button>
            </div>
        </div>
      </div>
      </div>
    );
  }
}
export default  withRouter (AdminUser);