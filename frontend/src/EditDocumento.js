import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {withRouter} from 'react-router-dom';
import P from './components/P';
import Header from './components/Header';
import Constantes from "./components/Constantes";
import ServiceAxios from "./components/ServiceAxios";
const initialState = {
    pdf:{nombre:'',link:''},
    id:'',
    idPdf:'',
    idPdfAnt:'',
    link:'',
    descripcion:'',
    uso:0,
    usoAnt:0,
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
class EditDocumento extends Component{
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
    ServiceAxios.getId("documento",this.state.id).then(response => {
      this.setState({descripcion:response.data.items.descripcion})
      this.setState({pdfNombre:response.data.items.pdfNombre})
      this.setState({idPdf:response.data.items.idPdf})
      this.setState({idPdfAnt:response.data.items.idPdf})
      if(response.data.items.idPdf!=""){
        ServiceAxios.getId("pdfs",response.data.items.idPdf).then(response2 => {
          this.setState({usoAnt:response2.data.items.uso})
        },error => {console.log(error.response.data.message);});
      }
    },error => {console.log(error.response.data.message);});
  }
  cargarPdfs() {
    ServiceAxios.get("pdfs").then(response => {
        this.setState({pdfs: response.data.items});
        this.setState({showModal: true });},
      error => {alert(error.response.data.message);});
  }
  onChangeValue(event) {
    console.log(event.target.value);
    this.setState({ estado: event.target.value});
  }
  handleOpenModal () {
    this.cargarPdfs();
  }
  handleCloseModal (pdfNombre,nombre, idPdf,uso) {
    this.setState({ showModal: false, pdfNombre:pdfNombre,descripcion:nombre,idPdf:idPdf,uso:uso});
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
     if (this.state.idPdf === "") {
      alert("Debe seleccionar el pdf");
     }else{
      if(Object.entries(result).length === 0){
        this.setState({disabled: true});
        const documento={
          idPdf:this.state.idPdf,
          pdfNombre:this.state.pdfNombre
        }
        ServiceAxios.put("documento",this.state.id,documento).then(() => {
          if(this.state.idPdfAnt=="" || this.state.idPdfAnt!=this.state.idPdf){
            this.state.uso++;
            const pdf={
              uso:this.state.uso
            }
            ServiceAxios.put("pdfs",this.state.idPdf,pdf).then(() => {
            },(error) => {alert(error.response.data.message);});
          }
          if(this.state.idPdfAnt!="" && this.state.idPdfAnt!=this.state.idPdf){
            this.state.usoAnt--;
            const pdf={
              uso:this.state.usoAnt
            }
            ServiceAxios.put("pdfs",this.state.idPdfAnt,pdf).then(() => {
            },(error) => {alert(error.response.data.message);});
          }
          alert("Guardado correctamente");
          this.setState({disabled: false});
          return this.props.history.push('/documento');
        },(error) => {alert(error.response.data.message);this.setState({disabled: false});});
      }
     }   
   }
   logOut= () => {
     return this.props.history.push('/documento');
   };
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
            <h4>Seleccionar Archivos Pdf</h4>
              <button className='buttonCuarto' onClick={this.handleOpenModal}>Seleccionar Archivo</button>
              <ReactModal 
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example">
                <div>
                  <div className="row">
                    <div className="wrapper">
                    {this.state.pdfs?.map((todo) => (
                      <div className='card'>
                          <div className="card__body">
                          <h3>{todo.nombre}</h3>
                          <a href={`${Constantes.servidor}/uploads/${todo.pdfNombre}`} target="_blank"><button className='button-1'>Visualizar PDF</button></a>
                          <button className="card__btn" onClick={this.handleCloseModal.bind(this,todo.pdfNombre,todo.nombre,todo._id,todo.uso)}>Seleccionar</button>
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
              <a href={`${Constantes.servidor}/uploads/${this.state.pdfNombre}`} target="_blank"><button className='buttonTercero'>Visualizar PDF</button></a>
              <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                  <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
              </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditDocumento);
