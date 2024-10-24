import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TimeService } from './time.service';

@Injectable({
    providedIn: 'root'
})
export class SunriseSunsetService {
    constructor(private apiService: ApiService, private timeService: TimeService) { }

    getSunTimes(coords): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.apiService
                .get(
                    'https://api.sunrise-sunset.org',
                    `/json?lat=${coords.lat}&lng=${coords.lng}&date=today
                `
                )
                .subscribe((res) => {
                    this.convertIt(res)
                    resolve(res);
                });
        });
    }


}
