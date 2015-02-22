var ctrl = require('../app_server/controllers/main');

module.exports = function(app) {
	app.get('/', ctrl.angularApp);
	app.get('/about', ctrl.about);
	app.get('/signin', ctrl.signin);
}