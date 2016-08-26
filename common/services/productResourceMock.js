(function(){
    "use strict"
    var app = angular
        .module("productResourceMock",["ngMockE2E"]);

    app.run(function($httpBackend){

        var products = [
            {"productId": 1,
                "productName": "Sandisk 256GB",
                "productCode": "GDN-0011",
                "releaseDate": "December 9, 2009",
                "description": "Sandisk cruzer capacity of 8GB",
                "cost": 20,
                "price": 32.99,
                "category": "USB",
                "tags": ["usb","sandisk"],
                "imageUrl": "images/sandisk-32-gb-pendrive.jpg"},

            {"productId": 2,
                "productName": "Toshiba 8GB",
                "productCode": "TSN-0011",
                "releaseDate": "March 19, 2009",
                "description": "Toshiba usb penr capacity of 8GB",
                "cost": 25,
                "price": 39,
                "category": "USB",
                "tags": ["usb","toshiba"],
                "imageUrl": "http://img5a.flixcart.com/image/pendrive/q/y/j/toshiba-hayabusa-400x400-imad937ht9kp4jsz.jpeg"},

            {"productId": 3,
                "productName": "Dell i4",
                "productCode": "DRN-0013",
                "releaseDate": "June 18, 2008",
                "description": "Dell Inspiron N5110 i3 laptop",
                "cost": 430,
                "price": 496,
                "category": "Laptop",
                "tags": ["dell","i3"],
                "imageUrl": "images/delllap.jpg"},
            
            {"productId": 4,
                "productName": "Monster Octagon",
                "productCode": "MNH-1298",
                "releaseDate": "February 20, 2013",
                "description": "Best DJ headset with sound boost",
                "cost": 230,
                "price": 400,
                "category": "Accessories",
                "tags": ["monster","headset","headphone"],
                "imageUrl": "http://img.diytrade.com/smimg/2190442/42324739-3053562-0/Fashion_Monster_Headset_Monster_headphone_Monster_earphone_Monster_earpiece/20b9.png"
            },
            {"productId": 5,
                "productName": "Apple iPhone 6 Plus",
                "productCode": "APL-6001",
                "releaseDate": "october 20, 2014",
                "description": "Latest appple released iphone 6 and 6+",
                "cost": 998,
                "price": 1300,
                "category": "Mobile Phones",
                "tags": ["apple","iphone","iphone6"],
                "imageUrl": "http://cdn1.appleinsider.com/gallery/8917-326-mockup-140410-l.png"
            },
            {"productId": 6,
                "productName": "Boss Mens Watch",
                "productCode": "HBW-3313",
                "releaseDate": "january 1, 2011",
                "description": "Hugo Boss Chronograph Silver Dial Stainless Steel Mens Watch",
                "cost": 260,
                "price": 390,
                "category": "Mens Watch",
                "tags": ["watch","mens","boss","stainless"],
                "imageUrl": "http://media.truelocal.com.au/C/D/C877C4A8-93A5-4041-A5DD-F9A9585516FD/1343302892046_HugoBossMensWatchModel1512644-938x704.jpg"
            }
        ];

            var productUrl = "/api/products";
            $httpBackend.whenGET(productUrl).respond(products);
            
//          $httpBackend.whenGET(productUrl+"/1").respond(products[0]);
        
            var edirtingRegex = new RegExp(productUrl+"/[0-9][0-9]*",'');
            $httpBackend.whenGET(edirtingRegex).respond(function(method,url,data){
                var product = {"productId": 0};   
                var parametersArray = url.split('/');
                var length = parametersArray.length;
                var id = parametersArray[length-1];
                

                if(id>0){
                    for(var i=0; i < products.length; i++){
                     if(products[i].productId == id){
                      product = products[i];
                         break;
                     }
                    }
                }
                return[200,product,{}];
            });
        
        
       
        // add new product or update prduct
        $httpBackend.whenPOST(productUrl).respond(function(method,url,data){
            
            var product = angular.fromJson(data); //the data comming above is just an object of data, so this deserializes the passed in json string
            console.info(url);
            
            if(!product.productId){
                console.warn("New product added");
                // new product id
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else{
                console.warn("Produc edited");
                // update product
                for (var i=0; i < products.length ; i++){
                  if(products[i].productId == product.productId){
                    products[i] = product;
                      break;
                  };
                };
            };
            
            return [200, product, {}];
            
        });
        
        // pass through / ignore any request for application files
        $httpBackend.whenGET(/app/).passThrough();
        
    });
}());
