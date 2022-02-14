const { Router } = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');



const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    //check('role','no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut );

router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('email','el correo no cumple las caracteristicas de un email').isEmail(),
    check('email').custom(emailExiste),
    check('password','el password debe tener mas de 6 caracteres').isLength({min: 6}),
    //check('role','no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;