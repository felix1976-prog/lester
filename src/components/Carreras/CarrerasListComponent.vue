<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { useQuasar, QTableProps } from 'quasar';
import { useCarreraStore } from '../../stores/carrera/carrera-store';
import { carreraProps, CarreraList } from '../../interfaces/carrera.interfaces';
import AddCarrerasComponent from './AddCarrerasComponent.vue';
import { useFacultadStore } from 'src/stores/facultad/facultad-store';
import DeleteComponent from '../DeleteComponent.vue';
import { DeleteInterface } from '../../interfaces/delete.interfaces';
import { useUtilsComposables } from '../../composables/utilsComposables';

const $q = useQuasar();
const filter = ref('');

const { fecthCarreras, isCarreraToggle, editandoForm } = useCarreraStore();
const { carrera } = storeToRefs(useCarreraStore());
const { fecthFacultades } = useFacultadStore();
const { eliminarToggle } = useUtilsComposables();
onMounted(() => {
  fecthCarreras();
  fecthFacultades();
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
    name: 'carrera',
    required: true,
    label: 'Carrera',
    align: 'center',
    field: (row: { carrera: string }) => row.carrera,
    sortable: true,
  },
  {
    name: 'codigo',
    align: 'center',
    label: 'Código',
    field: 'codigo',
    sortable: true,
  },
  {
    name: 'facultad_id',
    align: 'center',
    label: 'Facultad',
    field: (row: { facultades: { facultad: string } }) =>
      row.facultades.facultad,
    sortable: true,
  },
  {
    name: 'disponible',
    align: 'center',
    label: 'Disponible?',
    field: 'disponible',
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];
// FIN TABLE
const carreaProp = ref<carreraProps>({
  id: '',
  carrera: '',
  codigo: '',
  facultad_id: '',
  disponible: false,
});
const editTable = (item: carreraProps) => {
  isCarreraToggle();
  editandoForm(true);
  carreaProp.value.carrera = item.carrera;
  carreaProp.value.codigo = item.codigo;
  carreaProp.value.facultad_id = item.facultad_id;
  carreaProp.value.id = item.id;
  carreaProp.value.disponible = item.disponible;
};
const deleteProps = ref<DeleteInterface>({
  titulo: '',
  url: ',',
});

const deleteCarrera = async (item: CarreraList) => {
  deleteProps.value.url = `/carrera/${item.id}`;
  deleteProps.value.titulo = 'la carrera';
  eliminarToggle();
};

const activar = (item: CarreraList) => {
  return item;
};
</script>

<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de Carreras"
      :rows="carrera"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay carreras para mostrar"
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
              @click="isCarreraToggle"
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
                {{ props.row.carrera }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.codigo }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.facultades.facultad }}
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
                  @click="deleteCarrera(props.row)"
                />
                <q-btn
                  dense
                  round
                  size="sm"
                  class="q-ml-sm"
                  flat
                  @click="activar(props.row)"
                  :color="`${props.row.disponible ? 'positive' : 'negative'}`"
                  :icon="`${
                    props.row.disponible
                      ? 'las la-check-circle'
                      : 'las la-times'
                  }`"
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
      <template #body-cell-carrera="props">
        <q-td :props="props">
          {{ props.row.carrera }}
        </q-td>
      </template>
      <template #body-cell-codigo="props">
        <q-td :props="props">
          {{ props.row.codigo }}
        </q-td>
      </template>
      <template #body-cell-facultad_id="props">
        <q-td :props="props">
          {{ props.row.facultades.facultad }}
        </q-td>
      </template>
      <template #body-cell-disponible="props">
        <q-td :props="props">
          {{ props.row.disponible ? 'SI' : 'NO' }}
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
            @click="deleteCarrera(props.row)"
          />
          <q-btn
            dense
            round
            size="sm"
            class="q-ml-sm"
            flat
            @click="activar(props.row)"
            :color="`${props.row.disponible ? 'positive' : 'negative'}`"
            :icon="`${
              props.row.disponible ? 'las la-check-circle' : 'las la-times'
            }`"
          />
        </q-td>
      </template>
    </q-table>
    <AddCarrerasComponent :carreraUpd="carreaProp" />
    <DeleteComponent :deleteUpd="deleteProps" />
  </div>
</template>
