export interface Carrera {
  carrera: string;
  codigo: string;
  facultad_id: string;
  disponible: boolean;
}

export interface CarreraAdd {
  carrera: string;
  codigo: string;
  facultad_id: string;
  disponible: boolean;
}

export interface CarreraList {
  id: string;
  carrera: string;
  codigo: string;
  facultad_id: string;
  disponible: boolean;
  createdAt: Date;
  updateAt: Date;
}

export interface carreraProps {
  id: string;
  carrera: string;
  codigo: string;
  facultad_id: string;
  disponible: boolean;
}
