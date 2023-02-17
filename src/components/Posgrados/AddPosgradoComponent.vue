<template>
  <div class="q-pa-md q-gutter-sm">
    <!--  -->
    <q-form @submit="add">
      <q-dialog
        v-model="isPosgradoOpen"
        position="top"
        persistent
        class="w-100"
      >
        <q-stepper
          v-model="step"
          vertical
          color="primary"
          animated
          class="w-100"
        >
          <!-- Información Personal -->
          <q-step
            :name="1"
            :title="`${formTitle} Información Personal`"
            icon="settings"
            :done="step > 1"
          >
            <!-- Posgrado HAY QUE CAMBIERLE EL OPTIONS QUE ESTA CON EL DE MUNICIPIOS-->
            <div>
              <q-select
                class="q-mb-sm"
                v-if="!posgradoEdit"
                filled
                v-model="datos.postgrados_disponibleId"
                use-input
                input-debounce="0"
                label="Curso de Posgrado"
                :options="posgrados_disponibles"
                option-label="postgrado"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                class="q-mb-sm"
                v-else
                filled
                v-model="todo.postgrados_disponibleId"
                use-input
                input-debounce="0"
                label="Curso de Posgrado"
                :options="posgrados_disponibles"
                option-label="postgrado"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- ALOJAMIENTO -->
            <div class="flex justify-center q-pb-sm">
              <q-checkbox
                v-if="!posgradoEdit"
                v-model="datos.alojamiento"
                :label="
                  datos.alojamiento ? 'Con Alojamiento' : 'Sin Alojamiento'
                "
                checked-icon="swipe_left"
                unchecked-icon="swipe_right"
                :color="datos.alojamiento ? 'green' : 'red'"
                keep-color
              />
              <q-checkbox
                v-else
                v-model="todo.alojamiento"
                :label="
                  todo.alojamiento ? 'Con Alojamiento' : 'Sin Alojamiento'
                "
                checked-icon="swipe_left"
                unchecked-icon="swipe_right"
                :color="todo.alojamiento ? 'green' : 'red'"
                keep-color
              />
            </div>
            <!-- Nombre -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                type="text"
                v-model="datos.nombre"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su Nombre',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.nombre"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su Nombre',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- Apellidos1 -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                type="text"
                v-model="datos.apellido1"
                label="Primer apellido"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba su primer Apellido',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.apellido1"
                label="Primer apellido"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba su primer Apellido',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- Apellidos2 -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                type="text"
                v-model="datos.apellido2"
                label="Segundo Apellido"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba su segundo Apellido',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.apellido2"
                label="Segundo Apellido"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba su segundo Apellido',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- CI -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                type="text"
                maxlength="11"
                v-model="datos.ci"
                label="Carné de Identidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 10 && val.length < 12) ||
                    'Escriba su Carné de Identidad (debe tener 11 dígitos)',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-wallet" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                maxlength="11"
                v-model="todo.ci"
                label="Carné de Identidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 10 && val.length < 12) ||
                    'Escriba su Carné de Identidad (debe tener 11 dígitos)',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-wallet" />
                </template>
              </q-input>
            </div>
            <!-- Sexo -->
            <div>
              <q-select
                class="q-mb-md"
                v-if="!posgradoEdit"
                filled
                v-model="datos.sexo"
                use-input
                input-debounce="0"
                label="Sexo"
                :options="Sexos"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                class="q-mb-md"
                v-else
                filled
                v-model="todo.sexo"
                use-input
                input-debounce="0"
                label="Sexo"
                :options="Sexos"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- Pais -->
            <div>
              <q-select
                class="q-mb-md"
                v-if="!posgradoEdit"
                filled
                v-model="datos.pais"
                use-input
                input-debounce="0"
                label="País"
                :options="paises"
                option-label="pais"
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                class="q-mb-md"
                v-else
                filled
                v-model="todo.pais"
                use-input
                input-debounce="0"
                label="País"
                :options="paises"
                option-label="pais"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- Privincia -->
            <div>
              <q-select
                class="q-mb-md"
                v-if="!posgradoEdit"
                filled
                v-model="datos.provincia"
                use-input
                input-debounce="0"
                label="Provincia"
                :options="provincias"
                option-label="provincia"
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                class="q-mb-md"
                v-else
                filled
                v-model="todo.provincia"
                use-input
                input-debounce="0"
                label="Provincia"
                :options="provincias"
                option-label="provincia"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- Municipio -->
            <div>
              <q-select
                class="q-mb-md"
                v-if="!posgradoEdit"
                filled
                v-model="datos.municipio"
                use-input
                input-debounce="0"
                label="Municipio"
                :options="municipios"
                option-label="municipio"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                class="q-mb-md"
                v-else
                filled
                v-model="todo.municipio"
                use-input
                input-debounce="0"
                label="Municipio"
                :options="municipios"
                option-label="municipio"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- POBLADOS -->
            <div>
              <q-select
                class="q-mb-md"
                v-if="!posgradoEdit"
                filled
                v-model="datos.poblado"
                use-input
                input-debounce="0"
                label="Poblado"
                :options="poblados"
                option-label="poblado"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                class="q-mb-md"
                v-else
                filled
                v-model="todo.poblado"
                use-input
                input-debounce="0"
                label="Poblado"
                :options="poblados"
                option-label="poblado"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section> Sin Resultados </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- Domicilio -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                type="text"
                v-model="datos.domicilio"
                label="Domicilio"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba su dirección particular)',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-wallet" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.domicilio"
                label="Domicilio"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba su dirección particular)',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-wallet" />
                </template>
              </q-input>
            </div>

            <q-stepper-navigation>
              <q-btn
                @click="
                  !posgradoEdit
                    ? avanzar()
                      ? (step = 2)
                      : (step = 1)
                    : (step = 2)
                "
                color="primary"
                label="Continuar"
              />
              <q-btn
                flat
                @click="cerrar"
                color="negative"
                label="Cerrar"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>
          <!-- Información Académica -->
          <q-step
            :name="2"
            title="Información Académica"
            caption="Notas Evaluativas"
            icon="create_new_folder"
            :done="step > 2"
          >
            <!-- GRADUADO -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                type="text"
                v-model="datos.graduado"
                label="Graduado de"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba de que especialidad se graduó',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.graduado"
                label="Graduado de"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba de que especialidad se graduó',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- Fecha -->
            <div class="q-pb-lg">
              <q-chip outline color="primary" text-color="white" icon="event">
                Fecha de graduado
              </q-chip>
              <q-input
                v-if="!posgradoEdit"
                dense
                filled
                v-model="datos.fecha_graduado"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="datos.fecha_graduado">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input v-else dense filled v-model="todo.fecha_graduado">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="todo.fecha_graduado">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <!-- UNIVERSIDAD -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model="datos.universidad"
                label="Universidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba en universidad se graduó',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model="todo.universidad"
                label="Universidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba en universidad se graduó',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- TOMO -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model.number="datos.tomo"
                label="Tomo de la universidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 1) || 'Escriba el Tomo de la Universidad',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model.number="todo.tomo"
                label="Tomo de la universidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 1) || 'Escriba el Tomo de la Universidad',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- FOLIO -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model.number="datos.folio"
                label="Folio de la universidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 1) || 'Escriba el folio de la universidad',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model.number="todo.folio"
                label="Folio de la universidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 1) || 'Escriba el folio de la universidad',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- NÚMERO DE LA UNIVERSIDAD -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model.number="datos.numero_universidad"
                label="Número de la Univesidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 1) || 'Escriba el número de la Universidad',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model.number="todo.numero_universidad"
                label="Número de la Univesidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 1) || 'Escriba el número de la Universidad',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- CENTRO LABORAL -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model="datos.centro_laboral"
                label="Centro Laboral"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba el nombre de su centro laboral',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                readonly
                v-model="todo.centro_laboral"
                label="Centro Laboral"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba el nombre de su centro laboral',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- DIRECCION -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model="datos.direccion"
                label="Dirección de su Centro Laboral"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba la dirección de su centro laboral',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model="todo.direccion"
                label="Dirección de su Centro Laboral"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba la dirección de su centro laboral',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- ADMINISTRADOR -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model="datos.administrador"
                label="Nombre de su Administrador"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba el nombre de su jefe administrativo',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model="todo.administrador"
                label="Nombre de su Administrador"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba el nombre de su jefe administrativo',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- TELEFONO -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model="datos.telefono"
                label="Teléfono"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length >= 6 && val.length <= 16) ||
                    'Escriba el número telefónico del centro laboral',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model="todo.telefono"
                label="Teléfono"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length >= 6 && val.length <= 16) ||
                    'Escriba el número telefónico del centro laboral',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <q-stepper-navigation>
              <q-btn
                @click="!posgradoEdit ? add() : actualizar()"
                color="primary"
                :label="`${!posgradoEdit ? 'Insertar' : 'Actualizar'}`"
              />
              <q-btn
                flat
                @click="step = 1"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
              <q-btn
                flat
                @click="cerrar"
                color="negative"
                label="Cerrar"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-dialog>
      <!--  -->
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { QBtn, QDialog, QForm, QIcon, QInput, useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useNomencladoresStore } from '../../stores/nomencladores/nomencladores-store';
import { useProvinciasStore } from '../../stores/provincias/provincias-store';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';
import { usePosgradosStore } from 'src/stores/posgrados/posgrados-store';
import { usePaisesStore } from 'src/stores/paises/paises-store';
import { PosgradoProps } from 'src/interfaces/posgrados.interfaces';
import { usePobladoStore } from 'src/stores/poblados/poblados-store';
import { usePosDisponibleStore } from 'src/stores/posgrados_disponibles/posgrados_disponibles-store';

const $q = useQuasar();
const {
  addPosgrado,
  isPosgradoToggle,
  editandoForm,
  fetchPosgrado,
  editPosgrado,
} = usePosgradosStore();
const { isPosgradoOpen, posgradoEdit } = storeToRefs(usePosgradosStore());

// OBTENER LOS NOMENCLADORES NECESARIOS
const { getSexos, getSMA, getConvocatorias } = useNomencladoresStore();
const { fecthPaises } = usePaisesStore();
const { fecthProvincias } = useProvinciasStore();
const { fecthMunicipios } = useMunicipiosStore();
const { fecthPoblado } = usePobladoStore();
const { fecthPosDisp } = usePosDisponibleStore();
const { Sexos, SMA, Convocatorias } = storeToRefs(useNomencladoresStore());
const { paises } = storeToRefs(usePaisesStore());
const { provincias } = storeToRefs(useProvinciasStore());
const { municipios } = storeToRefs(useMunicipiosStore());
const { poblados } = storeToRefs(usePobladoStore());
const { posgrados_disponibles } = storeToRefs(usePosDisponibleStore());

onMounted(() => {
  if (Sexos.value.length === 0) {
    getSexos();
  }
  if (SMA.value.length === 0) {
    getSMA();
  }
  if (Convocatorias.value.length === 0) {
    getConvocatorias();
  }
  if (paises.value.length === 0) {
    fecthPaises();
  }
  if (provincias.value.length === 0) {
    fecthProvincias();
  }
  if (municipios.value.length === 0) {
    fecthMunicipios();
  }
  if (poblados.value.length === 0) {
    fecthPoblado();
  }
  if (posgrados_disponibles.value.length === 0) {
    fecthPosDisp();
  }
});

//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !posgradoEdit.value ? 'Insertar' : 'Editar';
});
//STEPS
let step = ref(1);

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isPosgradoToggle();
  editandoForm(false);
  datos.value = ref({
    nombre: '',
    apellido1: '',
    apellido2: '',
    ci: '',
    sexo: '',
    pais: '',
    provincia: '',
    municipio: '',
    poblado: '',
    domicilio: '',
    graduado: '',
    fecha_graduado: new Date().toISOString().substring(0, 10),
    universidad: '',
    tomo: 0,
    folio: 0,
    numero_universidad: 0,
    centro_laboral: '',
    direccion: '',
    administrador: '',
    telefono: '',
    alojamiento: false,
    aceptado: false,
    postgrados_disponibleId: '',
  });
  step = ref(1);
};

//Insertar usuario
let datos = ref({
  nombre: '',
  apellido1: '',
  apellido2: '',
  ci: '',
  sexo: '',
  pais: '',
  provincia: '',
  municipio: '',
  poblado: '',
  domicilio: '',
  graduado: '',
  fecha_graduado: new Date().toISOString().substring(0, 10),
  universidad: '',
  tomo: 0,
  folio: 0,
  numero_universidad: 0,
  centro_laboral: '',
  direccion: '',
  administrador: '',
  telefono: '',
  alojamiento: false,
  aceptado: false,
  postgrados_disponibleId: '',
});

const add = async () => {
  let dto = {
    nombre: datos.value.nombre,
    apellido1: datos.value.apellido1,
    apellido2: datos.value.apellido2,
    ci: datos.value.ci,
    sexo: datos.value.sexo,
    pais: datos.value.pais.pais,
    provincia: datos.value.provincia.provincia,
    municipio: datos.value.municipio.municipio,
    poblado: datos.value.poblado.poblado,
    domicilio: datos.value.domicilio,
    graduado: datos.value.graduado,
    fecha_graduado: datos.value.fecha_graduado,
    universidad: datos.value.universidad,
    tomo: datos.value.tomo,
    folio: datos.value.folio,
    numero_universidad: datos.value.numero_universidad,
    centro_laboral: datos.value.centro_laboral,
    direccion: datos.value.direccion,
    administrador: datos.value.administrador,
    telefono: datos.value.telefono,
    alojamiento: datos.value.alojamiento,
    aceptado: false,
    postgrados_disponibleId: datos.value.postgrados_disponibleId.id,
  };

  if (
    dto.postgrados_disponibleId !== '' &&
    dto.alojamiento !== null &&
    dto.nombre !== '' &&
    dto.apellido1 !== '' &&
    dto.apellido2 !== '' &&
    dto.ci !== '' &&
    dto.sexo !== '' &&
    dto.pais !== '' &&
    dto.provincia !== '' &&
    dto.municipio !== '' &&
    dto.poblado !== '' &&
    dto.domicilio !== '' &&
    dto.graduado !== '' &&
    dto.fecha_graduado !== '' &&
    dto.universidad !== '' &&
    dto.tomo > 0 &&
    dto.folio > 0 &&
    dto.numero_universidad > 0 &&
    dto.centro_laboral !== '' &&
    dto.direccion !== '' &&
    dto.administrador !== '' &&
    dto.telefono.length > 6 &&
    dto.aceptado !== null
  ) {
    console.log('Entrada: ', dto);

    cerrar();

    try {
      await addPosgrado(dto);
      await fetchPosgrado();
      $q.notify({
        type: 'positive',
        message: 'Registro insertado satisfactoriamente',
      });
      step = ref(1);
    } catch (error) {
      console.log(error);
    }
  } else {
    $q.notify({
      type: 'info',
      message: 'Debe llenar todos los campos con valores válidos',
      multiLine: true,
    });
  }
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  posUpd?: PosgradoProps;
}
const props = withDefaults(defineProps<Props>(), {
  posUpd: () => {
    return {
      id: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      ci: '',
      sexo: '',
      pais: '',
      provincia: '',
      municipio: '',
      poblado: '',
      domicilio: '',
      graduado: '',
      fecha_graduado: new Date().toISOString().substring(0, 10),
      universidad: '',
      tomo: 0,
      folio: 0,
      numero_universidad: 0,
      centro_laboral: '',
      direccion: '',
      administrador: '',
      telefono: '',
      alojamiento: false,
      aceptado: false,
      postgrados_disponibleId: '',
    };
  },
});

const todo = computed(() => props.posUpd);

const actualizar = async () => {
  if (
    todo.value.postgrados_disponibleId !== '' &&
    todo.value.alojamiento !== null &&
    todo.value.nombre !== '' &&
    todo.value.apellido1 !== '' &&
    todo.value.apellido2 !== '' &&
    todo.value.ci !== '' &&
    todo.value.sexo !== '' &&
    todo.value.pais !== '' &&
    todo.value.provincia !== '' &&
    todo.value.municipio !== '' &&
    todo.value.poblado !== '' &&
    todo.value.domicilio !== '' &&
    todo.value.graduado !== '' &&
    todo.value.fecha_graduado !== '' &&
    todo.value.universidad !== '' &&
    todo.value.tomo > 0 &&
    todo.value.folio > 0 &&
    todo.value.numero_universidad > 0 &&
    todo.value.centro_laboral !== '' &&
    todo.value.direccion !== '' &&
    todo.value.administrador !== '' &&
    todo.value.telefono.length > 6 &&
    todo.value.aceptado !== null
  ) {
    try {
      if (todo.value.municipio.codigo) {
        todo.value.municipio = todo.value.municipio.municipio;
      }

      if (todo.value.provincia.codigo) {
        todo.value.provincia = todo.value.provincia.provincia;
      }
      if (todo.value.poblado.codigo) {
        todo.value.poblado = todo.value.poblado.poblado;
      }

      if (todo.value.pais.codigo) {
        todo.value.pais = todo.value.pais.pais;
      }

      await editPosgrado(todo.value);
      await fetchPosgrado();
      cerrar();

      $q.notify({
        type: 'positive',
        message: 'Registro actualizado satisfactoriamente',
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    $q.notify({
      type: 'info',
      message: 'Debe llenar todos los campos con valores válidos',
      multiLine: true,
    });
  }
};
// FIN  ACTUALIZAR

// FUNCION PARA AVANZAR AL PROXIMO PASO DEL FORMULARIO VALIDANDOLO
const avanzar = () => {
  if (
    (datos.value.postgrados_disponibleId !== '' &&
      datos.value.alojamiento !== null &&
      datos.value.nombre !== '' &&
      datos.value.apellido1 !== '' &&
      datos.value.apellido2 !== '' &&
      datos.value.ci !== '' &&
      datos.value.sexo !== '' &&
      datos.value.pais !== '' &&
      datos.value.provincia !== '' &&
      datos.value.municipio !== '' &&
      datos.value.poblado !== '' &&
      datos.value.domicilio !== '') ||
    (todo.value.postgrados_disponibleId !== '' &&
      todo.value.alojamiento !== null &&
      todo.value.nombre !== '' &&
      todo.value.apellido1 !== '' &&
      todo.value.apellido2 !== '' &&
      todo.value.ci !== '' &&
      todo.value.sexo !== '' &&
      todo.value.pais !== '' &&
      todo.value.provincia !== '' &&
      todo.value.municipio !== '' &&
      todo.value.poblado !== '' &&
      todo.value.domicilio !== '')
  ) {
    return true;
  } else {
    $q.notify({
      type: 'info',
      message: 'Debe llenar todos los campos con valores válidos',
      multiLine: true,
    });
  }
};
// FIN DE LA FUNCION PARA AVANZAR AL PROXIMO PASO DEL FORMULARIO VALIDANDOLO
</script>
