export interface Posgrado {
  nombre: string;
  apellido1: string;
  apellido2: string;
  ci: string;
  sexo: string;
  pais: string;
  provincia: string;
  municipio: string;
  domicilio: string;
  graduado: string;
  fecha_graduado: Date | string | null;
  universidad: string;
  tomo: number;
  folio: number;
  numero_universidad: number;
  centro_laboral: string;
  direccion: string;
  administrador: string;
  telefono: string;
  alojamiento: boolean;
  aceptado: boolean;
  postgrados_disponibleId: string;
}

export interface PosgradoAdd {
  nombre: string;
  apellido1: string;
  apellido2: string;
  ci: string;
  sexo: string;
  pais: string;
  provincia: string;
  municipio: string;
  domicilio: string;
  graduado: string;
  fecha_graduado: Date | string | null;
  universidad: string;
  tomo: number;
  folio: number;
  numero_universidad: number;
  centro_laboral: string;
  direccion: string;
  administrador: string;
  telefono: string;
  alojamiento: boolean;
  aceptado: boolean;
  postgrados_disponibleId: string;
}

export interface PosgradoList {
  id: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  ci: string;
  sexo: string;
  pais: string;
  provincia: string;
  municipio: string;
  domicilio: string;
  graduado: string;
  fecha_graduado: Date | string | null;
  universidad: string;
  tomo: number;
  folio: number;
  numero_universidad: number;
  centro_laboral: string;
  direccion: string;
  administrador: string;
  telefono: string;
  alojamiento: boolean;
  aceptado: boolean;
  postgrados_disponibleId: string;
}

export interface PosgradoProps {
  id: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  ci: string;
  sexo: string;
  pais: string;
  provincia: string;
  municipio: string;
  domicilio: string;
  graduado: string;
  fecha_graduado: Date | string | null;
  universidad: string;
  tomo: number;
  folio: number;
  numero_universidad: number;
  centro_laboral: string;
  direccion: string;
  administrador: string;
  telefono: string;
  alojamiento: boolean;
  aceptado: boolean;
  postgrados_disponibleId: string;
}
