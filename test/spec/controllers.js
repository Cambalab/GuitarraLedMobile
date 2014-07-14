'use strict';

describe('Controller: TodoCtrl', function () {

  var should = chai.should();

  // load the controller's module
  beforeEach(module('todo'));


  var todo, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    
    scope = $rootScope.$new();
       
    todo = $controller('TodoCtrl', {
      $scope: scope
    });
  
  }));
  it('should have no items to start', function () {
    expect(scope.tasks.length).to.equal(0);
  });
});
