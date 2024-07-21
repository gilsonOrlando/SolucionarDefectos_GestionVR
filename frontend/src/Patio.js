import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
class Patio extends Component {
  constructor(props){
    super(props);
    this.state={
      patio:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("patio").then(response => {
        this.setState({patio: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectEditar(index){
    return this.props.history.push(`/patio/${index}`);
  }
    render(){
      return (
        <div>
          <Header />
            <div className="wrapper">
              {this.state.patio?.map((todo) => (
              <div className='card'>
                <img src={`${Constantes.servidor}/uploads/${todo.imgNombre}`} alt='product-img' className='card__img'/>
                <div className="card__body">
                  <h2 className="card__title">{todo.descripcion}</h2>
                  <p className="card__description"><b>id:</b> {todo._id}</p>
                  <button className="card__btn3" onClick={this.redirectEditar.bind(this,todo._id)}>Editar</button>
                </div>
                </div>
              ))}
            </div>
          </div>
      );
  }
}
export default withRouter(Patio);

