import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'f1-laps-chart',
  templateUrl: './series-chart.component.html',
  styleUrls: ['./series-chart.component.css']
})
export class SeriesChartComponent {
    @Input() chartValue: any;
    chartOption: EChartsOption = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
            {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            },
       ],
    };

    constructor() {}
}