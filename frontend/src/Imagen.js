import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
class Administrativo extends Component {
  constructor(props){
    super(props);
    this.redirectNuevo = this.redirectNuevo.bind(this)
    this.state={
      imagen:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("imagen").then(response => {
        this.setState({imagen: response.data.items});
      },
      error => {console.log(error.response.data.message);}
    );
  }
  redirectNuevo(){
    return this.props.history.push(`/imagen/nuevo`);
  }
  async remover(index,image,uso){
    if(uso<=0)
    {
      if(window.confirm('Esta ud seguro que desea eliminar')){
        ServiceAxios.delete("delete",image).then(() => {
          ServiceAxios.delete("imagen",index).then(() => {
            alert("Eliminado correctamente");
            window.location.reload(false);
          },(error) => {alert(error.response.data.message);});
        },(error) => {alert(error.response.data.message);});
      }
    }else{
      window.alert('No se puede eliminar debido a que la imagen esta siendo utilizada');
    }
  }
    render(){
      return (
        <div>
          <Header />
          <div className="navbar2">
            <button className="button-3" onClick={this.redirectNuevo.bind()}>Nueva Imagen</button>
          </div>
            <div className="wrapper">
              {this.state.imagen?.map((todo) => (
              <div className='card'>
                <img src={`${Constantes.servidor}/uploads/${todo.imgNombre}`} alt='product-img' className='card__img'/>
                <div className="card__body">
                  <h2 className="card__title">{todo.nombre}</h2>
                  {/* <h3 className="card__price">{user.nombre}</h3> */}
                  <button
                    className="card__btn4"
                    onClick={this.remover.bind(this,todo._id,todo.imgNombre,todo.uso)}>
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
export default withRouter(Administrativo);

