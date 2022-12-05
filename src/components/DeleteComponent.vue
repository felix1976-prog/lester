<template>
  <q-dialog v-model="isEliminarOpen" persistent>
    <q-card>
      <q-toolbar-title class="bg-red text-center"
        ><span class="text-weight-bold text-white">Eliminar</span>
      </q-toolbar-title>

      <q-card-section class="row items-center">
        <q-avatar icon="las la-trash" color="red" text-color="white" />
        <span class="q-ml-sm"
          >Está seguro de eliminar {{ todo.titulo }} 🤔
        </span>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat label="Cancel" color="red" v-close-popup />
        <q-btn
          flat
          label="Eliminar"
          color="red"
          v-close-popup
          @click="eliminar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { DeleteInterface } from 'src/interfaces/delete.interfaces';
import { computed } from 'vue';
import { useUtilsComposables } from 'src/composables/utilsComposables';

const { isEliminarOpen } = useUtilsComposables();

interface Props {
  deleteUpd?: DeleteInterface;
}
const props = withDefaults(defineProps<Props>(), {
  deleteUpd: () => {
    return {
      titulo: '',
      url: '',
    };
  },
});
const todo = computed(() => props.deleteUpd);

const eliminar = async () => {
  await deleteComponent(todo.value.titulo, todo.value.url);
  // if (todo.value.titulo === 'el usuario') await getAllUsers();
  // if (todo.value.titulo === 'el rol') await getAllRoles();
  // if (todo.value.titulo === 'la facultad') await getAllFacultades();
  // if (todo.value.titulo === 'el indicador') await getAllIndicadores();
  // if (todo.value.titulo === 'el tipo') await getAllTipos();
  // if (todo.value.titulo === 'la evaluación') await getAllEvaluaciones();
  // if (todo.value.titulo === 'el proceso') await getAllProcesos();
  // if (todo.value.titulo === 'el departamento') await getAllDepartamentos();
  // if (todo.value.titulo === 'la evaluación del objetivo') await getAllEoes();
  // if (todo.value.titulo === 'la evaluación del proceso')
  //   await getEvaluacionesProcesos();
  // if (todo.value.titulo === 'el objetivo') await getAllOes();
  // if (todo.value.titulo === 'los valores del indicador') await getImoes();
};
</script>
