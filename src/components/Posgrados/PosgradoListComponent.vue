<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { useQuasar, QTableProps } from 'quasar';
import { usePosgradosStore } from 'src/stores/posgrados/posgrados-store';
import { PosgradoProps } from '../../interfaces/posgrados.interfaces';
import AddPosgradoComponent from './AddPosgradoComponent.vue';

const $q = useQuasar();
const filter = ref('');

const { fetchPosgrado, isPosgradoToggle, editandoForm, deletePosgrado } =
  usePosgradosStore();
const { posgrados } = storeToRefs(usePosgradosStore());

onMounted(() => {
  fetchPosgrado();
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
    name: 'nombre',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: 'nombre',
    sortable: true,
  },
  {
    name: 'postgrado',
    align: 'center',
    label: 'Curso',
    field: (row: { postgrados_disponibles: { postgrado: string } }) =>
      row.postgrados_disponibles.postgrado,
    sortable: true,
  },
  {
    name: 'inicio',
    align: 'center',
    label: 'Inicia',
    field: (row: { postgrados_disponibles: { inicio: string } }) =>
      row.postgrados_disponibles.inicio.substring(0, 10),
    sortable: true,
  },
  {
    name: 'fin',
    align: 'center',
    label: 'Culmina',
    field: (row: { postgrados_disponibles: { fin: string } }) =>
      row.postgrados_disponibles.fin.substring(0, 10),
    sortable: true,
  },
  {
    name: 'alojamiento',
    required: true,
    label: 'Alojamiento',
    align: 'center',
    field: 'alojamiento',
    sortable: true,
  },
  {
    name: 'aceptado',
    required: true,
    label: 'Aceptado',
    align: 'center',
    field: 'aceptado',
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];
// FIN TABLE
const posProps = ref<PosgradoProps>({
  id: '',
  nombre: '',
  apellido1: '',
  apellido2: '',
  ci: '',
  sexo: '',
  pais: '',
  provincia: '',
  municipio: '',
  poblado: '',
  domicilio: '',
  graduado: '',
  fecha_graduado: new Date().toISOString().substring(0, 10),
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

const editTable = (item: {
  id: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  ci: string;
  sexo: string;
  pais: string;
  provincia: string;
  municipio: string;
  poblado: string;
  domicilio: string;
  graduado: string;
  fecha_graduado: string;
  universidad: string;
  tomo: number;
  folio: number;
  numero_universidad: number;
  centro_laboral: string;
  direccion: string;
  administrador: string;
  telefono: string;
  alojamiento: boolean;
  aceptado: boolean;
  postgrados_disponibleId: string;
}) => {
  posProps.value.id = item.id;
  posProps.value.nombre = item.nombre;
  posProps.value.apellido1 = item.apellido1;
  posProps.value.apellido2 = item.apellido2;
  posProps.value.ci = item.ci;
  posProps.value.sexo = item.sexo;
  posProps.value.pais = item.pais;
  posProps.value.provincia = item.provincia;
  posProps.value.municipio = item.municipio;
  posProps.value.poblado = item.poblado;
  posProps.value.domicilio = item.domicilio;
  posProps.value.graduado = item.graduado;
  posProps.value.fecha_graduado = item.fecha_graduado.substring(0, 10);
  posProps.value.universidad = item.universidad;
  posProps.value.tomo = item.tomo;
  posProps.value.folio = item.folio;
  posProps.value.numero_universidad = item.numero_universidad;
  posProps.value.centro_laboral = item.centro_laboral;
  posProps.value.direccion = item.direccion;
  posProps.value.administrador = item.administrador;
  posProps.value.telefono = item.telefono;
  posProps.value.alojamiento = item.alojamiento;
  posProps.value.aceptado = item.aceptado;
  posProps.value.postgrados_disponibleId = item.postgrados_disponibleId;

  isPosgradoToggle();
  editandoForm(true);
};

const eliminar = (id: string) => {
  $q.notify({
    type: 'info',
    message:
      '¡Usted va a eliminar un registro!, ¿Está seguro de querer eliminarlo?.',
    actions: [
      {
        label: 'Eliminar',
        color: 'negative',
        handler: () => {
          delPosgrado(id);
        },
      },
      {
        label: 'Cancelar',
        color: 'primary',
        handler: () => {
          /* ... */
        },
      },
    ],
  });
};

const delPosgrado = async (id: string) => {
  try {
    const eliminado = await deletePosgrado(id);
    await fetchPosgrado();

    $q.notify({
      type: 'positive',
      message:
        'La matrícula del cursante ' +
        eliminado.nombre +
        ' ' +
        eliminado.apellido1 +
        ' ' +
        eliminado.apellido2 +
        ' se eliminó satisfactoriamente.',
    });
  } catch (error) {
    console.log(error);

    $q.notify({
      type: 'negative',
      message: 'No se pudo eliminar el registro por: ' + error,
      multiLine: true,
    });
  }
};
</script>

<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de matrículas de posgrado"
      :rows="posgrados"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay registos que mostrar"
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
              @click="isPosgradoToggle"
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
                {{ props.row.nombre }} {{ props.row.apellido1 }}
                {{ props.row.apellido2 }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.postgrados_disponibles.postgrado }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.postgrados_disponibles.inicio.substring(0, 10) }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.postgrados_disponibles.fin.substring(0, 10) }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.alojamiento ? 'Sí' : 'No' }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.aceptado ? 'Aceptado' : 'Pendiente' }}
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
                  @click="eliminar(props.row)"
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
      <template #body-cell-nombre="props">
        <q-td :props="props">
          {{ props.row.nombre }} {{ props.row.apellido1 }}
          {{ props.row.apellido2 }}
        </q-td>
      </template>
      <template #body-cell-posgrado="props">
        <q-td :props="props">
          {{ props.row.postgrados_disponibles.postgrado }}
        </q-td>
      </template>
      <template #body-cell-inicio="props">
        <q-td :props="props">
          {{ props.row.postgrados_disponibles.inicio.substring(0, 10) }}
        </q-td>
      </template>
      <template #body-cell-fin="props">
        <q-td :props="props">
          {{ props.row.postgrados_disponibles.fin.substring(0, 10) }}
        </q-td>
      </template>
      <template #body-cell-alojamiento="props">
        <q-td :props="props">
          {{ props.row.alojamiento ? 'Sí' : 'No' }}
        </q-td>
      </template>
      <template #body-cell-aceptado="props">
        <q-td :props="props">
          {{ props.row.aceptado ? 'Aceptado' : 'Pendiente' }}
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
            @click="eliminar(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <AddPosgradoComponent :posUpd="posProps" />
  </div>
</template>
