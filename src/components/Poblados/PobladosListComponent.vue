<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { useQuasar, QTableProps } from 'quasar';
import DeleteComponent from '../DeleteComponent.vue';
import { DeleteInterface } from '../../interfaces/delete.interfaces';
import { useUtilsComposables } from '../../composables/utilsComposables';
import { usePobladoStore } from '../../stores/poblados/poblados-store';
import {
  PobladosProps,
  PobladosList,
  mainProps,
} from '../../interfaces/poblados.interfaces';
import AddPobladosComponent from './AddPobladosComponent.vue';
import { useProvinciasStore } from 'src/stores/provincias/pr0vincias-store';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';

const $q = useQuasar();
const filter = ref('');

const { fecthPoblado, isPobladoToggle, editandoForm } = usePobladoStore();
const { poblados } = storeToRefs(usePobladoStore());
const { eliminarToggle } = useUtilsComposables();
const { fecthProvincias } = useProvinciasStore();
const { fecthMunicipios } = useMunicipiosStore();

onMounted(() => {
  fecthPoblado();
  fecthProvincias();
  fecthMunicipios();
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
    name: 'poblado',
    required: true,
    label: 'Poblado',
    align: 'center',
    field: 'poblado',
    sortable: true,
  },
  {
    name: 'codigo',
    align: 'center',
    label: 'Código',
    field: 'codigo',
    sortable: true,
  },
  // {
  //   name: 'provincia_codigo',
  //   align: 'center',
  //   label: 'Provincia',
  //   // field: (row: { provincias: { provincia: string } }) =>
  //   //   row.provincias.provincia,
  //   field: 'provincia_codigo',
  //   sortable: true,
  // },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];
// FIN TABLE
const pobladoProp = ref<PobladosProps>({
  id: '',
  poblado: '',
  codigo: 0,
  municipio_codigo: 0,
  provincia_codigo: 0,
});
const editTable = (item: mainProps) => {
  isPobladoToggle();
  editandoForm(true);
  pobladoProp.value.poblado = item.poblado;
  pobladoProp.value.codigo = item.codigo;
  pobladoProp.value.provincia_codigo = item.provincia_codigo;
};
const deleteProps = ref<DeleteInterface>({
  titulo: '',
  url: ',',
});

const deleteProvincia = async (item: PobladosList) => {
  deleteProps.value.url = `/poblados/${item.id}`;
  deleteProps.value.titulo = 'la provincia';
  eliminarToggle();
};
</script>

<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de Poblados"
      :rows="poblados"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay poblados para mostrar"
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
              @click="isPobladoToggle"
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
                {{ props.row.poblado }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.codigo }}
              </div>
            </q-card-section>
            <!-- <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.provincia_codigo }}
              </div>
            </q-card-section> -->
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
      <template #body-cell-poblado="props">
        <q-td :props="props">
          {{ props.row.poblado }}
        </q-td>
      </template>
      <template #body-cell-codigo="props">
        <q-td :props="props">
          {{ props.row.codigo }}
        </q-td>
      </template>
      <!-- <template #body-cell-provincia_codigo="props">
        <q-td :props="props">
          {{ props.row.provincia_codigo }}
        </q-td>
      </template> -->
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
    <AddPobladosComponent :pobladoUpd="pobladoProp" />
    <DeleteComponent :deleteUpd="deleteProps" />
  </div>
</template>
