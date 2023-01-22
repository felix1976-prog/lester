export interface Departamento {
  departamento: string;
  facultad_id: string;
  facultad: string;
}

export interface Facultad {
  id: string;
  facultad: string;
}
export interface DepaAdd {
  departamento: string;
  facultad_id: string;
}
export interface DepaList {
  id: string;
  departamento: string;
  facultad_id: string;
  facultad: Facultad;
  createdAt: Date;
  updateAt: Date;
}

export interface depasProps {
  id: string;
  departamento: string;
  facultad_id: string;
  facultad: string;
}
