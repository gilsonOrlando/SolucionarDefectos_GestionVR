import React, {Component} from 'react';
import ReactModal from 'react-modal';
import ReactPlayer from 'react-player'
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    idVid:'',
    idVidAnt:'',
    vidNombre:'',
    link:'',
    estado:'',
    descripcion:'',
    uso:0,
    usoAnt:0,
    nombreVideo:'',
    showModal: false,
    video:[],
    uploadValue1:0,
    date: new Date(),
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
  if(!values.descripcion){
    errors.descripcion='Este campo es obligatorio'
  }
  return errors
}
class EditTelevisor extends Component{
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
    ServiceAxios.getId("televisor",this.state.id).then(response => {
      this.setState({estado:response.data.items.estado})
      this.setState({descripcion:response.data.items.descripcion})
      this.setState({vidNombre:response.data.items.vidNombre})
      this.setState({idVid:response.data.items.idVid})
      this.setState({idVidAnt:response.data.items.idVid})
      this.setState({nombreVideo:response.data.items.nombreVideo})
      if(response.data.items.idVid!=""){
        ServiceAxios.getId("video",response.data.items.idVid).then(response2 => {
          this.setState({usoAnt:response2.data.items.uso})
        },error => {console.log(error.response.data.message);});
      }
    },error => {console.log(error.response.data.message);});
  }
  cargarVideo() {
    ServiceAxios.get("video").then(response => {
        this.setState({video: response.data.items});
        this.setState({showModal: true });},
      error => {alert(error.response.data.message);});
  }
  onChangeValue(event) {
    this.setState({ estado: event.target.value});
  }
  handleOpenModal () {
    this.cargarVideo();
  }
  handleCloseModal (vidNombre,nombreVideo,idVid,uso) {
    this.setState({ showModal: false, vidNombre:vidNombre,nombreVideo:nombreVideo,idVid:idVid,uso:uso});
  }
  CloseModalCancelar () {
    this.setState({ showModal: false});
  }
  reset() {
    const keys = Object.keys(this.state)
    const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {})
    this.setState({ ...stateReset, ...initialState })
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
     if (this.state.vidNombre === "") {
      alert("Debe seleccionar el video");
     }else{
      if(Object.entries(result).length === 0){
        this.setState({disabled: true});
        const televisor={
          idVid:this.state.idVid,
          descripcion:this.state.descripcion,
          vidNombre:this.state.vidNombre,
          nombreVideo:this.state.nombreVideo
        }
        ServiceAxios.put("televisor",this.state.id,televisor).then(() => {
          if(this.state.idVidAnt=="" || this.state.idVidAnt!=this.state.idVid){
            this.state.uso++;
              const video={
                uso:this.state.uso
              }
            ServiceAxios.put("video",this.state.idVid,video).then(() => {
            },(error) => {alert(error.response.data.message);});
          }
          if(this.state.idVidAnt!="" && this.state.idVidAnt!=this.state.idVid){
            this.state.usoAnt--;
              const video2={
                uso:this.state.usoAnt
              }
            ServiceAxios.put("video",this.state.idVidAnt,video2).then(() => {
            },(error) => {alert(error.response.data.message);});
          }
          alert("Guardado correctamente");
          this.setState({disabled: false});
          return this.props.history.push('/televisor');
        },(error) => {console.log(error.response.data.message);this.setState({disabled: false});});
      }
     }   
   }
   logOut= () => {
     return this.props.history.push('/televisor');
   };
  onTodoChange1(value){
    this.setState({
      descripcion: value
    });
}
  render(){
    const {errors}=this.state
    return(
      <div>
        <Header />
        <div className="contenedor">
          <div className="formulario">
            <h3>Ingrese la descripción del TV</h3>
            <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                <div><input id="descripcion" ref="descripcion" name="descripcion" type="text" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.descripcion}/>
                {errors.descripcion && <P>{errors.descripcion}</P>}</div>
            </form>
              <button className='buttonCuarto' onClick={this.handleOpenModal}>Seleccionar Video</button>
              <ReactModal 
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example">
                <div className="row">
                  <div className="wrapper">
                  {this.state.video?.map((todo) => (
                  <div className='card'>
                      <ReactPlayer
                        url={`${Constantes.servidor}/uploads/${todo.vidNombre}`}
                        className='react-player'
                        playing
                        muted
                        width='100%'
                        height='100%'
                      />
                      <div className="card__body">
                      <h2 className="card__title">{todo.nombre}</h2>
                      <button className="card__btn" onClick={this.handleCloseModal.bind(this,todo.vidNombre,todo.nombre,todo._id,todo.uso)}>Seleccionar</button>
                      </div>
                  </div>
                  ))}
                  </div>
                </div>
                <p></p>
                <p></p>
                <button className="button-3" onClick={this.CloseModalCancelar.bind()}>Cancelar</button>
              </ReactModal>
              <div>
                <ReactPlayer
                  url={`${Constantes.servidor}/uploads/${this.state.vidNombre}`}
                  className='react-player'
                  playing
                  muted
                  width='100%'
                  height='100%'
                />
                <p>{this.state.nombreVideo}</p>
              </div>
              <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
              </form>
            </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditTelevisor);
