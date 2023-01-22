export interface Departamento {
  id: string;
  departamento: string;
}

export interface Evaluacion {
  id: string;
  evaluacion: string;
}

export interface Oe {
  anno: number;
  id: string;
  numero: number;
  objetivo: string;
}

export interface Eoe {
  anno: number;
  departamento_id: string;
  departamento: string;
  oe_id: string;
  oe: string;
  evaluacion_id: string;
  evaluacion: string;
}

export interface EoeAdd {
  anno: number;
  departamento_id: string;
  oe_id: string;
  evaluacion_id: string;
}

export interface EoeList {
  id: string;
  anno: number;
  departamento_id: string;
  departamento: Departamento;
  oe_id: string;
  oe: Oe;
  evaluacion_id: string;
  evaluacion: Evaluacion;
  createdAt: Date;
  updateAt: Date;
}

export interface EoeListProps {
  id: string;
  anno: number | string | null;
  departamento_id: string;
  oe_id: string;
  evaluacion_id: string;
}

export interface eoesProps {
  id: string;
  anno: number | null;
  departamento_id: string;
  oe_id: string;
  evaluacion_id: string;
}
