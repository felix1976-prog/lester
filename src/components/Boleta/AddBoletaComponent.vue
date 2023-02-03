<template>
  <div class="q-pa-md q-gutter-sm">
    <!--  -->
    <q-form @submit="add">
      <q-dialog v-model="isBoletaOpen" position="top" persistent class="w-100">
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
            <!-- <div class="row items-center justify-center mb-2">
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
            </div> -->
            <!-- Nombre  -->
            <div>
              <q-input
                v-if="!boletaEdit"
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
                v-if="!boletaEdit"
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
                v-if="!boletaEdit"
                filled
                type="text"
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
                v-if="!boletaEdit"
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
                v-if="!boletaEdit"
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
                v-if="!boletaEdit"
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
              <q-input
                v-if="!boletaEdit"
                filled
                type="text"
                v-model="datos.sma"
                label="SMA"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba el estado del SMA',
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
                v-model="todo.sma"
                label="SMA"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba el estado del SMA',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <!-- Fecha -->
            <div>
              <q-input v-if="!boletaEdit" dense filled v-model="datos.fecha">
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
              <q-btn @click="step = 2" color="primary" label="Continuar" />
              <q-btn
                flat
                @click="cerrar"
                color="warning"
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
            <div>
              <q-input
                v-if="!boletaEdit"
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

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="number"
                v-model="datos.indice_academico"
                label="Índice Académico"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
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
                type="number"
                v-model="todo.indice_academico"
                label="Índice Académico"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba el índice académico del estudiante',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="number"
                v-model="datos.matematica"
                label="Matemática"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Matemática',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="number"
                v-model="todo.matematica"
                label="Matemática"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Matemática',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="number"
                v-model="datos.espanol"
                label="Español"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Español',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="number"
                v-model="todo.espanol"
                label="Español"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Español',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="number"
                v-model="datos.historia"
                label="Historia"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Historia',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="number"
                v-model="todo.historia"
                label="Historia"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Historia',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="number"
                v-model="datos.escalafon"
                label="Escalafón"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el escalafón',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="number"
                v-model="todo.escalafon"
                label="Escalafón"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el escalafón',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="text"
                v-model="datos.convocatoria"
                label="Convocatoria"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la convocatoria',
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
                v-model="todo.convocatoria"
                label="Convocatoria"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la convocatoria',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="number"
                v-model="datos.opcion"
                label="Opción"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba el número de la opción',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="number"
                v-model="todo.opcion"
                label="Opción"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba el número de la opción',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <q-stepper-navigation>
              <q-btn @click="add" color="primary" label="Insertar" />
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
                color="warning"
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
import {
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  QForm,
  QIcon,
  QInput,
  QSpace,
  useQuasar,
} from 'quasar';
import { storeToRefs } from 'pinia';
import { useBoletaStore } from 'src/stores/boleta/boleta-store';
import { boletaProps } from 'src/interfaces/boleta.interfaces';
import { useNomencladoresStore } from '../../stores/nomencladores/nomencladores-store';
import { useProvinciasStore } from '../../stores/provincias/pr0vincias-store';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';

const $q = useQuasar();
const { addBoletas, isBoletaToggle, editandoForm, fetchBoletas } =
  useBoletaStore();
const { isBoletaOpen, boletaEdit } = storeToRefs(useBoletaStore());

// OBTENER LOS NOMENCLADORES NECESARIOS
const { getSexos } = useNomencladoresStore();
const { fecthProvincias } = useProvinciasStore();
const { fecthMunicipios } = useMunicipiosStore();
const { Sexos } = storeToRefs(useNomencladoresStore());
const { provincias } = storeToRefs(useProvinciasStore());
const { municipios } = storeToRefs(useMunicipiosStore());

onMounted(() => {
  if (Sexos.value.length === 0) {
    getSexos();
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
  return !boletaEdit.value ? 'Insertar' : 'Editar';
});

// VALIDAR FORM
const valid = ref(false);
//STEPS
let step = ref(1);

//Insertar usuario
let datos = ref({
  nombre: '',
  apellidos: '',
  sexo: '',
  preuniversitario: '',
  provincia: '',
  municipio: '',
  indice_academico: 0,
  matematica: 0,
  espanol: 0,
  historia: 0,
  escalafon: 0,
  convocatoria: '',
  opcion: 0,
  sma: '',
  ci: '',
  fecha: new Date(Date.now()).toLocaleString(),
});

const add = async () => {
  let dto = {
    nombre: datos.value.nombre,
    apellidos: datos.value.apellidos,
    sexo: datos.value.sexo,
    preuniversitario: datos.value.preuniversitario,
    provincia: datos.value.provincia.provincia,
    municipio: datos.value.municipio.municipio,
    indice_academico: parseFloat(datos.value.indice_academico),
    matematica: parseFloat(datos.value.matematica),
    espanol: parseFloat(datos.value.espanol),
    historia: parseFloat(datos.value.historia),
    escalafon: parseFloat(datos.value.escalafon),
    convocatoria: datos.value.convocatoria,
    opcion: parseInt(datos.value.opcion),
    sma: datos.value.sma,
    ci: datos.value.ci,
    fecha: datos.value.fecha,
    // fecha: Date.parse(datos.value.fecha),
  };

  if (
    dto.nombre !== '' &&
    dto.apellidos !== '' &&
    dto.sexo !== '' &&
    dto.preuniversitario !== '' &&
    dto.municipio !== '' &&
    dto.indice_academico > 60 &&
    dto.indice_academico <= 100 &&
    dto.matematica > 60 &&
    dto.matematica <= 100 &&
    dto.espanol > 60 &&
    dto.espanol <= 100 &&
    dto.historia > 60 &&
    dto.historia <= 100 &&
    dto.escalafon > 0 &&
    dto.convocatoria !== '' &&
    dto.opcion > 0 &&
    dto.opcion < 6 &&
    dto.sma !== '' &&
    dto.ci.length === 11 &&
    dto.provincia !== '' &&
    dto.fecha !== ''
  ) {
    cerrar();

    try {
      await addBoletas(dto);
      await fetchBoletas();
      // step = ref(3);
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Registro insertado satisfactoriamente',
      });
      step = ref(1);
    } catch (error) {
      console.log(error);
    }
  } else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Debe llenar todos los campos con valores válidos',
    });
  }
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  boleUpd?: boletaProps;
}
const props = withDefaults(defineProps<Props>(), {
  boleUpd: () => {
    return {
      id: '',
      nombre: '',
      apellidos: '',
      sexo: '',
      preuniversitario: '',
      provincia: '',
      municipio: '',
      indice_academico: 0,
      matematica: 0,
      espanol: 0,
      historia: 0,
      escalafon: 0,
      convocatoria: '',
      opcion: 0,
      sma: '',
      ci: '',
      fecha: new Date(Date.now()).toLocaleString(),
    };
  },
});
const todo = computed(() => props.boleUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isBoletaToggle();
  editandoForm(false);
  datos = ref({
    nombre: '',
    apellidos: '',
    sexo: '',
    preuniversitario: '',
    provincia: '',
    municipio: '',
    indice_academico: 0,
    matematica: 0,
    espanol: 0,
    historia: 0,
    escalafon: 0,
    convocatoria: '',
    opcion: 0,
    sma: '',
    ci: '',
    fecha: new Date(Date.now()).toLocaleString(),
  });
  step = ref(1);
};
</script>
