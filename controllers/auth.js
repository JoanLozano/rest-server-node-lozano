const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario')


const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        //  !   Verificar si el email existe
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - Email'
            });
        }
        
        //  !   Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - Estado: False'
            });
        }

        //  !   Verificar la contrasena
        const validarPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - Password'
            });
        }


        //  !   Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login OK',
            email,
            password,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }
}

module.exports = {
    login
}