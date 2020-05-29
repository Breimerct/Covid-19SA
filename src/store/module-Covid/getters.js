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
  contries.sort(function (a, b) {
    return b.totalTests - a.totalTests;
  });

  //Chart Data options
  let chartData = {
    series: [{
      name: "Pruebas",
      data: []
    }],
    categories: []
  };

  //Push countries data into chart options
  contries.forEach(country => {
    chartData.categories.push(country.country);
    chartData.series[0].data.push(country.totalTests);
  });

  return chartData;
}

export function get_Casos_Por_Dia(state) {
  try {
    let fechaInit = []
    let char_Data = {
      series: [{
          name: 'Confirmados',
          data: []
        },
        {
          name: 'Fallecidos',
          data: []
        },
        {
          name: 'Recuperados',
          data: []
        }
      ]
    }

    Object.keys(state.casos_Por_Dia).forEach(date => {
      char_Data.series[0].data.push([new Date(date).getTime(), state.casos_Por_Dia[date]])
      fechaInit.push(date);
    })

    Object.keys(state.Muertes_Por_Dia).forEach(date => {
      char_Data.series[1].data.push([new Date(date).getTime(), state.Muertes_Por_Dia[date]])
    })

    Object.keys(state.Recuperados_Por_Dia).forEach(date => {
      char_Data.series[2].data.push([new Date(date).getTime(), state.Recuperados_Por_Dia[date]])
    })

    return char_Data
  } catch (error) {
    return char_Data = null;
  }
}
