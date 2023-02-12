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
            <!-- Apellidos -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                type="text"
                v-model="datos.apellidos"
                label="Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba sus Apellidos',
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
                v-model="todo.apellidos"
                label="Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba sus Apellidos',
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
            <!-- SMA -->
            <div>
              <q-select
                class="q-mb-md"
                v-if="!posgradoEdit"
                filled
                v-model="datos.sma"
                use-input
                input-debounce="0"
                label="Servicio Militar Activo"
                :options="SMA"
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
                v-model="todo.sma"
                use-input
                input-debounce="0"
                label="Servicio Militar Activo"
                :options="SMA"
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
            <!-- Fecha -->
            <div>
              <q-input v-if="!posgradoEdit" dense filled v-model="datos.fecha">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="datos.fecha">
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

              <q-input v-else dense filled v-model="todo.fecha">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="todo.fecha">
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
            <!-- PREUNIVERSITARIO -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                type="text"
                v-model="datos.preuniversitario"
                label="Preuniversitario"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el carné',
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
                v-model="todo.preuniversitario"
                label="Preuniversitario"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el carné',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- INDICE ACADEMICO -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model.number="datos.indice_academico"
                label="Índice Académico"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) ||
                    'Escriba el índice académico del estudiante',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model.number="todo.indice_academico"
                label="Índice Académico"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) ||
                    'Escriba el índice académico del estudiante',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- MATEMATICAS -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model.number="datos.matematica"
                label="Matemática"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) ||
                    'Escriba la nota de Matemática',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model.number="todo.matematica"
                label="Matemática"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) ||
                    'Escriba la nota de Matemática',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- ESPAÑOL -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model.number="datos.espanol"
                label="Español"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) ||
                    'Escriba la nota de Español',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model.number="todo.espanol"
                label="Español"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) ||
                    'Escriba la nota de Español',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- HISTORIA -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model.number="datos.historia"
                label="Historia"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) ||
                    'Escriba la nota de Historia',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model.number="todo.historia"
                label="Historia"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) ||
                    'Escriba la nota de Historia',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- ESCALAFÓN -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                readonly
                v-model.number="datos.escalafon"
                label="Escalafón"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) || 'Escriba el escalafón',
                ]"
              >
                <q-btn
                  @click="Escalafon(posgradoEdit)"
                  flat
                  icon="send"
                  label="Calcular"
                  size="sm"
                />
                <!-- <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template> -->
              </q-input>

              <q-input
                v-else
                filled
                readonly
                v-model.number="todo.escalafon"
                label="Escalafón"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val >= 60 && val <= 100) || 'Escriba el escalafón',
                ]"
              >
                <q-btn
                  @click="Escalafon(posgradoEdit)"
                  flat
                  icon="send"
                  label="Calcular"
                  size="sm"
                />
                <!-- <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template> -->
              </q-input>
            </div>
            <!-- CONVOCATORIA -->
            <div>
              <q-select
                class="q-mb-md"
                v-if="!posgradoEdit"
                filled
                v-model="datos.convocatoria"
                use-input
                input-debounce="0"
                label="Convocatoria"
                :options="Convocatorias"
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
                v-model="todo.convocatoria"
                use-input
                input-debounce="0"
                label="Convocatoria"
                :options="Convocatorias"
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
            <!-- OPCIÓN -->
            <div>
              <q-input
                v-if="!posgradoEdit"
                filled
                v-model.number="datos.opcion"
                label="Opción"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val > 0 && val <= 6) ||
                    'Escriba el número de la opción',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                v-model.number="todo.opcion"
                label="Opción"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val > 0 && val <= 6) ||
                    'Escriba el número de la opción',
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
// import { useBoletaStore } from 'src/stores/boleta/boleta-store';
// import { boletaProps } from 'src/interfaces/boleta.interfaces';
import { useNomencladoresStore } from '../../stores/nomencladores/nomencladores-store';
import { useProvinciasStore } from '../../stores/provincias/provincias-store';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';
import { usePosgradosStore } from 'src/stores/posgrados/posgrados-store';
import { usePaisesStore } from 'src/stores/paises/paises-store';
import { PosgradoProps } from 'src/interfaces/posgrados.interfaces';

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
const { Sexos, SMA, Convocatorias } = storeToRefs(useNomencladoresStore());
const { paises } = storeToRefs(usePaisesStore());
const { provincias } = storeToRefs(useProvinciasStore());
const { municipios } = storeToRefs(useMunicipiosStore());

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
});

//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !posgradoEdit.value ? 'Insertar' : 'Editar';
});
//STEPS
let step = ref(1);

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
  domicilio: '',
  graduado: '',
  fecha_graduado: new Date(Date.now()).toLocaleString(),
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
    pais: datos.value.pais,
    provincia: datos.value.provincia,
    municipio: datos.value.municipio,
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
    aceptado: datos.value.aceptado,
    postgrados_disponibleId: datos.value.postgrados_disponibleId,
  };

  if (
    dto.nombre !== '' &&
    dto.apellido1 !== '' &&
    dto.apellido2 !== '' &&
    dto.ci !== '' &&
    dto.sexo !== '' &&
    dto.pais !== '' &&
    dto.provincia !== '' &&
    dto.municipio !== '' &&
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
    dto.telefono.length > 8 &&
    dto.alojamiento !== null &&
    dto.aceptado !== null &&
    dto.postgrados_disponibleId !== ''
  ) {
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
      domicilio: '',
      graduado: '',
      fecha_graduado: new Date(Date.now()).toLocaleString(),
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

// const actualizar = async () => {
//   if (
//     todo.value.nombre !== '' &&
//     todo.value.apellido1 !== '' &&
//     todo.value.apellido2 !== '' &&
//     todo.value.ci !== '' &&
//     todo.value.sexo !== '' &&
//     todo.value.pais > 60 &&
//     todo.value.provincia <= 100 &&
//     todo.value.municipio > 60 &&
//     todo.value.domicilio <= 100 &&
//     todo.value.graduado > 60 &&
//     todo.value.fecha_graduado <= 100 &&
//     todo.value.universidad > 60 &&
//     todo.value.tomo <= 100 &&
//     todo.value.folio > 0 &&
//     todo.value.numero_universidad !== '' &&
//     todo.value.centro_laboral > 0 &&
//     todo.value.direccion < 6 &&
//     todo.value.administrador !== '' &&
//     todo.value.telefono.length === 11 &&
//     todo.value.alojamiento !== '' &&
//     todo.value.aceptado !== '' &&
//     todo.value.postgrados_disponibleId !== ''
//   ) {
//     try {
//       if (todo.value.municipio.codigo) {
//         todo.value.municipio = todo.value.municipio.municipio;
//       }

//       if (todo.value.provincia.codigo) {
//         todo.value.provincia = todo.value.provincia.provincia;
//       }

//       await editBoleta(todo.value);
//       await fetchBoletas();
//       cerrar();

//       $q.notify({
//         type: 'positive',
//         message: 'Registro actualizado satisfactoriamente',
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     $q.notify({
//       type: 'info',
//       message: 'Debe llenar todos los campos con valores válidos',
//       multiLine: true,
//     });
//   }
// };
// FIN  ACTUALIZAR

// FUNCION PARA AVANZAR AL PROXIMO PASO DEL FORMULARIO VALIDANDOLO
const avanzar = () => {
  // if (
  //   datos.value.nombre !== '' &&
  //   datos.value.apellidos !== '' &&
  //   datos.value.ci.length === 11 &&
  //   datos.value.sexo !== '' &&
  //   datos.value.provincia !== '' &&
  //   datos.value.municipio !== '' &&
  //   datos.value.sma !== '' &&
  //   datos.value.fecha !== ''
  // ) {
  //   return true;
  // } else {
  $q.notify({
    type: 'info',
    message: 'Debe llenar todos los campos con valores válidos',
    multiLine: true,
  });
  // }
};
// FIN DE LA FUNCION PARA AVANZAR AL PROXIMO PASO DEL FORMULARIO VALIDANDOLO

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isPosgradoToggle();
  editandoForm(false);
  datos = ref({
    nombre: '',
    apellido1: '',
    apellido2: '',
    ci: '',
    sexo: '',
    pais: '',
    provincia: '',
    municipio: '',
    domicilio: '',
    graduado: '',
    fecha_graduado: new Date(Date.now()).toLocaleString(),
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

// CALCULO DEL ESCALAFÓN
// const Escalafon = (posgradoEdit: boolean) => {
//   if (!posgradoEdit) {
//     datos.value.escalafon =
//       (datos.value.matematica + datos.value.espanol + datos.value.historia) /
//         3 /
//         2 +
//       datos.value.indice_academico / 2;
//   } else {
//     todo.value.escalafon =
//       (todo.value.matematica + todo.value.espanol + todo.value.historia) /
//         3 /
//         2 +
//       todo.value.indice_academico / 2;
//   }
// };
// FIN DEL CALCULO DEL ESCALAFÓN
</script>
