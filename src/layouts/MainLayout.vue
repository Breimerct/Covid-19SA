<template>
  <q-layout view="lHh Lpr lFf" class="non-selectable">
    <q-header elevated>
      <q-toolbar flat dense round>
        <q-btn flat dense round icon="info" aria-label="info" @click="dialog = !dialog" />
        <q-space />
        <q-toolbar-title>{{app_Title}}</q-toolbar-title>
        <q-space />
        <q-btn v-if="isMobile" flat dense round @click="ShareSocialMedia" icon="share" />
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>-->

    <q-dialog v-model="dialog" position="bottom">
      <q-card class="q-mt-lg">
        <q-card-section class="text-center">
          <div>
            <q-avatar size="100px" class="shadow-10">
              <img
                src="https://lh3.googleusercontent.com/-1MJlfJV2AU8/Xroef9yEssI/AAAAAAAAAAs/XU69shg8NpgimOt0FbGtOxZoyGEVuE6AQCEwYBhgLKs4DAL1Ocqx4bWrmkXglxudrATAJ5eC-k3PhJ8V-KUjQYMDL7rZY06_PZpLox-cCC3qydK-8VYteShUnXpLaVkof4mrlr_1b9WhXzk0C-N6NnioM8QhqJGZ5MVcvX5rMG5DXVOLF1pA5PNFsGH0ALT6-jN2-LzAN9Jkr-C_hXnXnV3t-Hv-926vcPcQfFt18AY8i1lFh92xIuMTpmTAizEx1EOMLpmZFFcwJ4j7LSY-TmzDdjHp7ymggtQdtJYvA3ZiliTbLTcEY-EJfqzt08vLHLHcIeLfWtAJGSSSTacxPTSVkkRYdfM5VmfmDCrX6xn8uvdygSACUz6BJs8zGZvSzib5_3IZEeSgyu0wCCm_vS0j9bYvpxrJrwACarsXvwFG5R-OlVm7joOhaeJ84KV96DMSpqKqAGf7BEdSh3pS5XhZFd7psXv7q20A6Ws2BRa0XoQgP-PHZAQdvjdzOdH_pUfS9jQqSzalL14Bmjle9CsAwkxJPPFIJdS5YuiWlgBp-gKE90xA3HAUhXkLlcWO2cNIYW2jNocQGo7K0v9QLLhQYM9OUZrgnu8zC4F6lBoYp9H7VkP3HPFivZ1hihxn8yNNsyxomPAs_BkfESV2pMI3agfYF/w140-h140-p/20180910_134136.jpg"
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
        <q-card-section class="q-ma-sm q-py-none text-center">
          <div class="text-caption text-grey-8">
            <q-btn size="sm" @click="openLink('https://covid19ca.app/')" outline rounded color="primary" label="Diseño FrontEnd" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import { mapState } from "vuex";
import { Plugins } from "@capacitor/core";
const { Share } = Plugins;
export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      dialog: false,
      aboutVersion: "1.1",
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
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "/"
        }
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
