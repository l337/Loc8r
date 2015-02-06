var ctrl = require('../controllers/locations');

module.exports = function(app) {
	// locations
	app.get('/api/locations', ctrl.locationsListByDistance);
	app.post('/api/locations', ctrl.locationsCreate);
	app.get('/api/locations/:locationid', ctrl.locationsReadOne);
	app.put('/api/locations/:locationid', ctrl.locationsUpdateOne);
	app.delete('/api/locations/:locationid', ctrl.locationsDeleteOne);

	// reviews
	app.post('/api/locations/:locationid/reviews', ctrl.reviewsCreate);
	app.get('/api/locations/:locationid/reviews/:reviewid', ctrl.reviewsReadOne);
	app.put('/api/locations/:locationid/reviews/:reviewid', ctrl.reviewsUpdateOne);
	app.delete('/api/locations/:locationid/reviews/:reviewid', ctrl.reviewsDeleteOne);
};