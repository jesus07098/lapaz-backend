const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      console.log(`Usuarios: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error ${error}`);
      return res.status(501).json({
        succes: false,
        message: 'Error al obtener los usuarios',
      });
    }
  },

  async register(req, res, next) {
    try {
      const user = req.body;
      const data = await User.create(user);

      await Rol.create(data.id, 1); //ROL POR DEFECTO CUANDO SE CREE USUARIO (CLIENTE)

      return res.status(201).json({
        success: true,
        message: 'El registro se realizó correctamente, ahora inicia sesión',
        data: data.id,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: 'Hubo un error al registrar el usuario',
        error: error,
      });
    }
  },
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const myUser = await User.findByEmail(email);
      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: 'El email no fue encontrado',
        });
      }
      if (User.isPasswordMatched(password, myUser.password)) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrkey,
          {
            //expiresIn: (60 * 60 * 24) //1 HORA
          }
        );
        //CAMPOS DEBEN ESTAR IGUAL QUE EN LA BD
        const data = {
          id: myUser.id,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
          roles: myUser.roles,
        };

        console.log(`USUARIO ENVIADO ${data}`);

        return res.status(201).json({
          success: true,
          data: data,
          message: 'Usuario autenticado...',
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'La contraseña es incorrecta',
        });
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        succes: false,
        message: 'Error al momento de hacer login',
        error: error,
      });
    }
  },
};
