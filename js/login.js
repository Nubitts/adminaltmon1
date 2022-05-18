angular.module("tk", [])
      .controller("tkController", ["$scope", "$http", function($scope, $http) {

        $scope.guardar = function() {

          $http.post("datausr.php", angular.toJson($scope.access))
            .then(function(respuesta) {

              $datos = respuesta.data;

              var scve = $datos[0]['hash_'];

              if (scve != "0")
              {
                  window.location.href = "index1.html?id=" + $datos[0]['hash_'];                
              }
              else
              {
                bootbox.alert("usuario invalido o password incorrecto...!");
              }

            });

        };


      }]);