import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuItem'
})
export class MenuItemPipe implements PipeTransform {

  transform(value: string[], ...params: string[]): string[] {
    return value
    .filter((item) => ((!['user', 'users'].includes(item) || params[0] === 'ROLE_ADMIN') && params[1] !== 'cache'))
    .map((item) => item.charAt(0).toUpperCase()+item.substring(1))
  }

}
