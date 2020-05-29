<template>
  <q-card class="bg-grey-3 fit card-border text-center">
    <q-card-section>
      <apexchart :options="options" :series="this.get_Casos_Por_Dia.series" />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GraficaPorDia",
  data() {
    return {
      options: {
        colors: ["#4caf50", "#f44336", "#00bcd4"],
        chart: {
          id: "area-datetime",
          type: "area",
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: "hollow"
        },
        xaxis: {
          type: "datetime",
          min: new Date("04/30/2020").getTime(),

          tickAmount: 2
        },
        title: {
          text: "Estadisticas por día",
          align: "left",
          offsetX: 14
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy"
          }
          //   y: {
          //     formatter: function(Valor) {
          //       let nums = new Array();
          //       let simb = ".";
          //       Valor = Valor.toString();
          //       Valor = Valor.replace(/\D/g, "");
          //       nums = Valor.split("");
          //       let long = nums.length - 1;
          //       let patron = 3;
          //       let prox = 2;
          //       let res = "";
          //       while (long > prox) {
          //         nums.splice(long - prox, 0, simb);
          //         prox += patron;
          //       }
          //       for (let i = 0; i <= nums.length - 1; i++) {
          //         res += nums[i];
          //       }
          //       return res;
          //     }
          //   }
        },
        stroke: {
          width: 2,
        },
        legend: {
          position: "top",
          horizontalAlign: "center"
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.5,
            stops: [0, 100]
          }
        }
      }
    };
  },

  computed: {
    ...mapGetters("Covid", ["get_Casos_Por_Dia"])
  }
};
</script>