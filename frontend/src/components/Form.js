import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Formik} from 'formik';
import ServiceAxios from "./ServiceAxios";
const initialState = {
    email:'',
    password:'',
};
class Form extends Component{
    constructor(props){
        super(props);
        this.state=initialState;
      }
      handleSubmit=async (values)=>{
        ServiceAxios.post("user/login",values).then(response => {
        console.log(response.data);
        if (response.data.accesstoken) {
            localStorage.setItem("accesstoken", (response.data.accesstoken));
            localStorage.setItem("tipo", (response.data.tipo));
            localStorage.setItem("id", (response.data.id));
            return this.props.history.push('/directivo');
        }else{
            alert('Correo o Clave incorrecto');
        }
        },(error) => {alert(error.response.data.message);});
    }
    render(props){
    return (
        <>
            <Formik
            initialValues={{
                email:'',
                password:''
            }}
            validate={(valores)=>{
                let errores={};
                if(!valores.email){
                    errores.email='Ingrese por favor el correo';
                }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
                    errores.email='El correo solo puede tener letras, numeros, puntos, guiones y guion bajo';
                }
                if(!valores.password){
                    errores.password='Ingrese por favor la clave';
                }
                return errores;
            }}
            onSubmit={this.handleSubmit}
            >
                {({values,handleSubmit,handleChange,handleBlur,errors, touched})=>(
                    <form className="formulario" onSubmit={handleSubmit} autoComplete="off">
                    <div> 
                        <label htmlFor="email">Correo</label>
                        <input id="email" name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                        {touched.email && errors.email && <div className="error">{errors.email}</div>}
                    </div>  
                    <div> 
                        <label htmlFor="password">Clave</label>
                        <input id="password" name="password" type="password" placeholder="Clave" value={values.clave} onChange={handleChange} onBlur={handleBlur}/>
                        {touched.password && errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <button type="submit">Ingresar</button>    
                    </form>
                )}
            </Formik>
        </>
    )
}
}
export default withRouter (Form);
