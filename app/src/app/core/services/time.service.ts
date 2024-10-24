import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  getCurrentHM(date: Date, utcOffset: number): string { return (date.getUTCHours() + utcOffset).toString() + ':' + date.getUTCMinutes().toString(); }

  getCurrentHMS(date: Date, utcOffset: number): string {
    let seconds: string = date.getUTCSeconds().toString();
    let minutes: string = date.getUTCMinutes().toString();
    let hours: string = (date.getUTCHours() + utcOffset).toString();
    return (hours.length < 2 ? ('0' + hours) : hours) + ':' + (minutes.length < 2 ? ('0' + minutes) : minutes) + ':' + (seconds.length < 2 ? ('0' + seconds) : seconds)
  }

  calcDayLength(sunriseInMin: number, sunsetInMin: number): number {
    return sunsetInMin - sunriseInMin;
  }

  hourDiff(f: number, s: number): number {
    let hourDiff = f - s;
    if (hourDiff < 0) {
      hourDiff = 60 * 24 + hourDiff;
    }
    return hourDiff
  }

  UTCToLocalMinutes(UTC: string, utcOffset: number): number {
    const HM = this.UTCToHM(UTC)
    return (parseInt(HM[0], 10) + utcOffset) * 60 + parseInt(HM[1], 10);
  }

  UTCToMinutes(UTC: string) {
    const HM = this.UTCToHM(UTC)
    return (parseInt(HM[0], 10)) * 60 + parseInt(HM[1], 10);

  }

  UTCToHM(UTC: string) {
    let HM = UTC.split(':').filter((item, idx) => idx < 2);
    if (UTC.includes('PM')) {
      HM[0] = (parseInt(HM[0], 10) + 12).toString();
    }
    return HM
  }

  convertMinsToHrsMins(mins: number): string {
    let h: string | number = Math.floor(mins / 60);
    let m: string | number = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}h ${m}min`;
  }

  convertToLocalHM(UTC: string, utcOffset: number): string {
    let localTime = this.convertMinsToHrsMins(this.UTCToLocalMinutes(UTC, utcOffset))
    return localTime;
  }

  utcOffset(): number {
    return -(new Date().getTimezoneOffset() / 60);
  }

  convertSunInfoToLocalTime(sunInfo: any, utcOffset: number): any {
    return {
      sunrise: this.convertToLocalHM(sunInfo.results.sunrise, utcOffset),
      sunset: this.convertToLocalHM(sunInfo.results.sunset, utcOffset),
      astronomical_twilight_begin: this.convertToLocalHM(sunInfo.results.astronomical_twilight_begin, utcOffset),
      astronomical_twilight_end: this.convertToLocalHM(sunInfo.results.astronomical_twilight_end, utcOffset),
      civil_twilight_begin: this.convertToLocalHM(sunInfo.results.civil_twilight_begin, utcOffset),
      civil_twilight_end: this.convertToLocalHM(sunInfo.results.civil_twilight_end, utcOffset),
      day_length: sunInfo.results.day_length, utcOffset,
      nautical_twilight_begin: this.convertToLocalHM(sunInfo.results.nautical_twilight_begin, utcOffset),
      nautical_twilight_end: this.convertToLocalHM(sunInfo.results.nautical_twilight_end, utcOffset),
      solar_noon: this.convertToLocalHM(sunInfo.results.solar_noon, utcOffset)
    }
  }

  calcDayPassed(sunriseInMin: number, sunsetInMin: number, currentInMin: number) {
    const dayLength = this.calcDayLength(sunriseInMin, sunsetInMin);
    const passedSinceSunrise = currentInMin - sunriseInMin;
    return (passedSinceSunrise / dayLength) * 100;
  }

  calcDayLeft(sunriseInMin: number, sunsetInMin: number, currentInMin: number): number {
    const dayLength = this.calcDayLength(sunriseInMin, sunsetInMin);
    const passedSinceSunrise = currentInMin - sunriseInMin;
    const tillSunset = dayLength - passedSinceSunrise;
    return (tillSunset / dayLength) * 100;
  }

}
