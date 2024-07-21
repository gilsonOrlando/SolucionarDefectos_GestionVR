import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
import Constantes from "./components/Constantes";
class Word extends Component {
  constructor(props){
    super(props);
    this.redirectNuevo = this.redirectNuevo.bind(this)
    this.state={
      pdfs:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("pdfs").then(response => {
        this.setState({pdfs: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectNuevo(){
    return this.props.history.push(`/pdfs/nuevo`);
  }
  async remover(index,nombre,uso){
    if(uso==0)
    {
      if(window.confirm('Esta ud seguro que desea eliminar')){
        ServiceAxios.delete("delete",nombre).then(() => {
          ServiceAxios.delete("pdfs",index).then(() => {
            alert("Eliminado correctamente");
            window.location.reload(false);
          },(error) => {alert(error.response.data.message);});
        },(error) => {alert(error.response.data.message);});
      }
    }else{
      window.alert('No se puede eliminar debido a que el documento esta siendo utilizado');
    }
  }
    render(){
      return (
        <div>
          <Header />
          <div className="navbar2">
            <button className="button-3" onClick={this.redirectNuevo.bind()}>Nuevo Documento</button>
          </div>
            <div className="wrapper">
              {this.state.pdfs?.map((pdfs) => (
              <div className='card'>
                  <div className="card__body">
                    <h2 className="card__title">{pdfs.nombre}</h2>
                    <a href={`${Constantes.servidor}/uploads/${pdfs.pdfNombre}`} target="_blank"><button className="card__btn3">Visualizar PDF</button></a>
                    <button
                      className="card__btn4"
                      onClick={this.remover.bind(this,pdfs._id,pdfs.pdfNombre,pdfs.uso)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      );
  }
}
export default withRouter(Word);

