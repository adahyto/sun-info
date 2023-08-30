import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sun-info',
  templateUrl: './sun-info.component.html',
  styleUrls: ['./sun-info.component.scss']
})
export class SunInfoComponent implements OnInit {
  @Input() sunInfo: any;
  @Input() currentHMS: string
  constructor() { }

  ngOnInit(): void { console.log(this.sunInfo) }

}
