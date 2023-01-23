<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { useQuasar, QTableProps } from 'quasar';
import DeleteComponent from '../DeleteComponent.vue';
import { DeleteInterface } from '../../interfaces/delete.interfaces';
import { useUtilsComposables } from '../../composables/utilsComposables';
import { useMunicipiosStore } from '../../stores/municipios/municipios-store';
import {
  MunicipioProps,
  MunicipioList,
  mainProps,
} from '../../interfaces/municipios.interfaces';
import AddMunicipiosComponent from './AddMunicipiosComponent.vue';
import { useProvinciasStore } from 'src/stores/provincias/pr0vincias-store';

const $q = useQuasar();
const filter = ref('');

const { fecthMunicipios, isMunicipiosToggle, editandoForm, llenarMunicipios } =
  useMunicipiosStore();
const { municipios } = storeToRefs(useMunicipiosStore());
const { eliminarToggle } = useUtilsComposables();
const { fecthProvincias } = useProvinciasStore();

onMounted(() => {
  fecthMunicipios();
  fecthProvincias();
});

const llenarAllMunicipios = async () => {
  await llenarMunicipios();
  await fecthMunicipios();
};
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
    name: 'municipio',
    required: true,
    label: 'Municipio',
    align: 'center',
    field: 'municipio',
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
    name: 'provincia_id',
    align: 'center',
    label: 'Provincia',
    field: (row: { provincias: { provincia: string } }) =>
      row.provincias.provincia,
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];
// FIN TABLE
const municipioProp = ref<MunicipioProps>({
  id: '',
  municipio: '',
  codigo: '',
  provincia_id: '',
  proviciaName: '',
});
const editTable = (item: mainProps) => {
  isMunicipiosToggle();
  editandoForm(true);
  municipioProp.value.municipio = item.municipio;
  municipioProp.value.codigo = item.codigo;
  municipioProp.value.provincia_id = item.provincia_id;
  municipioProp.value.proviciaName = item.provincias.provincia;
};
const deleteProps = ref<DeleteInterface>({
  titulo: '',
  url: ',',
});

const deleteProvincia = async (item: MunicipioList) => {
  deleteProps.value.url = `/municipios/${item.id}`;
  deleteProps.value.titulo = 'la provincia';
  eliminarToggle();
};
</script>

<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de Municipios"
      :rows="municipios"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay municipios para mostrar"
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
              v-if="!municipios"
              class="q-mx-xs"
              round
              color="green"
              icon="las la-cloud-upload-alt"
              type="button"
              @click="llenarAllMunicipios"
            />
            <q-btn
              v-else
              class="q-mx-xs"
              round
              color="primary"
              icon="las la-plus-circle"
              type="button"
              @click="isMunicipiosToggle"
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
                {{ props.row.municipio }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.codigo }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.provincias.provincia }}
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
          {{ props.row.municipio }}
        </q-td>
      </template>
      <template #body-cell-codigo="props">
        <q-td :props="props">
          {{ props.row.codigo }}
        </q-td>
      </template>
      <template #body-cell-provincia_id="props">
        <q-td :props="props">
          {{ props.row.provincias.provincia }}
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
    <AddMunicipiosComponent :municipioUpd="municipioProp" />
    <DeleteComponent :deleteUpd="deleteProps" />
  </div>
</template>
