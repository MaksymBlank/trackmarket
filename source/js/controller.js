(function(){
    var app = angular.module('trackMarketApp');
    app.controller('trackMarketCtrl', function($scope, $http){
        
        $scope.items = [];
        $scope.query = {
            name: 'Iphone',
            location: 'Chicago, IL',
            price_min: undefined,
            price_max: undefined,
            sort: undefined,
            radius: 30
        }


        $scope.getItems = function(query, callback){
            var URL;
            if(query){
                /**
                 * Make URL by query and send request to server
                 * URL = http://localhost:3000/data/items?
                 *              q=query.name&
                 *              location=query.location&
                 *              price_min=query.price_min&
                 *              price_max=query.price_max&
                 *              sort=query.sort&
                 *              radius=query.radius
                 */
                URL = 'http://localhost:3000/data/items.json';
            }else{
                /**
                 * Default URL
                 */
                URL = 'http://localhost:3000/data/items.json';
            }
            
            $http({
                method: 'GET',
                url: URL
            }).then(function(response){
                // if callback is defined, sends it
                if(callback){
                    callback(response.data);
                }else{
                    $scope.items = response.data;
                }
            }, function(response){
                /**
                 * Error
                 */
                swal({
                    title: "Oops!",
                    text: "Unknown error!",
                    icon: "warning",
                    button: "ok",
                  });
            })
        }

        /**
         * Loads item after clicking on button 'load more'
         */
        $scope.loadMore = function(){
            $scope.getItems($scope.query, function(data){
                for(var i=0;i<data.length;i++){
                    $scope.items.push(data[i]);
                }
            });
        }
    });
})();