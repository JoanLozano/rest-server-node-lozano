const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        msg: 'get API - controlador',
        total, 
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    
    const {nombre, email, password, role} = req.body;
    const usuario = new Usuario({nombre, email, password, role});

    //encriptar
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar
    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

    const {_id, password, google, email, ...resto} = req.body;

    if (password){
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;

    //eliminar de forma fisica
    //const usuario = await Usuario.findByIdAndDelete(id);
    

    //cambiando el estado del usuario para mantener la integridad estructural
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        msg: 'delete API - usuariosDelete',
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}