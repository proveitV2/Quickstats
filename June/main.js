import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import basemapSwitcher from './basemapswitcher';

const myView = new View({
  center:[0,0],
  zoom:4
})

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: myView
});


//Add basemap switcher
const basemapSwitch = new basemapSwitcher({map:map, view:myView})
map.addControl(basemapSwitch) 
