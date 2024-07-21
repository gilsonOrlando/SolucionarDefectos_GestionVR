import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
class Maestria extends Component {
  constructor(props){
    super(props);
    this.state={
      maestria:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("maestria").then(response => {
        this.setState({maestria: response.data.items});
      },error => {console.log(error.response.data.message);});
}
  redirectEditar(index){
    return this.props.history.push(`/maestria/${index}`);
  }
  render() {
    return (
      <div>
      <Header />
        <div className="wrapper">
          {this.state.maestria?.map((maestria) => (
                <div className='card'>
                    <div className="card__body">
                      <h2 className="card__title">{maestria.nombre}</h2>
                      <p className="card__description"><b>id:</b> {maestria._id}</p>
                      <a href={maestria.link} target="_blank"><button className="card__btn2">Enlace whatsapp</button></a>
                      <a href={`${Constantes.servidor}/uploads/${maestria.pdfNombre}`} target="_blank"><button className="card__btn2">Visualizar PDF</button></a>
                      <button className="card__btn3" onClick={this.redirectEditar.bind(this,maestria._id)}>Editar</button>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    );
  }
}
export default  withRouter (Maestria);
