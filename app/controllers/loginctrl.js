angular.module("portal").controller("loginCtrl", function ($scope, simpleService, $location, config, $timeout, $sessionStorage) {
    $scope.app = "portal";
    $scope.clinicas = [];
    $scope.frm = {
        bd : 'clinicatodos'
    }
    $scope.ListClinicas = ["Diite Usuario e Senha"];
    $scope.processando = 0;

    console.log("login controle");


    $scope.SenhaKeyPress = function() {
        var agora = document.querySelector("[id='IPTsenha']").value;
       $timeout(function () { $scope.SenhaFinal(agora); }, 400);
    };

    $scope.UserKeyPress = function() {
        var agora = document.querySelector("[id='IPTusuario']").value;
       $timeout(function () { $scope.SenhaFinalUser(agora); }, 1000);
    };

    $scope.SenhaFinal = function(e) {
        //console.log("GET  - clinicas");  console.log($scope.frm);   console.log(e + " - "+ $scope.frm.senha );
        if((e == $scope.frm.senha) && ($scope.frm.usuario !== 'admin') && ($scope.processando !== 1)){ $scope.processando = 1; $scope.getLogarClinicas($scope.frm);  }
    };

     $scope.SenhaFinalUser = function(e) {
        //console.log("GET  - clinicas");  console.log($scope.frm);  console.log(e + " - "+ $scope.frm.senha );
        if((e == $scope.frm.usuario) && ($scope.frm.senha !== '1234') && ($scope.processando !== 1)){ $scope.processando = 1; $scope.getLogarClinicas($scope.frm);  }
    };

    $scope.getLogarClinicas = function(objDados) {
        console.log("getAPI getLogarClinicas ");
            simpleService.getLogarClinicas(objDados)
                .then(function (data) {
                    $scope.processando = 0;
                    console.log("retorno getLogarClinicas");
                    console.log(data);  console.log(data.data);
                    if(data.data.dados.length > 0){
                        console.log("senha ok");
                        $scope.ListClinicas =  angular.copy(data.data.dados);
                        $scope.ShowMsgSusses('msgLogar');
                        $scope.senhaOk = true;
                        $("#idClinicas" ).focus();
                    }else{
                        console.log("senha erro");
                    }  
            });
    };

    $scope.setClinica = function(idClinica,clinica,prestador) {
        console.log("escolha clinica");
        console.log(idClinica + " - "+ clinica);

        $scope.frm.clinicaSelec = clinica;
        //$scope.frm.clinica = clinica;
        $scope.frm.IdClinica = idClinica;

        $scope.frm.IdPrestador = prestador;
       
    };

    $scope.ShowMsgSusses = function(id) {
        $("#"+id).addClass("AddBlock");
        $("#"+id).addClass("showSimplesEFEC");
        $timeout(function () { $("#"+id).removeClass("AddBlock");  $("#"+id).removeClass("showSimplesEFEC"); }, 3500);
    };
  


    $scope.LogarSistema = function(idClinica,clinica) {
        console.log("Redireciona sistema");
        console.log("sessionStorage");
        $sessionStorage.putObject('UserWebDental', $scope.frm);
        ///localStorage.setItem("lastname", "Smith");
        //var a = localStorage.getItem("lastname");
        var a = $sessionStorage.getObject('UserWebDental');
         console.log(a.usuario);
        //sessionStorage.setItem('WebDental', 'JSON.stringify($scope.frm)');
        //sessionStorage.clickcount = 1;
        //Window.localStorage.tokenSPMS = 'aaaaaaaaaaaa';
        //$window.sessionStorage.setItem("SavedString","I'm a value saved with SessionStorage");
        if($scope.senhaOk){
            $location.path('/Agenda-do-dia');
        }else{
            console.log("erro msg");
             $scope.ShowMsgSusses('msgLogarErro');
        }

    };

    
});