import React, {Component,useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    img1:'',
    nombre:'',
    texto:'',
    nombreImagen:'',
    idImg:'',
    idImgAnt:'',
    usoImg:0,
    usoImgAnt:0,
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
  if(!values.texto){
    errors.texto='Este campo es obligatorio'
  }
  return errors
}
class EditFunciones extends Component{
  constructor(props){
    super(props);
    this.state=initialState;
    this.state.id=this.props.match.params.id;
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  componentWillMount() {
    ServiceAxios.getId("funcion",this.state.id).then(response => {
      this.setState({texto:response.data.items.texto})
      this.setState({nombre:response.data.items.nombre})
    },error => {console.log(error.response.data.message);});
  }
  onChangeValue(event) {
    this.setState({ estado: event.target.value});
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
     if (this.state.texto=== "") {
      alert("Debe ingresar el texto");
     }else{
        if(Object.entries(result).length === 0){
          const funciones={
            texto:this.state.texto
          }
          ServiceAxios.put("funcion",this.state.id,funciones).then(() => {
            alert("Guardado correctamente");
            return this.props.history.push('/funcion');
          },(error) => {alert(error.response.data.message);});
        }
      }
   }
   logOut= () => {
     return this.props.history.push('/funcion');
   };
  onTodoChange1(value){
    this.setState({
      texto: value
    });
}
  render(){
    const {errors}=this.state
    return(
      <div>
       <Header />
        <div className="contenedor">
          <div className="formulario">
            <h3>{this.state.nombre}</h3>
            <div><textarea rows="20" cols="100" id="texto" ref="texto" name="texto" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.texto}/>
            <br></br>
            <p></p>
            <a href="http://digitalnativestudios.com/textmeshpro/docs/rich-text/" target="_blank"><button className="button-1">TextMeshPro Texto Enriquecido</button></a>
            {errors.texto && <P>{errors.texto}</P>}</div>
            <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
              <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk'>Guardar</button></div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditFunciones);

