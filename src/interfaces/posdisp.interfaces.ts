export interface PosDisp {
  inicio: Date | string;
  fin: Date | string;
  postgrado: string;
  descripcion: string;
  disponible: boolean;
  escuela_id: string;
}

export interface PosDispAdd {
  inicio: Date | string;
  fin: Date | string;
  postgrado: string;
  descripcion: string;
  disponible: boolean;
  escuela_id: string;
}

export interface PosDispList {
  id: string;
  inicio: Date | string;
  fin: Date | string;
  postgrado: string;
  descripcion: string;
  disponible: boolean;
  escuela_id: string;
}

export interface PosDispProps {
  id: string;
  inicio: Date | string;
  fin: Date | string;
  postgrado: string;
  descripcion: string;
  disponible: boolean;
  escuela_id: string;
}
