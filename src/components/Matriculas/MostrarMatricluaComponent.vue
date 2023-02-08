<script setup lang="ts">
import { ref } from 'vue';
import { MatriculasProps } from 'src/interfaces/matriculas.interfaces';
import { useUtilsComposables } from 'src/composables/utilsComposables';
// interface ver extends MatriculasProps {
//   show: boolean;
// }
// const propsShow = defineProps({
//   show: Boolean,
// });
const { isShowMatriculaOpen, showMatriculas, selectedMatriculaOpen } =
  useUtilsComposables();

const maximizedToggle = ref(true);
const datos = ref(selectedMatriculaOpen.value);
</script>

<template>
  <Transition name="modal">
    <div class="">
      <q-dialog
        v-model="isShowMatriculaOpen"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="bg-primary text-white">
          <q-bar>
            <q-space />

            <q-btn
              dense
              flat
              icon="minimize"
              @click="maximizedToggle = false"
              :disable="!maximizedToggle"
            >
              <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
                >Minimize</q-tooltip
              >
            </q-btn>
            <q-btn
              dense
              flat
              icon="crop_square"
              @click="maximizedToggle = true"
              :disable="maximizedToggle"
            >
              <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
                >Maximize</q-tooltip
              >
            </q-btn>
            <q-btn
              dense
              flat
              icon="close"
              v-close-popup
              @click="showMatriculas"
            >
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="text-h6">
              Matricula de {{ selectedMatriculaOpen.nombre }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ selectedMatriculaOpen }}
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </Transition>
</template>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}
.modal-container {
  width: 90%;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
