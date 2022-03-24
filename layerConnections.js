import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';



export const baseMap =  new TileLayer({
    source: new OSM(),
  });


  export const TOPO250m = new TileLayer({
    source: new TileWMS({
      url: 'http://D-S4L69766:8080/geoserver/wms',
      params: {'LAYERS': 'quickstats:National Highways TOPO250m', 'TILED': true},
      serverType: 'geoserver',
      transition: 0,
      
    }),
  });

  export const pointLayer = new TileLayer({
    source: new TileWMS({
      url: 'http://D-S4L69766:8080/geoserver/wms',
      params: {'LAYERS': 'quickstats:point_search', 'TILED': true},
      serverType: 'geoserver',
      transition: 0,
      
    }),
  });

  export const lineLayer = new TileLayer({
    source: new TileWMS({
      url: 'http://D-S4L69766:8080/geoserver/wms',
      params: {'LAYERS': 'quickstats:linear_search', 'TILED': true},
      serverType: 'geoserver',
      transition: 0,
      
    }),
  });