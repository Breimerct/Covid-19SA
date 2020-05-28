import axios from "axios"
import {
  LoadingBar,
  date
} from 'quasar'

import {
  Loading,

  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from 'quasar'

LoadingBar.setDefaults({
  color: 'green',
  size: '2px',
  position: 'top'
})

var countries = {
  country: "",
  updated: null,
  cases: 0,
  todayCases: 0,
  deaths: 0,
  todayDeaths: 0,
  recovered: 0,
  active: 0,
  critical: 0,
  casesPerOneMillion: 0,
  deathsPerOneMillion: 0,
  totalTests: 0,
  testsPerOneMillion: 0
};

const FormatearFecha = (fecha) => {
  let date = new Date(fecha);
  let dia, mes, anio, hora, minuto

  dia = date.getDate()
  mes = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
  anio = date.getFullYear()
  hora = date.getHours()
  minuto = date.getMinutes()

  return dia + '/' + mes + '/' + anio + ' ' + date.toLocaleTimeString()
}

export const getCountry = async ({
  commit,
  dispatch,
  state
}, pais) => {
  try {
    Loading.show({
      spinner: QSpinnerGears,
    })

    /**
     * Esta es la api que usaba antes
     * https://coronavirus-19-api.herokuapp.com/countries
     */

    if (pais == 'Todo sur america') {
      pais = 'south america'
      await axios.get(`https://corona.lmao.ninja/v2/continents/${pais}?yesterday&strict`)
        .then((result) => {
          let data = result.data;
          countries = [];
          countries.country = 'sur america'
          countries.updated = FormatearFecha(data.updated)
          countries.cases = data.cases
          countries.todayCases = data.todayCases
          countries.deaths = data.deaths
          countries.todayDeaths = data.todayDeaths
          countries.recovered = data.recovered
          countries.active = data.active
          countries.critical = data.critical
          countries.casesPerOneMillion = data.casesPerOneMillion
          countries.deathsPerOneMillion = data.deathsPerOneMillion
          countries.totalTests = data.tests
          countries.testsPerOneMillion = data.testsPerOneMillion
          
          commit('set_Data_Covid', countries);
          dispatch('getDataApexChars')
          commit('get_contries_apexchart');

        }).catch((err) => {
          console.log(err);
        });
    } else {
      await axios.get(`https://corona.lmao.ninja/v2/countries/${pais}?yesterday`)
        .then((result) => {
          let data = result.data;
          countries = [];
          countries.country = data.country
          countries.updated = FormatearFecha(data.updated)
          countries.cases = data.cases
          countries.todayCases = data.todayCases
          countries.deaths = data.deaths
          countries.todayDeaths = data.todayDeaths
          countries.recovered = data.recovered
          countries.active = data.active
          countries.critical = data.critical
          countries.casesPerOneMillion = data.casesPerOneMillion
          countries.deathsPerOneMillion = data.deathsPerOneMillion
          countries.totalTests = data.tests
          countries.testsPerOneMillion = data.testsPerOneMillion

          commit('set_Data_Covid', countries);
        }).catch((err) => {
          console.log(err);
        });
    }

  } catch (error) {
    console.log(error);
  } finally {
    Loading.hide()
  }
}

export const getDataApexChars = async ({
  state,
  commit
}) => {
  let country = [
    "colombia",
    "brazil",
    "argentina",
    "chile",
    "venezuela",
    "peru",
    "ecuador",
    "bolivia",
    "paraguay",
    "uruguay",
    "suriname",
  ];
  let apex = [];

  await axios.
  get(`https://corona.lmao.ninja/v2/countries/${country[0]},${country[1]},${country[2]},${country[3]},${country[4]},${country[5]},${country[6]},${country[7]},${country[8]},${country[9]},${country[10]}?yesterday`)
    .then((result) => {

      for (const pais of result.data) {

        countries = [];
        countries.country = pais.country
        countries.updated = FormatearFecha(pais.updated)
        countries.cases = pais.cases
        countries.todayCases = pais.todayCases
        countries.deaths = pais.deaths
        countries.todayDeaths = pais.todayDeaths
        countries.recovered = pais.recovered
        countries.active = pais.active
        countries.critical = pais.critical
        countries.casesPerOneMillion = pais.casesPerOneMillion
        countries.deathsPerOneMillion = pais.deathsPerOneMillion
        countries.totalTests = pais.tests
        countries.testsPerOneMillion = pais.testsPerOneMillion
        apex.push(countries);

      }
      
      commit('set_Char_Data', apex);

    }).catch((err) => {
      console.log(err);
    });
}

export const getCovidSouthAmerica = ({
  commit,
  dispatch,
  state
}, data) => {
  let countries = [
    "colombia",
    "brazil",
    "argentina",
    "chile",
    "venezuela",
    "peru",
    "ecuador",
    "bolivia",
    "paraguay",
    "uruguay",
    "suriname",
  ];
  let southAmerica = [];
  try {

    //se verifica que la data tenga mas de 1 dato
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        let Country = data[index].country;
        for (let i = 0; i < countries.length; i++) {
          let countrySA = countries[i];
          if (Country.toUpperCase() == countrySA.toUpperCase()) {
            //se agregan los paises de sur america a un array
            southAmerica.push(data[index]);
          }
        }
      }

      //se ejecuta la funcion getDataCases para realizar el calculo de todos los casos en sur america
      dispatch('getDataCases', southAmerica);
    } else {
      commit('set_Data_Covid', data);
    }

  } catch (error) {
    console.log(error);
  }
}

/*funcion que realiza todos los calculos para saber todos 
los casos, muertes, recuperados, acticos, etc en sur america*/
export const getDataCases = ({
  commit,
  dispatch,
  state
}, data) => {
  let countries = {
    country: "",
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    active: 0,
    critical: 0,
    casesPerOneMillion: 0,
    deathsPerOneMillion: 0,
    totalTests: 0,
    testsPerOneMillion: 0
  };
  try {
    for (let index = 0; index < data.length; index++) {
      countries.country = 'sur america'
      countries.cases += data[index].cases;
      countries.todayCases += data[index].todayCases;
      countries.deaths += data[index].deaths;
      countries.todayDeaths += data[index].todayDeaths;
      countries.recovered += data[index].recovered;
      countries.active += data[index].active;
      countries.critical += data[index].critical;
      countries.casesPerOneMillion += data[index].casesPerOneMillion;
      countries.deathsPerOneMillion += data[index].deathsPerOneMillion;
      countries.totalTests += data[index].totalTests;
      countries.testsPerOneMillion += data[index].testsPerOneMillion;
    }
    commit('set_Data_Covid', countries);
    commit('set_Char_Data', data);
  } catch (error) {
    console.log(error);
  }
}
