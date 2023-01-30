export interface Oe {
  numero: number | null;
  objetivo: string;
  definido: Date | string;
  vigente: boolean | null;
}
export interface OeAdd {
  numero: number | null;
  objetivo: string;
  definido: Date | string;
  vigente: boolean | null;
}
export interface OeList {
  id: string;
  numero: number | null;
  objetivo: string;
  definido: string | number;
  vigente: boolean | null;
  createdAt: Date;
  updateAt: Date;
}

export interface oesProps {
  id: string;
  numero: number | null;
  objetivo: string;
  definido: string | number;
  vigente: boolean | null;
}
