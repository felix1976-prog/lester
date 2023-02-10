import { storeToRefs } from 'pinia';
import { MatriculasList } from 'src/interfaces/matriculas.interfaces';
import { useUsersStore } from 'src/stores/users/users-store';
import { useUtilsStore } from 'src/stores/utils/utils-store';
export const useUtilsComposables = () => {
  const {
    setToggleLogin,
    toggleSideMenu,
    eliminarToggle,
    addUserToggle,
    eliminar,
    showMatriculas,
    selectMatricula,
  } = useUtilsStore();
  const {
    isOpenLogin,
    isSideMenuOpen,
    isAddUserOpen,
    isEliminarOpen,
    isShowMatriculaOpen,
    selectedMatriculaOpen,
  } = storeToRefs(useUtilsStore());
  const { getAllUsers } = useUsersStore();

  const verSelectedMatricula = (item: MatriculasList) => {
    selectMatricula(item);
  };
  const deleteComponent = async (titulo: string, url: string) => {
    await eliminar(titulo, url);
  };

  return {
    //login Form
    // state
    isOpenLogin,
    // function
    setToggleLogin,

    // matriculas
    isShowMatriculaOpen,
    showMatriculas,
    verSelectedMatricula,
    selectedMatriculaOpen,
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
