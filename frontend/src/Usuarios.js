import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
class Usuarios extends Component {
  constructor(props){
    super(props);
    this.redirectNuevo = this.redirectNuevo.bind(this)
    this.state={
      user:[],
    }
  }
  verifyRoute = () => {
    if (localStorage.getItem('tipo')!="admin") {
      return this.props.history.push('/admin/user');
    }
  }
  componentDidMount() {
    ServiceAxios.get("user").then(response => {
        this.setState({user: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectNuevo(){
    return this.props.history.push(`/nuevo/usuario`);
  }
  componentDidMount() {
    ServiceAxios.get("user").then(response => {
        this.setState({user: response.data.items});
      },error => {console.log(error.response.data.message);});
}
  redirectEditar(index){
    return this.props.history.push(`/usuario/${index}`);
  }
  async removeTodo(index){
    if(window.confirm('Esta ud seguro que desea eliminar')){
      ServiceAxios.delete("user",index).then(response => {
          alert("Eliminado correctamente");
          window.location.reload(false);
        },error => {console.log(error.response.data.message);});
    }
  }
    render(props){
      this.verifyRoute();
      const id=localStorage.getItem('id');
      return (
        <div>
          <Header />
          <div className="navbar2">
            <button className="button-3" onClick={this.redirectNuevo.bind()}>Nuevo Usuario</button>
          </div>
          <div className="wrapper">
              {this.state.user?.map((user) => (
              <div className='card'>
                  <div className="card__body">
                  <h2 className="card__title">{user.nombre}</h2>
                  <p className="card__description">Correo: {user.email}</p>
                  <p className="card__description">Tipo: {user.tipo}</p>
                  <button className="card__btn3" onClick={this.redirectEditar.bind(this,user._id)}>Editar</button>
                  {(() => {
                    if (id!=user._id) {
                      return (
                        <button
                        className="card__btn4"
                        onClick={this.removeTodo.bind(this,user._id)}>
                        Eliminar
                        </button>
                      )
                    } 
                  })()}
                  </div>
              </div>
              ))}
            </div>
          </div>
      );
  }
}
export default withRouter(Usuarios);

