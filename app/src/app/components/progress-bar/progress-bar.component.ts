import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() label: string;
  @Input() passedPercentage: number;
  @Input() colors: any;
  constructor() { }

  ngOnInit(): void {
  }

}
