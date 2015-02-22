/* GET 'about us' page. */
module.exports.about = function(req, res){
  res.render('generic-text', { 
  	title: 'About Loc8r',
  	content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus in nisl eget, accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.' 
  });
};

/* GET 'sign in' page. */
module.exports.signin = function(req, res) {
	res.render('signin-index', {title: 'Sign in to Loc8r'});
}

module.exports.angularApp = function(req, res) {
	res.render('layout', { title: 'Loc8r' });
};