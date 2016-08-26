(function(){
    "use strict";
    
    angular.module("productManagementMainModule")
        .controller("PriceAnalyticsCtrl",PriceAnalyticsCtrl);
    
        function PriceAnalyticsCtrl($scope,$filter,products,productService){
            $scope.title="Price Analytics Charts";
            
            for(var i=0; i < products.length; i++){
                products[i].marginPercent = productService.calculateMarginPercent(products[i].price,products[i].cost);
                products[i].marginAmount = productService.calculateMarginAmount(products[i].price,products[i].cost);
                
            }
            

            
            var orderProductAmount = $filter("orderBy")(products, "marginAmount");
            var filteredProductsAmount = $filter("limitTo")(orderProductAmount, 5);  
            var chartDataAmount = [];
            for(var i = 0; i < filteredProductsAmount.length; i++){
                  chartDataAmount.push({
                    x: filteredProductsAmount[i].productName,
                    y: [filteredProductsAmount[i].cost,
                        filteredProductsAmount[i].price,
                        filteredProductsAmount[i].marginAmount]  
                  }); 
            };
            $scope.dataAmount = {
                series: ["Cost", "Price", "Margin Amount"],
                data: chartDataAmount
            };
            
            $scope.configAmount = {
                title: "Top $ Margin Products",
                tooltips: true,
                labels: false,
                onmouseover: function(){},
                onmouseout: function() {},
                click: function(){alert("wow")},
                legend: {
                    display: true,
                    position: "right"
                }
            };
            
            
            var orderProductPercent = $filter("orderBy")(products, "marginPercent");
            var filteredProductsPercent = $filter("limitTo")(orderProductPercent, 5);
            var chartDataPercent = [];
            for(var i = 0; i < filteredProductsPercent.length; i++){
                  chartDataPercent.push({
                    x: filteredProductsPercent[i].productName,
                    y: [filteredProductsPercent[i].marginPercent]
                  }); 
            };
            $scope.dataPercent = {
                series: ["Margin %"],
                data: chartDataPercent
            };
            
            $scope.configPercent = {
                title: "Top % Margin Products",
                tooltips: true,
                labels: false,
                onmouseover: function(){},
                onmouseout: function() {},
                click: function(){},
                legend: {
                    display: true,
                    position: "right"
                }
            };

        };
}());