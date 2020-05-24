export function get_country_selected(state) {
  return state.country_Selected;
}

export function get_data_Covid(state) {
  return state.data_Covid;
}

export function get_char_Data(state) {
  return state.char_Data;
}

export function get_contries_apexchart(state) {
  let contries = [];
  /*Convert from Object to Array */
  Object.values(state.char_Data).forEach(value => {
    contries.push(value);
  });

  /* Order array Contries by number of tests */
  contries.sort(function(a, b) {
     return b.totalTests - a.totalTests;
   });

  //Chart Data options
  let chartData = {
    series: [
      {
        name: "Pruebas",
        data: []
      }
    ],
    categories: []
  };

  //Push countries data into chart options
  contries.forEach(country => {
    chartData.categories.push(country.country);
    chartData.series[0].data.push(country.totalTests);
  });

  return chartData;
}