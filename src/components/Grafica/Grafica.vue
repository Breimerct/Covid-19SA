<template>
  <div>
    <apexchart
      type="bar"
      height="200"
      :options="countriesTestsChart"
      :series="get_char_Data.series"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ApexColumn",
  data() {
    return {
      chartOptions: {
        colors: [ "#17ead9"],
        grid: {
          show: true,
          strokeDashArray: 0,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        lotOptions: {
          bar: {
            distributed: false
          }
        },
        title: {
          text: "Pruebas por pais",
          align: "center",
          style: {
            color: "#000",
            fontSize: "18px",
            fontFamily: "century",
            fontWeight: 200
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "black",
            type: "vertical",
            shadeIntensity: 0.2,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100]
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: "#000"
            }
          }
        },
        yaxis: {
          title: {
            text: "Cantidad"
          },
          labels: {
            style: {
              color: "#fff"
            }
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return Intl.NumberFormat().format(val);
            }
          }
        }
      }
    };
  },

  created() {
    //this.getCountry('Todo sur america');
    //this.get_contries_tests();
  },

  computed: {
    ...mapGetters("Covid", ["get_char_Data"]),
    countriesTestsChart() {
      this.chartOptions.xaxis.categories = this.get_char_Data.categories;
      return this.chartOptions;
    }
  },

  methods: {}
};
</script>
