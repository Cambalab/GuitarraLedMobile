angular.module('GLedMovile.directives',[]);
angular.module('GLedMovile.directives')
.directive('jTab',
  function () {
    return {
      restrict: 'EA',
      scope: {
        model: '=chord',
      },
      link: function (scope, element, attrs, controller) {
        scope.$watch('model', function(newValue, oldValue) {
          jtab.render(element, newValue);
        });
      },
    }
  }
)

;
