(function(){
    "use strict"
    angular.module("productManagementMainModule")
        .controller("sendToPhpCtrl",function($scope){
        
            $scope.data;
        
            $scope.sendtophp = function(){
            
            var products_array = {"productId": 1,
                                "productName": "Sandisk 256GB",
                                "productCode": "GDN-0011",
                                "releaseDate": "December 9, 2009",
                                "description": "Sandisk cruzer capacity of 8GB",
                                "cost": 20,
                                "price": 32.99,
                                "category": "USB",
                                "tags": ["usb","sandisk"],
                                "imageUrl": "images/sandisk-32-gb-pendrive.jpg"
                             };
            
            var jsonString = JSON.stringify(products_array);
            $.ajax({
                type: "POST",
                url: "http://localhost/lynda_php-mysql/php_web_pages/Forms_and_data/angular_ajax_post/post_data_from_angular.php",
//                data: {data : jsonString}, 
                data: {data : $scope.data}, 
                cache: false,

                success: function(){
                console.info("Success");
                }
            });

        };
        
        
    })
}());