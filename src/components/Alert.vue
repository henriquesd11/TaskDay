<script setup lang="ts">
import { useAlertStore } from '@/stores/alert.ts'
const alertStore = useAlertStore()
</script>

<template>

  <div id="liveAlertPlaceholder" class="m-2">
    <div class="alert alert-dismissible fade" :class="{
      show: alertStore.show,
      'alert-success': alertStore.type == 'success',
      'alert-danger': alertStore.type == 'danger',
      'alert-warning': alertStore.type == 'warning',
      'alert-info': alertStore.type == 'info',
    }" role="alert">
      {{ alertStore.message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>

</template>

<style scoped>
  #liveAlertPlaceholder {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1050;
    width: 300px;
  }
  .alert {
    margin-top: 10px;
  }
</style>