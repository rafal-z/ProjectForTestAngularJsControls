angular
    .module('taskOrganization')
    .service('dbService', dbService);

    function dbService($firebaseArray) {

        var list = null;

        // this.destroyFirebaseArray = function () {
        //     list.$ref().off();
        //     list = null;
        // };

        this.getFirebaseArray = function () {
            if (list === null) {
                var ref = firebase.database().ref().child("users/boards/" + userId);
                list = $firebaseArray(ref);
            }
            return list;
        };

        this.add = function (obj) {
            list.$add(obj);
        };

        this.save = function (obj) {
            list.$save(obj);
        };

        this.remove = function (obj) {
            list.$remove(obj);
        }
    }
