<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Listado de Usuarios"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="No hay Usuarios para mostrar"
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
              @click="addUserToggle"
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
                {{ props.row.username }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div class="flex flex-center" :props="props">
                {{ props.row.rol.rol }}
              </div>
            </q-card-section>
            <q-card-section style="fontsize: 12px">
              <div
                class="flex flex-center"
                :props="props"
                :style="props.row.isActive ? 'color:green' : 'color:red'"
              >
                {{ props.row.isActive ? 'SI' : 'NO' }}
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
                  :color="`${props.row.isActive ? 'positive' : 'negative'}`"
                  :icon="`${
                    props.row.isActive ? 'las la-check-circle' : 'las la-times'
                  }`"
                />
                <q-btn
                  dense
                  round
                  size="sm"
                  class="q-ml-sm"
                  flat
                  icon="las la-key"
                  color="grey"
                  @click="activarDialogPassword(props.row)"
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
          :style="props.row.isActive ? 'color:green' : 'color:red'"
        >
          {{ props.row.isActive ? 'SI' : 'NO' }}
        </q-td>
      </template>
      <template #body-cell-nombre="props">
        <q-td :props="props">
          {{ props.row.nombre + ' ' + props.row.apellidos }}
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
          <q-btn
            dense
            round
            size="sm"
            class="q-ml-sm"
            flat
            @click="activar(props.row)"
            :color="`${props.row.isActive ? 'positive' : 'negative'}`"
            :icon="`${
              props.row.isActive ? 'las la-check-circle' : 'las la-times'
            }`"
          />
          <q-btn
            dense
            round
            size="sm"
            class="q-ml-sm"
            flat
            icon="las la-key"
            color="grey"
            @click="activarDialogPassword(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <!--    Contraseña-->
    <q-dialog v-model="dialogPass" :position="'bottom'">
      <q-card style="width: 300px">
        <q-card-section class="text-center no-wrap">
          <div>
            <div class="text-weight-bold">Actualizar Contraseña</div>
          </div>
        </q-card-section>
        <q-space />
        <q-card-section>
          <q-form class="q-gutter-md validate">
            <q-input
              :type="isPwd ? 'text' : 'password'"
              filled
              v-model="password"
              label="Contraseña"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'No deje en blanco la contraseña',
                isValidPassword,
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'las la-eye-slash' : 'las la-eye'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input
              :type="isPwd ? 'text' : 'password'"
              filled
              v-model="repeatPassword"
              label="Repita la Contraseña"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'No deje en blanco la contraseña',
                (val) =>
                  val === password || 'Las contraseñas deben coincidir :-)',
                isValidPassword,
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'las la-eye-slash' : 'las la-eye'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                /> </template
            ></q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="row flex-center">
          <q-btn icon="las la-times" @click="dialogPass = false" />
          <q-btn icon="las la-check" @click="updPass" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--    FIN  contraseña-->
    <AddUserComponent :userUpd="userProps" />
    <DeleteComponent :deleteUpd="deleteProps" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { QTableProps, useQuasar } from 'quasar';
import { useUsersComposable } from 'src/composables/useUsersComposable';
import { useUtilsComposables } from 'src/composables/utilsComposables';
import AddUserComponent from 'components/Usuarios/AddUserComponent.vue';
import { UserList, usuariosProps } from 'src/interfaces/user.interfaces';
import { DeleteInterface } from 'src/interfaces/delete.interfaces';
import DeleteComponent from '../DeleteComponent.vue';

const $q = useQuasar();
const { list, allUsers, isActiveUser, isEditarFormulario, updpassword } =
  useUsersComposable();
const { addUserToggle, eliminarToggle } = useUtilsComposables();

onMounted(() => {
  allUsers();
});

const userProps = ref<usuariosProps>({
  id: '',
  username: '',
  password: '',
  nombre: '',
  apellidos: '',
  isActive: true,
  rol_id: '',
  rolname: '',
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
const listado: Array<UserList> = list.value;
const rows: QTableProps['rows'] = listado;
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
    name: 'username',
    align: 'center',
    label: 'Usuario',
    field: 'username',
    sortable: true,
  },
  {
    name: 'rol',
    align: 'center',
    label: 'Rol',
    field: (row: { roles: { rolname: string } }) => row.roles.rolname,
    sortable: true,
  },
  {
    name: 'isActive',
    align: 'center',
    label: 'Activo?',
    // field: (row: { isActive: boolean }) => row.isActive,
    field: 'isActive',
    sortable: true,
  },
  { name: 'Action', align: 'center', label: 'Action', field: 'Action' },
];

const editTable = async (item: UserList) => {
  console.log('rol', item);
  isEditarFormulario(true);
  addUserToggle();
  userProps.value.id = item.id;
  userProps.value.username = item.username;
  userProps.value.password = item.password;
  userProps.value.nombre = item.nombre;
  userProps.value.isActive = item.isActive;
  userProps.value.rol_id = item.rol_id;
  userProps.value.rolname = item.roles.rolname;
};

const deleteProps = ref<DeleteInterface>({
  titulo: '',
  url: ',',
});

const deleteUser = async (item: UserList) => {
  deleteProps.value.url = `/usuarios/${item.id}`;
  deleteProps.value.titulo = 'el usuario';
  eliminarToggle();
};

const activar = async (item: { id: string; isActive: boolean }) => {
  await isActiveUser(item);
  await allUsers();
};

// UPDATE FORM PASSWORD
let password = ref('');
let repeatPassword = ref('');
let isPwd = ref(false);
const isValidPassword = (val: string) => {
  const passwordPattern =
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return (
    passwordPattern.test(val) ||
    'La contraseña debe tener una mayúscula y contener números'
  );
};

let dialogPass = ref(false);
const userId = ref('');
const activarDialogPassword = async (item: {
  id: string;
  password: string;
}) => {
  dialogPass.value = true;
  userId.value = item.id;
};

const updPass = async () => {
  const itemPassword = {
    id: userId.value,
    password: password.value,
  };
  await updpassword(itemPassword);
  await allUsers();
};
</script>
