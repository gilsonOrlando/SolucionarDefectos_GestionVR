import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactPlayer from 'react-player'
import P from './components/P';
import Header from './components/Header';
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    link:'',
    videoNombre:'',
    uploadValue1:0,
    date: new Date(),
    alquiler:[],
    errors:{},
    disabled:false,
    btn:{
      selectedFile: undefined,
      selectedFileName: undefined,
      imageSrc: undefined,
      value: ''
    }
};
const validate=values=>{
  const errors={}
  if(!values.nombre){
    errors.nombre='Este campo es obligatorio'
  }
  return errors
}
class NuevoVideo extends Component{
  constructor(props){
    super(props);
    this.state=initialState;
  }
  handleChange=({target})=>{
      const {name,value}=target
      this.setState({[name]:value})
   }
   manejarEnvioFormulario=async evento=>{
    evento.preventDefault();
    const {errors,...sinErrors}=this.state
    const result=validate(sinErrors)
     this.setState({errors:result});
     if (this.state.nombre === "" || !this.state.file) {
      alert("Debe seleccionar el video e ingresar un nombre");
     }else{
        if(Object.entries(result).length === 0){
          this.setState({disabled: true});
          ServiceAxios.upload('video',this.state.file).then(response => {
              const video={
              uso:0,
              nombre:this.state.nombre,
              vidNombre:response.data,
            }
            ServiceAxios.post("video",video).then(() => {
              alert("Guardado correctamente");
              this.setState({disabled: false});
              return this.props.history.push('/video');
            },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
          },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
        }
      }
   }
  logOut= () => {
    return this.props.history.push('/video');
  };
  subirArchivo=async evento=>{
    const file=evento.target.files[0]
    this.setState({
      file:file,
      link:URL.createObjectURL(file)
    })
  }
  render(){
    const {errors}=this.state
    return(
      <div>
        <Header/>
        <div className="contenedor">
          <div className="formulario">      
            <h3>Ingrese datos del Video</h3>
            <h4>Seleccionar formato mp4 y recomendable en tamaño 360p</h4>
            <input type='file' onChange={this.subirArchivo.bind(this)} value={this.state.btn.value} accept="video/mp4,video/x-m4v,video/*"/>
            <div>
              <ReactPlayer
                url={this.state.link}
                className='react-player'
                playing
                muted
                width='100%'
                height='100%'
              />
            </div>
            <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
              <div><input id="nombre" ref="nombre" name="nombre" type="text" onChange={this.handleChange} placeholder="Nombre"/>
              {errors.nombre && <P>{errors.nombre}</P>}</div>
              <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
            </form>
        </div>
      </div>
    </div>
    )
  }
}
export default withRouter (NuevoVideo);