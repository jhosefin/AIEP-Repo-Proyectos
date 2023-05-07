const correoInput = document.getElementById('email');
const contrasenaInput = document.getElementById('contrasena');

correoInput.addEventListener('blur', validarCorreo);
contrasenaInput.addEventListener('blur', validarContrasena);

function validarCorreo() {
    const correoRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (correoRegex.test(correoInput.value)) {
        correoInput.classList.remove('invalid');
        correoInput.classList.add('valid');
        document.getElementById('email-error').textContent = '';
    } else {
        correoInput.classList.remove('valid');
        correoInput.classList.add('invalid');
        document.getElementById('email-error').textContent = 'El correo electrónico ingresado no es válido.';
    }
}

function validarContrasena() {
    const paswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_][^\s]{6,15}$/;
  
    if (paswordRegex.test(contrasenaInput.value)) {
        contrasenaInput.classList.remove('invalid');
        contrasenaInput.classList.add('valid');
        document.getElementById('password-error').textContent = '';
    } else {
        contrasenaInput.classList.remove('valid');
        contrasenaInput.classList.add('invalid');
        document.getElementById('password-error').textContent = 'Por favor ingresa una contraseña segura que contenga de 6 a 15 caracteres, una letra mayuscula, una letra minuscula, un digito, y un caracter especial. Porfavor asegurate que no contenga espacios en blanco.';
    }
}

const formulario = document.querySelector("form");
formulario.addEventListener("submit", async (eventoSubmit) => { 
    eventoSubmit.preventDefault();            
    const formElement   = eventoSubmit.currentTarget; 
    const formData      = new FormData( formElement );            
    const email         = formData.get("email");
    const contrasena    = formData.get("contrasena");
    const nuevoUsuario = {
        email,
        contrasena
    };

    const baseUrl   = "http://localhost:3000";
    const url       = baseUrl + "/login";
    const fetchConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( nuevoUsuario )
    };

    try {
        const respuesta     = await fetch(url, fetchConfig);
        // si la respuesta no es OK 
        if( !respuesta.ok ) {
           // gestionar error o mensajes recibidos 
           console.error("La respuesta no está OK");
           return;
        } 

        // en caso de exito 
        const objetoJson    = await respuesta.json(); 
        console.dir( objetoJson);

        const usuario = objetoJson.usuario;
        // caso éxito 

        // guardo datos del usuario y TOKEN 
        localStorage.setItem('usuario', JSON.stringify(usuario));
        // redirijo a página protegida 
        window.location = 'categoria.js';

    } catch (error) {
        // gestion errores 
        console.error( error.code );
        console.error( error.message );
    }
});