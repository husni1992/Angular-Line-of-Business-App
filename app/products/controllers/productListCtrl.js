(function(){
    "use strict"
    angular.module("productManagementMainModule")
        .controller("ProductListCtrl",ProductListCtrl);
    
    function ProductListCtrl(productResource,$scope,$state){
        
        var vm = this;
        
        $scope.searchString = "";

        productResource.query(function(data) {
             vm.products = data;
        });
        
        $scope.showornot = "show"; 
        vm.showImage = false;
        vm.toggleImage = function(){
            vm.showImage = !vm.showImage;
            $scope.showornot = "hide";
        };
        
    };
    
}());

    