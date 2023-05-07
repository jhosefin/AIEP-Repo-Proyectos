const storageUsuario = localStorage.getItem("usuario");
if( storageUsuario == null ){
    window.location = "login.html";
}

const objetoUsuario = JSON.parse(storageUsuario);
const token = objetoUsuario.user.stsTokenManager.accesToken;
console.log(token);

const baseUrl = 'http://localhost:3000'
const url = baseUrl + '/usuario/checktoken'
fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authetication': 'Bearer'+token
    }
}).then( respuesta => {
    if(!respuesta.ok){
        throw new Error("Token no válido");
    }
}).catch(error=> {
    window.location = "login.html"
});
