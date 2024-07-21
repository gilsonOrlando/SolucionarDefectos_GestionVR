import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import {withRouter} from 'react-router-dom';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
class Televisor extends Component {
  constructor(props){
    super(props);
    this.state={
      televisor:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("televisor").then(response => {
        this.setState({televisor: response.data.items});
      },error => {console.log(error.response.data.message);});
}
async activar(index,descripcion){
  if(window.confirm('Esta ud seguro que desea activar el '+descripcion)){
    const televisor={
      estado:"Activo"
    }
    ServiceAxios.put("televisor",index,televisor).then(() => {
      alert("Guardado correctamente");
        window.location.reload(false);
    },error => {console.log(error.response.data.message);});
  }
}
async desactivar(index,descripcion){
  if(window.confirm('Esta ud seguro que desea desactivar el '+descripcion)){
    const televisor={
      estado:"Pasivo"
    }
    ServiceAxios.put("televisor",index,televisor).then(() => {
      alert("Guardado correctamente");
        window.location.reload(false);
    },error => {console.log(error.response.data.message);});
  }
}
redirectEditar(index){
  return this.props.history.push(`/televisor/${index}`);
}
  render() {
    return (
      <div>
      <Header />
        <div className="wrapper">
          {this.state.televisor?.map((televisor) => (
          <div className='card'>
            <ReactPlayer
                  className='card__audio'
                  url={`${Constantes.servidor}/uploads/${televisor.vidNombre}`}
                  playing
                  muted
                  width='100%'
                  height='100%'
                />
            <div className="card__body">
              <h2 className="card__title">{televisor.descripcion}</h2>
              <p className="card__description"><b>id:</b> {televisor._id}</p>
              {(() => {
                if (televisor.estado === 'Pasivo') {
                  return (
                    <button className="card__btn2" onClick={this.activar.bind(this,televisor._id,televisor.descripcion)}>Activar</button>
                  )
                } else if (televisor.estado === 'Activo') {
                  return (
                    <button className="card__btn2" onClick={this.desactivar.bind(this,televisor._id,televisor.descripcion)}>Desactivar</button>
                  )
                }
              })()}
              <button className="card__btn3" onClick={this.redirectEditar.bind(this,televisor._id)}>Editar</button>
            </div>
          </div>
          ))}
          </div>
        </div>
    );
  }
}
export default  withRouter (Televisor);

