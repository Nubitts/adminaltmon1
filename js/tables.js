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
          
          $http.post('./listprodactive.php', angular.toJson($scope.hr1))
                .then(function (respuesta) {

                  $Receive = respuesta.data

                  arrlista = []

                  for (let i = 0; i < this.$Receive.length; i++) {
                    arrlista.push($Receive[i].producer)
                  }

                  $scope.hr1.list1 = arrlista

          })          
          
          $http.post('./listtables_.php', angular.toJson($scope.hr1))
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

          window.location.href = "producers.html?id=" + $scope.hr1.hash_;

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

          if ($scope.hr1.prodactive === 0)
          { iFlag = 1 }
          
          if ($scope.hr1.addtable === 0)
          { iFlag = 1 }
                   
          if (iFlag == 1)
          {  bootbox.alert("Algun campo esta vacio o no contiene el dato correcto...!");return }

              bootbox.confirm("Confirma Asociar Productor con la tabla? ", function(result){

                if (result == true)
                {

                  var iPos = $scope.hr1.prodactive.indexOf('-')

                  var sKeyhm = $scope.hr1.prodactive.substr(0, iPos)

                  $scope.hr1.keyhm = sKeyhm.replace(/\s+/g, '')
                  
                  $scope.hr1.addtab = $scope.hr1.addtable

                  $http.post("./savetablerel.php", angular.toJson($scope.hr1))
                    .then(function(resptables) {

                      $Receivetables = resptables.data;

                      if ($Receivetables[0].keyhm != 0 )
                      {
                        tabla($Receivepr)

                      }
                      else
                      {
                        {  bootbox.alert("No se proceso correcamente el ingreso de la tabla...!");return }
                        }
                      

                    }); 
                }

              });

        };        


        $scope.listtableava = function() {

          var iFlag = 0

          if ($scope.hr1.prodactive === 0)
          {
            iFlag = 1
          }

          if (iFlag == 1)
          { bootbox.alert("Elija un productor para presentar tablas disponibles...!"); return }    
          
          var iPos = $scope.hr1.prodactive.indexOf('-')

          var sKeyHm = $scope.hr1.prodactive.substr(0, iPos)

          $scope.hr1.idprod = sKeyHm

          $http.post('./avatables.php', angular.toJson($scope.hr1))
              .then(function (resptables) {

                  $Receivetb = resptables.data
                
                  arrlistta = []

                  for (let i = 0; i < this.$Receivetb.length; i++) {
                       arrlistta.push($Receivetb[i].tabla)
                  }

                  $scope.hr1.listtab = arrlistta


              })                  

        };

        $scope.listoptionst = function(keyhm) {

          $scope.hr1.idprod = keyhm

          $http.post('./avatablesa.php', angular.toJson($scope.hr1))
              .then(function (resptablesa) {

                $Receivetc = resptablesa.data
                          
                bootbox.prompt({
                    title: "Seleccione la tabla correcta",
                    inputType: 'select',
                    inputOptions: $Receivetc,
                  callback: function (result) {
                      
                    $scope.hr1.table = result;
                    
                    if (result !== null) {
                      
                      $http.post('./listtablesaa.php', angular.toJson($scope.hr1))
                          .then(function (respuestg) {

                            $Receiveg = respuestg.data

                            tabla($Receiveg)

                          }) 

                    }
                                     
                    }
                });
                
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

  var rowMenu = [
    {
        label:"<i class='fas fa-check-square'></i> Cambiar Tabla",
      action: function (e, row) {

        data = row.getData();
        angular.element(document.getElementById('content')).scope().listoptionst(data.keyhm);
        }
    },

  ]
  
  var headerMenu = function(){
    var menu = [];
    var columns = this.getColumns();

    for(let column of columns){

        //create checkbox element using font awesome icons
        let icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add(column.isVisible() ? "fa-check-square" : "fa-square");

        //build label
        let label = document.createElement("span");
        let title = document.createElement("span");

        title.textContent = " " + column.getDefinition().title;

        label.appendChild(icon);
        label.appendChild(title);

        //create menu item
        menu.push({
            label:label,
            action:function(e){
                //prevent menu closing
                e.stopPropagation();

                //toggle current column visibility
                column.toggle();

                //change menu item icon
                if(column.isVisible()){
                    icon.classList.remove("fa-square");
                    icon.classList.add("fa-check-square");
                }else{
                    icon.classList.remove("fa-check-square");
                    icon.classList.add("fa-square");
                }
            }
        });
    }

   return menu;
};


 table = new Tabulator("#tabletables", {
    data:datos,           //load row data from array
    layout:"fitDataStretch",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    pagination:"local",       //paginate the data
    paginationSize:50,         //allow 50 rows per page of data
    paginationCounter: "rows", //display count of paginated rows in footer
    rowContextMenu: rowMenu,
   movableColumns: true,
    groupBy:"Producer",     //allow column order to be changed
    initialSort:[             //set the initial sort order of the data
        {column:"keyhm", dir:"asc"},
    ],
    columns:[                 //define the table columns
        {title: "Clave", field: "keyhm", headerMenu:headerMenu },
        {title: "Clave INCA", field: "keyinca", headerMenu:headerMenu},
        {title: "Productor", field: "Producer", headerMenu:headerMenu},
        {title: "Tabla", field: "keytable", headerMenu:headerMenu},
    ],  
  });
   
  //trigger download of data.xlsx file
  document.getElementById("download-xlsx").addEventListener("click", function(){
      table.download("xlsx", "tablas_productores.xlsx", {sheetName:"Tablas"});
  });



};     