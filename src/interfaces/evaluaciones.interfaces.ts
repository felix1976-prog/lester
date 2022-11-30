export interface Evaluacion {
  id: string;
  evaluacion: string;
}

export interface EvaluacionAdd {
  evaluacion: string;
}

export interface EvaluacionList {
  id: string;
  evaluacion: string;
  createdAt: Date;
  updateAt: Date;
}
export interface evaluacionProps {
  id: string;
  evaluacion: string;
}

export interface Departamento {
  id: string;
  departamento: string;
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
export interface EvaluacionProcesosList {
  id: string;
  anno: number;
  departamento_id: string;
  departamento: Departamento;
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
export interface evaluacionProcesosProps {
  id: string;
  anno: number;
  departamento_id: string;
  proceso_id: string;
  indicador_id: string;
  tipo_indicador_id: string;
  // evaluacion_id: string;
  meta: number | null;
  real: number | null;
  porciento_cumplimiento: number | null;
}

export interface EvaluacionProcesosAdd {
  anno: number;
  departamento_id: string;
  proceso_id: string;
  indicador_id: string;
  tipo_indicador_id: string;
  evaluacion_id: string;
  meta: number | null;
  real: number | null;
  porciento_cumplimiento: number | null;
}

export interface EvalProc {
  area: string;
  id: string;
}
