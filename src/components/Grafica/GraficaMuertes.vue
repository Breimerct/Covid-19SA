  <template>
  <div class="row q-ma-sm q-pb-md">
    <div class="col-12">
      <q-card class="flex q-pa-sm doc-container justify-center">
        <q-card-section>
          <apexchart width="380" type="donut" :options="options" :series="series"></apexchart>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
          title: {
          text: "Estadisticas",
          align: "center",
          style: {
            color: "#000",
            fontSize: "18px",
            fontFamily: "century",
            fontWeight: 200
          }
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
      },
      series: [44, 55, 41, 17, 15],
    };
  }
};
</script>