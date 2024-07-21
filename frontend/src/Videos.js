import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import {withRouter} from 'react-router-dom';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
class Videos extends Component {
  constructor(props){
    super(props);
    this.redirectNuevo = this.redirectNuevo.bind(this)
    this.state={
      video:[],
    }
  }
  componentDidMount() {
    ServiceAxios.get("video").then(response => {
        this.setState({video: response.data.items});
      },error => {console.log(error.response.data.message);});
}
  redirectNuevo(){
    return this.props.history.push(`/video/nuevo`);
  }
  async remover(index,video,uso){
    if(uso==0)
    {
      if(window.confirm('Esta ud seguro que desea eliminar')){
        ServiceAxios.delete("delete",video).then(() => {
          ServiceAxios.delete("video",index).then(() => {
            alert("Eliminado correctamente");
            window.location.reload(false);
          },(error) => {alert(error.response.data.message);});
        },(error) => {alert(error.response.data.message);});
      }
    }else{
      window.alert('No se puede eliminar debido a que el video esta siendo utilizado');
    }
  }
  render() {
    if (!this.state.video)
    {return(
      <div>
        <div class="divLoader">
        <svg class="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
          <path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
        </svg>
        </div>
      </div>
      )
    }
    return (
      <div>
      <Header />
        <div className="navbar2">
          <button className="button-3" onClick={this.redirectNuevo.bind()}>Nuevo Video</button>
        </div>
        <div className="wrapper">
          {this.state.video?.map((video) => (
          <div className='card'>
            <ReactPlayer
                  className='card__audio'
                  url={`${Constantes.servidor}/uploads/${video.vidNombre}`}
                  playing
                  muted
                  width='100%'
                  height='100%'
                />
            <div className="card__body">
              <h2 className="card__title">{video.nombre}</h2>
              <button className="card__btn4" onClick={this.remover.bind(this,video._id,video.vidNombre,video.uso)}>Eliminar</button>
            </div>
          </div>
          ))}
          </div>
        </div>
    );
  }
}
export default  withRouter (Videos);

