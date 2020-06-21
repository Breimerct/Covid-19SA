<template>
  <div>
    <q-card class="bg-grey-3 fit card-border text-center flex flex-center">
      <q-card-section>
        <apexchart
          style="width: 100%; heith: 100%;"
          type="donut"
          :options="getApexOptions"
          :series="getApexSeries"
        />
      </q-card-section>
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
          align: "Center",
          offsetX: 14,
          style: {
            color: "#000",
            fontSize: "18px",
            fontFamily: "Arial",
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
          position: "right",
          horizontalAlign: "center",
          fontSize: "16px",
          fontFamily: "Arial",
          fontWeight: 300,
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
              hart: {
                width: 300
              },
              legend: {
                position: "top"
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
