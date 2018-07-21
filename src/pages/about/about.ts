import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';

declare let echarts;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{


    showType:any;
    @ViewChild('chart1') chart1: ElementRef;
    @ViewChild('chart2') chart2: ElementRef;

    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' , sortable: false }
    ];

  constructor(public navCtrl: NavController) {
        this.showType ='charts';

  }

    // ionViewWillEnter(){
    //   console.log("ionViewWillEnter")
    //   this.showType ='charts';
    //   this.initChart1()
    //   this.initChart2()
    //
    //
    // }

    ionViewDidEnter() {
        this.initChart1();
        this.initChart2();
    }

    showWhat(){
      console.log(this.showType);
      if(this.showType == 'charts'){

          this.initChart1()
          this.initChart2()
      }
      else if(this.showType == 'data'){

      }
    }
  ngOnInit() {

  }

  initChart1(){
      let myChart = echarts.init(this.chart1.nativeElement);

      let option = {
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data:['销量']
          },
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      };

      myChart.setOption(option);
  }


    initChart2(){
        let myChart = echarts.init(this.chart2.nativeElement);

        let option = {
            series: {
                type: 'pie',
                data: [{
                    name: 'A',
                    value: 10
                }, {
                    name: 'B',
                    value: 20
                }, {
                    name: 'C',
                    value: 30
                }]
            }
        };

        myChart.setOption(option);
    }

}
