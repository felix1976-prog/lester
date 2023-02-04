export interface Boleta {
  nombre: string;
  apellidos: string;
  sexo: string;
  preuniversitario: string;
  provincia: string;
  municipio: string;
  indice_academico: number;
  matematica: number;
  espanol: number;
  historia: number;
  escalafon: number;
  convocatoria: string;
  opcion: number;
  sma: string;
  ci: string;
  fecha: Date | string;
}

export interface BoletaAdd {
  nombre: string;
  apellidos: string;
  sexo: string;
  preuniversitario: string;
  provincia: string;
  municipio: string;
  indice_academico: number;
  matematica: number;
  espanol: number;
  historia: number;
  escalafon: number;
  convocatoria: string;
  opcion: number;
  sma: string;
  ci: string;
  fecha: Date | string;
}

export interface BoletaList {
  id: string;
  nombre: string;
  apellidos: string;
  sexo: string;
  preuniversitario: string;
  provincia: string;
  municipio: string;
  indice_academico: number;
  matematica: number;
  espanol: number;
  historia: number;
  escalafon: number;
  convocatoria: string;
  opcion: number;
  sma: string;
  ci: string;
  fecha: Date | string;
  createdAt: Date;
  updateAt: Date;
}

export interface boletaProps {
  id: string;
  nombre: string;
  apellidos: string;
  sexo: string;
  preuniversitario: string;
  provincia: string;
  municipio: string;
  indice_academico: number;
  matematica: number;
  espanol: number;
  historia: number;
  escalafon: number;
  convocatoria: string;
  opcion: number;
  sma: string;
  ci: string;
  fecha: Date | string;
}
