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
        PIC_WIDTH = 1024 / 2,
        PIC_HEIGHT = 768 / 2;

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

});
