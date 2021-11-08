import { PrediccionService } from './../_services/prediccion.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FormControl } from '@angular/forms';
import { Chart1Service } from '../_services/chart1.service';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  secciones = []
  newsecciones = []
  chart: any = [];
  seccion = new FormControl();
  selectedSeccion: any;

  constructor(private chart1Service: Chart1Service) {
    Chart.register(...registerables)
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  ngOnInit(): void {
    this.chart1Service.obtenerChart1().subscribe(
      r => {
        for (let index of r) {
          this.secciones.push(index.seccion)
        }

        this.newsecciones = this.secciones.filter(this.onlyUnique)

        this.newsecciones.sort()
      }
    )

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: null,
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
            ticks: {
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
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'top',
            formatter: Math.round,
            font: {
              weight: 'bold'
            }
          },
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
            position: 'bottom',
            display: true,
          }
        }
      },
    })
  }

  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  change() {
    let yChartData1 = []
    let yChartData2 = []
    let xChartData = []

    this.chart.data.datasets = []

    this.chart1Service.obtenerChartbySeccion(this.selectedSeccion).subscribe(
      r => {
        r.sort(function (a, b) {
          if (a.anio > b.anio) {
            return 1;
          }
          if (a.anio < b.anio) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })

        r.sort(function (a, b) {
          if (a.grado > b.grado) {
            return 1;
          }
          if (a.grado < b.grado) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })



        r.forEach((value, i) => {
          yChartData1.push(value.porcentajeDes * 100)
          yChartData2.push(value.porcentajeAprob * 100)
          xChartData.push(value.grado + " " + value.seccion + " " + value.nivel + " " + value.anio)
        });

        const newDataset1 = {
          label: '% Desaprobados',
          backgroundColor: this.addAlpha('#FF6384', 0.4),
          borderWidth: 1,
          borderColor: '#FF6384',
          data: yChartData1,
        };
        const newDataset2 = {
          label: '% Aprobados',
          backgroundColor: this.addAlpha('#36A2EB', 0.4),
          borderColor: '#36A2EB',
          borderWidth: 1,
          data: yChartData2,
        };

        this.chart.data.labels = xChartData
        this.chart.data.datasets.push(newDataset1);
        this.chart.data.datasets.push(newDataset2);
        this.chart.update();
      })
  }
}