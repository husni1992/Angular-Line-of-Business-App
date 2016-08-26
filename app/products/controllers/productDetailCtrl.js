(function(){
    "use strict"
    
    var app = angular.module("productManagementMainModule");
        app.controller("productDetailCtrl",
                       ["productx","$stateParams","productResource","productService",productDetailCtrl]); // if we define the dependencies in array in here, any extra dependencies cannot be used in the controller function arguements, mint safe array of dependancies
                       
        function productDetailCtrl(productx,$stateParams,productResource,productService){
            
            var vm = this;
            vm.product = productx;
            
//            using busines logic here
            
            vm.marginPercent = productService.calculateMarginPercent(vm.product.price,vm.product.cost);
            
            vm.marginAmount = productService.calculateMarginAmount(vm.product.price,vm.product.cost);
            
            vm.calpercent = function(percent){
                vm.priceAtPercent = productService.calculatePriceFromPercent(vm.product.cost,percent);
                vm.showPercent = vm.reqPercent; 
                vm.reqPercent = null;
            }
            
            
 
            vm.title = "Product Detail: "+vm.product.productName;
            
                if(vm.product.tags){
                    vm.product.tagList = vm.product.tags.toString();   // convert array to string by toString(); 
                }
            
            //same thing done inside the controller without using resolve in route, in here we have to resolve the $promise by .then(data)
//            var getdata = function(){
//                        var productId = $stateParams.productId;
//                        return productResource.get(
//                            {productId: productId}).$promise;
//                    }
//            
//            vm.productSame = getdata().then(function(result){
//                console.error(result);
//            });
            
        };
                       
}());