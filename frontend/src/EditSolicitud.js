import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    id:'',
    idWord:'',
    idWordAnt:'',
    uso:0,
    usoAnt:0,
    link:'',
    wordNombre:'',
    uploadValue1:0,
    date: new Date(),
    descripcion:'',
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
class EditSolicitud extends Component{
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
    ServiceAxios.getId("solicitud",this.state.id).then(response => {
      this.setState({descripcion:response.data.items.descripcion})
      this.setState({wordNombre:response.data.items.wordNombre})
      this.setState({idWord:response.data.items.idWord})
      this.setState({idWordAnt:response.data.items.idWord})
      if(response.data.items.idWord!=""){
        ServiceAxios.getId("words",response.data.items.idWord).then(response2 => {
          this.setState({usoAnt:response2.data.items.uso})
        },error => {console.log(error.response.data.message);});
      }
    },error => {console.log(error.response.data.message);});
  }
  cargarWords() {
    ServiceAxios.get("words").then(response => {
      this.setState({words:response.data.items})
      this.setState({showModal: true });
    },error => {alert(error.response.data.message);});
  }
  onChangeValue(event) {
    console.log(event.target.value);
    this.setState({ estado: event.target.value});
  }
  handleOpenModal () {
    this.cargarWords();
  }
  CloseModalCancelar () {
    this.setState({ showModal: false});
  }
  handleCloseModal (wordNombre, idWord,uso) {
    this.setState({ showModal: false, wordNombre:wordNombre,idWord:idWord,uso:uso});
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
    if (this.state.idWord === "") {
    alert("Debe seleccionar el archivo de word");
    }else{
    if(Object.entries(result).length === 0){
      this.setState({disabled: true});
      const solicitud={
        idWord:this.state.idWord,
        descripcion:this.state.descripcion,
        wordNombre:this.state.wordNombre
      }
      ServiceAxios.put("solicitud",this.state.id,solicitud).then(() => {
        if(this.state.idWordAnt=="" || this.state.idWordAnt!=this.state.idWord){
          this.state.uso++;
            const word={
              uso:this.state.uso
            }
          ServiceAxios.put("words",this.state.idWord,word).then(() => {
          },(error) => {alert(error.response.data.message);});
        }
        if(this.state.idWordAnt!="" && this.state.idWordAnt!=this.state.idWord){
          this.state.usoAnt--;
            const word={
              uso:this.state.usoAnt
            }
          ServiceAxios.put("words",this.state.idWordAnt,word).then(() => {
          },(error) => {alert(error.response.data.message);});
        }
        alert("Guardado correctamente");
        this.setState({disabled: false});
        return this.props.history.push('/solicitud');
      },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
    }
     }   
   }
   logOut= () => {
     return this.props.history.push('/solicitud');
   };
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
            <h3>{this.state.descripcion}</h3>
            <p></p>
            <p></p>
            <h4>Ingresar Datos</h4>
              <button className='buttonCuarto' onClick={this.handleOpenModal}>Seleccionar Archivo Word</button>
              <ReactModal 
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example">
                <div>
                  <div className="row">
                    <div className="wrapper">
                    {this.state.words?.map((todo) => (
                      <div className='card'>
                          <div className="card__body">
                          <h3>{todo.nombre}</h3>
                          <a href={`${Constantes.servidor}/uploads/${todo.wordNombre}`} target="_blank"><button className='button-1'>Visualizar DOC</button></a>
                          <button className="card__btn" onClick={this.handleCloseModal.bind(this,todo.wordNombre,todo._id,todo.uso)}>Seleccionar</button>
                          </div>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p></p>
                <p></p>
                <button className="button-3" onClick={this.CloseModalCancelar.bind()}>Cancelar</button>
              </ReactModal>
              <p></p>
              <p></p>
              <a href={this.state.wordNombre} target="_blank"><button className='buttonTercero'>Visualizar DOC</button></a>
              <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
              </form>
        </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditSolicitud);

