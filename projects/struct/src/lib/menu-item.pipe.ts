import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuItem'
})
export class MenuItemPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): string[] {
    return value
    .filter((item) => !['user', 'users'].includes(item))
    .map((item) => item.charAt(0).toUpperCase()+item.substring(1))
  }

}
