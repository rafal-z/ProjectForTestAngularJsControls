angular
    .module('taskOrganization')
    .service('authService', authService);

    function authService($location, $firebaseAuth, $cookies) {

        this.setUid = function (id) {
            // uid = id;
        };

        this.getUid = function () {
            return $cookies.get("userId");
        };

        this.login = function (username, password) {
            var loginObj = $firebaseAuth();

            return loginObj.$signInWithEmailAndPassword(username, password)
                .then(function (firebaseUser) {
                    $cookies.put("userId", firebaseUser.uid);
                    $location.path('/listboard');
                })
                .catch(function (error) {
                    console.error("Authentication failed:", error);

                    switch (error.code){
                        case 'auth/too-many-requests':
                            return "Z powodu nietypowej aktywności zablokowaliśmy wszystkie żądania z tego urządzenia. Spróbuj ponownie później.";
                        case 'auth/wrong-password':
                            return "Hasło jest nieprawidłowe.";
                        case 'auth/user-not-found':
                            return "Nie ma użytkownika o takim loginie."

                    }
                });
        };

        this.logout = function () {
            var loginObj = $firebaseAuth();
            loginObj.$signOut()
                .then(function () {
                    $cookies.remove("userId");
                    $location.path('/login');
                });

        };

        this.isAuthorization = function () {
            return $cookies.get("userId") != undefined;
        };
    }