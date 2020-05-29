<template>
  <q-tabs
    narrow-indicator
    align="center"
    indicator-color="primary"
    no-caps
    active-color="primary"
  >
    <q-route-tab
      v-for="(item, index) in Rutas"
      :key="index"
      class="q-mx-sm"
      :icon="item.icon"
      :to="item.to"
      :label="item.label"
      exact
    />
  </q-tabs>
</template>

<script>
export default {
  name: "MenuTabs",
  data() {
    return {
      Rutas: [
        {
          icon: "home",
          to: "/",
          label: "Home"
        },
        /*
        {
          icon: "favorite",
          to: "/Cuidate",
          label: ""
        },
        {
          icon: "school",
          to: "#",
          label: ""
        }
        */
      ]
    };
  }
};
</script>