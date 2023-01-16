export interface Organismo {
  organismo: string;
  codigo: string;
}

export interface OrganismoAdd {
  organismo: string;
  codigo: string;
}

export interface OrganismoList {
  id: string;
  organismo: string;
  codigo: string;
  createdAt: Date;
  updateAt: Date;
}

export interface organismoProps {
  id: string;
  organismo: string;
  codigo: string;
}
