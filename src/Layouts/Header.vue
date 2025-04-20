<script setup lang="ts">
import '@/assets/header.scss';

import { useRoute } from 'vue-router';
import { ref, watch } from 'vue'

const route = useRoute();
const routerName = ref(route.name || "");

watch(() => route.name, (newName) => {
  routerName.value = newName as string;
});

</script>

<template>
  <nav class="navbar border-bottom border-body fixed-top">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <i class="bi bi-three-dots-vertical"></i>
      </button>
      <a class="navbar-brand" href="#">TasksDay</a>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">TasksDay</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link" :class="{ active: routerName === 'home' }" href="/">Tarefas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: routerName === 'users' }" href="/about">Sobre</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>