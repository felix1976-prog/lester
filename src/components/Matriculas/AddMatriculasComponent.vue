<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="isMatriculasOpen"
      position="top"
      persistent
      class="w-800 h-700"
    >
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        class="w-700 h-700"
      >
        <q-step
          :name="1"
          :title="`${formTitle} Información Personal`"
          icon="settings"
          :done="step > 1"
        >
          <div class="row items-center justify-center mb-2">
            <q-img
              src="https://cdn.quasar.dev/img/image-src.png"
              srcset="https://cdn.quasar.dev/img/image-1x.png 300w,
                https://cdn.quasar.dev/img/image-2x.png 2x,
                https://cdn.quasar.dev/img/image-3x.png 3x,
                https://cdn.quasar.dev/img/image-4x.png 4x"
              style="height: 200px; max-width: 300px"
            >
              <div class="absolute-bottom text-body1 text-center">
                Mi Perfil
              </div>
            </q-img>
          </div>
          <div>
            <q-input
              v-if="!matriculasEdit"
              filled
              type="text"
              v-model="datos.nombre"
              label="Nombre"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Escriba su Nombre']"
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
              :rules="[(val) => (val && val.length > 0) || 'Escriba su Nombre']"
            >
              <template v-slot:append>
                <q-icon name="las la-user-plus" />
              </template>
            </q-input>
          </div>
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="text"
                v-model="datos.apellido1"
                label="1 Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su 1 apellido',
                ]"
              />

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.apellido1"
                label="1 Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su 1 apellido',
                ]"
              />
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="text"
                v-model="datos.apellido1"
                label="2 Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su 2 apellido',
                ]"
              />

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.apellido1"
                label="2 Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su 2 apellido',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
          </div>
          <div>
            <q-input
              v-if="!matriculasEdit"
              filled
              type="text"
              v-model="datos.ci"
              label="CI"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Escriba su CI']"
            >
              <template v-slot:append>
                <q-icon name="las la-wallet" />
              </template>
            </q-input>

            <q-input
              v-else
              filled
              type="text"
              v-model="todo.ci"
              label="CI"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Escriba su CI']"
            >
              <template v-slot:append>
                <q-icon name="las la-wallet" />
              </template>
            </q-input>
          </div>
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="text"
                v-model="datos.tomo"
                label="Tomo"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Escriba el tomo']"
              />

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.tomo"
                label="Tomo"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Escriba el tomo']"
              />
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="text"
                v-model="datos.folio"
                label="Folio"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el folio',
                ]"
              />

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.folio"
                label="folio"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el folio',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn @click="step = 2" color="primary" label="Continuar" />
          </q-stepper-navigation>
        </q-step>
        <q-step
          :name="2"
          title="Otra Información Personal"
          caption="Otros datos"
          icon="create_new_folder"
          :done="step > 2"
        >
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.color_piel"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsCP"
                @filter="filterFnColorPiel"
                hint="Color de Piel"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="datos.color_piel"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsCP"
                @filter="filterFnColorPiel"
                hint="Color de Piel"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.sexo"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsSexo"
                @filter="filterFnSexos"
                hint="Sexo"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="datos.sexo"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsSexo"
                @filter="filterFnSexos"
                hint="Sexo"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="number"
                v-model="datos.edad"
                label="Edad"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Escriba su edad']"
              />

              <q-input
                v-else
                filled
                type="number"
                v-model="todo.edad"
                label="Edad"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Escriba su edad']"
              />
            </div>
            <div class="my-2 w-220px">
              <q-toggle
                v-if="!matriculasEdit"
                size="lg"
                v-model="datos.huerfano"
                checked-icon="check"
                color="red"
                :label="`Huérfano ${datos.huerfano ? 'Si 😭' : 'No 🥰'}`"
                unchecked-icon="clear"
                class="text-xl text-grey"
              />

              <q-toggle
                v-else
                v-model="todo.huerfano"
                checked-icon="check"
                color="red"
                :label="`Huérfano ${datos.huerfano ? 'Si 😭' : 'No 🥰'}`"
                unchecked-icon="clear"
                class="text-xl text-grey"
              />
            </div>
          </div>
          <div>
            <q-input
              v-if="!matriculasEdit"
              filled
              type="text"
              v-model="datos.domicilio"
              label="Domicilio"
              autogrow
              class="min-h-30"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Escriba su Domicilio',
              ]"
            />
            <q-input
              v-else
              filled
              type="text"
              v-model="todo.domicilio"
              label="Domicilio"
              autogrow
              class="min-h-30"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Escriba su Domicilio',
              ]"
            />
          </div>
          <q-stepper-navigation>
            <q-btn @click="step = 3" color="primary" label="Continuar" />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Ad template"
          icon="assignment"
          :done="step > 3"
        >
          <!-- FEcha y fecha de nacimiento -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="flex justify-between">
              <div class="col-xs-12 col-md-6">
                <q-input
                  type="text"
                  label="Fecha de nacimiento"
                  v-model="datos.fecha_nacimiento"
                >
                  <template v-slot:append>
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy
                        @before-show="updateProxyFN"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="proxyDateFN">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              label="Cancel"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              label="OK"
                              color="primary"
                              flat
                              @click="saveFN"
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-md-6 mx-1">
                <q-input type="text" label="Fecha" v-model="datos.fecha">
                  <template v-slot:append>
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy
                        @before-show="updateProxyFN"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="proxyDateFN">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              label="Cancel"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              label="OK"
                              color="primary"
                              flat
                              @click="saveFN"
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <!-- Fin fecha nacinmiento -->

          <!-- Provincia y pais de nacimiento -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.provincia"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsProvincias"
                @filter="filterFnProvincias"
                option-value="id"
                option-label="provincia"
                label="Provincia"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="datos.provincia"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsProvincias"
                @filter="filterFnProvincias"
                option-value="id"
                option-label="provincia"
                label="Provincia"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.pais_nacimiento"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsPais"
                @filter="filterFnPais"
                option-value="id"
                option-label="pais"
                label="País"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="datos.pais_nacimiento"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsPais"
                @filter="filterFnPais"
                option-value="id"
                option-label="pais"
                label="País"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <!-- fin de pais y provincia -->
          <!-- CIUDAD Y NACIONALIDAD -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.ciudad_nacimiento"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsMunicipio"
                @filter="filterFnMunicipio"
                option-value="id"
                option-label="municipio"
                label="Ciudad de Nacimiento"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="datos.ciudad_nacimiento"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsMunicipio"
                @filter="filterFnMunicipio"
                option-value="id"
                option-label="municipio"
                label="Ciudad de Nacimiento"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.nacionalidad"
                label="Nacionalidad"
              />

              <q-input
                v-else
                filled
                v-model="datos.nacionalidad"
                label="Nacionalidad"
              />
            </div>
          </div>
          <!--FIN CIUDAD Y NACIONALIDAD -->
          <q-stepper-navigation>
            <q-btn @click="step = 4" color="primary" label="continuar" />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="4" title="Información Civil" icon="add_comment">
          <!-- Estado civil y registro civol -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.estado_civil"
                use-input
                label="Estado civil"
              />

              <q-input
                v-else
                filled
                v-model="datos.estado_civil"
                use-input
                label="Estado civil"
              />
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.registro_civil"
                label="Registro Civil"
              />

              <q-input
                v-else
                filled
                v-model="datos.registro_civil"
                label="Registro Civil"
              />
            </div>
          </div>
          <!--FIN Estadi civil y registro civil -->

          <!-- Sin Sancion y Sancionado -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-toggle
                v-if="!matriculasEdit"
                v-model="datos.sin_sancion"
                checked-icon="check"
                color="red"
                :label="`Tiene sanción ${datos.sin_sancion ? 'Si' : 'No'}`"
                unchecked-icon="clear"
                class="text-xl text-grey align-middle"
              />

              <q-toggle
                v-else
                v-model="datos.sin_sancion"
                checked-icon="check"
                color="red"
                :label="`Tiene sanción ${datos.sin_sancion ? 'Si' : 'No'}`"
                unchecked-icon="clear"
                class="text-xl text-grey align-middle"
              />
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.sancionado"
                label="Sanción"
                :disable="!datos.sin_sancion"
              />

              <q-input
                v-else
                filled
                v-model="datos.sancionado"
                label="Sanción"
                :disable="!datos.sin_sancion"
              />
            </div>
          </div>
          <!--FIN Sin sancion y sancionado -->

          <!-- discapacida serie letra serie nueros -->
          <div class="my-2">
            <q-input
              v-if="!matriculasEdit"
              filled
              v-model="datos.discapacidad"
              label="Discapacidad"
            />

            <q-input
              v-else
              filled
              v-model="datos.discapacidad"
              label="Discapacidad"
            />
          </div>
          <div class="my-2">
            <q-input
              v-if="!matriculasEdit"
              filled
              v-model="datos.serie_letras"
              label="Serie Letras"
            />

            <q-input
              v-else
              filled
              v-model="datos.serie_letras"
              label="Serie Letras"
            />
          </div>
          <div class="my-2">
            <q-input
              v-if="!matriculasEdit"
              filled
              v-model="datos.serie_numero"
              label="Serie Números"
            />

            <q-input
              v-else
              filled
              v-model="datos.serie_numero"
              label="Serie Números"
            />
          </div>
          <!--Fin discapacida serie letra serie nueros -->
          <q-stepper-navigation>
            <q-btn @click="step = 5" color="primary" label="continuar" />
            <q-btn
              flat
              @click="step = 3"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
        <q-step
          :name="5"
          title="Información Académica y otras"
          icon="add_comment"
        >
          <!-- FEcha y fecha de nacimiento -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="flex justify-between">
              <div class="col-xs-12 col-md-6">
                <q-input
                  type="text"
                  label="Fecha de matricula"
                  v-model="datos.fecha_matricula"
                >
                  <template v-slot:append>
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy
                        @before-show="updateProxyFN"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="proxyDateFN">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              label="Cancel"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              label="OK"
                              color="primary"
                              flat
                              @click="saveFN"
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-md-6 mx-1">
                <q-input
                  type="text"
                  label="Fecha Ingreso Semestre"
                  v-model="datos.fecha_ingreso_este_ces"
                >
                  <template v-slot:append>
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy
                        @before-show="updateProxyFN"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="proxyDateFN">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              label="Cancel"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              label="OK"
                              color="primary"
                              flat
                              @click="saveFN"
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <!-- Fin fecha matricula fechaingreso este ces -->
          <q-stepper-navigation>
            <q-btn color="primary" label="Finish" />
            <q-btn
              flat
              @click="step = 4"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMatriculastore } from '../../stores/matriculas/matriculas-store';
import { MatriculasProps } from '../../interfaces/matriculas.interfaces';
import { ProvinciaList } from 'src/interfaces/provincias.interfaces';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';
import { MunicipioList } from 'src/interfaces/municipios.interfaces';
import { useProvinciasStore } from 'src/stores/provincias/provincias-store';
import { useNomencladoresStore } from 'src/stores/nomencladores/nomencladores-store';
import { usePaisesStore } from 'src/stores/paises/paises-store';
import { PaisList } from 'src/interfaces/pais.interfaces';

const { addMatriculas, isMatriculasToggle, editandoForm, fecthMatriculas } =
  useMatriculastore();
const { isMatriculasOpen, matriculasEdit } = storeToRefs(useMatriculastore());
const { municipios } = storeToRefs(useMunicipiosStore());
const { provincias } = storeToRefs(useProvinciasStore());
const { paises } = storeToRefs(usePaisesStore());
const { ColorPiel, Sexos } = storeToRefs(useNomencladoresStore());

//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !matriculasEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isMatriculasToggle();
  editandoForm(false);
};

//STEPS
const step = ref(1);

//Insertar usuario
const datos = ref({
  id: '',
  centro_edicacion_superior: '',
  curso_escolar: '',
  facultad: '',
  carrera: '',
  foto: '',
  anno_academico: '',
  tipo_curso: '',
  fecha_matricula: new Date().toISOString(),
  fecha_ingreso_este_ces: new Date().toISOString(),
  fecha_ingreso_edu_super: new Date().toISOString(),
  ci: '',
  serie_letras: '',
  serie_numero: '',
  tomo: 0,
  folio: 0,
  anno_ci: 0,
  fecha_nacimiento: new Date().toISOString().substring(0, 10),
  edad: 0,
  nombre: '',
  apellido1: '',
  apellido2: '',
  sexo: '',
  color_piel: '',
  ciudad_nacimiento: '',
  pais_nacimiento: '',
  nacionalidad: '',
  orgacizaciones: '',
  estado_civil: '',
  huerfano: false,
  discapacidad: '',
  situacion_escolar: '',
  clase_estudiante: '',
  procedencia_escolar: '',
  domicilio: '',
  registro_civil: '',
  provincia: '',
  fecha: new Date().toISOString().substring(0, 10),
  sin_sancion: true,
  sancionado: '',
  nunca_matriculado: true,
  estuve_matriculado: '',
  no_estoy_matriculado: true,
  no_soy_graduado: false,
  aceptado: false,
});

// datos de las fechas
const proxyDateFN = ref(new Date().toISOString());

const updateProxyFN = () => {
  proxyDateFN.value = datos.value.fecha_nacimiento;
};

const saveFN = () => {
  datos.value.fecha_nacimiento = proxyDateFN.value;
};

let optionsMunicipio = ref(municipios);
let filterFnMunicipio = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsMunicipio.value = municipios.value
        ?.map((value: MunicipioList) => {
          return {
            id: value.id,
            municipio: value.municipio,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.municipio);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsMunicipio.value = municipios.value
      ?.map((value: MunicipioList) => {
        return {
          id: value.id,
          municipio: value.municipio,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.municipio.toLowerCase().indexOf(needle) > -1);
  });
};

// provinias
let optionsProvincias = ref(provincias);
let filterFnProvincias = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsProvincias.value = provincias.value
        ?.map((value: ProvinciaList) => {
          return {
            id: value.id,
            provincia: value.provincia,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.provincia);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsProvincias.value = provincias.value
      ?.map((value: ProvinciaList) => {
        return {
          id: value.id,
          provincia: value.provincia,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.provincia.toLowerCase().indexOf(needle) > -1);
  });
};

// pais
let optionsPais = ref(paises);
let filterFnPais = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsPais.value = paises.value
        ?.map((value: PaisList) => {
          return {
            id: value.id,
            pais: value.pais,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.pais);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsPais.value = paises.value
      ?.map((value: PaisList) => {
        return {
          id: value.id,
          pais: value.pais,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.pais);
  });
};
//color de piel
const optionsCP = ref(ColorPiel);
const filterFnColorPiel = (
  val: string,
  update: (arg0: () => void) => void,
  abort: any
) => {
  update(() => {
    const needle = val.toLowerCase();
    optionsCP.value = ColorPiel.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
//sexos
const optionsSexo = ref(Sexos);
const filterFnSexos = (
  val: string,
  update: (arg0: () => void) => void,
  abort: any
) => {
  update(() => {
    const needle = val.toLowerCase();
    optionsCP.value = Sexos.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
const add = async () => {
  let dto = {
    id: datos.value.id,
    centro_edicacion_superior: datos.value.centro_edicacion_superior,
    curso_escolar: datos.value.curso_escolar,
    facultad: datos.value.facultad,
    carrera: datos.value.carrera,
    foto: datos.value.foto,
    anno_academico: datos.value.anno_academico,
    tipo_curso: datos.value.tipo_curso,
    fecha_matricula: datos.value.fecha_matricula,
    fecha_ingreso_este_ces: datos.value.fecha_ingreso_este_ces,
    fecha_ingreso_edu_super: datos.value.fecha_ingreso_edu_super,
    ci: datos.value.ci,
    serie_letras: datos.value.serie_letras,
    serie_numero: datos.value.serie_numero,
    tomo: datos.value.tomo,
    folio: datos.value.folio,
    anno_ci: datos.value.anno_ci,
    fecha_nacimiento: datos.value.fecha_nacimiento,
    edad: datos.value.edad,
    nombre: datos.value.nombre,
    apellido1: datos.value.apellido1,
    apellido2: datos.value.apellido2,
    sexo: datos.value.sexo,
    color_piel: datos.value.color_piel,
    ciudad_nacimiento: datos.value.ciudad_nacimiento,
    pais_nacimiento: datos.value.pais_nacimiento,
    nacionalidad: datos.value.nacionalidad,
    orgacizaciones: datos.value.orgacizaciones,
    estado_civil: datos.value.estado_civil,
    huerfano: datos.value.huerfano,
    discapacidad: datos.value.discapacidad,
    situacion_escolar: datos.value.situacion_escolar,
    clase_estudiante: datos.value.clase_estudiante,
    procedencia_escolar: datos.value.procedencia_escolar,
    domicilio: datos.value.domicilio,
    registro_civil: datos.value.registro_civil,
    provincia: datos.value.provincia,
    fecha: datos.value.fecha,
    sin_sancion: datos.value.sin_sancion,
    sancionado: datos.value.sancionado,
    nunca_matriculado: datos.value.nunca_matriculado,
    estuve_matriculado: datos.value.estuve_matriculado,
    no_estoy_matriculado: datos.value.no_estoy_matriculado,
    no_soy_graduado: datos.value.no_soy_graduado,
    aceptado: datos.value.aceptado,
  };
  await addMatriculas(dto);
  await fecthMatriculas();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  matriculasUpd?: MatriculasProps;
}
const props = withDefaults(defineProps<Props>(), {
  matriculasUpd: () => {
    return {
      id: '',
      centro_edicacion_superior: '',
      curso_escolar: '',
      facultad: '',
      carrera: '',
      foto: '',
      anno_academico: '',
      tipo_curso: '',
      fecha_matricula: new Date(),
      fecha_ingreso_este_ces: new Date(),
      fecha_ingreso_edu_super: new Date(),
      ci: '',
      serie_letras: '',
      serie_numero: '',
      tomo: 0,
      folio: 0,
      anno_ci: 0,
      fecha_nacimiento: new Date(),
      edad: 0,
      nombre: '',
      apellido1: '',
      apellido2: '',
      sexo: '',
      color_piel: '',
      ciudad_nacimiento: '',
      pais_nacimiento: '',
      nacionalidad: '',
      orgacizaciones: '',
      estado_civil: '',
      huerfano: false,
      discapacidad: '',
      situacion_escolar: '',
      clase_estudiante: '',
      procedencia_escolar: '',
      domicilio: '',
      registro_civil: '',
      provincia: '',
      fecha: new Date(),
      sin_sancion: true,
      sancionado: '',
      nunca_matriculado: true,
      estuve_matriculado: '',
      no_estoy_matriculado: true,
      no_soy_graduado: false,
      aceptado: false,
    };
  },
});
const todo = computed(() => props.matriculasUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
