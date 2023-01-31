export interface Municipio {
  id: string;
  municipio: string;
  codigo: string;
  provincia_codigo: string;
}

export interface MunicipioAdd {
  municipio: string;
  codigo: string;
  provincia_codigo: string;
}

export interface MunicipioList {
  id: string;
  municipio: string;
  codigo: string;
  provincia_codigo: string;
}

export interface MunicipioProps {
  id: string;
  municipio: string;
  codigo: string;
  provincia_codigo: string;
  proviciaName: string;
}
export interface mainProps {
  id: string;
  municipio: string;
  codigo: string;
  provincia_codigo: string;
  provincias: Provincias;
}

export interface Provincias {
  provincia: string;
  codigo: string;
}
