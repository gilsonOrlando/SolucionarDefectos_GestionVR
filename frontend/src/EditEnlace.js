import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    nombre:'',
    link:'',
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
  if(!values.link){
    errors.link='Este campo es obligatorio'
  }
  return errors
}
class EditLinks extends Component{
  constructor(props){
    super(props);
    this.state=initialState;
    this.state.id=this.props.match.params.id;
  }
  handleChange=({target})=>{
      const {name,value}=target
      this.setState({[name]:value})
   }
   componentWillMount() {
    ServiceAxios.getId("links",this.state.id).then(response => {
      this.setState({link:response.data.items.link})
      this.setState({nombre:response.data.items.nombre})
    },error => {console.log(error.response.data.message);});
  }
  manejarEnvioFormulario=async evento=>{
    evento.preventDefault();
    const {errors,...sinErrors}=this.state
    const result=validate(sinErrors)
     this.setState({errors:result});
     if (this.state.nombre === "" || this.state.link === "") {
      alert("Debe ingresar el nombre y el link");
     }else{
         if(Object.entries(result).length === 0){
          const link={
            link:this.state.link,
            nombre:this.state.nombre
          }
          ServiceAxios.put("links",this.state.id,link).then(() => {
            alert("Guardado correctamente");
            return this.props.history.push('/enlace');
          },(error) => {alert(error.response.data.message);});
         }
      }
   }
   logOut= () => {
     return this.props.history.push('/enlace');
   };
  onTodoChange1(value){
    this.setState({
      nombre: value
    });
}
onTodoChange2(value){
  this.setState({
    link: value
  });
}
  render(){
    const {errors}=this.state
    return(
      <div>
        <Header/>
        <div className="contenedor">
          <div className="formulario">
              <h3>Ingrese datos de los enlaces</h3>
              <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                <div><input id="nombre" ref="nombre" name="nombre" type="text" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.nombre}/>
                {errors.nombre && <P>{errors.nombre}</P>}</div>
                <div><input id="link" ref="link" name="link" type="text" onChange={e => this.onTodoChange2(e.target.value)} value={this.state.link}/>
                {errors.link && <P>{errors.link}</P>}</div>
                <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk'>Guardar</button></div>
              </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditLinks);

