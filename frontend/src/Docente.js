import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
class Docente extends Component {
  constructor(props){
    super(props);
    this.redirectNuevo = this.redirectNuevo.bind(this)
    this.state={
      docente:[],
      usoImg:0,
      usoPdf:0,
    }
  }
  componentDidMount() {
    ServiceAxios.get("docente").then(response => {
        this.setState({docente: response.data.items});
      },
      error => {console.log(error.response.data.message);}
    );
  }
  redirectEditar(index){
    return this.props.history.push(`/docente/${index}`);
  }
  redirectNuevo(){
    return this.props.history.push(`/nuevo/docente`);
  }
  remover(index,idImg,idPdf){
    if(window.confirm('Esta ud seguro que desea eliminar')){
      console.log(idImg,idPdf);
      ServiceAxios.getId("imagen",idImg).then(response2 => {
        console.log(response2.data);
        this.setState({usoImg:response2.data.items.uso})
        ServiceAxios.getId("pdfs",idPdf).then(response3 => {
          console.log(response3.data);
          this.setState({usoPdf:response3.data.items.uso})
          ServiceAxios.delete("docente",index).then(() => {
            this.state.usoImg--;
            const imagen={
              uso:this.state.usoImg
            }
            ServiceAxios.put("imagen",idImg,imagen).then(() => {
            },(error) => {alert(error.response.data.message);});
            this.state.usoPdf--;
            const pdf={
              uso:this.state.usoPdf
            }
            ServiceAxios.put("pdfs",idPdf,pdf).then(() => {
            },(error) => {alert(error.response.data.message);});
            alert("Eliminado correctamente");
            window.location.reload(false);
          },(error) => {alert(error.response.data.message);});
        },error3 => {console.log(error3.responde.data)});
      },error2 => {console.log(error2.responde.data)});
    }
  }
    render(props){
      return (
        <div>
          <Header />
          <div className="navbar2">
            <button className="button-3" onClick={this.redirectNuevo.bind()}>Nuevo Docente</button>
          </div>
          <div className="wrapper">
              {this.state.docente?.map((user) => (
              <div className='card'>
                  <img src={`${Constantes.servidor}/uploads/${user.imgNombre}`} alt='product-img' className='card__img'></img>
                  <div className="card__body">
                  <h2 className="card__title">{user.nombre}</h2>
                  <a href={`${Constantes.servidor}/uploads/${user.pdfNombre}`} target="_blank"><button className="card__btn2">Visualizar Curriculum PDF</button></a>
                  <button className="card__btn3" onClick={this.redirectEditar.bind(this,user._id)}>Editar</button>
                  <button className="card__btn4" onClick={this.remover.bind(this,user._id,user.idImg,user.idPdf)}>Eliminar</button>
                  </div>
              </div>
              ))}
            </div>
          </div>
      );
  }
}
export default withRouter(Docente);

