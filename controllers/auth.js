const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario')

const { generarJWT } = require('../helpers/generar-jwt');
const {googleVerify} = require('../helpers/google-verify')

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

const googleSingIn = async (req, res = response ) => {

    const {id_token} = req.body;

    try {
        const {nombre, img, email} = await googleVerify(id_token);
        
        let  usuario = await Usuario.findOne({email});

        //  !   Si no existe el usuario
        if (!usuario){
            //creamos el usuario

            const data = {
                nombre,
                email,
                password : ':p',
                img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        //  !   si el usuario esta en false
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Hable con el administrador -  usuario bloqueado'
            })
        }

        //  !   Generar JWT
        const token = await generarJWT(usuario.id);


        res.json({
            msg: 'Todo bien! Google SignIn',
            usuario,
            id_token
        })
        
    } catch (error) {
        return res.status(400).json({
            ok : false,
            msg: 'el token no se pudo verificar'
        })   
    } 
}

module.exports = {
    login,
    googleSingIn
}