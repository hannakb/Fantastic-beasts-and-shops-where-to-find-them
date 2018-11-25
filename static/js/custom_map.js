console.log("1235");

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "/analytics/personal_popular?macAddress=98:10:e8:00:53:a7", false ); // false for synchronous request
xmlHttp.send( null );
console.log(xmlHttp.responseText);
var points = JSON.parse(xmlHttp.responseText);
console.log(points);

ymaps.ready(function () {

    var LAYER_NAME = 'user#layer',
        MAP_TYPE_NAME = 'user#customMap',
        TILES_PATH = 'static/images/tiles',
        MAX_ZOOM = 2,
        PIC_WIDTH = 1826 / 4,
        PIC_HEIGHT = 1254 / 4;

    var Layer = function () {
        var layer = new ymaps.Layer(TILES_PATH + '/4_ya/row-%y-col-%x.jpg', {
            //notFoundTile: 'static/images/black.jpg'
        });
        //layer.getZoomRange = function () {
        //    return ymaps.vow.resolve([4]);
        //};
        return layer;
    };
    ymaps.layer.storage.add(LAYER_NAME, Layer);
    var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
    ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);

    var worldSize = Math.pow(2, 1) * 256,
        map = new ymaps.Map('map', {
            center: [0, 0],
            zoom: 3,
            controls: [],
            type: MAP_TYPE_NAME
        }, {
            projection: new ymaps.projection.Cartesian([[PIC_HEIGHT / 2 - worldSize, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, worldSize - PIC_WIDTH / 2]], [false, false]), 
            restrictMapArea: [[-PIC_HEIGHT / 2, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, PIC_WIDTH / 2]]
        });
   point = points[0][0];
    console.log(point);
   var x = (point[0] / 88 - 1/2) * PIC_HEIGHT;
    var y = (point[1] / 61 - 1/2) * PIC_WIDTH;
    console.log(x, y);
   x_rot = 0.8 * x - 0.6 * y
   y_rot = 0.6 * x + 0.8 * y
   console.log(x_rot, y_rot)
   cen = new ymaps.Circle([[x_rot, y_rot], 5], {}, {strokeOpacity: 0.3});
	map.geoObjects.add(cen);
	var centrs = {};
	ind = 0;
    for (var ind=0; ind < 5; ind++){
       console.log(ind, points[ind][0]);
	var point = points[ind][0]
         var x = (point[0] / 88 - 0.5) * PIC_HEIGHT;
	    var y = (point[1] / 61 - 0.5) * PIC_WIDTH;
	  x_rot = 0.8 * x - 0.6 * y
	    y_rot = 0.6 * x + 0.8 * y
	    console.log(x, y);
	centrs[ind] = new ymaps.Circle([[x_rot, y_rot], 5], {}, {strokeOpacity: 0.3});
        map.geoObjects.add(centrs[ind]);
    }
});

