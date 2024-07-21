import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactModal from 'react-modal';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    imgNombre:'',
    audioNombre:'',
    linkAudio:"",
    img1:'',
    idImg:'',
    idImgAnt:'',
    usoImg:0,
    usoImgAnt:0,
    nombre:'',
    nombreImg:'',
    nombreAudio:'',
    uploadValue1:0,
    date: new Date(),
    descripcion:[],
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
class EditAudio extends Component{
  constructor(props){
    super(props);
    this.state=initialState;
    this.state.id=this.props.match.params.id;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.CloseModalCancelar = this.CloseModalCancelar.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  componentWillMount() {
    ServiceAxios.getId("audio",this.state.id).then(response => {
      this.setState({audioNombre:response.data.items.audioNombre})
      this.setState({linkAudio:`${Constantes.servidor}/uploads/${response.data.items.audioNombre}`})
      this.setState({nombre:response.data.items.nombre})
      this.setState({imgNombre:response.data.items.imgNombre})
      this.setState({idImg:response.data.items.idImg})
      this.setState({idImgAnt:response.data.items.idImg})
      if(response.data.items.idImg!=""){
        ServiceAxios.getId("imagen",response.data.items.idImg).then(response2 => {
          this.setState({usoImgAnt:response2.data.items.uso})
        },error => {console.log(error.response.data.message);});
      }
    },error => {console.log(error.response.data.message);});
  }
  cargarImgs() {
    ServiceAxios.get("imagen").then(response => {
      this.setState({imagenes:response.data.items})
      this.setState({showModal: true });},
    error => {alert(error.response.data.message);});
  }
  onChangeValue(event) {
    this.setState({ estado: event.target.value});
  }
  handleOpenModal () {
    this.cargarImgs();
  }
  handleCloseModal (imgNombre, idImg,uso) {
    this.setState({ showModal: false, imgNombre:imgNombre,idImg:idImg,usoImg:uso});
  }
  CloseModalCancelar () {
    this.setState({ showModal: false});
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
     if (this.state.audioNombre === "" || this.state.nombre === "" || this.state.idImg === "") {
      alert("Debe seleccionar la imagen, el audio y agregar el nombre");
     }else {
        if(Object.entries(result).length === 0){
          this.setState({disabled: true});
          var audio;
          if(this.state.file!=null){
            ServiceAxios.upload('audio',this.state.file).then(response => {
              audio={
                imgNombre:this.state.imgNombre,
                audioNombre:response.data,
                idImg:this.state.idImg,
                nombre:this.state.nombre
              }
              this.guardarAudio(audio);
            },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
          }else{
            audio={
              imgNombre:this.state.imgNombre,
              idImg:this.state.idImg,
              nombre:this.state.nombre
            }
            this.guardarAudio(audio);
          }
        }
      }
   }
   guardarAudio(audio) {
    ServiceAxios.put("audio",this.state.id,audio).then(() => {
      if(this.state.idImgAnt=="" || this.state.idImgAnt!=this.state.idImg){
        this.state.usoImg++;
        const imagen={
          uso:this.state.usoImg
        }
        ServiceAxios.put("imagen",this.state.idImg,imagen).then(() => {
        },(error) => {alert(error.response.data.message);});
      }
      if(this.state.idImgAnt!="" && this.state.idImgAnt!=this.state.idImg){
        this.state.usoImgAnt--;
        const imagen2={
          uso:this.state.usoImgAnt
        }
        ServiceAxios.put("imagen",this.state.idImgAnt,imagen2).then(() => {
        },(error) => {alert(error.response.data.message);});
      }
      alert("Guardado correctamente");
      this.setState({disabled: false});
      return this.props.history.push('/audio');
    },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
  }
   logOut= () => {
     return this.props.history.push('/audio');
   };
  subirArchivo=async evento=>{
    const file=evento.target.files[0]
    this.setState({
      file:file,
      audioNombre:URL.createObjectURL(file),
      linkAudio:URL.createObjectURL(file)
    })
  } 
  onTodoChange1(value){
    this.setState({
      nombre: value
    });
}
  render(){
    const {errors}=this.state
    return(
      <div>
        <Header />
        <div className="contenedor">
          <div className="formulario">
              <h3>Ingrese datos del audio</h3>
              <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
              <div>
                  <div ><input id="nombre" ref="nombre" name="nombre" type="text" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.nombre}/>
                  {errors.nombre && <P>{errors.nombre}</P>}</div>
              </div>
              </form>
                <button className='buttonCuarto' onClick={this.handleOpenModal}>Seleccionar Imagen</button>
                <ReactModal 
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example">
                  <div className="row">
                      <div className="wrapper">
                      {this.state.imagenes?.map((todo) => (
                      <div className='card'>
                          <img src={`${Constantes.servidor}/uploads/${todo.imgNombre}`} alt='product-img' className='card__img'></img>
                          <div className="card__body">
                          <button className="card__btn" onClick={this.handleCloseModal.bind(this,todo.imgNombre,todo._id,todo.uso)}>Seleccionar</button>
                          </div>
                      </div>
                      ))}
                      </div>
                  </div>
                  <button className="button-3"  onClick={this.CloseModalCancelar.bind()}>Cancelar</button>
                </ReactModal>
                <p></p>
                <p></p>
                <img className='card__img' src={`${Constantes.servidor}/uploads/${this.state.imgNombre}`}/>
                <h4>Archivo de Audio</h4>
                <input type='file' onChange={this.subirArchivo.bind(this)} value={this.state.btn.value} accept="audio/*"/>
                  <ReactAudioPlayer
                  src={this.state.linkAudio}
                  controls
                /> 
                <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                  <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
                </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditAudio);
