<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { useQuasar, QTableProps } from 'quasar';
import DeleteComponent from '../DeleteComponent.vue';
import { DeleteInterface } from '../../interfaces/delete.interfaces';
import { useUtilsComposables } from '../../composables/utilsComposables';
import { useMatriculastore } from '../../stores/matriculas/matriculas-store';
import {
  MatriculasProps,
  MatriculasList,
} from '../../interfaces/matriculas.interfaces';
import AddMatriculasComponent from './AddMatriculasComponent.vue';
import { useProvinciasStore } from 'src/stores/provincias/provincias-store';
import { useNomencladoresStore } from 'src/stores/nomencladores/nomencladores-store';
import { usePaisesStore } from 'src/stores/paises/paises-store';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';
import { useCarreraStore } from 'src/stores/carrera/carrera-store';
import { useFacultadStore } from 'src/stores/facultad/facultad-store';
import MostrarMatricluaComponent from './MostrarMatricluaComponent.vue';
const $q = useQuasar();
const filter = ref('');

const { isShowMatriculaOpen, showMatriculas, verSelectedMatricula } =
  useUtilsComposables();
const { fecthMatriculas, isMatriculasToggle, editandoForm } =
  useMatriculastore();
const { matriculas } = storeToRefs(useMatriculastore());
const { eliminarToggle } = useUtilsComposables();
const { fecthProvincias } = useProvinciasStore();
const { fecthPaises } = usePaisesStore();
const { fecthMunicipios } = useMunicipiosStore();
const { fecthCarreras } = useCarreraStore();
const { fecthFacultades } = useFacultadStore();
const {
  getColorPiel,
  getSexos,
  getClaseEstudiante,
  getSituacionEscolarAlMatricular,
  getProcedenciaEscolar,
} = useNomencladoresStore();
onMounted(async () => {
  await fecthMatriculas();
  await fecthProvincias();
  await getColorPiel();
  await getSexos();
  await fecthPaises();
  await fecthMunicipios();
  await fecthCarreras();
  await fecthFacultades();
  await getClaseEstudiante();
  await getProcedenciaEscolar();
  await getSituacionEscolarAlMatricular();
});

// pagination
function getItemsPerPage() {
  if ($q.screen.lt.sm) {
    return 3;
  }
  if ($q.screen.lt.md) {
    return 6;
  }
  return 9;
}

// const filter = ref('')
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
});
const rowsPerPageOptions = computed(() => {
  return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
});
watch(
  () => $q.screen.name,
  () => {
    pagination.value.rowsPerPage = getItemsPerPage();
  }
);

// fin pagination

// TABLE
const columns: QTableProps['columns'] = [
  {
    name: 'avatar',
    required: true,
    label: '',
    align: 'center',
    field: (row: { avatar: never }) => row.avatar,
    sortable: true,
  },
  {
    name: 'nombre',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: 'nombre',
    sortable: true,
  },
  {
    name: 'carrera',
    align: 'center',
    label: 'Carrera',
    field: 'carrera',
    sortable: true,
  },
  {
    name: 'facultad',
    align: 'center',
    label: 'Facultad',
    field: 'facultad',
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];
// FIN TABLE
const matriculasProp = ref<MatriculasProps>({
  id: '',
  centro_edicacion_superior: '',
  curso_escolar: '',
  facultad: '',
  carrera: '',
  foto: '',
  anno_academico: '',
  tipo_curso: '',
  fecha_matricula: new Date().toISOString().substring(0, 10),
  fecha_ingreso_este_ces: new Date().toISOString().substring(0, 10),
  fecha_ingreso_edu_super: new Date().toISOString().substring(0, 10),
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
  fecha: new Date().toISOString().substring(0, 10),
  sin_sancion: true,
  sancionado: '',
  nunca_matriculado: true,
  estuve_matriculado: '',
  no_estoy_matriculado: true,
  no_soy_graduado: false,
  aceptado: false,
});
const editTable = (item: MatriculasProps) => {
  isMatriculasToggle();
  editandoForm(true);
  matriculasProp.value.centro_edicacion_superior =
    item.centro_edicacion_superior;
  matriculasProp.value.curso_escolar = item.curso_escolar;
  matriculasProp.value.facultad = item.facultad;
  matriculasProp.value.carrera = item.carrera;
  matriculasProp.value.foto = item.foto;
  matriculasProp.value.anno_academico = item.anno_academico;
  matriculasProp.value.tipo_curso = item.tipo_curso;
  matriculasProp.value.fecha_matricula = item.fecha_matricula;
  matriculasProp.value.fecha_ingreso_este_ces = item.fecha_ingreso_este_ces;
  matriculasProp.value.fecha_ingreso_edu_super = item.fecha_ingreso_edu_super;
  matriculasProp.value.ci = item.ci;
  matriculasProp.value.serie_letras = item.serie_letras;
  matriculasProp.value.serie_numero = item.serie_numero;
  matriculasProp.value.tomo = item.tomo;
  matriculasProp.value.folio = item.folio;
  matriculasProp.value.anno_ci = item.anno_ci;
  matriculasProp.value.fecha_nacimiento = item.fecha_nacimiento;
  matriculasProp.value.edad = item.edad;
  matriculasProp.value.nombre = item.nombre;
  matriculasProp.value.apellido1 = item.apellido1;
  matriculasProp.value.apellido2 = item.apellido2;
  matriculasProp.value.sexo = item.sexo;
  matriculasProp.value.color_piel = item.color_piel;
  matriculasProp.value.ciudad_nacimiento = item.ciudad_nacimiento;
  matriculasProp.value.pais_nacimiento = item.pais_nacimiento;
  matriculasProp.value.nacionalidad = item.nacionalidad;
  matriculasProp.value.orgacizaciones = item.orgacizaciones;
  matriculasProp.value.estado_civil = item.estado_civil;
  matriculasProp.value.huerfano = item.huerfano;
  matriculasProp.value.discapacidad = item.discapacidad;
  matriculasProp.value.situacion_escolar = item.situacion_escolar;
  matriculasProp.value.clase_estudiante = item.clase_estudiante;
  matriculasProp.value.procedencia_escolar = item.procedencia_escolar;
  matriculasProp.value.domicilio = item.domicilio;
  matriculasProp.value.registro_civil = item.registro_civil;
  matriculasProp.value.provincia = item.provincia;
  matriculasProp.value.fecha = item.fecha;
  matriculasProp.value.sin_sancion = item.sin_sancion;
  matriculasProp.value.sancionado = item.sancionado;
  matriculasProp.value.nunca_matriculado = item.nunca_matriculado;
  matriculasProp.value.estuve_matriculado = item.estuve_matriculado;
  matriculasProp.value.no_estoy_matriculado = item.no_estoy_matriculado;
  matriculasProp.value.no_soy_graduado = item.no_soy_graduado;
  matriculasProp.value.aceptado = item.aceptado;
  matriculasProp.value.id = item.id;
};
const deleteProps = ref<DeleteInterface>({
  titulo: '',
  url: ',',
});

const deleteProvincia = async (item: MatriculasList) => {
  deleteProps.value.url = `/matriculas/${item.id}`;
  deleteProps.value.titulo = 'la matricula';
  eliminarToggle();
};

// interface verMatr extends MatriculasProps {
//   show: boolean;
// }

const ver = (item: MatriculasProps) => {
  console.log(item);
  verSelectedMatricula(item);
  showMatriculas();
};
</script>

<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de Matriculas"
      :rows="matriculas"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay matriculas para mostrar"
      v-model:pagination="pagination"
      :rows-per-page-options="rowsPerPageOptions"
      class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition wrapp"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar "
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
          <template v-slot:prepend>
            <q-btn
              class="q-mx-xs"
              round
              color="primary"
              icon="las la-plus-circle"
              type="button"
              @click="isMatriculasToggle"
            />
          </template>
        </q-input>
      </template>
      <!-- PARA SCREEN MD (MOVILES) -->
      <template v-slot:item="props" v-if="$q.screen.lt.md">
        <div class="col-12 q-pa-md">
          <q-card>
            <q-card-section class="text-center">
              <q-avatar size="50px" class="shadow-10">
                <q-icon color="secondary" name="las la-globe-europe" />
              </q-avatar>
              <br />
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.nombre }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.carrera }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.facultad }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
              <div style="font-size: 1.7em">
                <q-btn
                  round
                  color="info"
                  icon="las la-edit"
                  size="sm"
                  flat
                  dense
                  @click="editTable(props.row)"
                />
                <q-btn
                  round
                  color="success"
                  icon="las la-eye"
                  size="sm"
                  class="q-ml-sm"
                  flat
                  dense
                  @click="ver(props.row)"
                />
                <q-btn
                  round
                  color="warning"
                  icon="las la-trash-alt"
                  size="sm"
                  class="q-ml-sm"
                  flat
                  dense
                  @click="deleteProvincia(props.row)"
                />
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </template>
      <!-- FIN PARA SCREEN MD -->
      <template #body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar size="50px" class="shadow-10">
            <q-icon color="secondary" name="las la-globe-europe" />
          </q-avatar>
        </q-td>
      </template>
      <template #body-cell-nombre="props">
        <q-td :props="props">
          {{
            props.row.nombre +
            ' ' +
            props.row.apellido1 +
            '' +
            props.row.apellido2
          }}
        </q-td>
      </template>
      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn
            round
            color="info"
            icon="las la-edit"
            size="sm"
            flat
            dense
            @click="editTable(props.row)"
          />
          <q-btn
            round
            color="positive"
            icon="las la-eye"
            size="sm"
            class="q-ml-sm"
            flat
            dense
            @click="ver(props.row)"
          />
          <q-btn
            round
            color="negative"
            icon="las la-trash-alt"
            size="sm"
            class="q-ml-sm"
            flat
            dense
            @click="deleteProvincia(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <AddMatriculasComponent :matriculasUpd="matriculasProp" />
    <DeleteComponent :deleteUpd="deleteProps" />
    <MostrarMatricluaComponent
      :matriculasUpd="matriculasProp"
      @close="isShowMatriculaOpen = false"
    />
  </div>
</template>
