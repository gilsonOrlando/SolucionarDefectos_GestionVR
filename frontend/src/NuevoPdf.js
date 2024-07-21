import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    pdf:{nombre:'',link:''},
    id:'',
    link:'',
    pdfNombre:'',
    nombre:'',
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
class NuevoPdf extends Component{
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
      alert("Debe subir el archivo pdf e ingresar el nombre");
     }else{
         if(Object.entries(result).length === 0){
          this.setState({disabled: true});
          ServiceAxios.upload('pdf',this.state.file).then(response => {
            const pdf={
              uso:0,
              nombre:this.state.nombre,
              pdfNombre:response.data,
            }
            ServiceAxios.post("pdfs",pdf).then(() => {
              alert("Guardado correctamente");
              this.setState({disabled: false});
              return this.props.history.push('/pdfs');
            },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
          },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
         }
      }
   }
   logOut= () => {
     return this.props.history.push('/pdfs');
   };
  subirArchivo=async evento=>{
    const file=evento.target.files[0]
    this.setState({
      file:file,
      link:URL.createObjectURL(file)
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
            <h3>Ingrese datos del Documento</h3>
            <h4>Archivo Pdf</h4>
            <input type='file' onChange={this.subirArchivo.bind(this)} value={this.state.btn.value} accept="application/pdf"/>
            <div>
            <a href={this.state.link} target="_blank"><button className='buttonCuarto'>Visualizar PDF</button></a>
            </div>
            <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
              <div><input id="nombre" ref="nombre" name="nombre" type="text" placeholder="Nombre del documento" onChange={this.handleChange}/>
              {errors.nombre && <P>{errors.nombre}</P>}</div>
              <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (NuevoPdf);
