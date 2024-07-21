import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    email:'',
    password:'',
    confirmPassword:'',
    imgNombre:'',
    pdfNombre:'',
    tipo:'usuario',
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
  if(!values.email){
    errors.email='Este campo es obligatorio'
  }
  if(!values.password){
    errors.password='Este campo es obligatorio'
  }
  if(!values.confirmPassword){
    errors.confirmPassword='Este campo es obligatorio'
  }
  return errors
}
class NuevoUsuario extends Component{
  constructor(props){
    super(props);
    this.state=initialState;
  }
  validatePassword = () => {
    let isValid = true
    if (this.state.password !== this.state.confirmPassword) {
      isValid = false
      console.log('error en clave');
    }
    return isValid
  };
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
     if (this.validatePassword()) {
      if(Object.entries(result).length === 0){
        this.setState({disabled: true});
        const usuario={
          nombre:this.state.nombre,
          email:this.state.email,
          password:this.state.password,
          tipo:this.state.tipo
        }
        ServiceAxios.post("user/register",usuario).then(() => {
          alert("Guardado correctamente");
          this.setState({disabled: false});
          return this.props.history.push('/usuario'); 
        },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
      }
     }   
   }
  logOut= () => {
    return this.props.history.push('/usuario');
  };
  render(){
    const {errors}=this.state
    return(
      <div>
        <Header/>
        <div className="contenedor">
          <div className="formulario">
            <h3>Ingrese datos del usuario</h3>
              <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                  <div><input id="nombre" ref="nombre" name="nombre" type="text" onChange={this.handleChange} placeholder="Nombre y Apellido"/>
                  {errors.nombre && <P>{errors.nombre}</P>}</div>
                  <div><input id="email" ref="email" name="email" type="email" onChange={this.handleChange} placeholder="Email"/>
                  {errors.email && <P>{errors.email}</P>}</div>
                  <div><input id="password" ref="password" name="password" type="password" onChange={this.handleChange} placeholder="Password"/>
                  {errors.password && <P>{errors.password}</P>}</div>
                  <div><input id="confirmPassword" ref="confirmPassword" name="confirmPassword" type="password" onChange={this.handleChange} placeholder="Confirmar Password"/>
                  {errors.confirmPassword && <P>{errors.confirmPassword}</P>}</div>
                  <div>
                  <div >
                    <select id="tipo" name="tipo" onChange={this.handleChange}>
                        <option value="usuario">Usuario</option>
                        <option value="admin">Admin</option>
                    </select>
                    </div>
                  </div>
                  <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
              </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (NuevoUsuario);
