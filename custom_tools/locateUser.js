import Geolocation from 'ol/Geolocation';
import { Control } from 'ol/control';

class LocateUser extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};
    const button = document.createElement('button');
    button.className = 'buttonLocate';
    button.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';

    const element = document.createElement('div');
    element.className = 'locate ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener(
      'click',
      this.customLocate.bind(this, options.view, options.map),
      false
    );
  }

  customLocate(view, map) {
    const geolocation = new Geolocation({
      // take the projection to use from the map's view
      projection: view.getProjection(),
      tracking: true,
    });

    // listen to changes in position
    geolocation.on('change:position', function (evt) {
      let currentLocation = geolocation.getPosition();
      map.getView().animate({
        center: currentLocation,
        zoom: Math.max(map.getView().getZoom(), 17),
      });
      geolocation.set(currentLocation);
      geolocation.getPosition();
      geolocation.dispose();
    });
  }
}
export default LocateUser;
