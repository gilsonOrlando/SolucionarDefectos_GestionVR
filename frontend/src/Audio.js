import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { withRouter,Link } from 'react-router-dom';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
import Header from './components/Header';
class Audio extends Component {
  constructor(props){
    super(props);
    this.state={
      audio:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("audio").then(response => {
        this.setState({audio: response.data.items});},
      error => {console.log(error.response.data.message);}
    );
  }
  redirectEditar(index){
    return this.props.history.push(`/audio/${index}`);
  }
    render(props){
      return (
        <div>
          <Header />
          <div className="wrapper">
                {this.state.audio?.map((audio) => (
                <div className='card'>
                    <img src={`${Constantes.servidor}/uploads/${audio.imgNombre}`} alt='product-img' className='card__img'/>
                    <div className="card__body">
                    <h2 className="card__title">{audio.nombre}</h2>
                    <ReactAudioPlayer
                      className='card__audio'
                      src={`${Constantes.servidor}/uploads/${audio.audioNombre}`}
                      controls
                    />
                    <p className="card__description"><b>id:</b> {audio._id}</p>
                    <button className="card__btn3" onClick={this.redirectEditar.bind(this,audio._id)}>Editar</button>
                    </div>
                </div>
                ))}
            </div>
          </div>
      );
  }
}
export default withRouter(Audio);

