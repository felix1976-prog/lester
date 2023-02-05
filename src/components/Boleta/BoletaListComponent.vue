<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { useQuasar, QTableProps } from 'quasar';
import { useBoletaStore } from 'src/stores/boleta/boleta-store';
import { boletaProps } from '../../interfaces/boleta.interfaces';
import AddBoletaComponent from './AddBoletaComponent.vue';

const $q = useQuasar();
const filter = ref('');

const { fetchBoletas, isBoletaToggle, editandoForm, deleteBoleta } =
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
    name: 'preuniversitario',
    required: true,
    label: 'preuniversitario',
    align: 'center',
    field: 'preuniversitario',
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];
// FIN TABLE
const boletProps = ref<boletaProps>({
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
});

const editTable = (item: {
  id: string;
  nombre: string;
  apellidos: string;
  sexo: string;
  preuniversitario: string;
  provincia: string;
  municipio: string;
  indice_academico: number;
  matematica: number;
  espanol: number;
  historia: number;
  escalafon: number;
  convocatoria: string;
  opcion: number;
  sma: string;
  ci: string;
  fecha: Date;
}) => {
  boletProps.value.id = item.id;
  boletProps.value.nombre = item.nombre;
  boletProps.value.apellidos = item.apellidos;
  boletProps.value.sexo = item.sexo;
  boletProps.value.preuniversitario = item.preuniversitario;
  boletProps.value.provincia = item.provincia;
  boletProps.value.municipio = item.municipio;
  boletProps.value.indice_academico = item.indice_academico;
  boletProps.value.matematica = item.matematica;
  boletProps.value.espanol = item.espanol;
  boletProps.value.historia = item.historia;
  boletProps.value.escalafon = item.escalafon;
  boletProps.value.convocatoria = item.convocatoria;
  boletProps.value.opcion = item.opcion;
  boletProps.value.sma = item.sma;
  boletProps.value.ci = item.ci;
  boletProps.value.fecha = item.fecha.substr(0, 10);
  isBoletaToggle();
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
          delBoleta(id);
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

const delBoleta = async (id: string) => {
  console.log('El id eliminado: ', id);
  try {
    const eliminado = await deleteBoleta(id);
    await fetchBoletas();

    $q.notify({
      type: 'positive',
      message:
        'La boleta del estudiante ' +
        eliminado.nombre +
        ' ' +
        eliminado.apellidos +
        ' se eliminó satisfactoriamente.',
    });

    // $q.notify({
    //   color: 'green-4',
    //   textColor: 'white',
    //   icon: 'cloud_done',
    //   message:
    //     'La boleta del estudiante ' +
    //     eliminado.nombre +
    //     ' ' +
    //     eliminado.apellidos +
    //     ' se eliminó satisfactoriamente.',
    // });
  } catch (error) {
    console.log(error);

    $q.notify({
      type: 'negative',
      message: 'No se pudo eliminar el registro por: ' + error,
      multiLine: true,
    });

    // $q.notify({
    //   color: 'red-5',
    //   textColor: 'white',
    //   icon: 'warning',
    //   message: 'No se pudo eliminar el registro por: ' + error,
    // });
  }
};
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
      no-data-label="No hay Boletas para mostrar"
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
            @click="eliminar(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <AddBoletaComponent :boleUpd="boletProps" />
  </div>
</template>
