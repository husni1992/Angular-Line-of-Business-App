(function(){
    "use strict"
        angular.module("productManagementMainModule")
            .directive('mynames', function() {
                return {
                    template: 'Name: {{vm.product.productName}} Code: {{vm.product.productCode}}'
                };
            });
}());   