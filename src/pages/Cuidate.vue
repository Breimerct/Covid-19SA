<template>
  <q-page class="flex q-pa-sm doc-container justify-center non-selectable">
    <div class="column main-column">
      <div class="row">
        <q-timeline :layout="layout" color="primary">
          <q-timeline-entry heading>
            
          </q-timeline-entry>

          <q-timeline-entry title="Usa tapabocas" side="left" icon="check">
            <img width="" height="" style="max-width: 140px;" src="https://bienestarips.com/wp-content/uploads/2020/03/CorRecurso-3@3x-100.jpg" alt="">
          </q-timeline-entry>

          <q-timeline-entry
            icon="check"
            title="lavate las manos"
            side="right"
          >
            <img width="" style="max-width: 140px;" src="https://4.bp.blogspot.com/-c_jnpLIYEto/UG87oDwGVqI/AAAAAAAAPP0/L9ZxFQSLAzo/s1600/descarga+(1).jpg" alt="">
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    layout() {
      return this.$q.screen.lt.sm
        ? "dense"
        : this.$q.screen.lt.md
        ? "comfortable"
        : "loose";
    }
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