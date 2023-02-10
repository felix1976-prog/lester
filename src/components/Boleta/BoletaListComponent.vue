<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { useQuasar, QTableProps } from 'quasar';
import { useBoletaStore } from 'src/stores/boleta/boleta-store';
import { boletaProps } from '../../interfaces/boleta.interfaces';
import AddBoletaComponent from './AddBoletaComponent.vue';

const $q = useQuasar();
const filter = ref('');

const { fetchBoletas, isBoletaToggle, editandoForm } =
  useBoletaStore();
const { boletas } = storeToRefs(useBoletaStore());

onMounted(() => {
  fetchBoletas();
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
// const rows: QTableProps['rows'] = facultad.value;
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
    name: 'ci',
    align: 'center',
    label: 'Carné',
    field: 'ci',
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
    name: 'apellidos',
    required: true,
    label: 'Apellidos',
    align: 'center',
    field: 'apellidos',
    sortable: true,
  },
  {
    name: 'preunivesitario',
    required: true,
    label: 'Preunivesitario',
    align: 'center',
    field: 'preunivesitario',
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];
// FIN TABLE
const boletaProps = ref<boletaProps>({
  id: '',
  nombre: '',
  apellidos: '',
  sexo: '',
  preunivesitario: '',
  provincia: '',
  municipio: '',
  inidice_academico: 0,
  matematica: 0,
  espanol: 0,
  historia: 0,
  escalafon: 0,
  convocatoria: '',
  opcion: 0,
  sma: '',
  ci: ''
});
const editTable = (item: {
      id: string,
      nombre: string,
      apellidos: string,
      sexo: string,
      preunivesitario: string,
      provincia: string,
      municipio: string,
      inidice_academico: number,
      matematica: number,
      espanol: number,
      historia: number,
      escalafon: number,
      convocatoria: string,
      opcion: number,
      sma: string,
      ci: string
    }) => {
  isBoletaToggle();
  editandoForm(true);
  boletaProps.value.id = item.id;
  boletaProps.value.nombre = item.nombre;
  boletaProps.value.apellidos = item.apellidos;
  boletaProps.value.sexo = item.sexo;
  boletaProps.value.preunivesitario = item.preunivesitario;
  boletaProps.value.provincia = item.provincia;
  boletaProps.value.municipio = item.municipio;
  boletaProps.value.inidice_academico = item.inidice_academico;
  boletaProps.value.matematica = item.matematica;
  boletaProps.value.espanol = item.espanol;
  boletaProps.value.historia = item.historia;
  boletaProps.value.escalafon = item.escalafon;
  boletaProps.value.convocatoria = item.convocatoria;
  boletaProps.value.opcion = item.opcion;
  boletaProps.value.sma = item.sma;
  boletaProps.value.ci = item.ci;
};
const deleteBoleta = (item: { id: string }) => {
  return item;
};
// const addfacultadToggle = () => {
//   return isFacultadOpen;
// };
</script>

<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de nuevos ingresos CRD"
      :rows="boletas"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay Facultades para mostrar"
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
              @click="isBoletaToggle"
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
                <q-icon color="secondary" name="las la-user-tie" />
              </q-avatar>
              <br />
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.ci }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.nombre }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.apellidos }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.preuniversitario }}
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
                  color="warning"
                  icon="las la-trash-alt"
                  size="sm"
                  class="q-ml-sm"
                  flat
                  dense
                  @click="deleteBoleta(props.row)"
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
            <q-icon color="secondary" name="las la-user-tie" />
          </q-avatar>
        </q-td>
      </template>
      <template #body-cell-ci="props">
        <q-td :props="props">
          {{ props.row.ci }}
        </q-td>
      </template>
      <template #body-cell-nombre="props">
        <q-td :props="props">
          {{ props.row.nombre }} {{ props.row.apellidos }}
        </q-td>
      </template>
      <template #body-cell-pre="props">
        <q-td :props="props">
          {{ props.row.preuniversitario }}
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
            color="warning"
            icon="las la-trash-alt"
            size="sm"
            class="q-ml-sm"
            flat
            dense
            @click="deleteBoleta(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <AddBoletaComponent :boleUpd="boletaProps" />
  </div>
</template>
