import { storeToRefs } from 'pinia';
import { useUsersStore } from 'src/stores/users/users-store';
import { useUtilsStore } from 'src/stores/utils/utils-store';

export const useUtilsComposables = () => {
  const {
    setToggleLogin,
    toggleSideMenu,
    eliminarToggle,
    addUserToggle,
    eliminar,
  } = useUtilsStore();
  const { isOpenLogin, isSideMenuOpen, isAddUserOpen, isEliminarOpen } =
    storeToRefs(useUtilsStore());
  const { getAllUsers } = useUsersStore();

  const deleteComponent = async (titulo: string, url: string) => {
    await eliminar(titulo, url);
  };

  return {
    //login Form
    // state
    isOpenLogin,
    // function
    setToggleLogin,
    // eliminar
    isEliminarOpen,
    eliminarToggle,
    deleteComponent,

    // users
    isAddUserOpen,
    addUserToggle,
    getAllUsers,

    //drawer
    isSideMenuOpen,
    toggleSideMenu,
  };
};
