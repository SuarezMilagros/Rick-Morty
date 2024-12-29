import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string, type: string): string {
    switch (type) {
      case 'status':
        switch (value) {
          case 'Dead': return 'muerto';
          case 'Alive': return 'vivo';
          case 'unknown': return 'desconocido';
          default: return value;
        }
        
      case 'gender':
        switch (value) {
          case 'Male': return 'masculino';
          case 'Female': return 'femenino';
          case 'unknown': return 'desconocido';
          default: return value;
        }
        
      default:
        return value;
    }
  }
}

