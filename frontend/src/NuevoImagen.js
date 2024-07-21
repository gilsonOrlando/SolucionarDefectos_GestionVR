import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import noImage from './noImage.png';
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    picture1:noImage,
    img1:noImage,
    nombre:'',
    image:'',
    nombreImagen:'',
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
  if(!values.descripcion){
    errors.nombre='Este campo es obligatorio'
  }
  return errors
}
class NuevoImagen extends Component{
  constructor(props){
    super(props);
    this.state=initialState;
    this.state.id=this.props.match.params.id;
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
      alert("Debe seleccionar la imagen y agregar el nombre");
     }else{
        if(Object.entries(result).length === 0){
          this.setState({disabled: true});
          ServiceAxios.upload('image',this.state.file).then(response => {
            const imagen={
              uso:0,
              nombre:this.state.nombre,
              imgNombre:response.data,
            }
            ServiceAxios.post("imagen",imagen).then(() => {
              alert("Guardado correctamente");
              this.setState({disabled: false});
              return this.props.history.push('/imagen');
            },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
          },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
        }
      }
   }
   logOut= () => {
     return this.props.history.push('/imagen');
   };
  subirArchivo=async evento=>{
    const file=evento.target.files[0]
    this.setState({
      file:file,
      img1:URL.createObjectURL(file)
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
        <Header/>
        <div className="contenedor">
          <div className="formulario">
            <h3>Ingrese Datos de la imagén</h3>
            <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                <div><input id="nombre" ref="nombre" name="nombre" type="text" onChange={this.handleChange} placeholder="Nombre"/>
                {errors.nombre && <P>{errors.nombre}</P>}</div>
            </form>
            <h3>Seleccione la imagén</h3>
            <input type='file' onChange={this.subirArchivo} value={this.state.btn.value} accept="image/*"/>
            <img className='card__img' alt="" src={this.state.img1}/>
            <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
              <div><button className='buttonSecundario' type="button" onClick={this.logOut}>Cancelar</button><button className='buttonOk' type="submit"disabled={this.state.disabled}>Guardar</button></div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (NuevoImagen);
