

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


function success(pos) {
	var crd = pos.coords;
 	$("#latitud").text(crd.latitude)
 	$("#longitud").text(crd.longitude)
	  console.log('Your current position is:');
	  console.log('Latitude : ' + crd.latitude);
	  console.log('Longitude: ' + crd.longitude);
	  console.log('More or less ' + crd.accuracy + ' meters.');
};


function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};



