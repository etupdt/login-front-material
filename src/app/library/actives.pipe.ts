import { Pipe, PipeTransform } from '@angular/core';
import { Exemplaire } from './interfaces/exemplaire.interface';

@Pipe({
  name: 'actives'
})
export class ActivesPipe implements PipeTransform {

  transform(value: Exemplaire[], ...args: string[]): Exemplaire[] {
    const exemplaires = value.filter((exemplaire) => !exemplaire.delete)
    console.log('pipe', exemplaires)
    return exemplaires
  }

}
