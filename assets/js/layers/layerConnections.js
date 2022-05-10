import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

export const Bollards = new TileLayer({
  title: 'Bollards',
  fold: 'open',
  source: new TileWMS({
    url: 'http://D-S4L69766:8080/geoserver/wms',
    params: { LAYERS: 'quickstats:Bollards', TILED: true },
    serverType: 'geoserver',
    transition: 0,
  }),
});

export const Marker_Posts_combined_April_2022 = new TileLayer({
  title: 'Marker_Posts',
  fold: 'open',
  source: new TileWMS({
    url: 'http://D-S4L69766:8080/geoserver/wms',
    params: {
      LAYERS: 'quickstats:Marker_Posts_combined_April_2022',
      TILED: true,
    },
    serverType: 'geoserver',
    transition: 0,
  }),
  minZoom: 15,
});

export const Networked_Asset = new TileLayer({
  title: 'Networked_Asset',
  fold: 'open',
  source: new TileWMS({
    url: 'http://D-S4L69766:8080/geoserver/wms',
    params: { LAYERS: 'quickstats:Networked_Asset', TILED: true },
    serverType: 'geoserver',
    transition: 0,
  }),
  minZoom: 15,
});

export const Weather_Station = new TileLayer({
  title: 'Weather_Stations',
  fold: 'open',
  source: new TileWMS({
    url: 'http://D-S4L69766:8080/geoserver/wms',
    params: { LAYERS: 'quickstats:Weather Station', TILED: true },
    serverType: 'geoserver',
    transition: 0,
  }),
});

export const pointLayer = new TileLayer({
  title: 'PointLayer',
  fold: 'open',
  source: new TileWMS({
    url: 'http://D-S4L69766:8080/geoserver/wms',
    params: { LAYERS: 'quickstats:point_search', TILED: true },
    serverType: 'geoserver',
    transition: 0,
  }),
});

export const lineLayer = new TileLayer({
  title: 'lineLayer',
  fold: 'open',
  source: new TileWMS({
    url: 'http://D-S4L69766:8080/geoserver/wms',
    params: { LAYERS: 'quickstats:linear_search', TILED: true },
    serverType: 'geoserver',
    transition: 0,
  }),
});
