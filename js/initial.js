    angular.module("hr", [])
      .controller("hrController", ["$scope", "$http", function($scope, $http) {


        $scope.init = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          $http.post("./dataus.php", angular.toJson($scope.hr1))
            .then(function(respuesta) {

              $datos = respuesta.data;

              if ($datos[0]['iduser'] != 0)
              {

                $scope.hr1.iduser = $datos[0]['iduser'];
                $scope.hr1.fullname = $datos[0]['fullname'];

                $http.post("./tabledash.php", angular.toJson($scope.hr1))
                  .then(function (respuesta) {
                    
                    $datosd = respuesta.data;

                    $scope.hr1.producers = $datosd[0]['productores'];
                    $scope.hr1.tables = $datosd[0]['tablas'];
                    $scope.hr1.moves = $datosd[0]['movimientos'];

                  }); 
              }
              else
              {
                bootbox.alert("usuario invalido o password incorrecto...!");
              }
            });

        };

        $scope.load1 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "producers.html?id=" + $scope.hr1.hash_;

        };

        $scope.load2 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "tablesprod.html?id=" + $scope.hr1.hash_;

        };

        $scope.load3 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "mov.html?id=" + $scope.hr1.hash_;

        };

        $scope.load4 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "concen.html?id=" + $scope.hr1.hash_;

        };

        $scope.load5 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "unrelated.html?id=" + $scope.hr1.hash_;

        };        


        $scope.quiteass = function(iticket) {

          console.log(iticket);

              bootbox.confirm("Esta seguro de anular la asignacion al ticket " + iticket, function(result){

                if (result == true)
                {

                  $scope.hr1.ticket = iticket;

                  $http.post("./quiteassign.php", angular.toJson($scope.hr1))
                    .then(function(respuesta) {

                      $scope.hr1.datas = respuesta.data;

                    });
                }

              });

        };


      }]);
