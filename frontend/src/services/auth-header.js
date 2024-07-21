export default function authHeader() {
    const accesstoken = (localStorage.getItem('accesstoken'));
    if (accesstoken) {
      return { 'x-access-token': accesstoken, 
      "Access-Control-Allow-Origin":"*",
      'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE,UPLOAD',
      "Access-Control-Allow-Headers":"x-access-token, Origin, X-Requested-With, Content-Type, Accept"};
    } else {
      return {};
    }
  }