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
    idPdf:'',
    idPdfAnt:'',
    idImg:'',
    idImgAnt:'',
    horarioAM:'',
    horarioPM:'',
    usoImg:0,
    usoImgAnt:0,
    usoPdf:0,
    usoPdfAnt:0,
    picture1:noImage,
    img1:'',
    nombre:'',
    correo:'',
    imgNombre:'',
    pdfNombre:'',
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
  if(!values.horarioAM){
    errors.horarioAM='Este campo es obligatorio'
  }
  if(!values.horarioPM){
    errors.horarioPM='Este campo es obligatorio'
  }
  return errors
}
class EditDirectivo extends Component{
  constructor(props){
    super(props);
    this.state=initialState;
    this.state.id=this.props.match.params.id;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal2 = this.handleOpenModal2.bind(this);
    this.handleCloseModal2 = this.handleCloseModal2.bind(this);
    this.CloseModalCancelar = this.CloseModalCancelar.bind(this);
    this.CloseModalCancelar2 = this.CloseModalCancelar2.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
 componentWillMount() {
  ServiceAxios.getId("directivo",this.state.id).then(response => {
      this.setState({cargo:response.data.items.cargo})
      this.setState({nombre:response.data.items.nombre})
      this.setState({correo:response.data.items.correo})
      this.setState({idImg:response.data.items.idImg})
      this.setState({idImgAnt:response.data.items.idImg})
      this.setState({idPdf:response.data.items.idPdf})
      this.setState({idPdfAnt:response.data.items.idPdf})
      this.setState({horarioAM:response.data.items.horarioAM})
      this.setState({horarioPM:response.data.items.horarioPM})
      if(response.data.items.idImg!="" && response.data.items.idImg!=undefined){
        this.setState({imgNombre:response.data.items.imgNombre})
        ServiceAxios.getId("imagen",response.data.items.idImg).then(response2 => {
          this.setState({usoImgAnt:response2.data.items.uso})
        },
        error2 => {
          console.log(error2.responde.data)
        });
      }
      if(response.data.items.idPdf!="" && response.data.items.idImg!=undefined){
        this.setState({pdfNombre:response.data.items.pdfNombre})
        ServiceAxios.getId("pdfs",response.data.items.idPdf).then(response3 => {
          this.setState({usoPdfAnt:response3.data.items.uso})
        },
        error3 => {
          console.log(error3.responde.data)
        });
      }
    },
    error => {console.log(error.response.data.message);});
  }
 cargarPdfs() {
    ServiceAxios.get("pdfs").then(response => {
        this.setState({pdfs: response.data.items});
        this.setState({showModal: true });},
      error => {alert(error.response.data.message);});
  }
 cargarImgs() {
    ServiceAxios.get("imagen").then(response => {
      this.setState({imagenes:response.data.items})
      this.setState({showModal2: true });},
    error => {alert(error.response.data.message);});
  }
  onChangeValue(event) {
    console.log(event.target.value);
    this.setState({ estado: event.target.value});
  }
  handleOpenModal () {
    this.cargarPdfs();
  }
  handleCloseModal (pdfNombre, idPdf,uso) {
    this.setState({ showModal: false, pdfNombre:pdfNombre,idPdf:idPdf,usoPdf:uso});
  }
  CloseModalCancelar () {
    this.setState({ showModal: false});
  }
  handleOpenModal2 () {
    this.cargarImgs();
  }
  CloseModalCancelar2 () {
    this.setState({ showModal2: false});
  }
  handleCloseModal2 (imgNombre, idImg,uso) {
    this.setState({ showModal2: false, imgNombre:imgNombre,idImg:idImg,usoImg:uso});
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
        const directivo={
          nombre:this.state.nombre,
          correo:this.state.correo,
          idPdf:this.state.idPdf,
          pdfNombre:this.state.pdfNombre,
          idImg:this.state.idImg,
          imgNombre:this.state.imgNombre,
          horarioAM:this.state.horarioAM,
          horarioPM:this.state.horarioPM
        }
        ServiceAxios.put("directivo",this.state.id,directivo).then(() => {
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
          if(this.state.idPdfAnt=="" || this.state.idPdfAnt!=this.state.idPdf){
            this.state.usoPdf++;
            const pdf={
              uso:this.state.usoPdf
            }
            ServiceAxios.put("pdfs",this.state.idPdf,pdf).then(() => {
            },(error) => {alert(error.response.data.message);});
          }
          if(this.state.idPdfAnt!="" && this.state.idPdfAnt!=this.state.idPdf){
            this.state.usoPdfAnt--;
            const pdf={
              uso:this.state.usoPdfAnt
            }
            ServiceAxios.put("pdfs",this.state.idPdfAnt,pdf).then(() => {
            },(error) => {alert(error.response.data.message);});
          }
          alert("Guardado correctamente");
          this.setState({disabled: false});
          return this.props.history.push('/directivo');
        },(error) => {console.log(error.response.data.message);this.setState({disabled: false});});
     }   
   }
  }
   logOut= () => {
     return this.props.history.push('/directivo');
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
    horarioAM: value
  });
}
onTodoChange4(value){
  this.setState({
    horarioPM: value
  });
}
  render(){
    const {errors}=this.state
    return(
      <div>
        <Header/>
        <div className="contenedor">
          <div className="formulario">
              <h3>{this.state.cargo}</h3>
                <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                  <div>
                      <div><input id="nombre" ref="nombre" name="nombre" type="text" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.nombre}/>
                      {errors.nombre && <P>{errors.nombre}</P>}</div>
                      <div><input id="correo" ref="correo" name="correo" type="email" onChange={e => this.onTodoChange2(e.target.value)} value={this.state.correo}/>
                      {errors.correo && <P>{errors.correo}</P>}</div>
                      <div><h3>Horario:</h3></div>
                      <div><input id="horarioAM" ref="horarioAM" name="horarioAM" type="text" onChange={e => this.onTodoChange3(e.target.value)} value={this.state.horarioAM}/>
                      {errors.horarioAM && <P>{errors.horarioAM}</P>}</div>
                      <div><input id="horarioPM" ref="horarioPM" name="horarioPM" type="text" onChange={e => this.onTodoChange4(e.target.value)} value={this.state.horarioPM}/>
                      {errors.horarioPM && <P>{errors.horarioPM}</P>}</div>
                  </div>
                </form>
                  <p></p>
                  <p></p>
                  <h4>Pdf</h4>
                  <button className='buttonCuarto' onClick={this.handleOpenModal}>Seleccionar Pdf</button>
                  <a href={`${Constantes.servidor}/uploads/${this.state.pdfNombre}`} target="_blank"><button className='buttonTercero'>Visualizar PDF</button></a>
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
                          <button className="card__btn" onClick={this.handleCloseModal.bind(this,todo.pdfNombre,todo._id,todo.uso)}>Seleccionar</button>
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
                  
                  <p></p>
                  <p></p>
                  <h4>Imagen</h4>
                  <button className='buttonCuarto' onClick={this.handleOpenModal2}>Seleccionar Imagen</button>
                  <ReactModal 
                    isOpen={this.state.showModal2}
                    contentLabel="Minimal Modal Example">
                    <div className="row">
                      <div className="wrapper">
                      {this.state.imagenes?.map((todo) => (
                      <div className='card'>
                          <img src={`${Constantes.servidor}/uploads/${todo.imgNombre}`} alt='product-img' className='card__img'></img>
                          <div className="card__body">
                          <button className="card__btn" onClick={this.handleCloseModal2.bind(this,todo.imgNombre,todo._id,todo.uso)}>Seleccionar</button>
                          </div>
                      </div>
                      ))}
                      </div>
                      </div>
                      <p></p>
                      <p></p>
                      <button className="button-3" onClick={this.CloseModalCancelar2.bind()}>Cancelar</button>
                  </ReactModal>
                  <p></p>
                  <p></p>
                  <img src={`${Constantes.servidor}/uploads/${this.state.imgNombre}`} className="img-thumbnail" alt="" height='250' width='250'/>
                <form onSubmit= {this.manejarEnvioFormulario} id="contact-form" name="contact-form">
                      <div><button className='buttonSecundario' onClick={this.logOut}>Cancelar</button><button className='buttonOk' disabled={this.state.disabled}>Guardar</button></div>
                      <div></div>
                </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter (EditDirectivo);