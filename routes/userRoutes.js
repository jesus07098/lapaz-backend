const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {
  //TRAER DATOS
  app.get('/api/users/getAll', UsersController.getAll);

  //GUARDAR DATOS USUARIO
  app.post(
    '/api/users/create',
    upload.array('image', 1),
    UsersController.registerWithImage
  );

  //LOGIN
  app.post('/api/users/login', UsersController.login);
};
