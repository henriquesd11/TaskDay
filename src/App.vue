<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/Layouts/Header.vue'
import Alert from '@/components/Alert.vue'
</script>

<template>
  <Header />
  <div class="container mt-5 p-4">
    <main>
      <RouterView />
      <Alert></Alert>
    </main>
  </div>
</template>

<style scoped>

</style>
