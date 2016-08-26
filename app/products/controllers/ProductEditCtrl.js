(function(){
    "use strict"
    
    var app = angular.module("productManagementMainModule");
        app.controller("ProductEditCtrl",["product","$stateParams","$state","productService",ProductEditCtrl]);
                       
       function ProductEditCtrl(product,$stateParams,$state,productService){
//           console.log(product);
            var vm = this;
            vm.product = product;

            vm.marginPercent = function(){
                return productService.calculateMarginPercent(vm.product.price,vm.product.cost);
            }
           
            vm.calculatePrice = function(){
                var price = 0;
                
                if(vm.priceOption == 'amount'){
                   price =  productService.calculatePriceFromAmount(vm.product.cost,vm.markupAmount);
                }
                if(vm.priceOption == 'percent'){
                    price = productService.calculatePriceFromPercent(vm.product.cost,vm.markupPercent);
                }  
                vm.product.price = price;
            }

            vm.toggleFormColor = function(){
                vm.blue = !vm.blue;  
            }

            vm.prodId = $stateParams.productId;
            vm.title = "Product Detail: "+vm.product.productName;
            
            if(vm.product && vm.product.productId){
                vm.title = "Edit: "+vm.product.productName;
               }
           else{
                vm.title = "New Product";   
              }
           
           vm.open = function($event){
               $event.preventDefault();
               $event.stopPropagation();
               
               vm.opened = !vm.opened;
           };
           
           vm.submit = function(valid){
               console.info("parameter recieved "+valid)
               if(valid){
                    vm.product.$save();
              //http://codeseven.github.io/toastr/demo.html
                toastr.options = {
                  "closeButton": false,
                  "debug": false,
//                  "progressBar": true,
                  "positionClass": "toast-bottom-right",
                  "onclick": null,
                  "showDuration": "300",
                  "hideDuration": "50",
                  "timeOut": "1000",
                  "extendedTimeOut": "50",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
                }
               toastr.success(vm.product.productName,'Saving');
                   
               }
               else{
                 toastr.options = {
                  "positionClass": "toast-bottom-right", "showDuration": "300", "timeOut": "2000"
                }
               toastr.error('Unable to save: '+vm.product.productName,'Invalid form entries');   
               }  
           };
           
           vm.cancel = function(){
               $state.go("productList");
               
              toastr.options = {
                  "positionClass": "toast-bottom-right",
                  "onclick": function(){alert("sasasa")},
                  "timeOut": "1000"
                }
              toastr.error('Canceled');
           };
           
  //         add new search tags to the selected product (Kurata Deborah)         
           vm.addTags = function(tags){
//               we can use try/catch instaed of if else, but this way is obvious
                if(tags){
                    var array = tags.split(',');
                    vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                    vm.newtag = "";
                }else{
                    alert("please enter one or more tags seperated by commas");
                }
               vm.product.$save();
               
               toastr.options = {
                  "positionClass": "toast-bottom-right",
                  "showDuration": "1000",
                  "hideDuration": "2000",
                  "timeOut": "1000",
                  "extendedTimeOut": "50",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
                }
               toastr.info(tags,"saved");
           };
           
           vm.saveit = function(){
             vm.product.$save(); 
               toastr.info("Tag removed");
           };
           
////         add new search tags to the selected product (I tried)
           
//           vm.newTag;
//           vm.addTag = function(){
//               vm.product.tags.push(vm.newtag);
//               vm.newtag=null;
//               vm.product.$save();
//           };

           
        };
                       
}());