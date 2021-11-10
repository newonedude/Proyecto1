import { lastValueFrom } from 'rxjs';
import { formatDate } from '@angular/common';
import { ChartInfoService } from './../_services/chartInfo.service';
import { PrediccionService } from './../_services/prediccion.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FormControl } from '@angular/forms';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  alldata: any = {}
  alldata2: any = {}

  xChartData = []
  yChartData1 = []
  yChartData2 = []

  xChartDataB = []
  yChartData1B = []
  yChartData2B = []

  date: any
  olddate: any

  resultado1: any = []
  resultado2: any = []

  anios: any = []
  newanios: any = []

  secciones = []
  newsecciones = []

  chart: any = []
  chart2: any = []

  selectedAnios: any = []
  selectedSeccion: any

  constructor(private chartInfoService: ChartInfoService) {
    Chart.register(...registerables)
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  ngOnInit(): void {
    this.date = formatDate(new Date, 'yyyy', 'en-US')
    this.olddate = this.date - 1

    this.loadChartInfo1()
    this.loadChartInfo2()
  }

  async loadChartInfo1() {
    let r = await lastValueFrom(this.chartInfoService.obtenerHistorialSeccion())

    this.alldata = r

    //set año dropdown
    for (let item of r) {
      this.anios.push(item.anio)
    }

    this.newanios = this.anios.filter(this.onlyUnique)
    this.newanios.sort((a, b) => 0 - (a > b ? -1 : 1))

    //set seccion dropdown
    for (let item of r) {
      this.secciones.push(item.seccion)
    }

    this.newsecciones = this.secciones.filter(this.onlyUnique)
    this.newsecciones.sort()

    const result = r.filter(r => r.anio == this.date || r.anio == this.olddate)

    for (let item of result) {
      this.xChartData.push(item.grado + "° " + item.seccion + " " + item.anio)
      this.yChartData1.push((item.porcentaje_aprob * 100).toFixed(1))
      this.yChartData2.push((item.porcentaje_desa * 100).toFixed(1))
    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.xChartData,
        datasets: [
          {
            label: '% Aprobados',
            backgroundColor: this.addAlpha('#36A2EB', 0.4),
            borderColor: '#36A2EB',
            borderWidth: 1,
            data: this.yChartData1,
          },
          {
            label: '% Desaprobados',
            backgroundColor: this.addAlpha('#FF6384', 0.4),
            borderWidth: 1,
            borderColor: '#FF6384',
            data: this.yChartData2,
          }
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
            ticks: {
              font: {
                size: 13
              }
            },
            grid: {
              display: true
            },
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Historial de Aprobados y Desaprobados por Sección',
            position: 'top',
            font: { weight: 'bold' }
          },
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

  async loadChartInfo2() {
    let r = await lastValueFrom(this.chartInfoService.obtenerPrediccionSeccion())

    this.alldata2 = r

    //set año dropdown
    for (let item of r) {
      this.anios.push(item.anio)
    }

    this.newanios = this.anios.filter(this.onlyUnique)
    this.newanios.sort((a, b) => 0 - (a > b ? -1 : 1))

    //set seccion dropdown
    for (let item of r) {
      this.secciones.push(item.seccion)
    }

    this.newsecciones = this.secciones.filter(this.onlyUnique)
    this.newsecciones.sort()

    const result = r.filter(r => r.anio == this.date || r.anio == this.olddate)

    for (let item of result) {
      this.xChartDataB.push(item.grado + "°" + item.seccion + " " + item.anio + " " + item.periodo)
      this.yChartData1B.push((item.porcentaje_aprob * 100).toFixed(1))
      this.yChartData2B.push((item.porcentaje_desa * 100).toFixed(1))
    }

    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: this.xChartDataB,
        datasets: [
          {
            label: '% Aprobados',
            backgroundColor: this.addAlpha('#36A2EB', 0.4),
            borderColor: '#36A2EB',
            borderWidth: 1,
            data: this.yChartData1B,
          },
          {
            label: '% Desaprobados',
            backgroundColor: this.addAlpha('#FF6384', 0.4),
            borderWidth: 1,
            borderColor: '#FF6384',
            data: this.yChartData2B,
          }
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
            ticks: {
              font: {
                size: 13
              }
            },
            grid: {
              display: true
            },
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Predicción de Aprobados y Desaprobados por Sección',
            position: 'top',
            font: { weight: 'bold' }
          },
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
    this.selectedSeccion = ''

    this.xChartData = []
    this.yChartData1 = []
    this.yChartData2 = []

    this.xChartDataB = []
    this.yChartData1B = []
    this.yChartData2B = []

    this.chart.data.datasets = []
    this.chart2.data.datasets = []

    this.resultado1 = []
    this.resultado2 = []

    this.resultado1 = this.alldata.filter(r => this.selectedAnios.includes(r.anio))
    this.resultado2 = this.alldata2.filter(r => this.selectedAnios.includes(r.anio))

    for (let item of this.resultado1) {
      this.xChartData.push(item.grado + "° " + item.seccion + " " + item.anio)
      this.yChartData1.push((item.porcentaje_aprob * 100).toFixed(1))
      this.yChartData2.push((item.porcentaje_desa * 100).toFixed(1))
    }

    for (let item of this.resultado2) {
      this.xChartDataB.push(item.grado + "°" + item.seccion + " " + item.anio + " " + item.periodo)
      this.yChartData1B.push((item.porcentaje_aprob * 100).toFixed(1))
      this.yChartData2B.push((item.porcentaje_desa * 100).toFixed(1))
    }

    const newDataset1 = {
      label: '% Aprobados',
      backgroundColor: this.addAlpha('#36A2EB', 0.4),
      borderColor: '#36A2EB',
      borderWidth: 1,
      data: this.yChartData1,
    }

    const newDataset2 = {
      label: '% Desaprobados',
      backgroundColor: this.addAlpha('#FF6384', 0.4),
      borderWidth: 1,
      borderColor: '#FF6384',
      data: this.yChartData2,
    }

    const newDataset1B = {
      label: '% Aprobados',
      backgroundColor: this.addAlpha('#36A2EB', 0.4),
      borderColor: '#36A2EB',
      borderWidth: 1,
      data: this.yChartData1B,
    }

    const newDataset2B = {
      label: '% Desaprobados',
      backgroundColor: this.addAlpha('#FF6384', 0.4),
      borderWidth: 1,
      borderColor: '#FF6384',
      data: this.yChartData2B,
    }

    this.chart.data.labels = this.xChartData
    this.chart2.data.labels = this.xChartDataB

    this.chart.data.datasets.push(newDataset1);
    this.chart.data.datasets.push(newDataset2);

    this.chart2.data.datasets.push(newDataset1B);
    this.chart2.data.datasets.push(newDataset2B);

    this.chart.update()
    this.chart2.update()
  }

  change2() {
    this.xChartData = []
    this.yChartData1 = []
    this.yChartData2 = []

    this.xChartDataB = []
    this.yChartData1B = []
    this.yChartData2B = []

    this.chart.data.datasets = []
    this.chart2.data.datasets = []

    const result = this.resultado1.filter(r => r.seccion == this.selectedSeccion)
    const result2 = this.resultado2.filter(r => r.seccion == this.selectedSeccion)

    for (let item of result) {
      this.xChartData.push(item.grado + "° " + item.seccion + " " + item.anio)
      this.yChartData1.push((item.porcentaje_aprob * 100).toFixed(1))
      this.yChartData2.push((item.porcentaje_desa * 100).toFixed(1))
    }

    for (let item of result2) {
      this.xChartDataB.push(item.grado + "°" + item.seccion + " " + item.anio + " " + item.periodo)
      this.yChartData1B.push((item.porcentaje_aprob * 100).toFixed(1))
      this.yChartData2B.push((item.porcentaje_desa * 100).toFixed(1))
    }

    const newDataset1 = {
      label: '% Aprobados',
      backgroundColor: this.addAlpha('#36A2EB', 0.4),
      borderColor: '#36A2EB',
      borderWidth: 1,
      data: this.yChartData1,
    }

    const newDataset2 = {
      label: '% Desaprobados',
      backgroundColor: this.addAlpha('#FF6384', 0.4),
      borderWidth: 1,
      borderColor: '#FF6384',
      data: this.yChartData2,
    }

    const newDataset1B = {
      label: '% Aprobados',
      backgroundColor: this.addAlpha('#36A2EB', 0.4),
      borderColor: '#36A2EB',
      borderWidth: 1,
      data: this.yChartData1B,
    }

    const newDataset2B = {
      label: '% Desaprobados',
      backgroundColor: this.addAlpha('#FF6384', 0.4),
      borderWidth: 1,
      borderColor: '#FF6384',
      data: this.yChartData2B,
    }

    this.chart.data.labels = this.xChartData
    this.chart2.data.labels = this.xChartDataB

    this.chart.data.datasets.push(newDataset1);
    this.chart.data.datasets.push(newDataset2);

    this.chart2.data.datasets.push(newDataset1B);
    this.chart2.data.datasets.push(newDataset2B);

    this.chart.update()
    this.chart2.update()
  }
}