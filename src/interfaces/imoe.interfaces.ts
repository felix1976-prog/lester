export interface Departamento {
  id: string;
  departamento: string;
}

export interface Oe {
  id: string;
  // anno: number;
  // numero: number;
  objetivo: string;
}

export interface Proceso {
  id: string;
  proceso: string;
  // definido: string | null;
  // vigente: boolean;
}

export interface Indicador {
  id: string;
  indicador: string;
}

export interface Tipo {
  id: string;
  tipo: string;
}

export interface Evaluacion {
  id: string;
  evaluacion: string;
}

export interface Imoe {
  anno: number;
  departamento_id: string;
  departamento: string;
  oe_id: string;
  oe: string;
  proceso_id: string;
  proceso: string;
  indicador_id: string;
  indicador: string;
  tipo_indicador_id: string;
  tipo: string;
  evaluacion_id: string;
  evaluacion: string;
  meta: number | null;
  real: number | null;
  porciento_cumplimiento: number | null;
}

export interface ImoeAdd {
  anno: number;
  departamento_id: string;
  oe_id: string;
  proceso_id: string;
  indicador_id: string;
  tipo_indicador_id: string;
  evaluacion_id: string;
  meta: number | null;
  real: number | null;
  porciento_cumplimiento: number | null;
}

export interface ImoeList {
  id: string;
  anno: number;
  departamento_id: string;
  departamento: Departamento;
  oe_id: string;
  oe: Oe;
  proceso_id: string;
  proceso: Proceso;
  indicador_id: string;
  indicador: Indicador;
  tipo_indicador_id: string;
  tipo: Tipo;
  evaluacion_id: string;
  evaluacion: Evaluacion;
  meta: number | null;
  real: number | null;
  porciento_cumplimiento: number | null;
  createdAt: Date;
  updateAt: Date;
}

export interface imoesProps {
  id: string;
  anno: number | null;
  departamento_id: string;
  oe_id: string;
  proceso_id: string;
  indicador_id: string;
  tipo_indicador_id: string;
  // evaluacion_id: string;
  meta: number | null;
  real: number | null;
  porciento_cumplimiento: number | null;
}

export interface EvalImoe {
  area: string;
  id: string;
}
