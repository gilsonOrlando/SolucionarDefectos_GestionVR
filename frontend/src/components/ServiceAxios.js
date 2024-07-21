import axios from 'axios';
import Constantes from "./Constantes";
import authHeader from '../services/auth-header';
let axiosConfig = {
    headers: {
        'x-access-token': localStorage.getItem('accesstoken'),
        "Access-Control-Allow-Origin":"*",
      'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE,UPLOAD',
      "Access-Control-Allow-Headers":"x-access-token, Origin, X-Requested-With, Content-Type, Accept"
    }
  };
class ServiceAxios {
    get(direccion){
        return axios.get(`${Constantes.servidor}/${direccion}`, { headers: authHeader() });
    }
    getId(direccion,id){
        return axios.get(`${Constantes.servidor}/${direccion}/${id}`, { headers: authHeader() });
    }
    delete(direccion,id){
        return axios.delete(`${Constantes.servidor}/${direccion}/${id}`, { headers: authHeader() });
    }
    post(direccion,json){
        return axios.post(`${Constantes.servidor}/${direccion}`, json, { headers: authHeader() });
    }
    put(direccion,id,json){
        return axios.put(`${Constantes.servidor}/${direccion}/${id}`, json, { headers: authHeader() });
    }
    upload(direccion,file){
        const formData=new FormData();
        formData.append("myFile",file);
        return axios.post(`${Constantes.servidor}/upload/${direccion}`, formData, { headers: authHeader() })
        .then((response) => {return response.data;});
    }
}
export default new ServiceAxios();
