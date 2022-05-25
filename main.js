import './assets/css/style.css';
import './node_modules/ol-ext/dist/ol-ext.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import 'ol-geocoder/dist/ol-geocoder.css';
import { Map, View } from 'ol';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import MousePosition from 'ol/control/MousePosition';
import * as olCoordinate from 'ol/coordinate';
import { defaults } from 'ol/interaction';
import {
  Bollards,
  Networked_Asset,
  Marker_Posts_combined_April_2022 as MarkerPost,
  Weather_Station,
  pointLayer,
  lineLayer,
} from './assets/js/layers/layerConnections';
import drawFeatureButton from './custom_tools/DrawFeatures';
import { draw_on } from './custom_tools/DrawFeatures';
import LocateUser from './custom_tools/locateUser';
import { ScaleLine } from 'ol/control';
import MeasuringTool from './custom_tools/measuringTool';
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcher';
import { Group as LayerGroup } from 'ol/layer';
import {
  openStreetMapStandard,
  stamenTerrain,
  esriStandard,
} from './assets/js/basemaps/basemaps.js';
import Legend from './custom_tools/Legend';
import Popup from 'ol-popup/src/ol-popup';
import { geocode, reverseGeocode } from '@esri/arcgis-rest-geocoding';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import SearchFeature from 'ol-ext/control/SearchFeature';
import Select from 'ol/interaction/Select';

proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
    '+x_0=400000 +y_0=-100000 +ellps=airy ' +
    '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
    '+units=m +no_defs'
);
register(proj4);

let QUERY_LAYERS = '';

let mapView = new View({
  center: [339861.7958798604, 100319.43155530083],
  zoom: 10,
  projection: 'EPSG:27700',
});

const map = new Map({
  target: 'map',
  layers: [
    new LayerGroup({
      title: 'Base maps',
      layers: [openStreetMapStandard, esriStandard, stamenTerrain],
    }),
    new LayerGroup({
      title: 'Area 3 quickSTATS',
      openInLayerSwitcher: true,

      layers: [
        Bollards,
        Networked_Asset,
        MarkerPost,
        Weather_Station,
        pointLayer,
        lineLayer,
      ],
    }),
  ],
  view: mapView,
  interactions: defaults({ doubleClickZoom: false }), // disables double click zoom
});

map.addControl(new LayerSwitcherImage({}));

// let currZoom = map.getView().getZoom();
// map.on('moveend', (e) => {
//   let newZoom = map.getView().getZoom();
//   if (currZoom != newZoom) {
//     console.log('zoom end, new zoom: ' + newZoom);
//     currZoom = newZoom;
//   }
// });
// let layersListForLegend = [];
// const layerArray = map.getLayers().getArray();
// layerArray[1].values_.layers.array_.map((layer) => {
//   let layerParams = layer.getSource().params_;
//   layersListForLegend.push(layer.ol_uid);
//   console.log(layer.values_.minZoom);
//   console.log(layer);
//   const legend = document.getElementsByClassName('figure');
//   const symbols = document.createElement('img');
//   symbols.setAttribute(
//     'src',
//     layer.getSource().getLegendUrl(undefined, layerParams)
//   );
//   symbols.setAttribute('class', 'rounded float-left');

//   legend.item(0).appendChild(symbols);
// });

// const updateLegend = function (resolution) {
//   const graphicUrl = webAppLayers.getLegendUrl(resolution);
//   const img = document.getElementById('legend');
//   img.src = graphicUrl;
// };
// const resolution = map.getView().getResolution();
// updateLegend(resolution);

// // Update the legend when the resolution changes
// map.getView().on('change:resolution', function (event) {
//   const resolution = event.target.getResolution();
//   updateLegend(resolution);
// });

map.addControl(new Legend({ map: map, view: mapView }));

const layerArray = map.getLayers().getArray();
layerArray[1].values_.layers.array_.forEach((layer) => {
  let layerParams = layer.getSource().params_;
  if (layerParams) {
    QUERY_LAYERS += layerParams.LAYERS + ',';
  }
});

const drawFeatures = new drawFeatureButton({ map: map, view: mapView });
map.addControl(drawFeatures); // adds drawing control button
// console.log(draw_on);

function layerQuery(featureArray) {
  // when user clicks on the map this function will be run.
  // the features which are captured in the click event
  // are loaded into the featureArray variable.
  // The forEach array method below then iterates
  // through them to build the popup tabs and display
  //the feature information in them

  const getTab = document.getElementById('myTab');
  const getTabContent = document.getElementById('myTabContent');
  getTabContent.innerHTML = '';
  getTab.innerHTML = '';
  // console.log(featureArray);
  // the following lines of code build the tabs from the Geojson
  featureArray.forEach((item, index) => {
    let regexMatchTitle = featureArray[index].id.match(/.+?(?=\.\d+$)/);

    // activates the tab corresponding to the 0 index
    let activeTabTop;
    let activeTabBottom;
    let activeTabSelected;

    if (index == 0) {
      activeTabTop = ' active';
      activeTabBottom = ' show active';
      activeTabSelected = true;
    } else {
      activeTabTop = '';
      activeTabBottom = '';
      activeTabSelected = false;
    }
    let newListElem = document.createElement('li');
    newListElem.innerHTML = `<a class="nav-link${activeTabTop}" id="feature${index}-tab" data-toggle="tab" href="#feature${index}" role="tab"aria-controls="feature${index}" aria-selected="${activeTabSelected}">${regexMatchTitle}</a>`;
    getTab.append(newListElem);

    let setDivAttrs = document.createElement('div');
    setDivAttrs.setAttribute('class', `tab-pane fade${activeTabBottom}`);
    setDivAttrs.setAttribute('id', `feature${index}`);
    setDivAttrs.setAttribute('role', 'tabpanel');
    setDivAttrs.setAttribute('aria-labelledby', `feature${index}-tab`);
    getTabContent.append(setDivAttrs);

    const appendElem = document.getElementById(`feature${index}`);

    // build card elements
    let setDivAttrs2 = document.createElement('div');
    setDivAttrs2.setAttribute('class', 'card-body');
    appendElem.append(setDivAttrs2);

    const setH5Attrs = document.createElement('h5');
    setH5Attrs.setAttribute('class', 'card-header');
    setH5Attrs.setAttribute('id', `attr-title${index}`);
    setDivAttrs2.append(setH5Attrs);

    // build the ul elements where the the li tags will be appended
    const setUlAttrs = document.createElement('ul');
    setUlAttrs.setAttribute('class', 'list-group list-group-flush');
    setUlAttrs.setAttribute('id', `attr-list${index}`);
    setDivAttrs2.append(setUlAttrs);

    const attrPopup = document.getElementById(`attr-list${index}`);
    document.getElementById(`attr-list${index}`).innerHTML = '';
    document.getElementById(`attr-title${index}`).innerText = regexMatchTitle;
    let featuresProperties2 = item.properties;

    for (let key in featuresProperties2) {
      if (featuresProperties2.hasOwnProperty(key) && key != 'OBJECTID') {
        // build the li tags to contain the feature attributes
        let newItem2 = document.createElement('li');
        newItem2.setAttribute('class', 'list-group-item');
        newItem2.innerHTML = `<strong>${key}: </strong>${featuresProperties2[key]}`;
        attrPopup.append(newItem2);
      }
    }

    // console.log(getTabContent);
  });
}

// get feature info as a Geojson display with modal
map.on('singleclick', (evt) => {
  const viewResolution = mapView.getResolution();
  const url = lineLayer
    .getSource()
    .getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:27700', {
      INFO_FORMAT: 'application/json',
      QUERY_LAYERS: QUERY_LAYERS.slice(0, -1),
      LAYERS: QUERY_LAYERS.slice(0, -1),
      FEATURE_COUNT: 10,
    });

  if (!draw_on) {
    // while drawing, the popup will not appear
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((jsonResp) => {
          if (jsonResp.features.length < 1) {
            // console.log(jsonResp.features, 'nothing');
          } else {
            // console.log(jsonResp.features)

            layerQuery.bind(this)(jsonResp.features);
            // console.log('draw on:', draw_on);
            $('#testmodal').modal('show');
            $('#myTab a').click(function (e) {
              e.preventDefault();
              $(this).tab('show');
            });
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  }
});
// // 123test button
// document.getElementById('test-button').addEventListener('click', function() {
//   console.log(document.querySelector('myTabContent'))

//   layerQuery.bind(this)(featuresGeoJson)
//   console.log('draw on:', draw_on, selectedGeomType, featureGeom)

//   $('#testmodal').modal('show')
//   $('#myTab a').click(function (e) {
//     e.preventDefault()
//     $(this).tab('show')
//   })
// });

// add mouse position to application as easting and northing
const mousePosition = new MousePosition({
  className: 'mousePosition ol-unselectable ol-control',
  projection: 'EPSG 27700',
  coordinateFormat: (coordinate) => {
    return olCoordinate.format(coordinate, '{x}, {y}');
  },
});
map.addControl(mousePosition);

// draw.on('drawend', function(evt){
//   //let clickedCoo = evt.feature.getGeometry().getArea()
//   const coordinate = evt.feature.getGeometry().flatCoordinates;

//   map.getView().animate({zoom: 15, center:[540055.3264104014, 141854.6262954283]})

//   console.log(coordinate)
//   // SaveDatatodb(coordinate[0], coordinate[1])

//   //content.innerHTML =
//   overlay.setPosition(coordinate);
//  // console.log(clickedCoo)

// })

const locate = new LocateUser({ map: map, view: mapView });
map.addControl(locate);

const scaleBar = new ScaleLine({
  bar: true,
  steps: 4,
});
map.addControl(scaleBar);

const measuringTool = new MeasuringTool({ map: map });
map.addControl(measuringTool);

//Instantiate with some options and add the Control
// let geocoder = new Geocoder('nominatim', {
//   provider: 'osm',
//   lang: 'en',
//   placeholder: 'Search for ...',
//   limit: 5,
//   debug: false,
//   autoComplete: true,
//   keepOpen: true,
// });

let popup = new Popup();
// map.addControl(geocoder);
map.addOverlay(popup);

//Listen when an address is chosen
// geocoder.on('addresschosen', function (evt) {
//   console.info(evt);
//   window.setTimeout(function () {
//     popup.show(evt.coordinate, evt.address.formatted);
//   }, 3000);
// });
const apiKey =
  'AAPK5939e16922f44834a285c4f93fbd8c0fvRnmKdD61VDVk-pJNr2YR05lw3bsBseP9ypKsFv2aaaUgbKb0UcJlyLK4m2tz-89';
const re = new RegExp(/^(\d{6}),?\s?\s*(\d{5,6})$/);
const re_markerPosts = new RegExp(/[a-zA-Z\s0-9_/]{3,4}/);
document.getElementById('geocode-button').addEventListener('click', () => {
  const query = document.getElementById('geocode-input').value;

  const authentication = ApiKeyManager.fromKey(apiKey);
  // console.log(re.test(query));
  if (!re.test(query)) {
    const center = mapView.getCenter();
    geocode({
      singleLine: query,
      authentication,
      countryCode: 'GBR',

      params: {
        outFields: '*',
        location: center.join(','),
        outSR: 27700,
      },
    })
      .then((response) => {
        // console.log(response);
        response['candidates'].forEach((candidate) => {
          // console.log(candidate.attributes.LongLabel);
        });
        const result = response.candidates[0];
        if (!result === 0) {
          alert("That query didn't match any geocoding results.");
          return;
        }

        const coords = [result.location.x, result.location.y];

        popup.show(coords, result.attributes.LongLabel);
        // map.getView().setCenter(coords);
        map.getView().animate({
          center: coords,
          zoom: Math.max(map.getView().getZoom(), 17),
        });
        $('.advancedAutoComplete').autoComplete('clear');
      })

      .catch((error) => {
        alert(
          'There was a problem using the geocoder. See the console for details.'
        );
        console.error(error);
      });
  } else {
    const x = parseInt(query.match(re)[1]);
    const y = parseInt(query.match(re)[2]);

    reverseGeocode(
      { x: x, y: y, spatialReference: { wkid: 27700 } },
      { authentication: authentication }
    )
      .then((response) => {
        // console.log(response);
        const result = response; //.candidates[0];
        if (!result === 0) {
          alert("That query didn't match any geocoding results.");
          return;
        }

        const coords = [result.location.x, result.location.y];

        popup.show([x, y], result.address.LongLabel);
        map.getView().animate({
          center: [x, y],
          zoom: Math.max(map.getView().getZoom(), 17),
        });
      })

      .catch((error) => {
        alert(
          'There was a problem using the geocoder. See the console for details.'
        );
        console.error(error);
      });
  }
});

$('.advancedAutoComplete').autoComplete({
  resolver: 'custom',
  events: {
    search: function (qry, callback) {
      const center = mapView.getCenter();
      const authentication = ApiKeyManager.fromKey(apiKey); // let's do a custom ajax call
      if (!re.test(qry) && !re_markerPosts.test(qry)) {
        geocode({
          singleLine: qry,
          authentication,
          countryCode: 'GBR',

          params: {
            outFields: '*',
            location: center.join(','),
            outSR: 27700,
          },
        })
          .then((response) => {
            let suggestions = [];
            response.candidates.forEach((candidate) => {
              suggestions.push(candidate.attributes.LongLabel);
            });
            callback(suggestions);
          })

          .catch((error) => {
            alert(
              'There was a problem using the geocoder. See the console for details.'
            );
            console.error(error);
          });
      } else {
        // console.log('markerpost!');
        let results = [];
        let requestJson =
          'http://d-s4l69766:8080/geoserver/quickstats/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=quickstats%3AMarker_Posts_combined_April_2022&maxFeatures=5&outputFormat=application%2Fjson&CQL_FILTER=Road_MP_DIR%20Ilike%20%27%25' +
          qry +
          '%25%27&SRS=EPSG%3A27700';
        fetch(requestJson)
          .then((data) => {
            return data.json();
          })
          .then((res) => {
            if (res.features <= 0) {
              // console.log('empty');
              geocode({
                singleLine: qry,
                authentication,
                countryCode: 'GBR',

                params: {
                  outFields: '*',
                  location: center.join(','),
                  outSR: 27700,
                },
              })
                .then((response) => {
                  let suggestions = [];
                  response.candidates.forEach((candidate) => {
                    suggestions.push(candidate.attributes.LongLabel);
                  });
                  callback(suggestions);
                })

                .catch((error) => {
                  alert(
                    'There was a problem using the geocoder. See the console for details.'
                  );
                  console.error(error);
                });
            } else {
              res.features.map((feature) => {
                results.push(feature.properties.Road_MP_DIR);
                // console.log(feature);
                $('.advancedAutoComplete').on(
                  'autocomplete.select',
                  (evt, item) => {
                    // console.log(item);
                    let selectedItem = item;
                    res.features.map((feature) => {
                      if (feature.properties.Road_MP_DIR === selectedItem) {
                        map.getView().animate({
                          center: [
                            feature.geometry.coordinates[0],
                            feature.geometry.coordinates[1],
                          ],
                          zoom: Math.max(map.getView().getZoom(), 17),
                        });
                        popup.show(
                          [
                            feature.geometry.coordinates[0],
                            feature.geometry.coordinates[1],
                          ],
                          item
                        );
                      }
                    });
                  }
                );
              });
              callback(results);
            }
          });
      }
    },
  },
});
