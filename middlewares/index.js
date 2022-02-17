const validarCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const ValidaRoles = require('../middlewares/validar-roles');


module.exports ={
    ...validarCampos,
    ...validaJWT,
    ...ValidaRoles
} 