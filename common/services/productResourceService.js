(function(){
    "use struct";
    angular
        .module("common.services")
        .factory("productResource",productResources);
    
        function productResources($resource){
//            console.info("productResourceServiceModule started");
            return $resource("/api/products/:productId");
        };
    
}());