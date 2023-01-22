import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth/auth-store';

export const useAuthComposables = () => {
  const { login, logout } = useAuthStore();
  const { me, isAuthenticated, token } = storeToRefs(useAuthStore());

  const loguearse = async (dto: { username: string; password: string }) => {
    return login(dto);
  };
  return {
    //login Form
    // state
    me,
    isAuthenticated,
    token,
    // function
    loguearse,
    logout,
  };
};
