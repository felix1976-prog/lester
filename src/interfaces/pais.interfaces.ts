export interface Pais {
  pais: string;
  codigo: string;
}

export interface PaisAdd {
  pais: string;
  codigo: string;
}

export interface PaisList {
  id: string;
  pais: string;
  codigo: string;
  createdAt: Date;
  updateAt: Date;
}

export interface paisProps {
  id: string;
  pais: string;
  codigo: string;
}
