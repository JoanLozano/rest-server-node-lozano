const { Router } = require('express');
const {check} = require('express-validator');


const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('email', 'el email, es obligatorio').isEmail(),
    check('password', 'el password, es obligatorio').not().isEmpty(),
    validarCampos
],  login);


router.post('/google',[
    check('id_token', 'el ID_Token, es obligatorio').not().isEmpty(),
    validarCampos
],  googleSingIn);



module.exports = router;