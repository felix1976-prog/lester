export interface Provincia {
  id: string;
  provincia: string;
  codigo: string;
  pais_id: string;
}

export interface ProvinciaAdd {
  provincia: string;
  codigo: string;
  pais_id: string;
}

export interface ProvinciaList {
  id: string;
  provincia: string;
  codigo: string;
  pais_id: string;
}

export interface ProvinciaProps {
  id: string;
  provincia: string;
  codigo: string;
  pais_id: string;
  paisName: string;
}
export interface mainProps {
  id: string;
  provincia: string;
  codigo: string;
  pais_id: string;
  paises: Paises;
}

export interface Paises {
  pais: string;
  codigo: string;
}
