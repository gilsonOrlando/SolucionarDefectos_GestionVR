import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
class Personal extends Component {
  constructor(props){
    super(props);
    this.state={
      personal:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("personal").then(response => {
        this.setState({personal: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectEditar(index){
    return this.props.history.push(`/personal/${index}`);
  }
  render() {
    return (
      <div>
      <Header />
        <div className="wrapper">
        {this.state.personal?.map((user) => (
            <div className='card'>
                <img src={`${Constantes.servidor}/uploads/${user.imgNombre}`} alt='product-img' className='card__img'></img>
                <div className="card__body">
                  <h2 className="card__title">{user.nombre}</h2>
                  <p className="card__description">{user.correo}</p>
                  <p className="card__description">{user.cargo}</p>
                  <p className="card__description"><b>id:</b> {user._id}</p>
                  <button className="card__btn3" onClick={this.redirectEditar.bind(this,user._id)}>Editar</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default  withRouter (Personal);