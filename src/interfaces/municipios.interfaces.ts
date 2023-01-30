export interface Municipio {
  id: string;
  municipio: string;
  codigo: string;
  provincia_id: string;
}

export interface MunicipioAdd {
  municipio: string;
  codigo: string;
  provincia_id: string;
}

export interface MunicipioList {
  id: string;
  municipio: string;
  codigo: string;
  provincia_id: string;
}

export interface MunicipioProps {
  id: string;
  municipio: string;
  codigo: string;
  provincia_id: string;
  proviciaName: string;
}
export interface mainProps {
  id: string;
  municipio: string;
  codigo: string;
  provincia_id: string;
  provincias: Provincias;
}

export interface Provincias {
  provincia: string;
  codigo: string;
}
