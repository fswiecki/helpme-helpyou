angular
  .module('app.chat')
  .controller('ChatInstanceCtrl', ChatInstanceCtrl);
  
ChatInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'Socket', 'auth', 'Profile', 'current', '$scope', '$timeout'];
  
function ChatInstanceCtrl($scope, $uibModalInstance, Socket, auth, Profile, current, $scope, $timeout) {
  $scope.messages = [];
  $scope.chatFriend = current;
  $scope.msgLoadingComplete = false;

  $scope.sendMessage = function(message) {
    if (message != false) {
      Socket.emit('message', {username: $scope.profile.nickname, friend: $scope.chatFriend, message: message});
    }
    $scope.privateMessage = '';
  };

  Socket.on('message', function(data) {
    if (($scope.chatFriend === data.friend || $scope.chatFriend === data.username) &&
        ($scope.profile.nickname === data.username || $scope.profile.nickname === data.friend)) {
      $scope.messages.push(data);
      $timeout(function() {
        var scroller = document.getElementById('autoscroll');
        scroller.scrollTop = scroller.scrollHeight;
      }, 0, false);
    }
  });

  Socket.on('loadMessage', function(data) {
    if (!$scope.msgLoadingComplete) {
      $scope.messages.push(data);
    }
  });

  Socket.on('msgLoadingComplete', function(data) {
    $scope.msgLoadingComplete = data;
  });

  auth.profilePromise.then(function(profile) {
    $scope.profile = profile;
    Socket.emit('loadMessages', { username: $scope.profile.nickname, friend: $scope.chatFriend});
  });

  $scope.ok = function() {
    $uibModalInstance.close();
  };

}
