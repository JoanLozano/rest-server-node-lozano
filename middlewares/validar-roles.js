const {response} = require('express')

const esAdminRole = (req, res = response, next) => {

    if (!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    
    const {role, nombre} = req.usuario;

    if (role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es un usuario Administrador - No puede hacer esto`
        });
    }



    next();
}

const tieneRole = (...roles) =>{

    return (req, res = response, next) => {
        //console.log(roles, req.usuario.role);
        if (!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles ${roles} - No puede hacer esto`
            });
        }


        next();
    }
}

module.exports = {
    esAdminRole, tieneRole
}