<template>
  <q-page padding>
    <div>
      <h1 class="font-italic">Usuarios</h1>
      <EscuelaListComponent />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import AddEscuelaComponent from 'src/components/Escuela/AddEscuelaComponent.vue';
import EscuelaListComponent from 'src/components/Escuela/EscuelaListComponent.vue';
import { useEscuelaStore } from '../stores/escuela/escuela';
// import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const { usersAllEscuelas, getActiveEscuela } = useEscuelaStore();
// const { escuela } = storeToRefs(useEscuelaStore());

onMounted(() => {
  getActiveEscuela();
  usersAllEscuelas;
});
</script>
