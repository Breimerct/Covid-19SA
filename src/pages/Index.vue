<template>
  <q-page class="flex q-pa-sm doc-container justify-center non-selectable">
    <div class="column main-column">
      <div class="row q-ma-sm">
        <div class="col-12">
          <q-select
            transition-show="jump-up"
            transition-hide="scale"
            color="primary"
            rounded
            outlined
            no-error-icon
            hide-dropdown-icon
            popup-content-style="font-size:16px;"
            v-model="country_Selected"
            :options="options"
            label="Seleccione un pais"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="place" />
            </template>
            <!-- <template v-slot:append="imagen">
              <img width="25" v-bind="imagen.itemProps" v-on="imagen.itemEvents" :src="imagen.opt.img" alt="">
            </template>-->

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section avatar>
                  <!-- <q-icon :name="scope.opt.img" /> -->
                  <img width="45" :src="scope.opt.img" alt />
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>

      <div class="row q-ma-sm">
        <div class="col-12">
          <q-card class="card-border text-white bg-green q-pa-sm">
            <q-card-section class="q-my-none">
              <div class="text-h6 text-weight-light text-weight-light">Total de casos confirmados</div>
            </q-card-section>

            <q-card-section class="q-py-none">
              <div class="row">
                <div class="col-4">
                  <q-icon name="mdi-check-bold" color="greenn" size="32px"></q-icon>
                </div>
                <div class="col-8 text-right">
                  <div class="text-h4 texto-green">
                    <span v-if="this.get_data_Covid != null">
                      {{
                      get_data_Covid.cases | formatter
                      }}
                    </span>
                    <span v-else>...</span>
                  </div>
                  <div
                    v-if="
                      this.get_data_Covid != null &&
                        this.get_data_Covid.todayCases != 0
                    "
                    class="text-italic texto-green"
                  >
                    casos por dia+
                    {{ get_data_Covid.todayCases | formatter }}
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Data Covid -->
      <div class="row q-pa-sm q-col-gutter-lg">
        <div class="col-6" v-for="(data, index) in casesCategoriesData" :key="index">
          <q-card dark rounded class="card-border text-white" :class="['bg-'+data.color]">
            <q-card-section>
              <div class="text-h6 text-weight-light">{{ data.name }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none q-pb-xs">
              <div class="column" style="height: 60px">
                <div class="row">
                  <div class="col-4">
                    <q-icon :name="data.icon" size="md"></q-icon>
                  </div>

                  <div class="col-8 q-pt-xs">
                    <div
                      class="text-right text-subtitle1"
                      style="font-size:20px;"
                    >{{ data.total | formatter }}</div>
                    <!-- Category Incrmented -->
                    <div v-if="data.today !== 0" class="text-italic text-right">+ {{ data.today }}</div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <!-- Data circle -->
      <!-- <donutApex /> -->

      <!-- data bar -->
      <div class="row q-ma-sm q-pb-md" v-if="this.get_country_selected == 'Todo sur america'">
        <div class="col-12">
          <ApexColumn />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ApexColumn from "components/Grafica/Grafica.vue";
import donutApex from "components/Grafica/GraficaMuertes.vue";
import GraficaTest from "components/Grafica/GraficaTests.vue";
export default {
  name: "PageIndex",

  data() {
    return {
      options: [
        //todo sur america
        {
          label: "Todo sur america",
          value: "Todo sur america",
          img:
            "https://image.jimcdn.com/app/cms/image/transf/dimension=439x10000:format=png/path/sce56dabcaa017cc3/image/i34f470af2d636b3e/version/1514490291/image.png"
        },
        //colombia - 1
        {
          label: "Colombia",
          value: "Colombia",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1200px-Flag_of_Colombia.svg.png"
        },
        //brazil - 2
        {
          label: "Brazil",
          value: "Brazil",
          img: "https://www.banderas-mundo.es/data/flags/w580/br.png"
        },
        //argentina -3
        {
          label: "Argentina",
          value: "Argentina",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png"
        },
        //chile - 4
        {
          label: "Chile",
          value: "Chile",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg"
        },
        //venezuela -5
        {
          label: "Venezuela",
          value: "Venezuela",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Venezuela.svg/1200px-Flag_of_Venezuela.svg.png"
        },
        //perú - 6
        {
          label: "Perú",
          value: "Peru",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Peru.svg/1200px-Flag_of_Peru.svg.png"
        },
        //ecuador - 7
        {
          label: "Ecuador",
          value: "Ecuador",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/1200px-Flag_of_Ecuador.svg.png"
        },
        //bolivia - 8
        {
          label: "Bolivia",
          value: "Bolivia",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/1200px-Flag_of_Bolivia.svg.png"
        },
        //paraguay - 9
        {
          label: "Paraguay",
          value: "Paraguay",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg"
        },
        //uruguay - 10
        {
          label: "Uruguay",
          value: "Uruguay",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/1200px-Flag_of_Uruguay.svg.png"
        },
        //surinam - 11
        {
          label: "Surinam",
          value: "Suriname",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg"
        }
      ]
    };
  },

  components: {
    ApexColumn,
    donutApex,
    GraficaTest
  },

  created() {
    this.set_country_selected("Todo sur america");
    this.getCountry(this.get_country_selected);
  },

  filters: {
    formatNumber(value) {
      if (isNaN(value)) return "...";
      value = new Intl.NumberFormat().format(value);
      return value;
    },
    formatter(Valor) {
      try {
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
      } catch (error) {
        return null;
      }
    }
  },

  computed: {
    ...mapGetters("Covid", ["get_country_selected", "get_data_Covid"]),
    country_Selected: {
      get() {
        return this.get_country_selected;
      },
      set(value) {
        this.set_country_selected(value.value);
        this.getCountry(this.get_country_selected);
      }
    },
    casesCategoriesData() {
      const dataCategories = [
        {
          name: "Fallecidos",
          icon: "mdi-coffin",
          total:
            this.get_data_Covid != null ? this.get_data_Covid.deaths : "...",
          color: "red",
          today:
            this.get_data_Covid != null ? this.get_data_Covid.todayDeaths : 0
        },
        {
          name: "Activos",
          icon: "group",
          total:
            this.get_data_Covid != null ? this.get_data_Covid.active : "...",
          color: "light-blue",
          today: 0
        },
        {
          name: "Recuperados",
          icon: "favorite",
          total:
            this.get_data_Covid != null ? this.get_data_Covid.recovered : "...",
          color: "cyan",
          today: 0
        },
        {
          name: "Pruebas",
          icon: "mdi-test-tube",
          total:
            this.get_data_Covid != null
              ? this.get_data_Covid.totalTests
              : "...",
          color: "amber",
          today: 0
        }
      ];
      return dataCategories;
    }
  },

  methods: {
    ...mapActions("Covid", ["getCountry"]),
    ...mapMutations("Covid", ["set_country_selected"])
  }
};
</script>

<style lang="scss" scoped>
.main-column {
  width: 50%;
  height: 100%;
}

@media (max-width: $breakpoint-sm-max) {
  .main-column {
    width: 100%;
    height: 100%;
  }
}
</style>
