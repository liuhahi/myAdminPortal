var app = angular.module('cardsApp',['ngResource',
                                     'ui.router',
                                     'mwl.calendar',
                                     'ui.bootstrap',
                                     'app.directives.contactCard',
                                     'app.directives.sidebar',
                                     'app.directives.leavebar',
                                     'angularModalService'])
//var $injector = window.angular.injector(['ng']);
app.config(['$urlRouterProvider', '$stateProvider','$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
    // $urlRouterProvider.otherwise('/#/home');
    
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'cardsController'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      })      
      .state('contact', {
        url: '/contact',
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
      })
      .state('leavereport', {
        url: '/leavereport',
        templateUrl: 'templates/leavereport.html',
        controller: 'leavesController'
      })
      .state('leavereport.listview', {
        url: '/listview',
        templateUrl: 'templates/directives/listview.html',
        controller: 'leavesController'
      })
      .state('leavereport.calendarview', {
        url: '/calendarview',
        templateUrl: 'templates/directives/calendarview.html',
        controller: 'calendarController'
        // resolve:{
        //   message: function(messageService){
        //         return messageService.getMessage();
        // }
        // }
      });      
      // $urlRouterProvider.when('/leavereport',{redirectTo: '/home'});
      $locationProvider.html5Mode(true).hashPrefix('!');
  }]);


// app.config(function(calendarConfigProvider) {

//     calendarConfigProvider.setDateFormatter('moment'); // use moment to format dates

//     calendarConfigProvider.setDateFormatter('moment'); // use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

//     calendarConfigProvider.setDateFormats({
//       hour: 'HH:mm' //this will configure the hour view to display in 24 hour format rather than the default of 12 hour
//     });

//     calendarConfigProvider.setTitleFormats({
//       day: 'ddd D MMM' //this will configure the day view title to be shorter
//     });

//     calendarConfigProvider.setI18nStrings({
//       eventsLabel: 'Events', //This will set the events label on the day view
//       timeLabel: 'Time' //This will set the time label on the time view
//     });

//     calendarConfigProvider.setDisplayAllMonthEvents(true); //This will display all events on a month view even if they're not in the current month. Default false.

// });	


// app.service('leavereport',function($resource){
//     return $resource('leavereport');
// });

