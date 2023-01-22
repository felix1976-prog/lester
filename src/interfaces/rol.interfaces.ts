export interface Rol {
  rolname: string;
  description: string;
}
export interface RolAdd {
  rolname: string;
  description: string;
}
export interface RolList {
  id: string;
  rolname: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
}

export interface rolesProps {
  id: string;
  rolname: string;
  description: string;
}
