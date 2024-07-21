import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
import Constantes from "./components/Constantes";
class Solicitud extends Component {
  constructor(props){
    super(props);
    this.state={
      solicitud:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("solicitud").then(response => {
        this.setState({solicitud: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectEditar(index){
    return this.props.history.push(`/solicitud/${index}`);
  }
    render(){
      return (
        <div>
          <Header />
            <div className="wrapper">
              {this.state.solicitud?.map((solicitud) => (
              <div className='card'>
                  <div className="card__body">
                    <h2 className="card__title">{solicitud.descripcion}</h2>
                    <p className="card__description"><b>id:</b> {solicitud._id}</p>
                    <a href={`${Constantes.servidor}/uploads/${solicitud.wordNombre}`} target="_blank"><button className="card__btn2">Descargar Documento</button></a>
                    <button
                    className="card__btn3"
                    onClick={this.redirectEditar.bind(this,solicitud._id)}>
                    Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      );
  }
}
export default withRouter(Solicitud);

