import axios from "axios"
import {
  LoadingBar
} from 'quasar'

import {
  Loading,

  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from 'quasar'

LoadingBar.setDefaults({
  color: 'green',
  size: '5px',
  position: 'top'
})

export const getCountry = async ({
  commit,
  dispatch,
  state
}, pais) => {
  try {
    // fully customizable
    Loading.show({
      spinner: QSpinnerGears,
      // other props
    })
    let countries
    //debugger;
    if (pais.toLowerCase() == 'todo sur america') {
      countries = await (await axios.get(`https://coronavirus-19-api.herokuapp.com/countries`)).data;
    } else {
      countries = await (await axios.get(`https://coronavirus-19-api.herokuapp.com/countries/${pais}`)).data;
    }

    dispatch('getCovidSouthAmerica', countries);

  } catch (error) {
    console.log(error);
  } finally {
    Loading.hide()
  }
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

    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        let Country = data[index].country;
        for (let i = 0; i < countries.length; i++) {
          let countrySA = countries[i];
          if (Country.toUpperCase() == countrySA.toUpperCase()) {
            southAmerica.push(data[index]);
          }
        }
      }
      //console.log(southAmerica);
      dispatch('getDataCases', southAmerica);
    } else {
      commit('set_Data_Covid', data);
    }

  } catch (error) {
    console.log(error);
  }
}

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
