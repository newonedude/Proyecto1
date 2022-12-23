import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { lastValueFrom } from 'rxjs';
import { ChartInfoService } from '../_services/chartInfo.service';

@Component({
  selector: 'app-dashboard-page-tres',
  templateUrl: './dashboard-page-tres.component.html',
  styleUrls: ['./dashboard-page-tres.component.css']
})
export class DashboardPageTresComponent implements OnInit {
  alldata: any = {}
  alldata2: any = {}
  alldata3: any = {}
  alldata4: any = {}
  alldata5: any = {}

  xChartData = []
  yChartData1 = []
  yChartData2 = []
  yChartData3 = []

  xChartDataB = []
  yChartData1B = []
  yChartData2B = []
  yChartData3B = []

  xChartDataC = []
  yChartData1C = []
  yChartData2C = []
  yChartData3C = []

  xChartDataD = []
  yChartData1D = []
  yChartData2D = []
  yChartData3D = []

  xChartDataE = []
  yChartData1E = []
  yChartData2E = []
  yChartData3E = []

  date: any

  anios: any = []
  newanios: any = []

  chart: any = []
  chart2: any = []
  chart3: any = []
  chart4: any = []
  chart5: any = []

  selectedAnio: any

  constructor(private chartInfoService: ChartInfoService) {
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
    this.date = formatDate(new Date, 'yyyy', 'en-US')

    this.loadChartInfo1()
    this.loadChartInfo2()
    this.loadChartInfo3()
    this.loadChartInfo4()
    this.loadChartInfo5()
  }

  async loadChartInfo1() {
    let r = await lastValueFrom(this.chartInfoService.obtenerNivelInteres())

    this.alldata = r

    //set año dropdown
    for (let item of r) {
      this.anios.push(item.anio)
    }

    this.newanios = this.anios.filter(this.onlyUnique)
    this.newanios.sort((a, b) => 0 - (a > b ? -1 : 1))

    const result = r.filter(r => r.anio == this.date)

    for (let item of result) {
      this.xChartData.push(item.periodo)
      this.yChartData1.push((item.poco_interesado * 100).toFixed(1))
      this.yChartData2.push((item.interesado * 100).toFixed(1))
      this.yChartData3.push((item.muy_interesado * 100).toFixed(1))
    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.xChartData,
        datasets: [
          {
            label: 'Poco Interesado',
            backgroundColor: this.addAlpha('#FF6384', 0.7),
            borderColor: '#FF6384',
            data: this.yChartData1,
          },
          {
            label: 'Interesado',
            backgroundColor: this.addAlpha('#FF9F40', 0.7),
            borderColor: '#FF9F40',
            data: this.yChartData2,
          },
          {
            label: 'Muy Interesado',
            backgroundColor: this.addAlpha('#98ED0C', 0.7),
            borderColor: '#98ED0C',
            data: this.yChartData3,
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
            text: 'Nivel de Interés en Matemáticas',
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
    let r = await lastValueFrom(this.chartInfoService.obtenerCalidadMateriales())

    this.alldata2 = r

    //set año dropdown
    for (let item of r) {
      this.anios.push(item.anio)
    }

    this.newanios = this.anios.filter(this.onlyUnique)
    this.newanios.sort((a, b) => 0 - (a > b ? -1 : 1))

    const result = r.filter(r => r.anio == this.date)

    for (let item of result) {
      this.xChartDataB.push(item.periodo)
      this.yChartData1B.push((item.puede_mejorar * 100).toFixed(1))
      this.yChartData2B.push((item.bueno * 100).toFixed(1))
      this.yChartData3B.push((item.excelente * 100).toFixed(1))
    }

    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: this.xChartDataB,
        datasets: [
          {
            label: 'Puede Mejorar',
            backgroundColor: this.addAlpha('#FF6384', 0.7),
            borderColor: '#FF6384',
            data: this.yChartData1B,
          },
          {
            label: 'Bueno',
            backgroundColor: this.addAlpha('#FF9F40', 0.7),
            borderColor: '#FF9F40',
            data: this.yChartData2B,
          },
          {
            label: 'Excelente',
            backgroundColor: this.addAlpha('#98ED0C', 0.7),
            borderColor: '#98ED0C',
            data: this.yChartData3B,
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
            text: 'Calificación de los Materiales en Matemáticas',
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

  async loadChartInfo3() {
    let r = await lastValueFrom(this.chartInfoService.obtenerRelacionDocente())

    this.alldata3 = r

    //set año dropdown
    for (let item of r) {
      this.anios.push(item.anio)
    }

    this.newanios = this.anios.filter(this.onlyUnique)
    this.newanios.sort((a, b) => 0 - (a > b ? -1 : 1))

    const result = r.filter(r => r.anio == this.date)

    for (let item of result) {
      this.xChartDataC.push(item.periodo)
      this.yChartData1C.push((item.puede_mejorar * 100).toFixed(1))
      this.yChartData2C.push((item.buena * 100).toFixed(1))
      this.yChartData3C.push((item.excelente * 100).toFixed(1))
    }

    this.chart3 = new Chart('canvas3', {
      type: 'bar',
      data: {
        labels: this.xChartDataC,
        datasets: [
          {
            label: 'Puede Mejorar',
            backgroundColor: this.addAlpha('#FF6384', 0.7),
            borderColor: '#FF6384',
            data: this.yChartData1C,
          },
          {
            label: 'Buena',
            backgroundColor: this.addAlpha('#FF9F40', 0.7),
            borderColor: '#FF9F40',
            data: this.yChartData2C,
          },
          {
            label: 'Excelente',
            backgroundColor: this.addAlpha('#98ED0C', 0.7),
            borderColor: '#98ED0C',
            data: this.yChartData3C,
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
            text: 'Nivel de Relación con el Docente',
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

  async loadChartInfo4() {
    let r = await lastValueFrom(this.chartInfoService.obtenerMotivoInteres())

    this.alldata4 = r

    //set año dropdown
    for (let item of r) {
      this.anios.push(item.anio)
    }

    this.newanios = this.anios.filter(this.onlyUnique)
    this.newanios.sort((a, b) => 0 - (a > b ? -1 : 1))

    const result = r.filter(r => r.anio == this.date)

    for (let item of result) {
      this.xChartDataD.push(item.periodo)
      this.yChartData1D.push((item.por_profesor * 100).toFixed(1))
      this.yChartData2D.push((item.por_curso * 100).toFixed(1))
      this.yChartData3D.push((item.otros * 100).toFixed(1))
    }

    this.chart4 = new Chart('canvas4', {
      type: 'bar',
      data: {
        labels: this.xChartDataD,
        datasets: [
          {
            label: 'Por el Profesor',
            backgroundColor: this.addAlpha('#2989ee', 0.7),
            borderColor: '#2989ee',
            data: this.yChartData1D,
          },
          {
            label: 'Por el Curso',
            backgroundColor: this.addAlpha('#284eee', 0.7),
            borderColor: '#284eee',
            data: this.yChartData2D,
          },
          {
            label: 'Otros motivos',
            backgroundColor: this.addAlpha('#0cb7f2', 0.7),
            borderColor: '#0cb7f2',
            data: this.yChartData3D,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            stacked: true,
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
            stacked: true,
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
            text: 'Motivo de Interés en Matemáticas',
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

  async loadChartInfo5() {
    let r = await lastValueFrom(this.chartInfoService.obtenerHorasEstudio())

    this.alldata5 = r

    //set año dropdown
    for (let item of r) {
      this.anios.push(item.anio)
    }

    this.newanios = this.anios.filter(this.onlyUnique)
    this.newanios.sort((a, b) => 0 - (a > b ? -1 : 1))

    const result = r.filter(r => r.anio == this.date)

    for (let item of result) {
      this.xChartDataE.push(item.periodo)
      this.yChartData1E.push((item.menos2horas * 100).toFixed(1))
      this.yChartData2E.push((item.entre2y5 * 100).toFixed(1))
      this.yChartData3E.push((item.masde5horas * 100).toFixed(1))
    }

    this.chart5 = new Chart('canvas5', {
      type: 'bar',
      data: {
        labels: this.xChartDataE,
        datasets: [
          {
            label: 'Menos de 2 horas',
            backgroundColor: this.addAlpha('#b1e8d0', 0.7),
            data: this.yChartData1E,
          },
          {
            label: 'Entre 2 y 5 horas',
            backgroundColor: this.addAlpha('#4dc493', 0.7),
            data: this.yChartData2E,
          },
          {
            label: 'Más de 5 horas',
            backgroundColor: this.addAlpha('#77dd77', 0.7),
            data: this.yChartData3E,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            stacked: true,
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
            stacked: true,
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
            text: 'Horas de Estudio en Matemáticas',
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

  change() {
    this.xChartData = []
    this.yChartData1 = []
    this.yChartData2 = []
    this.yChartData3 = []

    this.xChartDataB = []
    this.yChartData1B = []
    this.yChartData2B = []
    this.yChartData3B = []

    this.xChartDataC = []
    this.yChartData1C = []
    this.yChartData2C = []
    this.yChartData3C = []

    this.xChartDataD = []
    this.yChartData1D = []
    this.yChartData2D = []
    this.yChartData3D = []

    this.xChartDataE = []
    this.yChartData1E = []
    this.yChartData2E = []
    this.yChartData3E = []

    this.chart.data.datasets = []
    this.chart2.data.datasets = []
    this.chart3.data.datasets = []
    this.chart4.data.datasets = []
    this.chart5.data.datasets = []

    const result = this.alldata.filter(r => r.anio == this.selectedAnio)
    const result2 = this.alldata2.filter(r => r.anio == this.selectedAnio)
    const result3 = this.alldata3.filter(r => r.anio == this.selectedAnio)
    const result4 = this.alldata4.filter(r => r.anio == this.selectedAnio)
    const result5 = this.alldata5.filter(r => r.anio == this.selectedAnio)

    for (let item of result) {
      this.xChartData.push(item.periodo)
      this.yChartData1.push((item.poco_interesado * 100).toFixed(1))
      this.yChartData2.push((item.interesado * 100).toFixed(1))
      this.yChartData3.push((item.muy_interesado * 100).toFixed(1))
    }

    for (let item of result2) {
      this.xChartDataB.push(item.periodo)
      this.yChartData1B.push((item.puede_mejorar * 100).toFixed(1))
      this.yChartData2B.push((item.bueno * 100).toFixed(1))
      this.yChartData3B.push((item.excelente * 100).toFixed(1))
    }

    for (let item of result3) {
      this.xChartDataC.push(item.periodo)
      this.yChartData1C.push((item.puede_mejorar * 100).toFixed(1))
      this.yChartData2C.push((item.buena * 100).toFixed(1))
      this.yChartData3C.push((item.excelente * 100).toFixed(1))
    }

    for (let item of result4) {
      this.xChartDataD.push(item.periodo)
      this.yChartData1D.push((item.por_profesor * 100).toFixed(1))
      this.yChartData2D.push((item.por_curso * 100).toFixed(1))
      this.yChartData3D.push((item.otros * 100).toFixed(1))
    }

    for (let item of result5) {
      this.xChartDataE.push(item.periodo)
      this.yChartData1E.push((item.menos2horas * 100).toFixed(1))
      this.yChartData2E.push((item.entre2y5 * 100).toFixed(1))
      this.yChartData3E.push((item.masde5horas * 100).toFixed(1))
    }

    //Chart 1
    const newDataset1 = {
      label: 'Poco Interesado',
      backgroundColor: this.addAlpha('#FF6384', 0.7),
      borderColor: '#FF6384',
      data: this.yChartData1,
    }

    const newDataset2 = {
      label: 'Interesado',
      backgroundColor: this.addAlpha('#FF9F40', 0.7),
      borderColor: '#FF9F40',
      data: this.yChartData2,
    }

    const newDataset3 = {
      label: 'Muy Interesado',
      backgroundColor: this.addAlpha('#98ED0C', 0.7),
      borderColor: '#98ED0C',
      data: this.yChartData3,
    }

    //Chart2
    const newDataset1B = {
      label: 'Puede Mejorar',
      backgroundColor: this.addAlpha('#FF6384', 0.7),
      borderColor: '#FF6384',
      data: this.yChartData1B,
    }

    const newDataset2B = {
      label: 'Bueno',
      backgroundColor: this.addAlpha('#FF9F40', 0.7),
      borderColor: '#FF9F40',
      data: this.yChartData2B,
    }

    const newDataset3B = {
      label: 'Excelente',
      backgroundColor: this.addAlpha('#98ED0C', 0.7),
      borderColor: '#98ED0C',
      data: this.yChartData3B,
    }

    //Chart 3
    const newDataset1C = {
      label: 'Puede Mejorar',
      backgroundColor: this.addAlpha('#FF6384', 0.7),
      borderColor: '#FF6384',
      data: this.yChartData1C,
    }

    const newDataset2C = {
      label: 'Buena',
      backgroundColor: this.addAlpha('#FF9F40', 0.7),
      borderColor: '#FF9F40',
      data: this.yChartData2C,
    }

    const newDataset3C = {
      label: 'Excelente',
      backgroundColor: this.addAlpha('#98ED0C', 0.7),
      borderColor: '#98ED0C',
      data: this.yChartData3C,
    }

    //Chart 4
    const newDataset1D = {
      label: 'Por el Profesor',
      backgroundColor: this.addAlpha('#2989ee', 0.7),
      borderColor: '#2989ee',
      data: this.yChartData1D,
    }

    const newDataset2D = {
      label: 'Por el Curso',
      backgroundColor: this.addAlpha('#284eee', 0.7),
      borderColor: '#284eee',
      data: this.yChartData2D,
    }

    const newDataset3D = {
      label: 'Otros motivos',
      backgroundColor: this.addAlpha('#0cb7f2', 0.7),
      borderColor: '#0cb7f2',
      data: this.yChartData3D,
    }

    //Chart 5
    const newDataset1E = {
      label: 'Menos de 2 horas',
      backgroundColor: this.addAlpha('#b1e8d0', 0.7),
      data: this.yChartData1E,
    }

    const newDataset2E = {
      label: 'Entre 2 y 5 horas',
      backgroundColor: this.addAlpha('#4dc493', 0.7),
      data: this.yChartData2E,
    }

    const newDataset3E = {
      label: 'Más de 5 horas',
      backgroundColor: this.addAlpha('#77dd77', 0.7),
      data: this.yChartData3E,
    }

    this.chart.data.labels = this.xChartData
    this.chart2.data.labels = this.xChartDataB
    this.chart3.data.labels = this.xChartDataC
    this.chart4.data.labels = this.xChartDataD
    this.chart5.data.labels = this.xChartDataE

    this.chart.data.datasets.push(newDataset1);
    this.chart.data.datasets.push(newDataset2);
    this.chart.data.datasets.push(newDataset3);

    this.chart2.data.datasets.push(newDataset1B);
    this.chart2.data.datasets.push(newDataset2B);
    this.chart2.data.datasets.push(newDataset3B);

    this.chart3.data.datasets.push(newDataset1C);
    this.chart3.data.datasets.push(newDataset2C);
    this.chart3.data.datasets.push(newDataset3C);

    this.chart4.data.datasets.push(newDataset1D);
    this.chart4.data.datasets.push(newDataset2D);
    this.chart4.data.datasets.push(newDataset3D);

    this.chart5.data.datasets.push(newDataset1E);
    this.chart5.data.datasets.push(newDataset2E);
    this.chart5.data.datasets.push(newDataset3E);

    this.chart.update()
    this.chart2.update()
    this.chart3.update()
    this.chart4.update()
    this.chart5.update()
  }
}
