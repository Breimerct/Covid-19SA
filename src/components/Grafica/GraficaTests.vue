<template>
  <div>
    <q-card class="fit card-border text-center bg-grey-3">
      <q-card-section class="q-pb-none">
        <apexchart
          type="bar"
          height="400"
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
  name: "GraficaTest",
  data() {
    return {
      Opctions: {
        xaxis: {
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
                "Suriname",
          ]
        },
        dataLabels: {
          enabled: false
        },
      }
    };
  },

  methods: {
  },

  computed: {
    ...mapGetters("Covid", ["get_contries_apexchart"]),
    countriesTestsChart() {
      //this.Opctions.xaxis.categories = this.get_contries_apexchart.categories;
      console.log(this.Opctions.xaxis.categories);
      return this.Opctions;
    }
  }
};
</script>