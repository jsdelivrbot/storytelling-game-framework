// Hide Controls UI Component
var gameSave = function(scene) {
	$.post('/save', {"scene": scene }, async=true);
};
