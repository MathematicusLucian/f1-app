import { Component, Input } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';

@Component({
  selector: 'f1-laps-chart',
  templateUrl: './series-chart.component.html',
  styleUrls: ['./series-chart.component.css']
})
export class SeriesChartComponent {
    @Input() chartValue: any;
    names = [
        'Orange',
        'Tomato',
        'Apple',
        'Sakana',
        'Banana',
        'Iwashi',
        'Snappy Fish',
        'Lemon',
        'Pasta'
    ];
    years = ['2001', '2002', '2003', '2004', '2005', '2006'];
    option = {
        title: {
          text: 'Lap Chart (Ranking)'
        },
        tooltip: {
          trigger: 'item'
        },
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
          data: this.years
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            margin: 30,
            fontSize: 16,
            formatter: '#{value}'
          },
          inverse: true,
          interval: 1,
          min: 1,
          max: this.names.length
        },
        series: this.generateSeriesList()
    };

    constructor() {}

    shuffle <T>(array: T[]): T[] {
        let currentIndex = array.length;
        let randomIndex = 0;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
            ];
        }
        return array;
    };
    generateRankingData(): Map<string, number[]> {
        const map: Map<string, number[]> = new Map();
        const defaultRanking: number[] = Array.from(
          { length: this.names.length },
          (_, i) => i + 1
        );
      
        for (const _ of this.years) {
          const shuffleArray = this.shuffle(defaultRanking);
          this.names.forEach((name, i) => {
            map.set(name, (map.get(name) || []).concat(shuffleArray[i]));
          });
        }
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
              width: 4
            },
            data
          };
          seriesList.push(series);
        });
        return seriesList;
    };
}