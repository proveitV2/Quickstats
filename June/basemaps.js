import {Tile} from 'ol/layer';
import {OSM, XYZ} from 'ol/source';


//BASE MAPS 
export const openStreetMapStandard = new Tile({
    source: new OSM(),
    visible: true,
    title: 'OSMStandard'
});

export const openStreetMapHumanitarian = new Tile({
    source: new OSM({
    url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    visible: false,
    title:'OSMHumanitarian'
});

export const stamenToner = new Tile({
    source: new XYZ({
        url: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
        attributions: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL',        
    }),
    visible: false,
    title: 'StamenToner',
});

export const stamenWatercolor = new Tile({
    source: new XYZ({
        url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        attributions: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
    }),
    visible: false,
    title: 'StamenWatercolor',
});

export const stamenTerrain = new Tile({
    source: new XYZ({
        url:'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
        attributions: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
    }),
    visible: false,
    title: 'StamenTerrain'
})

export const esriStandard = new Tile({
    source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
        'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'    
    }),
    visible: false,
    title: 'EsriStandard'
})