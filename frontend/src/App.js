import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from './LoginFormik';
import Administrativo from './Administrativo';
import Directivo from './Directivo';
import EditDirectivo from './EditDirectivo';
import EditAdministrativo from './EditAdministrativo';
import Docente from './Docente';
import EditDocente from './EditDocente';
import NuevoDocente from './NuevoDocente';
import Funciones from './Funciones';
import EditFunciones from './EditFunciones';
import Enlaces from './Enlaces';
import EditEnlace from './EditEnlace';
import Word from './Word';
import NuevoDocs from './NuevoDocs';
import Audio from './Audio';
import EditAudio from './EditAudio';
import Solicitud from './Solicitud';
import EditSolicitud from './EditSolicitud';
import Pdfs from './Pdfs';
import NuevoPdf from './NuevoPdf';
import Documento from './Documento';
import EditDocumento from './EditDocumento';
import Imagen from './Imagen';
import NuevoImagen from './NuevoImagen';
import Patio from './Patio';
import EditPatio from './EditPatio';
import Videos from './Videos';
import NuevoVideo from './NuevoVideo';
import Televisor from './Televisor';
import EditTelevisor from './EditTelevisor';
import Usuarios from './Usuarios';
import EditUsuario from './EditUsuario';
import NuevoUsuario from './NuevoUsuario';
import User from './User';
import EditUser from './EditUser';
import Maestria from './Maestria';
import EditMaestria from './EditMaestria';
import Personal from './Personal';
import EditPersonal from './EditPersonal';
export default function App() {
  const basename = process.env.REACT_APP_BASENAME;
    return(
    <Router basename={basename}>
        <Switch>
          <Route exact path="/" component={Directivo}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/users" component={Login}/>
          <Route exact path="/administrativo" component={Administrativo}/>
          <Route exact path="/directivo" component={Directivo}/>
          <Route exact path="/directivo/:id" component={EditDirectivo}/>
          <Route exact path="/administrativo/:id" component={EditAdministrativo}/>
          <Route exact path="/docente" component={Docente}/>
          <Route exact path="/docente/:id" component={EditDocente}/>
          <Route exact path="/nuevo/docente" component={NuevoDocente}/>
          <Route exact path="/funcion" component={Funciones}/>
          <Route exact path="/funcion/:id" component={EditFunciones}/>
          <Route exact path="/enlace" component={Enlaces}/>
          <Route exact path="/enlace/:id" component={EditEnlace}/>
          <Route exact path="/docs" component={Word}/>
          <Route exact path="/docs/nuevo" component={NuevoDocs}/>
          <Route exact path="/audio" component={Audio}/>
          <Route exact path="/audio/:id" component={EditAudio}/>
          <Route exact path="/solicitud" component={Solicitud}/>
          <Route exact path="/solicitud/:id" component={EditSolicitud}/>
          <Route exact path="/pdfs" component={Pdfs}/>
          <Route exact path="/pdfs/nuevo" component={NuevoPdf}/>
          <Route exact path="/documento" component={Documento}/>
          <Route exact path="/documento/:id" component={EditDocumento}/>
          <Route exact path="/imagen" component={Imagen}/>
          <Route exact path="/imagen/nuevo" component={NuevoImagen}/>
          <Route exact path="/patio" component={Patio}/>
          <Route exact path="/patio/:id" component={EditPatio}/>
          <Route exact path="/video" component={Videos}/>
          <Route exact path="/video/nuevo" component={NuevoVideo}/>
          <Route exact path="/televisor" component={Televisor}/>
          <Route exact path="/televisor/:id" component={EditTelevisor}/>
          <Route exact path="/usuario" component={Usuarios}/>
          <Route exact path="/usuario/:id" component={EditUsuario}/>
          <Route exact path="/nuevo/usuario" component={NuevoUsuario}/>
          <Route exact path="/user" component={User}/>
          <Route exact path="/user/:id" component={EditUser}/>
          <Route exact path="/maestria" component={Maestria}/>
          <Route exact path="/maestria/:id" component={EditMaestria}/>
          <Route exact path="/personal" component={Personal}/>
          <Route exact path="/personal/:id" component={EditPersonal}/>
        </Switch>
    </Router>
  );
}