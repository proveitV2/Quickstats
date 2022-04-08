import {Group} from 'ol/layer';
import {Control} from 'ol/control';
import { openStreetMapStandard, openStreetMapHumanitarian, stamenToner,
stamenWatercolor, stamenTerrain, esriStandard} from './basemaps';

//BASE MAP IMAGES 
const OSMMap = "./Basemaps/OSM_map.png";
const OSMHumanitarian = "./Basemaps/OSM_humanitarian.png";
const stamenTo = "./Basemaps/stamentoner.png";
const stamenWC = "./Basemaps/stamenWatercolor.png";
const stamenTe = "./Basemaps/stamenTerrain.png";
const esriSt = "./Basemaps/esri.png"

//BASEMAP SWITCHER TOOL
class basemapSwitcher extends Control{
    /**
     * @param{Object} [opt_options] Control options.
     */
    constructor(opt_options){
        const options = opt_options || {};
        const button = document.createElement('button');
        Object.assign(button,{
            className: "button",
            type: "button",
            id: "dropdownMenuButton"
        })
        // button.setAttribute("data-toggle", "dropdown");
    
        button.innerHTML='B';

        const dropdown = document.createElement('div');
        dropdown.className = 'button ol-unselectable ol-control';
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
        const linebreak = document.createElement('br');
        const dropdownList3 = document.createElement('li');
        const dropdownContent3 = document.createElement('a');

        Object.assign(dropdownContent3, {
            className: "small",
            href: "#",
            value: "basemap3"
        })

        dropdownMenu.appendChild(dropdownList3);
        dropdownMenu.appendChild(linebreak)
        dropdownList3.appendChild(dropdownContent3);
        
        const dropdownInput3 = document.createElement('input');

        Object.assign( dropdownInput3,{
            type: "image",
            src: stamenTo,
            id: "StamenToner",
        })

        Object.assign(dropdownInput3.style,{
            width: "110px",
            height: "80px",
            border: "double",
        })

        dropdownList3.innerHTML="Stamen Toner <br>";

        dropdownList3.appendChild(dropdownInput3);

        // BASEMAP 4
        const dropdownList4 = document.createElement('li');
        const dropdownContent4 = document.createElement('a');

        Object.assign(dropdownContent4, {
            className: "small",
            href: "#",
            value: "basemap4"
        })
        dropdownMenu.appendChild(dropdownList4);
        dropdownList4.appendChild(dropdownContent4);
        
        const dropdownInput4 = document.createElement('input');

        Object.assign( dropdownInput4,{
            type: "image",
            src: stamenWC,
            id: "StamenWatercolor",
        })

        Object.assign(dropdownInput4.style,{
            width: "110px",
            height: "80px",
            border: "double",
        })

        dropdownList4.innerHTML="Stamen Watercolor <br>";
        dropdownList4.appendChild(dropdownInput4);

        // BASEMAP 5
        const dropdownList5 = document.createElement('li');
        const dropdownContent5 = document.createElement('a');

        Object.assign(dropdownContent5, {
            className: "small",
            href: "#",
            value: "basemap5"
        })

        dropdownMenu.appendChild(dropdownList5);
        dropdownList5.appendChild(dropdownContent5);
        
        const dropdownInput5 = document.createElement('input');

        Object.assign( dropdownInput5,{
            type: "image",
            src: stamenTe,
            id: "StamenTerrain",
        })

        Object.assign(dropdownInput5.style,{
            width: "110px",
            height: "80px",
            border: "double",
        })

        dropdownList5.innerHTML="Stamen Terrain <br>";
        dropdownList5.appendChild(dropdownInput5);

        // BASEMAP 6
        const dropdownList6 = document.createElement('li');
        const dropdownContent6 = document.createElement('a');

        Object.assign(dropdownContent6, {
            className: "small",
            href: "#",
            value: "basemap6"
        })

        dropdownMenu.appendChild(dropdownList6);
        dropdownList6.appendChild(dropdownContent6);
        
        const dropdownInput6 = document.createElement('input');

        Object.assign( dropdownInput6,{
            type: "image",
            src: esriSt,
            id: "EsriStandard",
        })

        Object.assign(dropdownInput6.style,{
            width: "110px",
            height: "80px",
            border: "double",
        })

        dropdownList6.innerHTML="Stamen Watercolor <br>";
        dropdownList6.appendChild(dropdownInput6);

        super({
            element: dropdown,
            target: options.target,
        });

        //BASE MAP LAYERS

        const baseGroup = new Group({
            layers:[openStreetMapStandard, openStreetMapHumanitarian, stamenToner, stamenTerrain,
            stamenWatercolor, esriStandard],
        })
        // Add base layers to the map
        options.map.addLayer(baseGroup);
        const baseElements = [dropdownInput,dropdownInput2,dropdownInput3, 
            dropdownInput4, dropdownInput5, dropdownInput6]
        for (let baseElement of baseElements){
            baseElement.onclick = function(){
                console.log(baseElement.id);
                let baseElementId= baseElement.id;
                console.log(baseElement);
                baseGroup.getLayers().forEach(function(element){
                    let baseTitle = element.get('title');
                    element.setVisible(baseTitle===baseElementId)
                })      
            }     
        }        
    };
}
export default basemapSwitcher;