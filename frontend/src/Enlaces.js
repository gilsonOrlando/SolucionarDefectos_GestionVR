import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
class Enlaces extends Component {
  constructor(props){
    super(props);
    this.state={
      links:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("links").then(response => {
        this.setState({links: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectEditar(index){
    return this.props.history.push(`/enlace/${index}`);
  }
    render(){
      return (
        <div>
          <Header />
            <div className="wrapper">
              {this.state.links?.map((funcion) => (
              <div className='card'>
                  <div className="card__body">
                    <h2 className="card__title">{funcion.nombre}</h2>
                    <p className="card__description"><b>id:</b> {funcion._id}</p>
                    <a href={funcion.link} target="_blank"><button className="card__btn2">Dirigir a enlace</button></a>
                    <button className="card__btn3" onClick={this.redirectEditar.bind(this,funcion._id)}>Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      );
  }
}
export default withRouter(Enlaces);

