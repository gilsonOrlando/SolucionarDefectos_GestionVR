import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {NavLink, Link} from 'react-router-dom';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
class Directivo extends Component {
  constructor(props){
    super(props);
    this.state={
      directivo:[],
    }
  }
  componentDidMount() {
    if (localStorage.getItem('id')) {
      ServiceAxios.get("directivo").then(response => {
          this.setState({directivo: response.data.items});},
        error => {console.log(error.response.data.message);}
      );
    }
  }
  redirectEditar(index){
    return this.props.history.push(`/directivo/${index}`);
  }
    render(){
      return (
        <div>
          <Header />
          <div className="wrapper">
            {this.state.directivo?.map((user) => (
            <div className='card'>
                <img src={`${Constantes.servidor}/uploads/${user.imgNombre}`} alt='product-img' className='card__img'></img>
                <div className="card__body">
                  <h2 className="card__title">{user.cargo}</h2>
                  <p className="card__description">{user.nombre}</p>
                  <p className="card__description">{user.correo}</p>
                  <p className="card__description">Horario de atención:<br/>{user.horarioAM}<br/>{user.horarioPM}</p>
                  <p className="card__description"><b>id:</b> {user._id}</p>
                  <a href={`${Constantes.servidor}/uploads/${user.pdfNombre}`} target="_blank"><button className="card__btn2">Visualizar Curriculum PDF</button></a>
                  <button className="card__btn3" onClick={this.redirectEditar.bind(this,user._id)}>Editar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
}
export default withRouter(Directivo);
