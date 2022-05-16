import './assets/css/style.css';
import 'ol-popup/src/ol-popup.css';
import olms from 'ol-mapbox-style';
import { Map, View } from 'ol';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { Vector as VectorLayer } from 'ol/layer';
import Popup from 'ol-popup/src/ol-popup';
import { Style, Icon } from 'ol/style';

proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
    '+x_0=400000 +y_0=-100000 +ellps=airy ' +
    '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
    '+units=m +no_defs'
);
register(proj4);

const map = new Map({
  target: 'map',
});

map.setView(
  new View({
    center: fromLonLat([-118.805, 34.027]),
    zoom: 12,
  })
);

const apiKey =
  'AAPK5939e16922f44834a285c4f93fbd8c0fvRnmKdD61VDVk-pJNr2YR05lw3bsBseP9ypKsFv2aaaUgbKb0UcJlyLK4m2tz-89';
const basemapId = 'ArcGIS:Streets';

const basemapURL =
  'https://basemaps-api.arcgis.com/arcgis/rest/services/styles/' +
  basemapId +
  '?type=style&token=' +
  apiKey;

olms(map, basemapURL).then(function (map) {
  const bollardStyle = function (feature) {
    return new Style({
      image: new Icon({
        src: 'assets/media/Marker_Post_sml2.png',
        scale: 1.5,
      }),
    });
  };
  const pointLayerName = 'Trailheads';
  const pointLayerURL =
    'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/' +
    pointLayerName +
    '/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson';
  const point =
    'https://services2.arcgis.com/4mdxlPzHnZKtJJX9/arcgis/rest/services/HE_Points/FeatureServer/8/query?where=1+%3D+1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=xlrW3Cy8gVmwBq1h5WkNGTxBjISuGw7HefiXQ0n1YK1bzygz3NQyiKRWE3NFtJw7gqCvM5zW4cNz5NlWlH3bFWLU2DW80uh-lDiB3ehxwMomU6UhdOION2Q8Vso9435TPavoEmRa7q1QtnSpOJFoZ9o5tXrtQozpJ-2W0Sq2rNJbAOrjZgZ4KijoeE_t5fIZqzwDvepO545QEFf7yuy0K_zHc85aVhZhETKYlQbQYZfTe_eYChWvzCVCejYlrY92nj_z_vnlx7_kxOudAroC5w..';
  const pointSource = new VectorSource({
    format: new GeoJSON(),
    url: point,
  });

  const pointLayer = new VectorLayer({
    source: pointSource,
    style: bollardStyle,
    declutter: true,
  });
  map.addLayer(pointLayer);

  const popup = new Popup();
  map.addOverlay(popup);

  map.on('click', (event) => {
    let feature = map.getFeaturesAtPixel(event.pixel, {
      layerFilter: (l) => l === pointLayer,
    })[0];
    if (feature) {
      console.log(feature);
      popup.show(
        event.coordinate,
        `<h4>${feature.get('TYPE')}</h4>${feature.get('OWNER')}`
      );
      return;
    }
    popup.hide();
  });
});
