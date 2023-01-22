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
}
