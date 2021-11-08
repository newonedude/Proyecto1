import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { registerables, Chart } from 'chart.js';
import { Chart1Service } from '../_services/chart1.service';

@Component({
  selector: 'app-dashboard-page-dos',
  templateUrl: './dashboard-page-dos.component.html',
  styleUrls: ['./dashboard-page-dos.component.css']
})
export class DashboardPageDosComponent implements OnInit {
  chart: any = []

  constructor(private chart1Service: Chart1Service) {
    Chart.register(...registerables)
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  ngOnInit(): void {
    var yChartData1 = []
    var yChartData2 = []
    var xChartData = []

    this.chart1Service.obtenerChart1().subscribe(
      r => {
        r.sort(function (a, b) {
          if (a.anio === b.anio) {
            // Price is only important when cities are the same
            return a.grado - b.grado;
          }
          return a.anio > b.anio ? 1 : -1;
        });

        var anio = r[0].anio
        var grado = r[0].grado
        var suma1 = 0.0
        var suma2 = 0.0
        var count = 0

        xChartData.push(r[0].grado + "° - " + r[0].anio)

        for (let index = 0; index < r.length; index++) {
          if (anio == r[index].anio && grado == r[index].grado) {
            suma1 = suma1 + r[index].porcentajeDes
            suma2 = suma2 + r[index].porcentajeAprob
            count++
          } else {
            anio = r[index].anio
            grado = r[index].grado

            yChartData1.push((suma1 / count) * 100)
            yChartData2.push((suma2 / count) * 100)
            xChartData.push(r[index].grado + "° - " + r[index].anio)

            suma1 = 0.0
            suma2 = 0.0
            count = 0

            suma1 = suma1 + r[index].porcentajeDes
            suma2 = suma2 + r[index].porcentajeAprob
            count++
          }
        }
        yChartData1.push((suma1 / count) * 100)
        yChartData2.push((suma2 / count) * 100)

        const newDataset1 = {
          label: '% Desaprobados',
          backgroundColor: this.addAlpha('#FF6384', 0.4),
          borderWidth: 3,
          borderColor: '#FF6384',
          data: yChartData1,
          pointRadius: 7,
          pointHoverRadius: 13,
        };
        const newDataset2 = {
          label: '% Aprobados',
          backgroundColor: this.addAlpha('#36A2EB', 0.4),
          borderColor: '#36A2EB',
          borderWidth: 3,
          data: yChartData2,
          pointRadius: 7,
          pointHoverRadius: 13,
        };

        this.chart = new Chart('canvas2', {
          type: 'line',
          data: {
            labels: xChartData,
            datasets: [
              newDataset1, newDataset2
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                min: 0,
                max: 100,
                grid: {
                  display: true
                },
                ticks: {
                  // Include a % sign in the ticks
                  callback: function (value, index, values) {
                    return value + '%';
                  }
                }
              },
              x: {
                ticks:{
                  font: {
                    size: 18
                  }
                },
                grid: {
                  display: true
                },
              }
            },
            plugins: {
              tooltip: {
                mode: 'point',
                enabled: true,
                displayColors: false,
                callbacks: {
                  title: () => null,
                  label: function (tooltipItem) {
                    return tooltipItem.formattedValue + "%";
                  }
                }
              },
              legend: {
                position: 'bottom'
              },
              title: {
                display: false
              }
            }
          },
        })
      })
  }
}
