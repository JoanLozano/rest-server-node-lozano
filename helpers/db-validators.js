const role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await role.findOne({rol});
    if(!existeRol) {
        throw new Error(`el rol ${rol} no esta registrado en la DB`);
    }
}

const emailExiste = async( email = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya pertenece a una cuenta registrada`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}

