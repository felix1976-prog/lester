export interface Proceso {
  id: string;
  proceso: string;
  definido: Date | string;
  vigente: boolean;
}
export interface ProcesoFilter {
  id: string;
  proceso: string;
}
export interface ProcesoAdd {
  proceso: string;
  definido: Date | string;
  vigente: boolean | null;
}
export interface ProcesoList {
  id: string;
  proceso: string;
  definido: string | number;
  vigente: boolean | null;
}

export interface procesoProps {
  id: string;
  proceso: string;
  definido: string | number;
  vigente: boolean | null;
}
