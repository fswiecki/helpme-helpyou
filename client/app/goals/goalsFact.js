angular
  .module('app.goals')
  .factory('Goals', Goals);

// Dependency injection. Done this way for minification purposes.
Goals.$inject = ['$http'];

function Goals($http) {
  return {
    // GETs list of goals from our MongoDB
    getGoals: function(user_id) {
      return $http({
          method: 'GET',
          url: '/api/goals/' + user_id
        })
        .then(function(res) {
          return res.data;
        });
    },

    // POSTs new goal to our MongoDB
    addGoal: function(user_id, goal) {
      return $http({
          method: 'POST',
          url: '/api/goals/' + user_id,
          data: goal
        })
        .then(function(res) {
          return res.data;
        });

    },

    //PUTs some new goal data in our MongoDB
    updateGoal: function(user_id, goal) {
      return $http({
        method: 'PUT',
        url: '/api/goals/' + user_id,
        data: goal
      })
      .then(function(res) {
        return res.data;
      })
    },

    //DELETEs a goal from our MongoDB
    deleteGoal: function(user_id, goal_id) {
      return $http({
        method: 'DELETE',
        url: '/api/goals/' + user_id + '/' + goal_id,
      })
      .then(function(res) {
        return res.data;
      })
    }
  };
}
