import { Control } from 'ol/control';
import { webAppLayers } from '../assets/js/layers/layerConnections';

class Legend extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};
    const button = document.createElement('button');
    button.className = 'legendButton';
    button.innerHTML = '<i class="fa-solid fa-list"></i>';

    const element = document.createElement('div');
    element.className = 'legendButton ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener(
      'click',
      this.legendTrigger.bind(this, options.view, options.map),
      false
    );

    document.getElementById('legendClose').addEventListener('click', () => {
      $('#legendModal').modal('hide');
    });
  }

  legendTrigger(view, map) {
    $('#legendModal').modal('show');
    const updateLegend = function (resolution) {
      const graphicUrl = webAppLayers.getLegendUrl(resolution);
      const img = document.getElementById('legend');
      img.src = graphicUrl;
    };
    const resolution = map.getView().getResolution();
    updateLegend(resolution);

    // Update the legend when the resolution changes
    map.getView().on('change:resolution', function (event) {
      const resolution = event.target.getResolution();
      updateLegend(resolution);
    });
  }
}
export default Legend;
