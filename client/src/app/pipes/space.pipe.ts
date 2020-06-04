import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'space'
})
export class SpacePipe implements PipeTransform {
   transform(value: any, args?: any): any {
       console.log(value.substring(0, 1) + ' ' + value.substring( 1));
       return value.substring(0, 1) + ' ' + value.substring( 1);
   }
}