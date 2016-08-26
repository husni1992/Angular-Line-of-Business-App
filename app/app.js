(function(){
    "use strict"; // to catch common errors in console
    var app = angular.module("productManagementMainModule",["ui.router","ui.mask","ui.bootstrap","common.services","productResourceMock","angularCharts"]);
    
//    exception handler
    app.config(function($provide){
       $provide.decorator("$exceptionHandler",["$delegate", function($delegate){
            return function(exception, cause){
                exception.message = "Please contact help desk ! \nMessage: "+exception.message;
                $delegate(exception, cause);
//                alert(exception.message);
                
                toastr.options = {
                  "closeButton": true,
                  "debug": false,
//                  "progressBar": true,
                  "positionClass": "toast-bottom-right",
                  "onclick": null,
                  "showDuration": "60000",
                  "hideDuration": "60000",
                  "timeOut": "60000",
//                  "extendedTimeOut": "50",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
                }
               toastr.error(exception.message,'Error');
                
            };
       }]) 
    });

    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/products");
        
            $stateProvider
            .state("productList",{
                url: "/products",
                templateUrl: "app/products/views/productListView.html",
                controller: "ProductListCtrl as vm"
            })  
            
            
   // product edits nested views , abstract property will prevent activating the state directly, hence it will automatically activated when child state activates         
            .state("productEdit",{
                abstract: true,
                url: "/products/edit/:productId",
                templateUrl: "app/products/views/product_edit/productEditView.html",
                controller: "ProductEditCtrl as vm",
                resolve: {
                    resource: "productResource",
                    
                    // "productx" is the key name to inject in controller for the data with same key name
                    product: function(resource, $stateParams){
                        var productId = $stateParams.productId;
                        return resource.get(
                            {productId: productId}).$promise;
                    }
                }                
            })    
            .state("productEdit.info",{
                url: "/info",
                templateUrl: "app/products/views/product_edit/productEdit_Info.html"
            })              
            .state("productEdit.price",{
                url: "/price",
                templateUrl: "app/products/views/product_edit/productEdit_Price.html"
            })              
            .state("productEdit.tags",{
                url: "/tags",
                templateUrl: "app/products/views/product_edit/productEdit_Tags.html"
//                controller: "productEditTagsCtrl as vmr" // if we specify a controller, both parent controller + child controller will work with DOM, can bind data or do anything from both controllers at once
            })            
            
            
            
            .state("productDetail",{
                url: "/productDetails/:productId",
                templateUrl: "app/products/views/productDetailView.html",
                controller: "productDetailCtrl as vm",
                resolve: {
                    // mockServer is the key name for "productResource" service
                    mockServer: "productResource",
                    
                    // "productx" is the key name to inject in controller for the data with same key name
                    productx: function(mockServer, $stateParams){
                        var productId = $stateParams.productId;
                        return mockServer.get(
                            {productId: productId}).$promise;
                    }
                }
            }) 
            
            .state("priceAnalytics",{
                    url: "/priceAnalytics",
                    templateUrl: "app/prices/priceAnalyticsView.html",
                    controller: "PriceAnalyticsCtrl",
                    resolve: {
                        productResource : "productResource",
                        
                        products: function(productResource){
                            return productResource.query(
                             function(response){
                                // no code needed for success as it injects the return dada to the constoller   
                                console.info(response);
                             },
                             function(response){
                                if(response.status == 404){
                                    alert("Error accessing resource: "+response.config.method+" "+response.config.url);
                                } else {
                                    alert(response.statusText)   
                                }
                             }
                                
                          ).$promise;
                        }
                    }})
            .state("savetophp",{
                url: "/save_to_php",
                templateUrl: "app/products/views/send_data_php.html",
                controller: "sendToPhpCtrl"
            })
            
    
    });
}()); 