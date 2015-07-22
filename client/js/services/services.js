app.service('MyCollectionService',function($resource){

    return $resource('api/data/collections/:collectionName');

});

app.factory('myLeaveObj',['MyCollectionService','$q',function(MyCollectionService,$q){

        var defer = $q.defer()
        var myservice = new MyCollectionService();
         myservice.$get({collectionName:'leavereport'},function(result){                     
           // $scope.leaves = result.responds;  
                var type = ['info','warning']
                var myObj = {}
                var varray=[];
                for(var i=0;i<result.responds.length;i++)
                {
                    var sdate = new Date(result.responds[i].startdate);
                    var edate = new Date(result.responds[i].enddate);
                    myObj.title     = result.responds[i].requester;
                    myObj.type      = type[i];
                    myObj.startsAt  = sdate;
                    myObj.endsAt    = edate;
                    myObj.draggable = true;
                    myObj.resizable = true;

                    varray.push(JSON.parse(JSON.stringify(myObj)))
                    myObj = {};
                }         
                //$scope.leaveArr=varray;
                defer.resolve(varray);    
                alert(varray)                               
        }); 

         alert(JSON.stringify(defer.promise))
         return defer.promise;
}]);
