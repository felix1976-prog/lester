import { storeToRefs } from 'pinia';
import { useUsersStore } from 'stores/users/users-store';
import { computed } from 'vue';
import { UserAdd, usuariosProps } from 'src/interfaces/user.interfaces';

export const useUsersComposable = () => {
  const {
    getAllUsers,
    usersAll,
    addUsers,
    updateActive,
    editandoForm,
    updatePassword,
    update,
  } = useUsersStore();
  const { usuarios, isEditando } = storeToRefs(useUsersStore());

  const allUsers = async () => {
    return await getAllUsers();
  };
  const insertar = async (dto: UserAdd) => {
    return await addUsers(dto);
  };
  const isActiveUser = async (dto: { id: string; isActive: boolean }) => {
    let active: boolean;
    dto.isActive ? (active = false) : (active = true);
    const datos = {
      id: dto.id,
      isActive: active,
    };
    return await updateActive(datos);
  };

  const isEditarFormulario = (item: boolean) => {
    return editandoForm(item);
  };
  const actualizarUsuario = async (item: usuariosProps) => {
    return await update(item);
  };
  const updpassword = async (item: { id: string; password: string }) => {
    await updatePassword(item);
  };
  return {
    insertar,
    allUsers,
    list: computed(() => {
      return usuarios;
    }),
    usersAll,
    isActiveUser,
    isEditarFormulario,
    isEditando,
    actualizarUsuario,
    updpassword,
  };
};
