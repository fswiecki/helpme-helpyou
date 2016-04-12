var goalController = require('../goals/goalController');
var userController = require('../users/userController');
var postController = require('../posts/postController');
var helpers = require('./helper');

module.exports = function(app, express) {

app.route('/api/goals/:user_id')
  .get(goalController.getGoals)
  .post(goalController.addGoal);

app.route('/api/profile/:user_id')
  .get(postController.getProfile)
  .post(postController.updateProfile);

app.route('/api/profile/posts/:user_id')
  .get(postController.getPosts)
  .post(postController.addPost);

app.route('/api/friends/pending')
  .get(userController.getFriendRequests)
  .post(userController.acceptFriendRequest);

app.get('/api/friends', userController.allFriends);
app.get('/api/friends/requests', userController.getRequestedFriends);
app.post('/api/friends/add', userController.sendFriendRequest);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
app.use(helpers.errorLogger);
app.use(helpers.errorHandler);

};