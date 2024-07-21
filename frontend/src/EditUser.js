import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    nombre:'',
    email:'',
    password:'',
    tipo:'',
    uploadValue1:0,
    date: new Date(),
    descripcion:[],
    errors:{},
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
  return errors
}
class EditUser extends Component{
  constructor(props){
    super(props);
    this.state=initialState;
    this.state.id=this.props.match.params.id;
  }
  verifyRoute = () => {
    if (!localStorage.getItem('token')) {
        return this.props.history.push('/login');
    }
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
  componentWillMount() {
    ServiceAxios.getId("user",this.state.id).then(response => {
        this.setState({email:response.data.items.email})
        this.setState({nombre:response.data.items.nombre})
        this.setState({tipo:response.data.items.tipo})
      },error => {console.log(error.response.data.message);});
  }
  manejarEnvioFormulario=async evento=>{
    evento.preventDefault();
    const {errors,...sinErrors}=this.state
    const result=validate(sinErrors)
     this.setState({errors:result});
     if (this.state.nombre === "" || this.state.correo === "" || this.state.password === "") {
      alert("Debe ingresar todos los campos requeridos");
     }else{
         if(Object.entries(result).length === 0){
          const usuario={
            email:this.state.email,
            nombre:this.state.nombre,
            password:this.state.password
          }
          ServiceAxios.put("user",this.state.id,usuario).then(() => {
            alert("Guardado correctamente");
            return this.props.history.push('/user');
          },(error) => {alert(error.response.data.message);});
         }
      }
   }
   logOut= () => {
     return this.props.history.push('/user');
   };
  onTodoChange1(value){
    this.setState({
      nombre: value
    });
}
onTodoChange2(value){
  this.setState({
    email: value
  });
}
onTodoChange3(value){
  this.setState({
    password: value
  });
}
onTodoChange4(value){
  this.setState({
    tipo: value
  });
}
  render(){
    const {errors}=this.state
    return(
      <div>
        <Header/>
        <div className="contenedor">
          <div className="formulario">
            <h3>Ingrese datos del usuario</h3>
            <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
              <div><input id="nombre" ref="nombre" name="nombre" type="text" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.nombre}/>
              {errors.nombre && <P>{errors.nombre}</P>}</div>
              <div><input id="email" ref="email" name="email" type="email" onChange={e => this.onTodoChange2(e.target.value)} value={this.state.email}/>
              {errors.email && <P>{errors.email}</P>}</div>
              <div><input id="password" ref="password" name="password" type="password" onChange={this.handleChange} placeholder="Password"/>
              {errors.password && <P>{errors.password}</P>}</div>
              <div><button className='buttonSecundario'onClick={this.logOut}>CANCELAR</button><button className='buttonOk'>Guardar</button></div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditUser);