//import Axios from "axios";
import { axiosInstance } from "../config/axiosConfig.js";
import L from "leaflet";

/**
 * Get the translation of a I18n field using a local
 * @param {Stirng} name I18n field
 * @param {String} lang local
 */
function getI18nField(name, lang) {
  let tmp = name.find(element => element.lang === lang);
  return tmp.text;
}

/**
 * The html template of the popup content
 */
const state = {
  popupTemplate: null
};

const getters = {
  getPopupTemplate: state => {
    return state.popupTemplate;
  }
};

/**
 * Mutate the template of the html popup content
 */
const mutations = {
  UPDATE_POPUP_TEMPLATE: (
    state,
    { producerName, stationName, variableNameAndIds }
  ) => {
    //table containing each of the variable at one location
    let variableTable = `
	<table class="ui selectable celled table" style="margin-top:1rem">
	<thead>
    <tr>
	<th>Measured variables</th>
	</tr>
	</thead>
	<tbody>
  `;

    for (let i = 0; i < variableNameAndIds.length; i++) {
      if (variableNameAndIds[i].theiaVariableName != null) {
        variableTable =
          variableTable +
          `<tr class=""pointer">
		<td id="variable_` +
          i +
          `">` +
          getI18nField(variableNameAndIds[i].theiaVariableName, "en") +
          `</td>
		</tr>`;
      } else {
        variableTable =
          variableTable +
          `<tr class=""pointer">
  <td id="variable_` +
          i +
          `">`;
        variableTable =
          variableTable +
          `<i>` +
          getI18nField(variableNameAndIds[i].producerVariableNames[0], "en") +
          `</i>
            </td>
		</tr>`;
      }
    }
    variableTable =
      variableTable +
      `
	  </tr>
	  </tbody>
	  </table>
	  `;

    state.popupTemplate =
      `
	  <div>
	  <span><h5 id="producer-name">Producer name: ` +
      getI18nField(producerName, "en") +
      `</h5></span>
	  <span><h5 id="station-name">Station name: ` +
      getI18nField(stationName, "en") +
      `</h5></span>
	  <div id="variable-name">` +
      variableTable +
      `</div>
	  </div>
	  `;
  }
};

const actions = {
  /**
   * Perform a POST query to load popup content and bind event to table variable row
   * in order to show detailed info on click.
   */
  loadPopupContent: (
    store,
    { marker: marker, config: { maxHeight: maxHeight } }
  ) => {
    return new Promise(resolve => {
      axiosInstance
        .post("/observation/loadPopupContent", marker.feature.properties.ids)
        .then(response => {

          let sortedVariableNameAndIds = response.data.variableNameAndIds.sort(
            function(a, b) {
              if (a.theiaVariableName === null) {
                a = null;
              } else {
                a = getI18nField(a.theiaVariableName,"en");
              }
              if (b.theiaVariableName === null) {
                b = null;
              } else {
                b = getI18nField(b.theiaVariableName,"en");
              }
              return (a === null) - (b === null) || + (a > b) || - (a < b);
            }

          );
          sortedVariableNameAndIds.forEach(el => {
            console.log(getI18nField(el.producerVariableNames[0], "en"));
          });
          store.commit("UPDATE_POPUP_TEMPLATE", {
            producerName: response.data.producerName,
            stationName: response.data.stationName,
            variableNameAndIds: response.data.variableNameAndIds
          });
          //Remove previous popup  DOM element and event before to open up a new one
          if (marker.hasOwnProperty("_popup")) {
            marker.unbindPopup();
          }
          if (L.DomUtil.get("producer-name") !== null) {
            L.DomUtil.remove(L.DomUtil.get("producer-name"));
          }
          if (L.DomUtil.get("station-name") !== null) {
            L.DomUtil.remove(L.DomUtil.get("station-name"));
          }
          if (L.DomUtil.get("variable-name") !== null) {
            L.DomUtil.remove(L.DomUtil.get("variable-name"));
          }

          marker.bindPopup(store.getters.getPopupTemplate, {
            maxHeight: maxHeight
          });
          marker.openPopup();

          //Bind event for each row of the variable table
          for (let i = 0; i < response.data.variableNameAndIds.length; i++) {
            let variableRow = L.DomUtil.get("variable_" + i);
            L.DomEvent.addListener(variableRow, "click", () =>
              store.dispatch(
                "setObservationsDetailed",
                response.data.variableNameAndIds[i].ids,
                { root: true }
              )
            );
          }

          resolve();
        });
    });
  }
};

export let popup = {
  state,
  getters,
  mutations,
  actions
};
