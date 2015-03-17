'use strict';
angular.module('GLedMovile.services')
.factory('ScaleService', function(_) {
	var scales = [{name:'Mi', category:'Pentatonica Mayor', withtonic:[86676,84628,84564,76370,21156,86676] , withouttonic:[82580,84500,68176,75858,21124,82580]}];
	var groupedScales = _.groupBy(scales, 'category');
	return {
		groupedScales: groupedScales
	};
});