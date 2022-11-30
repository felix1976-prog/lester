import { storeToRefs } from 'pinia';
import { useUtilsStore } from 'src/stores/utils/utils-store';

export const useUtilsComposables = () => {
  const { setToggleLogin, toggleSideMenu, eliminarToggle, addUserToggle } =
    useUtilsStore();
  const { isOpenLogin, isSideMenuOpen, isAddUserOpen, isEliminarOpen } =
    storeToRefs(useUtilsStore());
  return {
    //login Form
    // state
    isOpenLogin,
    // function
    setToggleLogin,
    // eliminar
    isEliminarOpen,
    eliminarToggle,

    // users
    isAddUserOpen,
    addUserToggle,

    //drawer
    isSideMenuOpen,
    toggleSideMenu,
  };
};
