import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
import Constantes from "./components/Constantes";
class Documento extends Component {
  constructor(props){
    super(props);
    this.state={
      documento:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("documento").then(response => {
        this.setState({documento: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectEditar(index){
    return this.props.history.push(`/documento/${index}`);
  }
    render(){
      return (
        <div>
          <Header />
            <div className="wrapper">
              {this.state.documento?.map((documento) => (
              <div className='card'>
                  <div className="card__body">
                    <h2 className="card__title">{documento.descripcion}</h2>
                    <p className="card__description"><b>id:</b> {documento._id}</p>
                    <a href={`${Constantes.servidor}/uploads/${documento.pdfNombre}`} target="_blank"><button className="card__btn2">Visualizar PDF</button></a>
                    <button
                    className="card__btn3"
                    onClick={this.redirectEditar.bind(this,documento._id)}>
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
export default withRouter(Documento);

