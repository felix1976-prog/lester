import { storeToRefs } from 'pinia';
import { useRolStore } from 'src/stores/roles/roles-store';
import { computed } from 'vue';
import { RolAdd, rolesProps } from 'src/interfaces/rol.interfaces';

export const useRolesComposable = () => {
  const { rolesAll, getAllRoles, addRoles, updateRol, editandoForm } =
    useRolStore();
  const { roles, isEditando } = storeToRefs(useRolStore());

  const allRoles = async () => {
    return await getAllRoles();
  };

  const insertar = async (dto: RolAdd) => {
    return await addRoles(dto);
  };

  const isEditarFormulario = (item: boolean) => {
    return editandoForm(item);
  };

  const actualizarRol = async (item: rolesProps) => {
    return await updateRol(item);
  };

  return {
    insertar,
    allRoles,
    list: computed(() => {
      return roles;
    }),
    rolesAll,
    isEditarFormulario,
    isEditando,
    actualizarRol,
  };
};
