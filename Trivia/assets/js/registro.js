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