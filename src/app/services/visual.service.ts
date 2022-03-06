import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VisualService {

    public async Init(): Promise<void> {
        // do something on App start
    }

    public getColorStyleForStatusBage(status: number) {
        if (status == 0)
            return "downStyle";

        if (status == 100)
            return "upStyle";

        return "upDownStyle";
    }

    public getColorStyleForStatusChip(status: string) {
      if (status == 'up')
        return "upStyle";
      if (status == 'none')
        return "upDownStyle";
      return "downStyle";
    }
}
