import { AccountService } from 'src/app/_services/account.service';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'tableFilter'
})

export class TableFilterPipe implements PipeTransform {
  constructor(private accountService: AccountService) { }

  transform(list: any[], filters: Object) {
    
    const keys = Object.keys(filters).filter(key => filters[key]);
    const filterUser = user => keys.every(key => user[key].toLowerCase().includes(filters[key].toLowerCase()));
    
    return keys.length ? list.filter(filterUser) : list;
  }
}

