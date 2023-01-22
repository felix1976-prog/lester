export interface Indicador {
  indicador: string;
}

export interface IndicadorAdd {
  indicador: string;
}

export interface IndicadorList {
  id: string;
  indicador: string;
  createdAt: Date;
  updateAt: Date;
}

export interface indicadorProps {
  id: string;
  indicador: string;
}
