import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../core/services/location.service';
import { SunriseSunsetService } from '../../core/services/sunrise-sunset.service';
import { interval, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { TimeService } from 'src/app/core/services/time.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  dayPassedPercentage: number;
  dayLeftPercentage: number;
  sunInfo: { results: any; status: string };
  localSunInfo: any;
  coords: {
    lat: number;
    lng: number;
  };
  clock: Observable<Date> = interval(1000).pipe(map(() => new Date()));
  utcOffset: number;
  currentHM: string;
  currentHMS: string;
  timeToSunrise: string;
  timeToSunset: string;
  isNight: boolean;

  constructor(private locationService: LocationService, private sunService: SunriseSunsetService, private timeService: TimeService) {
    this.utcOffset = this.timeService.utcOffset();
    this.clock.pipe(distinctUntilChanged()).subscribe((date: Date) => {
      this.currentHM = this.timeService.getCurrentHM(date);
      this.currentHMS = this.timeService.getCurrentHMS(date);
      if (this.sunInfo) {
        this.calcData(this.sunInfo);
      }
    });
  }

  async ngOnInit() {
    this.coords = await this.locationService.getCoords();
    this.sunInfo = await this.sunService.getSunTimes(this.coords);
  }

  calcData(sunInfo: any) {
    this.localSunInfo = this.timeService.convertSunInfoToLocalTime(sunInfo, this.utcOffset)
    const sunriseInMin = this.timeService.UTCToLocalMinutes(sunInfo.results.sunrise, this.utcOffset);
    const sunsetInMin = this.timeService.UTCToLocalMinutes(sunInfo.results.sunset, this.utcOffset);
    const currentInMin = this.timeService.UTCToLocalMinutes(this.currentHM, this.utcOffset);
    this.dayPassedPercentage = Number(this.timeService.calcDayPassed(sunriseInMin, sunsetInMin, currentInMin).toFixed(2));
    this.dayLeftPercentage = Number(this.timeService.calcDayLeft(sunriseInMin, sunsetInMin, currentInMin).toFixed(2));
    if (this.dayPassedPercentage > 100 || this.dayPassedPercentage < 0) {
      this.isNight = true;
      this.dayPassedPercentage = 100;
      this.dayLeftPercentage = 0;
      this.timeToSunrise = this.timeService.convertMinsToHrsMins(this.timeService.hourDiff(sunriseInMin, currentInMin));
    } else {
      this.isNight = false;
      this.timeToSunset = this.timeService.convertMinsToHrsMins(this.timeService.hourDiff(currentInMin, sunsetInMin));
    };
  }

}