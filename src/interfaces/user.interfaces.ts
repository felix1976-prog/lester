export interface User {
  // id: string;
  username: string;
  nombre: string;
  isActive: boolean | null;
  rol: string;
  // facultad: string;
  // facultadId: string;
  // rol: Rol | null;
}
export interface UserAdd {
  // id: string;
  username: string;
  password: string;
  nombre: string;
  isActive: boolean | null;
  // departamento_id: string;
  rol_id: string;
  // rol: Rol | null;
}
export interface UserList {
  id: string;
  username: string;
  nombre: string;
  password: string;
  isActive: boolean;
  roles: Roles;
  // departamento: Departamento;
  rol_id: string;
  createdAt: Date;
  updateAt: Date;
}
export interface Roles {
  id: string;
  rolname: string;
  description: string;
}

export interface LoginInterface {
  username: string;
  password: string;
}
export interface Departamento {
  id: string;
  departamento: string;
}
export interface usuariosProps {
  id: string;
  username: string;
  password: string;
  nombre: string;
  apellidos: string;
  isActive: boolean;
  rol_id: string;
  rolname: string;
}
