<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { useQuasar, QTableProps } from 'quasar';
import DeleteComponent from '../DeleteComponent.vue';
import { DeleteInterface } from '../../interfaces/delete.interfaces';
import { useUtilsComposables } from '../../composables/utilsComposables';
import { useProvinciasStore } from '../../stores/provincias/provincias-store';
import {
  ProvinciaProps,
  ProvinciaList,
  mainProps,
} from '../../interfaces/provincias.interfaces';
import AddProvinciasComponent from './AddProvinciasComponent.vue';
import { usePaisesStore } from 'src/stores/paises/paises-store';

const $q = useQuasar();
const filter = ref('');

const { fecthProvincias, isProvinciasToggle, editandoForm } =
  useProvinciasStore();
const { provincias } = storeToRefs(useProvinciasStore());
const { eliminarToggle } = useUtilsComposables();
const { fecthPaises } = usePaisesStore();

onMounted(() => {
  fecthProvincias();
  fecthPaises();
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
    name: 'provincia',
    required: true,
    label: 'País',
    align: 'center',
    field: 'provincia',
    sortable: true,
  },
  {
    name: 'codigo',
    align: 'center',
    label: 'Código',
    field: 'codigo',
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];
// FIN TABLE
const provinciaProp = ref<ProvinciaProps>({
  id: '',
  provincia: '',
  codigo: '',
  pais_id: '',
  // paisName: '',
});
const editTable = (item: mainProps) => {
  isProvinciasToggle();
  editandoForm(true);
  provinciaProp.value.provincia = item.provincia;
  provinciaProp.value.codigo = item.codigo;
  provinciaProp.value.pais_id = item.pais_id;
  // provinciaProp.value.paisName = item.paises.pais;
};
const deleteProps = ref<DeleteInterface>({
  titulo: '',
  url: ',',
});

const deleteProvincia = async (item: ProvinciaList) => {
  deleteProps.value.url = `/provincias/${item.id}`;
  deleteProps.value.titulo = 'la provincia';
  eliminarToggle();
};
</script>

<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de Provincias"
      :rows="provincias"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay provincias para mostrar"
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
              @click="isProvinciasToggle"
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
                {{ props.row.provincia }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.codigo }}
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
      <template #body-cell-provincia="props">
        <q-td :props="props">
          {{ props.row.provincia }}
        </q-td>
      </template>
      <template #body-cell-codigo="props">
        <q-td :props="props">
          {{ props.row.codigo }}
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
            @click="deleteProvincia(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <AddProvinciasComponent :provinciaUpd="provinciaProp" />
    <DeleteComponent :deleteUpd="deleteProps" />
  </div>
</template>
