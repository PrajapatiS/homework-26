
const app = angular.module('ChatApp', []);

app.controller('ChatListController', function ($scope, ChatService) {
    // $scope.chatlist is to get all chats from api
    $scope.chatList = ChatService.getchats();

});

app.controller('ChatController', function ($scope, ChatService) {
    // This is saying 'make a post request when the page loads'
    //$scope.dplayChats = ChatService.showchat()

    // When we run the 'send' function, make a post request
    $scope.send = function () {
        ChatService.showchat($scope.user_name,$scope.chat_text);
    };

});


app.factory('ChatService', function ($http) {
    let chats = [];

    $http.get('https://tiy-28202.herokuapp.com/chats').then(function (response) {

        let u_chats = response.data.chats;
        for (let i = 0; i < u_chats.length; i++) {
            chats.push({
                from: u_chats[i].from,
                message: u_chats[i].message,
            });
        }
    });

    return {
        getchats() {
            return chats;
        },

        showchat(user_name,chat_text) {
            let message = {
                from: user_name,
                message: chat_text,
            };

            $http.post('https://tiy-28202.herokuapp.com/chats', message);
        }
    };
});







