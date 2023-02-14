<script setup lang="ts">
import { ref } from 'vue';
// import { MatriculasProps } from 'src/interfaces/matriculas.interfaces';
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
// const datos = ref(selectedMatriculaOpen.value);
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
        <q-card class="">
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
            <div class="text-h6 text-center">
              <q-img
                :src="`${
                  selectedMatriculaOpen.foto === ''
                    ? 'src/assets/images/64.png'
                    : selectedMatriculaOpen.foto
                }`"
                spinner-color="white"
                style="height: 190px; max-width: 350px"
                img-class="my-custom-image"
                fit="contain"
                class="rounded-borders"
              >
                <div class="absolute-bottom text-subtitle1 text-center">
                  {{
                    selectedMatriculaOpen.nombre +
                    ' ' +
                    selectedMatriculaOpen.apellido1 +
                    ' ' +
                    selectedMatriculaOpen.apellido2
                  }}
                </div>
              </q-img>
              <!-- Matricula de
              {{
                selectedMatriculaOpen.nombre +
                ' ' +
                selectedMatriculaOpen.apellido1 +
                ' ' +
                selectedMatriculaOpen.apellido2
              }} -->
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="fit row wrap justify-center items-start content-start">
              <q-input
                rounded
                label="Carrera"
                label-color="green"
                outlined
                filled
                :model-value="selectedMatriculaOpen.carrera"
                disable
                input-class="text-center text-2xl"
              />
            </div>
            <!-- {{ selectedMatriculaOpen }} -->
            <div class="fit row wrap justify-between content-center my-2">
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="CI"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.ci"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Tomo"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.tomo"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Folio"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.folio"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Fecha de Nacimiento"
                  label-color="green"
                  outlined
                  filled
                  :model-value="
                    selectedMatriculaOpen.fecha_nacimiento.substring(0, 10)
                  "
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
            </div>
            <div class="fit row wrap justify-between content-center my-2">
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="País de Nacimiento"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.pais_nacimiento"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Nacionalidad"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.nacionalidad"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Provincia"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.provincia"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Ciudad de Nacimiento"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.ciudad_nacimiento"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
            </div>
            <div class="fit row wrap justify-between content-center my-2">
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Sexo"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.sexo"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Color de Piel"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.color_piel"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Centro de Educación Superior"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.centro_edicacion_superior"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Curso Escolar"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.curso_escolar"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
            </div>
            <div class="fit row wrap justify-between content-center my-2">
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Facultad"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.facultad"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Año Académico"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.anno_academico"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Tipo de Curso"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.tipo_curso"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Situación Escolar"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.situacion_escolar"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
            </div>
            <div class="fit row wrap justify-between content-center my-2">
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Clase Estudiante"
                  label-color="green"
                  outlined
                  filled
                  v-model="selectedMatriculaOpen.clase_estudiante"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Procedencia Escolar"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.procedencia_escolar"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Matriculado?"
                  label-color="green"
                  outlined
                  filled
                  :model-value="`${
                    selectedMatriculaOpen.nunca_matriculado ? 'NUNCA' : 'SI'
                  }`"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Estuve Matriculado"
                  label-color="green"
                  outlined
                  filled
                  :model-value="`${
                    selectedMatriculaOpen.estuve_matriculado === ''
                      ? 'No he estado matriculado'
                      : selectedMatriculaOpen.estuve_matriculado
                  }`"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
            </div>
            <div class="fit row wrap justify-between content-center my-2">
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Está matriculado actualmente?"
                  label-color="green"
                  outlined
                  filled
                  :model-value="`${
                    selectedMatriculaOpen.no_estoy_matriculado ? 'NO' : 'SI'
                  }`"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Graduado"
                  label-color="green"
                  outlined
                  filled
                  :model-value="`${
                    selectedMatriculaOpen.no_soy_graduado ? 'NO' : 'SI'
                  }`"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Fecha"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.fecha.substring(0, 10)"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Fecha de Matricula"
                  label-color="green"
                  outlined
                  filled
                  :model-value="
                    selectedMatriculaOpen.fecha_matricula.substring(0, 10)
                  "
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
            </div>
            <div class="fit row wrap justify-between content-center my-2">
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Fecha de Ingreso CES"
                  label-color="green"
                  outlined
                  filled
                  :model-value="
                    selectedMatriculaOpen.fecha_ingreso_este_ces.substring(
                      0,
                      10
                    )
                  "
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Fecha de Ingreso Educación Superior"
                  label-color="green"
                  outlined
                  filled
                  :model-value="
                    selectedMatriculaOpen.fecha_ingreso_edu_super.substring(
                      0,
                      10
                    )
                  "
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Serie en Letras"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.serie_letras"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Serie en Números"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.serie_numero"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
            </div>
            <div class="fit row wrap justify-between content-center my-2">
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Año de curso de Ingreso"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.anno_ci"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Organizaciones"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.orgacizaciones"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Estado Civil"
                  label-color="green"
                  outlined
                  filled
                  :model-value="selectedMatriculaOpen.estado_civil"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
              <div
                class="col-3 col-xs-12 col-md-3 q-gutter-x-md q-gutter-xs q-col-gutter-xs text-2xl"
              >
                <q-input
                  label="Sancionado?"
                  label-color="green"
                  outlined
                  filled
                  :model-value="`${
                    selectedMatriculaOpen.sin_sancion ? 'SI' : 'NO'
                  }`"
                  disable
                  input-class="text-center text-2xl"
                />
              </div>
            </div>
            <div class="col-md-4 offset-2">
              <q-input
                label="Domicilio"
                label-color="green"
                outlined
                filled
                :model-value="selectedMatriculaOpen.domicilio"
                disable
                input-class="text-center text-2xl"
              />
            </div>
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
.my-custom-image {
  filter: blur(1px) sepia();
}
</style>
