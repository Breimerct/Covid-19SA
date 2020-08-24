<template>
  <q-layout view="lHh Lpr lFf" class="non-selectable">
    <q-header bordered elevated class="bg-grey-3 text-black">
      <q-toolbar flat round>
        <q-btn
          v-if="!isMobile"
          flat
          dense
          round
          icon="menu"
          aria-label="info"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-btn
          flat
          dense
          round
          icon="info"
          aria-label="info"
          @click="dialog = !dialog"
          v-if="isMobile"
        />
        <q-space />

        <div class="text-center col items-center justify-center row no-wrap text-no-wrap">
          <q-toolbar-title style="font-size: 18px;" v-if="isMobile">{{app_Title}}</q-toolbar-title>
          <q-toolbar-title v-else>COVID-19 EN SUR AMERICA</q-toolbar-title>
        </div>

        <q-space />
        <q-btn
          flat
          dense
          round
          icon="info"
          aria-label="info"
          @click="dialog = !dialog"
          v-if="!isMobile"
        />
        <q-btn v-if="isMobile" flat dense round @click="ShareSocialMedia" icon="share" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="!isMobile" v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-3 text-black">
      <q-img
        class="absolute-top"
        src="https://img.freepik.com/vector-gratis/tema-azul-clasico-abstracto-fondo-pantalla_23-2148410363.jpg?size=626&ext=jpg"
        style="height: 150px"
      >
      <div class="column row absolute-top text-right bg-transparent">
        <div class="col-12">
          <q-badge class="text-subtitle2" color="primary">v.{{ aboutVersion }}</q-badge>
        </div>
      </div>
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="70px" class="q-mb-sm">
            <img :src="imgProfile" />
          </q-avatar>
          <div class="text-weight-bold">Breimer Correa</div>
          <div>@Breimerct</div>
        </div>
      </q-img>
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item-label header class="text-grey-8">Covid-19 Sur América</q-item-label>
          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="dialog" position="bottom">
      <q-card class="q-mt-lg">
        <q-card-section class="text-center">
          <div>
            <q-avatar size="100px" class="shadow-10">
              <img
                :src="imgProfile"
              />
            </q-avatar>
          </div>
          <!-- <q-space /> -->
        </q-card-section>
        <q-card-section class="q-py-none text-center">
          <div class="text-h6 text-grey-8">Breimer Correa Torres</div>
          <div class="text-caption text-grey-8">Web App Desarollador</div>
          <div class="text-caption text-grey-8">
            <q-badge color="primary">v.{{ aboutVersion }}</q-badge>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-sm">
          <q-btn
            v-for="(item, index) in social"
            :key="index"
            @click="openLink(item.url)"
            flat
            round
            v-close-popup
            :icon="'mdi-'+item.icon"
            class="text-white"
            :class="'bg-'+item.color"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer v-if="isMobile" elevated class="fixed-bottom bg-grey-3 text-black">
      <menuTabs />
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import MenuTabs from "components/MenuMobil/MenuMobil";
import { mapState } from "vuex";
import { Plugins } from "@capacitor/core";
const { Share } = Plugins;
export default {
  name: "MainLayout",

  components: {
    EssentialLink,
    MenuTabs
  },

  data() {
    return {
      imgProfile : 'https://lh3.googleusercontent.com/a-/AOh14GiLlXbagnR7G9QPDQvpzTsXF8fCFCtIpPMMybI-Nl4=s360-c',
      leftDrawerOpen: false,
      dialog: false,
      aboutVersion: "1.5",
      isStatusBarLight: true,
      isMobile: this.$q.platform.is.mobile,
      social: [
        {
          url: "https://web.facebook.com/Breimerct",
          color: "indigo-7", //"black"
          icon: "facebook"
        },
        {
          url: "https://github.com/Breimerct",
          color: "black",
          icon: "github"
        },
        {
          url: "https://twitter.com/Breimerct",
          color: "light-blue-5",
          icon: "twitter"
        }
      ],
      essentialLinks: [
        {
          title: "Home",
          caption: "",
          icon: "home",
          link: "/"
        }
        // {
        //   title: "Cuidate",
        //   caption: "",
        //   icon: "favorite",
        //   link: "/Cuidate"
        // },
      ]
    };
  },

  computed: {
    ...mapState("Covid", ["app_Title"])
  },

  methods: {
    async ShareSocialMedia() {
      let shareRet = await Share.share({
        title: `COVID-19 en Sur America`,
        text: `Reporte Estadístico de COVID-19 en Sur America`,
        url: `#`,
        dialogTitle: `COVID-19 en Sur America`
      });
      console.log(shareRet);
    },
    openLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
