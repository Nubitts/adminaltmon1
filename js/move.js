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
          
            $http.post('./listmov.php', angular.toJson($scope.hr1))
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

          window.location.href = "concen.html?id=" + $scope.hr1.hash_;

        };

        $scope.load5 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "unrelated.html?id=" + $scope.hr1.hash_;

        };        

        $scope.detailsm = function (keyhm, dout,producer) {
          
          $scope.hr1.keyhm = keyhm;
          $scope.hr1.dout = dout;
          $scope.hr1.producer = producer;

          var $Neto = 0
          var $descto = 0
          var $liquido = 0

              $http.post('./listdetailst.php', angular.toJson($scope.hr1))
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

      }]);

function tabla(datos) {

  //Define variables for input elements
  var fieldEl = document.getElementById("filter-field");
  var typeEl = document.getElementById("filter-type");
  var valueEl = document.getElementById("filter-value");
  var valueE2 = document.getElementById("filter-value1");

  //Custom filter example
  function customFilter(data){
      return data.car && data.rating < 3;
  }

  //Trigger setFilter function with correct parameters
  function updateFilter(){

    var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
    var typeVal = typeEl.options[typeEl.selectedIndex].value;

    var filter = filterVal == "function" ? customFilter : filterVal;

    if(filterVal == "function" ){
      typeEl.disabled = true;
      valueEl.disabled = true;
    }else{
      typeEl.disabled = false;
      valueEl.disabled = false;
    }

    if (filterVal) { 
      
      if (valueE2.value != '')
      {
        table.setFilter([
            {field:"dout", type:">=", value:valueEl.value}, //filter by age greater than 52
            {field:"dout", type:"<=", value:valueE2.value}, //and by height less than 142
        ]);
        table.refreshFilter();
      }
      else
      {
        table.setFilter(filter,typeVal, valueEl.value);
        }     
    }
  }

  //Update filters on value change
  document.getElementById("filter-field").addEventListener("change", updateFilter);
  document.getElementById("filter-type").addEventListener("change", updateFilter);
  document.getElementById("filter-value").addEventListener("keyup", updateFilter);
  document.getElementById("filter-value1").addEventListener("keyup", updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById("filter-clear").addEventListener("click", function(){
    fieldEl.value = "";
    typeEl.value = "=";
    valueEl.value = "";
    valueE2.value = "";

    table.clearFilter();
  });


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
    groupBy:"dout",     //allow column order to be changed
    initialSort:[             //set the initial sort order of the data
        {column:"dout", dir:"desc"},
    ],
    columns:[                 //define the table columns
        {title: "Clave", field: "key_hm" },
        {title: "Productor", field: "producer"},
        {title: "Neto", field: "neto", bottomCalc:"sum", bottomCalcParams:{precision:3}},
        {title: "Descuento", field: "descto", bottomCalc:"sum", bottomCalcParams:{precision:3}},
        {title: "Liquido", field: "liquido", bottomCalc:"sum", bottomCalcParams:{precision:3} },
        {title: "Tipo", field: "tipo" },
        {title: "Salida", field: "dout"},
    ],  
 });
  
  table.on("rowClick", function(e, row){
    // alert("Row " + row.getIndex() + " Clicked!!!!")
    data = row.getData();
    angular.element(document.getElementById('content')).scope().detailsm(data.key_hm, data.dout, data.producer);
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
        {column:"ticket", dir:"desc"},
    ],
    columns:[                 //define the table columns
        {title: "Ticket", field: "ticket" },
        {title: "Ciclo", field: "ciclo"},
        {title: "Tabla", field: "tabla"},
        {title: "Fletero", field: "fletero"},
        {title: "Neto", field: "neto", bottomCalc:"sum", bottomCalcParams:{precision:3} },
        {title: "Descuento", field: "descto", bottomCalc:"sum", bottomCalcParams:{precision:3} },
        {title: "Liquido", field: "liquido", bottomCalc:"sum", bottomCalcParams:{precision:3} },
        {title: "Entrada", field: "Entrada" },
        {title: "Salida", field: "Salida" },
        {title: "Quema", field: "Quema" },
        {title: "Tipo", field: "tipo"},
    ],  
 });
  
  
  //trigger download of data.xlsx file
  document.getElementById("download-xlsx1").addEventListener("click", function(){
      table.download("xlsx", "detailmov.xlsx", {sheetName:"movimientos"});
  });



};     