console.log("1235");

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "/analytics/common_popular", false ); // false for synchronous request
xmlHttp.send( null );
console.log(xmlHttp.responseText);
var points = JSON.parse(xmlHttp.responseText);
console.log(points);

ymaps.ready(function () {

    var LAYER_NAME = 'user#layer',
        MAP_TYPE_NAME = 'user#customMap',
        TILES_PATH = 'static/images/tiles',
        MAX_ZOOM = 2,
        PIC_WIDTH = 384,
        PIC_HEIGHT = 512;

    var Layer = function () {
        var layer = new ymaps.Layer(TILES_PATH + '/%z/part-%y-%x.png', {
            //notFoundTile: 'static/images/black.jpg'
        });
        layer.getZoomRange = function () {
            return ymaps.vow.resolve([4]);
        };
        return layer;
    };
    ymaps.layer.storage.add(LAYER_NAME, Layer);
    var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
    ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);

    var worldSize = Math.pow(2, MAX_ZOOM) * 256,
        map = new ymaps.Map('map', {
            center: [0, 0],
            zoom: 1,
            controls: [],
            type: MAP_TYPE_NAME
        }, {
            projection: new ymaps.projection.Cartesian([[PIC_HEIGHT, 0], [0, PIC_WIDTH]], [false, false]), 
            restrictMapArea: [[0, 0], [PIC_HEIGHT, PIC_WIDTH]]
        });

    for (i in points) {
	console.log(points[i]);
	console.log([points[i][0][1], points[i][0][0]]);
	var c = new ymaps.Circle([[points[i][0][1], points[i][0][0]], 1], {}, {fillColor: "ff0000"});
        map.geoObjects.add(c);
    }
    var c1 = new ymaps.Circle([[100, 100], 10], {}, {fillColor: "ff0000"});
    var c2 = new ymaps.Circle([[200, 200], 10], {}, {fillColor: "ff0000"});
    var c3 = new ymaps.Circle([[300, 300], 10], {}, {fillColor: "ff0000"});
    var c4 = new ymaps.Circle([[50, 50], 10], {}, {fillColor: "ff0000"});
    var c5 = new ymaps.Circle([[150, 150], 10], {}, {fillColor: "ff0000"});
    var c6 = new ymaps.Circle([[250, 250], 10], {}, {fillColor: "ff0000"});
    //map.geoObjects.add(c);
    //map.geoObjects.add(c1);
    //map.geoObjects.add(c2);
    //map.geoObjects.add(c3);
    //map.geoObjects.add(c4);
    //map.geoObjects.add(c5);
    //map.geoObjects.add(c6);
});
