import { Livre } from "./livre.interface";
import { Status } from "./status.interface";
import { Stock } from "./stock.interface";
import { Usure } from "./usure.interface";

export interface ExemplaireLight {
  id: number,
  usure_id: Usure,
  stock_id: Stock,
  livre_id: Livre,
  archive: boolean,
  statut: string,
  delete?: boolean
}
