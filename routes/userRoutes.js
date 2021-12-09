const UsersController = require('../controllers/usersController');

module.exports = (app) => {
  //TRAER DATOS
  app.get('/api/users/getAll', UsersController.getAll);

  //GUARDAR DATOS USUARIO
  app.post('/api/users/create', UsersController.register);

  //LOGIN
  app.post('/api/users/login', UsersController.login);
};
