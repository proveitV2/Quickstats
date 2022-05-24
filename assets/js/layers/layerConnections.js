import TileLayer from 'ol/layer/Tile';
import { Vector } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { Vector as vectorLayer } from 'ol/layer';
import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';

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
      LAYERS: 'quickstats:Marker_Posts',
      TILED: true,
    },
    serverType: 'geoserver',
    transition: 0,
  }),
  minZoom: 15,
});

export const Marker_Post_Vector_source = new Vector({
  url: './assets/js/layers/markerposts.geojson',
  format: new GeoJSON(),
  projection: 'EPSG:27700',
});
export const marker_layer = new vectorLayer({
  source: Marker_Post_Vector_source,
  name: 'marker_vector',
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

export const webAppLayers = new ImageWMS({
  url: 'http://D-S4L69766:8080/geoserver/wms',
  params: { LAYERS: 'quickstats:quickSTATS' },
  ratio: 1,
  serverType: 'geoserver',
});
