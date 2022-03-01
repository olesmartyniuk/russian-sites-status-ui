import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siteFilter'

})
export class SiteFilter implements PipeTransform {

  transform(items: any[], keyword: any, properties: string[]): any[] {
    if (!items) return [];
    if (!keyword || keyword.length < 2) return items;
    return items.filter(item => {
      var itemFound: Boolean;
      for (let i = 0; i < properties.length; i++) {
        if (item[properties[i]].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });

  }
}