import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactModal from 'react-modal';
import P from './components/P';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    img1:'',
    idImg:'',
    imgNombre:'',
    idImgAnt:'',
    usoImg:0,
    usoImgAnt:0,
    cargo:'',
    nombre:'',
    correo:'',
    link:'',
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
  if(!values.correo){
    errors.correo='Este campo es obligatorio'
  }
  if(!values.cargo){
    errors.cargo='Este campo es obligatorio'
  }
  return errors
}
class EditPersonal extends Component{
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
    ServiceAxios.getId("personal",this.state.id).then(response => {
      this.setState({cargo:response.data.items.cargo})
      this.setState({nombre:response.data.items.nombre})
      this.setState({correo:response.data.items.correo})
      this.setState({idImg:response.data.items.idImg})
      this.setState({idImgAnt:response.data.items.idImg})
      this.setState({imgNombre:response.data.items.imgNombre})
      if(response.data.items.idImg!=""){
        ServiceAxios.getId("imagen",response.data.items.idImg).then(response2 => {
          this.setState({usoImgAnt:response2.data.items.uso})
        },error => {console.log(error.response.data.message);});
      }
    },error => {console.log(error.response.data.message);});
  }
  cargarImagenes() {
    ServiceAxios.get("imagen").then(response => {
      this.setState({imagenes:response.data.items})
      this.setState({showModal: true });
    },error => {alert(error.response.data.message);});
  }
  onChangeValue(event) {
    console.log(event.target.value);
    this.setState({ estado: event.target.value});
  }
  handleOpenModal () {
    this.cargarImagenes();
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
     if (this.state.idImg === "") {
      alert("Debe seleccionar la imagen");
     }else{
      if(Object.entries(result).length === 0){
        this.setState({disabled: true});
        const personal={
          nombre:this.state.nombre,
          correo:this.state.correo,
          idImg:this.state.idImg,
          imgNombre:this.state.imgNombre,
          cargo:this.state.cargo
        }
        ServiceAxios.put("personal",this.state.id,personal).then(() => {
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
          return this.props.history.push('/personal');
        },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
      }
     }   
   }
   logOut= () => {
     return this.props.history.push('/personal');
   };
  onTodoChange1(value){
    this.setState({
      nombre: value
    });
}
onTodoChange2(value){
  this.setState({
    correo: value
  });
}
onTodoChange3(value){
  this.setState({
    cargo: value
  });
}
onTodoChange4(value){
  this.setState({
    horarioPM: value
  });
}
  render(){
    const nImgs=new Object(this.state.imagenes);
    const rowsImgs=Object.values(nImgs);
    const todosImg=rowsImgs.map((todo,i)=>{
      return(
        <div className="col-md-3" key={i}>
          <div className="card mt-4">
            <div className="card-title text-center">
              <h3>{todo.nombre}</h3>
            </div>
            <div className="card-body">
              <div>
              <img className="img-thumbnail" alt="" height='250' width='250' src={`${Constantes.servidor}/uploads/${todo.imgNombre}`}/>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-info" onClick={this.handleCloseModal.bind(this,todo.imgNombre,todo._id,todo.uso)}>Seleccionar</button>
            </div>
          </div>
        </div>
      )
    });
    const {errors}=this.state
    return(
      <div>
        <Header/>
        <div className="contenedor">
          <div className="formulario">
            <h3>Datos:</h3>
              <form onSubmit= {this.handleSubmit} id="contact-form" name="contact-form">
                <div><input id="nombre" ref="nombre" name="nombre" type="text" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.nombre}/>
                {errors.nombre && <P>{errors.nombre}</P>}</div>
                <div><input id="correo" ref="correo" name="correo" type="email" onChange={e => this.onTodoChange2(e.target.value)} value={this.state.correo}/>
                {errors.correo && <P>{errors.correo}</P>}</div>
                <div><input id="cargo" ref="cargo" name="cargo" type="text" onChange={e => this.onTodoChange3(e.target.value)} value={this.state.cargo}/>
                {errors.horarioAM && <P>{errors.horarioAM}</P>}</div>
              </form>
                <p></p>
                <p></p>
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
                      <p></p>
                      <p></p>
                    <button className="button-3" onClick={this.CloseModalCancelar.bind()}>Cancelar</button>
                  </ReactModal>
                  <p></p>
                  <p></p>
                  <img alt="" className='card__img' src={`${Constantes.servidor}/uploads/${this.state.imgNombre}`}/>
              <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
              </form>
            </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditPersonal);