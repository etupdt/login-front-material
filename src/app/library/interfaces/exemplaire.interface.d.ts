import { Livre } from "./livre.interface";
import { Stock } from "./stock.interface";
import { Usure } from "./usure.interface";

export interface Exemplaire {
  id?: number,
  usure?: Usure,
  stock?: Stock,
  livre?: Livre,
  archive?: boolean,
  delete?: boolean
}
