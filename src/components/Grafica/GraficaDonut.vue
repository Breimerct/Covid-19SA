<template>
  <div>
    <q-card class="bg-grey-3 fit card-border text-center q-pa-sm">
      <apexchart
        style="min-width: 330px; width: 100%; heith: 100%;"
        type="donut"
        :options="getApexOptions"
        :series="getApexSeries"
      ></apexchart>
      
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("Covid", ["getDataCountry"]),
    getApexOptions() {
      let apexOptions = {
        // labels: ["Muertes", "Recuperados", "Activos"],
        labels: this.getDataCountry.names,
        // colors: ["#f44336", "#03a9f4", "#00bcd4"],
        colors: this.getDataCountry.colors,
        title: {
          text: "Estadisticas",
          align: "left",
          offsetX: 14,
          style: {
            color: "#000",
            fontSize: "18px",
            fontFamily: "Arial",
            fontWeight: 200
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            opacityFrom: 0.5,
            opacityTo: 0.9,
            stops: [50, 99, 0]
          }
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: "right",
          horizontalAlign: "center",
          floating: false,
          fontSize: "16px",
          fontFamily: "Arial",
          fontWeight: 400,
          formatter: function(val, opts, Valor) {
            try {
              let nums = new Array();
              let simb = ".";
              Valor = opts.w.globals.series[opts.seriesIndex].toString();
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
              return val + " : " + res;
            } catch (error) {}
          },
          inverseOrder: false,
          width: undefined,
          height: undefined,
          tooltipHoverFormatter: undefined,
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: undefined,
            useSeriesColors: false
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: "#000",
            fillColors: undefined,
            radius: 15,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
          },
          itemMargin: {
            horizontal: 5,
            vertical: 2
          },
          onItemClick: {
            toggleDataSeries: true
          },
          onItemHover: {
            highlightDataSeries: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };

      return apexOptions;
    },
    getApexSeries() {
      return this.getDataCountry.series;
    }
  }
};
</script>
