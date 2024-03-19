import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { Observable } from 'rxjs';

@Component({
  selector: 'f1-laps-chart',
  templateUrl: './series-chart.component.html',
  styleUrls: ['./series-chart.component.css']
})
export class SeriesChartComponent implements OnChanges {
    @Input() chartValue$: Observable<any>;
    names: any[];
    arrayOf1ToNLaps: any[];
    lapsData;
    option = {}

    constructor() {}

    ngOnChanges(changes) {
        if (changes) {
            this.lapsData = changes.chartValue$.currentValue;
            if(this.lapsData.length > 0) {
                const numberOfLaps = this.lapsData.length;
                this.arrayOf1ToNLaps = Array.from({length: numberOfLaps+1}, (_, index) => index+1);
                this.names = this.lapsData[1]["Timings"].map(m => m.driverId);
                this.option = {
                    title: {
                        text: 'Lap Chart (Ranking)'
                    },
                    tooltip: {},
                    grid: {
                        left: 30,
                        right: 110,
                        bottom: 30,
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: true
                        },
                        axisLabel: {
                            margin: 30,
                            fontSize: 16
                        },
                        boundaryGap: false,
                        data: this.arrayOf1ToNLaps
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            margin: 30,
                            fontSize: 18,
                            formatter: '#{value}'
                        },
                        inverse: true,
                        interval: 1,
                        min: 1,
                        max: this.names.length
                    },
                    series: this.generateSeriesList()
                };
            }
        }
    }

    generateRankingData(): Map<string, number[]> {
        let map: Map<string, number[]> = new Map();
        let bumpDataSeries = {}
        for (const _ of this.arrayOf1ToNLaps) {
            const num = _-1;
            if(this.lapsData[num] && this.lapsData[num]["Timings"]) {
                const timingsForLap = this.lapsData[num]["Timings"];
                timingsForLap.forEach((lapTimings, i) => {
                    const driverId = lapTimings["driverId"];
                    const ranking = lapTimings["position"];
                    if (!bumpDataSeries[driverId]){
                        bumpDataSeries[driverId] = [];
                    }
                    bumpDataSeries[driverId].push(ranking);
                });
            }
        }
        this.names.forEach((name, i) => {
            map.set(name, bumpDataSeries[name]);
        });
        return map;
    };

    generateSeriesList (): SeriesOption[] {
        const seriesList: SeriesOption[] = [];
        const rankingMap = this.generateRankingData();
        rankingMap.forEach((data, name) => {
          const series: SeriesOption = {
            name,
            symbolSize: 20,
            type: 'line',
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            endLabel: {
              show: true,
              formatter: '{a}',
              distance: 20
            },
            lineStyle: {
              width: 11
            },
            data
          };
          seriesList.push(series);
        });
        return seriesList;
    };
}