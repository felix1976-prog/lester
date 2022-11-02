import { storeToRefs } from 'pinia';
import { useUtilsStore } from 'src/stores/utils/utils-store';

export const useUtilsComposables = () => {
  const { setToggleLogin, toggleSideMenu } = useUtilsStore();
  const { isOpenLogin, isSideMenuOpen } = storeToRefs(useUtilsStore());
  return {
    //login Form
    // state
    isOpenLogin,
    // function
    setToggleLogin,

    //drawer
    isSideMenuOpen,
    toggleSideMenu,
  };
};
