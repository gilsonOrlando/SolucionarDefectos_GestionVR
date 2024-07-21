import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactModal from 'react-modal';
import P from './components/P';
import Header from './components/Header';
import noImage from './noImage.png';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    picture1:noImage,
    img1:'',
    descripcion:'',
    imgNombre:'',
    idImg:'',
    idImgAnt:'',
    usoImg:0,
    usoImgAnt:0,
    link:'',
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
class EditPatio extends Component{
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
    ServiceAxios.getId("patio",this.state.id).then(response => {
      this.setState({descripcion:response.data.items.descripcion})
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
  cargarImagenes() {
    ServiceAxios.get("imagen").then(response => {
        this.setState({imagen: response.data.items});
        this.setState({showModal: true });},
      error => {alert(error.response.data.message);});
  }
  onChangeValue(event) {
    this.setState({ estado: event.target.value});
  }
  handleOpenModal () {
    this.cargarImagenes();
  }
  handleCloseModal (imgNombre,idImg,uso) {
    this.setState({ showModal: false,link:imgNombre,imgNombre:imgNombre,idImg:idImg,uso:uso});
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
     if (this.state.idImg === "") {
      alert("Debe seleccionar la imagen");
     }else{
      if(Object.entries(result).length === 0){
        this.setState({disabled: true});
        const patio={
          idImg:this.state.idImg,
          descripcion:this.state.descripcion,
          imgNombre:this.state.imgNombre
        }
        ServiceAxios.put("patio",this.state.id,patio).then(() => {
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
          return this.props.history.push('/patio');
        },(error) => {console.log(error.response.data.message);this.setState({disabled: false});});
      }
     }   
   }
   logOut= () => {
     return this.props.history.push('/patio');
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
            <h3>Ingrese Datos</h3>
            <form onSubmit= {this.handleSubmit} id="contact-form" name="contact-form">
              <div><input id="descripcion" ref="descripcion" name="descripcion" type="text" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.descripcion}/>
              {errors.descripcion && <P>{errors.descripcion}</P>}</div>
            </form>
            <button className='buttonCuarto' onClick={this.handleOpenModal}>Seleccionar Imagén</button>
              <ReactModal 
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example">
                <div className="row">
                  <div className="wrapper">
                    {this.state.imagen?.map((todo) => (
                    <div className='card'>
                        <img src={`${Constantes.servidor}/uploads/${todo.imgNombre}`} alt='product-img' className='card__img'></img>
                        <div className="card__body">
                        <button className="card__btn" onClick={this.handleCloseModal.bind(this,todo.imgNombre,todo._id,todo.uso)}>Seleccionar</button>
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
              <img alt="" className='card__img' src={`${Constantes.servidor}/uploads/${this.state.imgNombre}`}/>
              <p>{this.state.imgNombre}</p>
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
export default withRouter (EditPatio);
