export interface escuelaInterface {
  id: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  pre_desc: string;
  mat_desc: string;
  pre_inicio: Date;
  pre_fin: Date;
  mat_inicio: Date;
  mat_fin: Date;
  activo: boolean;
}
export interface addEscuelaInterface {
  nombre: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  pre_desc: string;
  mat_desc: string;
  pre_inicio: Date;
  pre_fin: Date;
  mat_inicio: Date;
  mat_fin: Date;
  activo: boolean;
}
