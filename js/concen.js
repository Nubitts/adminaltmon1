var table;   
var table1; 
var data;

var fieldEl = document.getElementById("dataprod");
var fieldEl = document.getElementById("clave");
var fieldEl = document.getElementById("nombrep");
var fieldEl = document.getElementById("paternop");
var fieldEl = document.getElementById("maternop");

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
          
            $http.post('./listprodinca.php', angular.toJson($scope.hr1))
                .then(function (respuesta) {

                  $Receive = respuesta.data

                  arrlista = []

                  for (let i = 0; i < this.$Receive.length; i++) {
                    arrlista.push($Receive[i].line)
                  }

                  $scope.hr1.list1 = arrlista

                })          
          
            $scope.hr1.filter = "";
          
            $http.post('./listconcen.php', angular.toJson($scope.hr1))
                .then(function (respuesta) {

                  $Receiveh = respuesta.data

                  for (let i = 0; i < $Receiveh.length; i++) { 
                      $Receiveh[i].neto = parseFloat($Receiveh[i].neto)
                      $Receiveh[i].descto = parseFloat($Receiveh[i].descto)
                      $Receiveh[i].liquido = parseFloat($Receiveh[i].liquido)
                  }

                  tabla($Receiveh)


                })                 
          

        };

        $scope.load1 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "index1.html?id=" + $scope.hr1.hash_;

        };

        $scope.load2 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "producers.html?id=" + $scope.hr1.hash_;

        };

        $scope.load3 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "tablesprod.html?id=" + $scope.hr1.hash_;

        };

        $scope.load4 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "mov.html?id=" + $scope.hr1.hash_;

        };

        $scope.load5 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "unrelated.html?id=" + $scope.hr1.hash_;

        };        

        $scope.detailsm = function (keyhm, producer) {
          
          $scope.hr1.keyhm = keyhm;
          $scope.hr1.producer = producer;

          var valueEl = document.getElementById("filter-value");
          var valueE2 = document.getElementById("filter-value1");

          var data = valueEl.value + valueE2.value

          if(data !== null && data !== '') {
            $scope.hr1.filter = " dout between '" + valueEl.value + "' and '" + valueE2.value + "' ";
          }
          else
          {
            $scope.hr1.filter = ""
          }

          var $Neto = 0
          var $descto = 0
          var $liquido = 0

              $http.post('./listdetailstc.php', angular.toJson($scope.hr1))
                .then(function (respuesta) {

                  $Receiveh = respuesta.data

                  for (let i = 0; i < $Receiveh.length; i++) { 
                    $Receiveh[i].neto = parseFloat($Receiveh[i].neto)
                    $Receiveh[i].descto = parseFloat($Receiveh[i].descto)
                    $Receiveh[i].liquido = parseFloat($Receiveh[i].liquido)
                    
                    $Neto += parseFloat($Receiveh[i].neto)
                    $descto += parseFloat($Receiveh[i].descto)
                    $liquido+= parseFloat($Receiveh[i].liquido)

                  }

                  $scope.hr1.tneto = $Neto.toFixed(3)
                  $scope.hr1.tdescto = $descto.toFixed(3)
                  $scope.hr1.tliquido = $liquido.toFixed(3)

                  tabdetails($Receiveh)


                }) 

        };

        $scope.clearfilter = function() {

          var valueEl = document.getElementById("filter-value");
          var valueE2 = document.getElementById("filter-value1");

          valueEl.value = "";
          valueE2.value = "";

          $scope.hr1.filter = " ";
         
            $http.post('./listconcen.php', angular.toJson($scope.hr1))
                .then(function (respuesta) {

                  $Receiveh = respuesta.data

                  tabla($Receiveh)


                }) 

        };

        $scope.applyfilter = function() {

          var valueEl = document.getElementById("filter-value");
          var valueE2 = document.getElementById("filter-value1");

           var valid1 = moment(valueEl.value, "YYYY-mm-dd", true).isValid()

          var data = valueEl.value + valueE2.value

          if(data !== null && data !== '') {
            $scope.hr1.filter = " dout between '" + valueEl.value + "' and '" + valueE2.value + "' ";
          }
          else
          {
            $scope.hr1.filter = ""
          }

            $http.post('./listconcen.php', angular.toJson($scope.hr1))
                .then(function (respuesta) {

                  $Receiveh = respuesta.data

                  tabla($Receiveh)


                })             


        };


      }]);

function tabla(datos) {

 table = new Tabulator("#movements", {
    data:datos,           //load row data from array
    layout:"fitDataStretch",      //fit columns to width of table
    tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    pagination:"local",       //paginate the data
    paginationSize:50,         //allow 50 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
   movableColumns: true,
    initialSort:[             //set the initial sort order of the data
        {column:"key_hm", dir:"asc"},
    ],
    columns:[                 //define the table columns
        {title: "Clave", field: "key_hm" },
        {title: "Productor", field: "producer"},
        {title: "Neto", field: "neto",bottomCalc:"sum", bottomCalcParams:{precision:3}},
        {title: "Descuento", field: "descto",bottomCalc:"sum", bottomCalcParams:{precision:3}},
        {title: "Liquido", field: "liquido",bottomCalc:"sum", bottomCalcParams:{precision:3} },
    ],  
 });
  
  table.on("rowClick", function(e, row){
    // alert("Row " + row.getIndex() + " Clicked!!!!")
    data = row.getData();
    angular.element(document.getElementById('content')).scope().detailsm(data.Key_Hm, data.Producer);
    $('#myModal').modal('show');
});
   
  //trigger download of data.xlsx file
  document.getElementById("download-xlsx").addEventListener("click", function(){
      table.download("xlsx", "concentrate_mov.xlsx", {sheetName:"movimientos"});
  });



};


function tabdetails(datos) {


 table1 = new Tabulator("#details", {
    data:datos,           //load row data from array
    layout: "fitDataStretch",      //fit columns to width of table
    height:"311px",
    renderHorizontal:"virtual",
    //responsiveLayout:"hide",  hide columns that dont fit on the table
    //tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    pagination:"local",       //paginate the data
    paginationSize:15,         //allow 50 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
    movableColumns: true,
    initialSort:[             //set the initial sort order of the data
        {column:"Salida", dir:"desc"},
    ],
    columns:[                 //define the table columns
        {title: "Ticket", field: "ticket" },
        {title: "Ciclo", field: "ciclo"},
        {title: "Tabla", field: "tabla"},
        {title: "Fletero", field: "fletero"},
        {title: "Neto", field: "neto",bottomCalc:"sum", bottomCalcParams:{precision:3}  },
        {title: "Descuento", field: "descto", sorter:"number",bottomCalc:"sum", bottomCalcParams:{precision:3} },
        {title: "Liquido", field: "liquido", sorter:"number",bottomCalc:"sum", bottomCalcParams:{precision:3} },
        {title: "Entrada", field: "Entrada", sorter:"number"},
        {title: "Salida", field: "Salida", sorter:"number" },
        {title: "Tipo", field: "tipo"},
    ],  
 });
  
  
  //trigger download of data.xlsx file
  document.getElementById("download-xlsx1").addEventListener("click", function(){
      table1.download("xlsx", "detailmov.xlsx", {sheetName:"movimientos"});
  });



};     