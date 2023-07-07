import { Auteur } from "./auteur.interface";

export interface Livre {
  id?: number,
  isbn?: string,
  titre?: string,
  auteur?: Auteur
}
