export interface Centro {
  centro: string;
  codigo: string;
  empresa_id: string;
}

export interface CentroAdd {
  centro: string;
  codigo: string;
  empresa_id: string;
}

export interface CentroList {
  id: string;
  centro: string;
  codigo: string;
  empresa_id: string;
  createdAt: Date;
  updateAt: Date;
}

export interface centroProps {
  id: string;
  centro: string;
  codigo: string;
  empresa_id: string;
}
