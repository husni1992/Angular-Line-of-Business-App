(function(){
    "use strict";
    var app = angular.module("common.services");
        app.factory("productService",function(){
            
            console.info("productService started");
            
            var factoryApi = {};
            
            factoryApi.calculateMarginPercent = function(price, cost){
                var margin = 0;
                if(price && cost){
                    margin = (100*(price-cost)) / price;
                }
                margin = Math.round(margin);
                return margin;
            }
            
            factoryApi.calculateMarginAmount = function(price, cost){
                var marginAmount = 0;
                if(price && cost){
                       marginAmount = (price - cost);
                }
                return marginAmount;
            }
            13.5 ,1425
            factoryApi.calculatePriceFromPercent = function(cost, percent){
//                alert("cost is "+cost+"\npercent is "+percent)
                var price = 0;
                if(cost && percent){
                    price = cost + (cost*percent/100); 
                    price = Math.round(price*100)/100;  
                }
                return price;
            }
            
            factoryApi.calculatePriceFromAmount = function(cost,amount){
                var price = cost;
                if(cost && amount){
                    price = cost+amount;
                    price = (Math.round(price*100))/100;
                }
                return price; 
            }
            
            return factoryApi;
        })
    
}());