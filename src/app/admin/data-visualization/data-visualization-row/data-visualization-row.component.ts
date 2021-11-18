import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-data-visualization-row',
  templateUrl: './data-visualization-row.component.html',
  styleUrls: ['./data-visualization-row.component.css']
})
export class DataVisualizationRowComponent {
  private maxValue = 100;
  steps = ['Bad', 'Scarce', 'Discrete', 'Good', 'Great'];
  maxStep = 0;

  @Input() stepsVisible = false;

  reversePercentage: number;
  @Input() set percentage(value: number) {
    this.reversePercentage = this.maxValue - value;

    this.maxStep = this.steps.length * value / this.maxValue;
  }

  get percentage() {
    return 100 - this.reversePercentage;
  }

  constructor() {}

  computeTranslation(stepIndex: number) {
    // return a number in range [-50, 50]
    return 100 * stepIndex / (this.steps.length - 1) - 50;
  }
}
