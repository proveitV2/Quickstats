import {Tile, Group} from 'ol/layer';
import {Control} from 'ol/control';
import {OSM, XYZ} from 'ol/source';


//BASE MAP IMAGES 
const OSMMap = "./OSM_map.png";
const OSMHumanitarian = "./OSM_humanitarian.png";
const StamenToner = "./stamentoner.png";


//BASEMAP SWITCHER TOOL
class basemapSwitcher extends Control{
    /**
     * @param{Object} [opt_options] Control options.
     */
    constructor(opt_options){
        const options = opt_options || {};
        const button = document.createElement('button');
        Object.assign(button,{
            className: "btn btn-secondary dropdown-toggle",
            type: "button",
            id: "dropdownMenuButton",
            ariaExpanded: "false",
        })
        button.setAttribute("data-toggle", "dropdown");
    
        button.innerHTML='Basemap Switcher';

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.appendChild(button);

        const dropdownMenu = document.createElement('ul');
        dropdownMenu.className="dropdown-menu";
        dropdownMenu.style.padding="20px"
        dropdown.appendChild(dropdownMenu);

        // BASEMAP 1
        const dropdownList = document.createElement('li');
        const dropdownContent = document.createElement('a');
        
        Object.assign(dropdownContent,{
            className: "small",
            href: "#",
            value: "basemap1"
        })

        dropdownMenu.appendChild(dropdownList);
        dropdownList.appendChild(dropdownContent);

        const dropdownInput = document.createElement('input');

        Object.assign(dropdownInput,{
            type: "image",
            src: OSMMap,
            id: "OSMStandard"
        })

        Object.assign(dropdownInput.style,{width: "110px", height: "80px", border: "double"})
        dropdownList.innerHTML="OSM Standard <br>";

        dropdownList.appendChild(dropdownInput);

        // BASEMAP 2
        const dropdownList2 = document.createElement('li');
        const dropdownContent2 = document.createElement('a');

        Object.assign(dropdownContent2,{
            className: "small",
            href: "#",
            value: "basemap2"
        })

        dropdownMenu.appendChild(dropdownList2);
        dropdownList.appendChild(dropdownContent2);

        const dropdownInput2 = document.createElement('input');

        Object.assign(dropdownInput2,{
            type: "image",
            src: OSMHumanitarian,
            id: "OSMHumanitarian",
        })

        Object.assign(dropdownInput2.style,{
            width: "110px",
            height: "80px",
            border: "double"
        })

        dropdownList2.innerHTML="OSM Humanitarian <br>";

        dropdownList2.appendChild(dropdownInput2);

        // BASEMAP 3
        const dropdownList3 = document.createElement('li');
        const dropdownContent3 = document.createElement('a');

        Object.assign(dropdownContent3, {
            className: "small",
            href: "#",
            value: "basemap3"
        })

        dropdownMenu.appendChild(dropdownList3);
        dropdownList3.appendChild(dropdownContent3);
        
        const dropdownInput3 = document.createElement('input');

        Object.assign( dropdownInput3,{
            type: "image",
            src: StamenToner,
            id: "StamenToner",
        })

        Object.assign(dropdownInput3.style,{
            width: "110px",
            height: "80px",
            border: "double",
        })

        dropdownList3.innerHTML="Stamen Toner <br>";

        dropdownList3.appendChild(dropdownInput3);

        super({
            element: dropdown,
            target: options.target,
        });

        //BASE MAP LAYERS
        const openStreetMapStandard = new Tile({
            source: new OSM(),
            visible: true,
            title: 'OSMStandard'
        })
        
        const openStreetMapHumanitarian = new Tile({
            source: new OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            }),
            visible: false,
            title:'OSMHumanitarian'
        })
        
        const stamenToner = new Tile({
            source: new XYZ({
                url: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
                attributions: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL',        
            }),
            visible: false,
            title: 'StamenToner',
        })
        const baseGroup = new Group({
            layers:[openStreetMapStandard, openStreetMapHumanitarian, stamenToner],
        })
        // Add base layers to the map
        options.map.addLayer(baseGroup);
        const baseElements = [dropdownInput,dropdownInput2,dropdownInput3]
        for (let baseElement of baseElements){
            baseElement.onclick = function(){
                console.log(baseElement.id);
                let baseElementId= baseElement.id;
                console.log(baseElement);
                baseGroup.getLayers().forEach(function(element){
                    let baseTitle = element.get('title');
                    element.setVisible(baseTitle===baseElementId)                })      
            }     
        }        
    };
}
export default basemapSwitcher;
