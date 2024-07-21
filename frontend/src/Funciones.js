import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
class Funciones extends Component {
  constructor(props){
    super(props);
    this.state={
      funcion:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("funcion").then(response => {
        this.setState({funcion: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectEditar(index){
    return this.props.history.push(`/funcion/${index}`);
  }
    render(){
      return (
        <div>
          <Header />
            <div className="wrapper">
              {this.state.funcion?.map((funcion) => (
              <div className='card'>
                  <div className="card__body">
                    <h2 className="card__title">{funcion.nombre}</h2>
                    <p className="card__description"><b>id:</b> {funcion._id}</p>
                    <button className="card__btn3" onClick={this.redirectEditar.bind(this,funcion._id)}>Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      );
  }
}
export default withRouter(Funciones);

