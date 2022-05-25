var table;   

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
          
          $http.post('./listprodhm.php', angular.toJson($scope.hr1))
              .then(function (respuesta) {

                $Receiveh = respuesta.data

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

        $scope.save = function (iticket) {
          
          var iFlag = 0

          if ($scope.hr1.dataprod === 0)
          { iFlag = 1 }
          
          if ($scope.hr1.keyalt === 0)
          { iFlag = 1 }
          
          if ($scope.hr1.name === 0)
          { iFlag = 1 }
          
          if ($scope.hr1.middlename === 0)
          { iFlag = 1 }

          if ($scope.hr1.lastname === 0)
          { iFlag = 1 }

          if (isNaN($scope.hr1.keyalt))
          { iFlag = 1 }
          
          if (iFlag == 1)
          {  bootbox.alert("Algun campo esta vacio o no contiene el dato correcto...!");return }

              bootbox.confirm("Confirma conservar el productor INCA como Altas Montañas? ", function(result){

                if (result == true)
                {

                  var iPos = $scope.hr1.dataprod.indexOf('-')

                  var sKeyInca = $scope.hr1.dataprod.substr(0, iPos)

                  $scope.hr1.key_inca = sKeyInca.replace(/\s+/g, '')

                  $http.post("./saveprodcr.php", angular.toJson($scope.hr1))
                    .then(function(respuesta) {

                      $Receivepr = respuesta.data;

                      if ($Receivepr[0].idproducer != 0 )
                      {
                        tabla($Receivepr)

                        $http.post('./listprodinca.php', angular.toJson($scope.hr1))
                            .then(function (respuesta) {

                              $Receive = respuesta.data

                              arrlista = []

                              for (let i = 0; i < this.$Receive.length; i++) {
                                arrlista.push($Receive[i].line)
                              }

                              $scope.hr1.list1 = arrlista

                            })   

                      }
                      else
                      {
                        {  bootbox.alert("No se proceso correcamente el ingreso del productor...!");return }
                        }
                      

                    }); 
                }

              });

        }; 
        
        $scope.updatefield = function (sField, NwValue, OlValue, IdProd) {
          
          $scope.hr1.Field = sField;
          $scope.hr1.Newvalue = NwValue;
          $scope.hr1.Oldvalue = OlValue;
          $scope.hr1.IdProd = IdProd;

            $http.post('./updateproducer.php', angular.toJson($scope.hr1))
              .then(function (respuesta) {

                $Receiveh = respuesta.data

                tabla($Receiveh)

              })    

        };

        $scope.detailsm = function (keyhm) {
          
          $scope.hr1.keyhm = keyhm;

              $http.post('./existables.php', angular.toJson($scope.hr1))
                .then(function (respuesta) {

                  $Receiveh = respuesta.data

                  tabdetails($Receiveh)

                }) 

        };        


      }]);

function tabla(datos) {

  //Define variables for input elements
  var fieldEl = document.getElementById("filter-field");
  var typeEl = document.getElementById("filter-type");
  var valueEl = document.getElementById("filter-value");

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

    if(filterVal){
      table.setFilter(filter,typeVal, valueEl.value);
    }
  }

  //Update filters on value change
  document.getElementById("filter-field").addEventListener("change", updateFilter);
  document.getElementById("filter-type").addEventListener("change", updateFilter);
  document.getElementById("filter-value").addEventListener("keyup", updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById("filter-clear").addEventListener("click", function(){
    fieldEl.value = "";
    typeEl.value = "=";
    valueEl.value = "";

    table.clearFilter();
  });


  //Create Date Editor
var dateEditor = function(cell, onRendered, success, cancel){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass thesuccessfully updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style input
    var cellValue = luxon.DateTime.fromFormat(cell.getValue(), "dd/MM/yyyy").toFormat("yyyy-MM-dd"),
    input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    function onChange(){
        if(input.value != cellValue){
            success(luxon.DateTime.fromFormat(input.value, "yyyy-MM-dd").toFormat("dd/MM/yyyy"));
        }else{
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function(e){
        if(e.keyCode == 13){
            onChange();
        }

        if(e.keyCode == 27){
            cancel();
        }
    });

    return input;
};



 table = new Tabulator("#tableprod", {
    data:datos,           //load row data from array
    layout:"fitDataStretch",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    pagination:"local",       //paginate the data
    paginationSize:50,         //allow 50 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
    movableColumns:true,      //allow column order to be changed
    initialSort:[             //set the initial sort order of the data
        {column:"idproducer", dir:"asc"},
    ],
    columns:[                 //define the table columns
      {
        title: "Id", field: "idproducer", cellClick: function (e, cell) {

          var key_hm = cell._cell.row.data.key_hm

          angular.element(document.getElementById('content')).scope().detailsm(key_hm);
          $('#myModal1').modal('show');
          
        },},
        {title: "Clave", field: "key_hm", editor:"input", validator:"required", cellEdited:function(cell){

          var IdProd = cell._cell.row.data.idproducer
          var NwName = cell._cell.value
          var OlName = cell._cell.oldValue

          angular.element(document.getElementById('Content')).scope().updatefield("Key_Hm",NwName,OlName,IdProd);

        },},
        {title: "Nombre", field: "name_", editor:"input", validator:"required", cellEdited:function(cell){

          var IdProd = cell._cell.row.data.idproducer
          var NwName = cell._cell.value
          var OlName = cell._cell.oldValue

          angular.element(document.getElementById('Content')).scope().updatefield("name_",NwName,OlName,IdProd);

        },},
        {title: "Paterno", field: "MiddleName", editor:"input", validator:"required", cellEdited:function(cell){

          var IdProd = cell._cell.row.data.idproducer
          var NwName = cell._cell.value
          var OlName = cell._cell.oldValue

          angular.element(document.getElementById('Content')).scope().updatefield("MiddleName",NwName,OlName,IdProd);

        },},
        {title: "Materno", field: "LastName", editor:"input", validator:"required", cellEdited:function(cell){

          var IdProd = cell._cell.row.data.idproducer
          var NwName = cell._cell.value
          var OlName = cell._cell.oldValue

          angular.element(document.getElementById('Content')).scope().updatefield("LastName",NwName,OlName,IdProd);

        },},    
        {title: "INCA", field: "Key_Inca" },
        {title: "Id Grupo", field: "Group_" },
        {title: "Grupo", field: "NameGroup" },
        {title: "Id Div", field: "division" },
        {title: "Division", field: "DivName" },
        {title: "Zona", field: "zone" },
    ],  
  });
   
/*    table.on("rowClick", function(e, row){
    data = row.getData();
    angular.element(document.getElementById('content')).scope().detailsm(data.key_hm);
    $('#myModal1').modal('show');
  });  */

  //trigger download of data.xlsx file
  document.getElementById("download-xlsx").addEventListener("click", function(){
      table.download("xlsx", "Productores.xlsx", {sheetName:"Productores"});
  });

  //handle validation failure
table.on("validationFailed", function(cell, value, validators){
    //cell - cell component for the edited cell
    //value - the value that failed validation
    //validatiors - an array of validator objects that failed

    //take action on validation fail
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
        {title: "Tabla", field: "keytable" },
        {title: "Zafra", field: "period"},
    ],  
 });
 
  //trigger download of data.xlsx file
  document.getElementById("download-xlsx1").addEventListener("click", function(){
      table1.download("xlsx", "detailmov.xlsx", {sheetName:"movimientos"});
  });

};    