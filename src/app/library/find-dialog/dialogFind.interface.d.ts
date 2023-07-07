
export interface DialogFind<T> {
  message: string,
  entity: string,
  query: Function,
  fields: string[],
  object: T,
  retour: number
}

