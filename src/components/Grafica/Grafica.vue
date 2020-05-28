<template>
  <div>
    <q-card class="bg-grey-3 fit card-border text-center">
      <q-card-section>
        <apexchart
          ref="Apex"
          type="bar"
          height="auto"
          :options="countriesTestsChart"
          :series="get_contries_apexchart.series"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ApexColumn",
  data() {
    return {
      ApexChartOptions: {
        labels: ["Breimer", "Correa", "Torres"],
        colors: ["#7FABFF", "#E6FF45", "#17ead9"],
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
            opacityTo: 0.9,
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
          type: "category",
          categories: [
            "Peru",
            "Venezuela",
            "Brazil",
            "Chile",
            "Colombia",
            "Argentina",
            "Ecuador",
            "Uruguay",
            "Paraguay",
            "Bolivia",
            "Suriname"
          ],
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
            formatter: function(Valor) {
              let nums = new Array();
              let simb = ".";
              Valor = Valor.toString();
              Valor = Valor.replace(/\D/g, "");
              nums = Valor.split("");
              let long = nums.length - 1;
              let patron = 3;
              let prox = 2;
              let res = "";
              while (long > prox) {
                nums.splice(long - prox, 0, simb);
                prox += patron;
              }
              for (let i = 0; i <= nums.length - 1; i++) {
                res += nums[i];
              }
              return res;
            }
          }
        }
      }
    };
  },

  computed: {
    ...mapGetters("Covid", ["get_contries_apexchart"]),
    countriesTestsChart() {
      this.ApexChartOptions.labels = this.get_contries_apexchart.categories;
      let options = this.ApexChartOptions;
      return options;
    }
  }
};
</script>
