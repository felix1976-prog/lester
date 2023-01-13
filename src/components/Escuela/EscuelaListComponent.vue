<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de Universidades"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay Universidad para mostrar"
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
              @click="addEscuelaToggle"
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
                {{ props.row.nombre }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.descripcion }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.activo }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div
                class="flex flex-center"
                :props="props"
                :style="props.row.activo ? 'color:green' : 'color:red'"
              >
                {{ props.row.activo ? 'SI' : 'NO' }}
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
                  @click="deleteUser(props.row)"
                />
                <q-btn
                  dense
                  round
                  size="sm"
                  class="q-ml-sm"
                  flat
                  @click="activar(props.row)"
                  :color="`${props.row.activo ? 'positive' : 'negative'}`"
                  :icon="`${
                    props.row.activo ? 'las la-check-circle' : 'las la-times'
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
      <template #body-cell-isActive="props">
        <q-td
          :props="props"
          :style="props.row.activo ? 'color:green' : 'color:red'"
        >
          {{ props.row.activo ? 'SI' : 'NO' }}
        </q-td>
      </template>
      <template #body-cell-nombre="props">
        <q-td :props="props">
          {{ props.row.nombre }}
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
            @click="deleteUser(props.row)"
          />
          <!-- <q-btn
            dense
            round
            size="sm"
            class="q-ml-sm"
            flat
            @click="activar(props.row)"
            :color="`${props.row.activo ? 'positive' : 'negative'}`"
            :icon="`${
              props.row.activo ? 'las la-check-circle' : 'las la-times'
            }`"
          /> -->
        </q-td>
      </template>
    </q-table>
    <AddEscuelaComponent :escuelaUpd="userProps" />
    <DeleteComponent :deleteUpd="deleteProps" />
  </div>
</template>

<script setup lang="ts">
import { QTableProps, useQuasar } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import { useUtilsComposables } from 'src/composables/utilsComposables';
import AddEscuelaComponent from './AddEscuelaComponent.vue';
import { escuelaInterface } from 'src/interfaces/escuela.interface';
import { DeleteInterface } from 'src/interfaces/delete.interfaces';
import DeleteComponent from '../DeleteComponent.vue';
import { useEscuelaComposable } from 'src/composables/useEscuelaComposable';
import { useEscuelaStore } from 'src/stores/escuela/escuela';
const $q = useQuasar();
const { eliminarToggle } = useUtilsComposables();

const { list, getAllEsculActivas, editandoForm, addEscuelaToggle } =
  useEscuelaComposable();
const { activeTogle, isActive } = useEscuelaStore();
// let myList = null;
onMounted(async () => {
  await getAllEsculActivas();
  // console.log('first', escuela.value);
});

const userProps = ref<escuelaInterface>({
  id: '',
  nombre: '',
  descripcion: '',
  direccion: '',
  telefono: '',
  pre_desc: '',
  mat_desc: '',
  pre_inicio: new Date(),
  pre_fin: new Date(),
  mat_inicio: new Date(),
  mat_fin: new Date(),
  activo: true,
});

const filter = ref('');
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
// const list = computed(() => {
//   return escuela.value;
// });
const rows: QTableProps['rows'] = [list.value];
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
    field: (row: { nombre: string }) => row.nombre,
    sortable: true,
  },
  {
    name: 'descripcion',
    align: 'center',
    label: 'Descripción',
    field: 'descripcion',
    sortable: true,
  },
  {
    name: 'activo',
    align: 'center',
    label: 'Activo?',
    // field: (row: { isActive: boolean }) => row.isActive,
    field: 'activo',
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];

const editTable = async (item: escuelaInterface) => {
  // console.log('rol', item);
  editandoForm(true);
  addEscuelaToggle();
  userProps.value.id = item.id;
  userProps.value.nombre = item.nombre;
  userProps.value.descripcion = item.descripcion;
  userProps.value.direccion = item.direccion;
  userProps.value.telefono = item.telefono;
  userProps.value.pre_desc = item.pre_desc;
  userProps.value.mat_desc = item.mat_desc;
  userProps.value.pre_inicio = item.pre_inicio;
  userProps.value.pre_fin = item.pre_fin;
  userProps.value.mat_inicio = item.mat_inicio;
  userProps.value.mat_fin = item.mat_fin;
  userProps.value.activo = item.activo;
};

const deleteProps = ref<DeleteInterface>({
  titulo: '',
  url: ',',
});

const deleteUser = async (item: escuelaInterface) => {
  deleteProps.value.url = `/usuarios/${item.id}`;
  deleteProps.value.titulo = 'el usuario';
  eliminarToggle();
};

// const activar = async () => {
//   await activeTogle(item);
//   await getAllEsculActivas();
// };
</script>
