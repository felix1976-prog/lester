export interface Empresa {
  empresa: string;
  codigo: string;
  organismo_id: string;
}

export interface EmpresaAdd {
  empresa: string;
  codigo: string;
  organismo_id: string;
}

export interface EmpresaList {
  id: string;
  empresa: string;
  codigo: string;
  organismo_id: string;
  createdAt: Date;
  updateAt: Date;
}

export interface empresaProps {
  id: string;
  empresa: string;
  codigo: string;
  organismo_id: string;
}
