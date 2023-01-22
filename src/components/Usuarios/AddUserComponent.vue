<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isAddUserOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} sus usuarios</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="isEditando === false"
                filled
                type="text"
                v-model="datos.username"
                label="Usuario"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el usuario',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.username"
                label="Usuario"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el usuario',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!isEditando"
                :type="isPwd ? 'text' : 'password'"
                filled
                v-model="datos.password"
                label="Contraseña"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'No deje en blanco la contraseña',
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
            </div>

            <div>
              <q-input
                v-if="!isEditando"
                :type="isPwd ? 'text' : 'password'"
                filled
                v-model="repeatPassword"
                label="Contraseña"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'No deje en blanco la contraseña',
                  (val) =>
                    val === datos.password ||
                    'Las contraseñas deben coincidir :-)',
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
            </div>

            <div>
              <q-input
                v-if="!isEditando"
                filled
                type="text"
                v-model="datos.nombre"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su nombre',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
              <q-input
                v-else
                filled
                type="text"
                v-model="todo.nombre"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su nombre',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!isEditando"
                filled
                type="text"
                v-model="datos.apellidos"
                label="Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba los apellidos',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
              <q-input
                v-else
                filled
                type="text"
                v-model="todo.apellidos"
                label="Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba los apellidos',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
            </div>
            <!-- CARGO -->

            <div>
              <q-input
                v-if="!isEditando"
                filled
                type="text"
                v-model="datos.cargo"
                label="Cargo"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba los cargo',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
              <q-input
                v-else
                filled
                type="text"
                v-model="todo.cargo"
                label="Cargo"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba los cargo',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
            </div>

            <div>
              <q-select
                v-if="!isEditando"
                filled
                v-model="datos.rol_id"
                use-input
                input-debounce="0"
                label="Rol"
                :options="roles"
                option-value="id"
                option-label="rolname"
                emit-value
                map-options
                @filter="filterFnRol"
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.rol_id"
                use-input
                input-debounce="0"
                label="Rol"
                :options="roles"
                option-value="id"
                option-label="rolname"
                emit-value
                map-options
                @filter="filterFnRol"
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions class="row flex-center">
          <q-btn icon="las la-times" @click="cerrar" />
          <q-btn v-if="!isEditando" icon="las la-check" @click="add" />
          <q-btn v-else icon="las la-check" @click="actualizar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useUsersComposable } from 'src/composables/useUsersComposable';
import { useUtilsComposables } from 'src/composables/utilsComposables';
import { usuariosProps } from 'src/interfaces/user.interfaces';
import { storeToRefs } from 'pinia';
import { useRolStore } from 'src/stores/roles/roles-store';
import { RolList } from '../../interfaces/rol.interfaces';

const $q = useQuasar();
const {
  allUsers,
  insertar,
  isEditando,
  isEditarFormulario,
  actualizarUsuario,
} = useUsersComposable();
const { addUserToggle, isAddUserOpen } = useUtilsComposables();

const { getAllRoles } = useRolStore();
const { roles } = storeToRefs(useRolStore());

interface RolFace {
  id: string;
  rolname: string;
  description: string;
}

onMounted(() => {
  getAllRoles();
});

//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !isEditando.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  addUserToggle();
  isEditarFormulario(false);
};
let optionsRol = ref(roles);
let filterFnRol = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsRol.value = roles.value
        ?.map((value: RolList) => {
          return {
            id: value.id,
            rolname: value.rolname,
            description: value.description,
          };
        })
        .filter((v) => v.rolname);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsRol.value = roles.value
      ?.map((value: RolFace) => {
        return {
          id: value.id,
          rolname: value.rolname,
          description: value.description,
        };
      })
      .filter((v) => v.rolname.toLowerCase().indexOf(needle) > -1);
  });
};
//Filtrar los select end

//Insertar usuario
const datos = ref({
  username: '',
  password: '',
  nombre: '',
  apellidos: '',
  cargo: '',
  isActive: null,
  rol_id: '',
});

const add = async () => {
  let dto = {
    username: datos.value.username,
    password: datos.value.password,
    nombre: datos.value.nombre,
    apellidos: datos.value.apellidos,
    cargo: datos.value.cargo,
    isActive: true,
    rol_id: datos.value.rol_id,
  };
  await insertar(dto);

  await allUsers();

  // datos.value.username = '';
  // datos.value.password = '';
  // datos.value.nombre = '';
  // datos.value.apellidos = '';
  // datos.value.isActive = null;
  // datos.value.rol_id = '';
};

const repeatPassword = ref('');
let isPwd = ref(false);
const isValidPassword = (val: string) => {
  const passwordPattern =
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return (
    passwordPattern.test(val) ||
    'La contraseña debe tener una mayúscula y contener números'
  );
};
//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  userUpd?: usuariosProps;
}
const props = withDefaults(defineProps<Props>(), {
  userUpd: () => {
    return {
      id: '',
      username: '',
      password: '',
      nombre: '',
      apellidos: '',
      cargo: '',
      isActive: true,
      rol_id: '',
      rolname: '',
    };
  },
});
const todo = computed(() => props.userUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  await actualizarUsuario(todo.value);
  await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
