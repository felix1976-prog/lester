import { useEscuelaStore } from 'src/stores/escuela/escuela';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
export const useEscuelaComposable = () => {
  const { getActiveEscuela, editandoForm, addEscuelaToggle } =
    useEscuelaStore();
  const { escuela, escuelaEdit, isAddEscuelaOpen } = storeToRefs(
    useEscuelaStore()
  );

  const getAllEsculActivas = async () => {
    await getActiveEscuela();
  };
  return {
    getAllEsculActivas,
    list: computed(() => {
      return escuela.value;
    }),
    editandoForm,
    escuelaEdit,
    addEscuelaToggle,
    isAddEscuelaOpen,
  };
};
