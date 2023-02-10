export interface Boleta {
  nombre: string,
  apellidos: string,
  sexo: string,
  preunivesitario: string,
  provincia: string,
  municipio: string,
  inidice_academico: number,
  matematica: number,
  espanol: number,
  historia: number,
  escalafon: number,
  convocatoria: string,
  opcion: number,
  sma: string,
  ci: string
}

export interface BoletaAdd {
  nombre: string,
  apellidos: string,
  sexo: string,
  preunivesitario: string,
  provincia: string,
  municipio: string,
  inidice_academico: number,
  matematica: number,
  espanol: number,
  historia: number,
  escalafon: number,
  convocatoria: string,
  opcion: number,
  sma: string,
  ci: string
}

export interface BoletaList {
  id: string;
  nombre: string,
  apellidos: string,
  sexo: string,
  preunivesitario: string,
  provincia: string,
  municipio: string,
  inidice_academico: number,
  matematica: number,
  espanol: number,
  historia: number,
  escalafon: number,
  convocatoria: string,
  opcion: number,
  sma: string,
  ci: string
  createdAt: Date;
  updateAt: Date;
}

export interface boletaProps {
  id: string;
  nombre: string,
  apellidos: string,
  sexo: string,
  preunivesitario: string,
  provincia: string,
  municipio: string,
  inidice_academico: number,
  matematica: number,
  espanol: number,
  historia: number,
  escalafon: number,
  convocatoria: string,
  opcion: number,
  sma: string,
  ci: string
}
