import { inject, Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common/common.service';

@Pipe({
  name: 't',
  standalone: true,
  // trigger rendering on change
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private readonly _commonService = inject(CommonService);

  transform(path: string): string {
    const [ns, key] = path.split('.');
    const value = this._commonService.getResource(ns, key);
    return value ?? key;
  }
}
