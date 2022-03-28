import './style.css';
import {Map, View} from 'ol';
import {Tile} from 'ol/layer';
import OSM from 'ol/source/OSM';
import {Fill, Stroke, Circle, Style} from 'ol/style';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {GeoJSON} from 'ol/format';


const map = new Map({
  target: 'map',
  layers: [
    new Tile({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

//Styling for vector layers
const fillStyle = new Fill({
  color:[197,227,180,0.5]
})

const strokeStyle= new Stroke({
  color:[46, 45, 45,0.5],
  width: 1.2
})

const circleStyle=new Circle({
  fill: new Fill({
    color: [245,49,5,0.5]
  }),
  radius:7,
  stroke: strokeStyle
})

//Vector Layers

//Layer 1
const europe = new VectorLayer({
  source: new VectorSource({
    url: './Layers/europe.json',
    format: new GeoJSON(),
  }),
  visible: false,
  title: 'europe',
  style:new Style({
    fill:fillStyle,
    stroke: strokeStyle,
    image:circleStyle,
  })
});
map.addLayer(europe)

//Layer 2
const uk = new VectorLayer({
  source: new VectorSource({
    url: './Layers/map.geojson',
   format: new GeoJSON(),
  }),
  visible: false,
  title: 'uk',
  style: new Style({
    stroke: new Stroke({
      color:[255,0,0,1],
      width: 3
    })
  })
});
map.addLayer(uk)

//Layer 3
const northamerica = new VectorLayer({
  source: new VectorSource({
    url: './Layers/NorthAmerica.json',
    format: new GeoJSON(),
  }),
  visible: false,
  title: 'europe',
  style:new Style({
    fill: new Fill({
      color:[255,230,153],
    }),
    stroke: strokeStyle
  })
});
map.addLayer(northamerica)

// Toggler 
const checkboxToggler = function(checkboxid, layer,legend){
  document.getElementById(checkboxid).onclick=function(){
    layer.setVisible(!layer.getVisible());
    if (layer.getVisible(true)){
      document.getElementById(legend).style.display="block";
    }
    else{
      document.getElementById(legend).style.display="none"
    }
  }
}

// Call the function for layer display rules 
checkboxToggler("checkbox1", europe, 'legend1')
checkboxToggler("checkbox2", uk, 'legend2')
checkboxToggler("checkbox3", northamerica,'legend3')
