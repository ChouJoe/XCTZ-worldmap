<template>
  <div >
    <div class="align-center mt-4 justify-center d-flex">
     <dv-decoration-6 style="width:200px;height:20px;" />
      <span class='pl-2' style='color:#18FFFF; font-size:18px'>每日温度曲线图</span>
    </div>
    <div style='height:280px;width:400px' id='tempchart'></div>
  </div>
</template>

<script>
export default {
  name: 'TopMiddleCmp',
  props:{
    deviceConfig:{
      type:Object,
      require:true
    }
  },
  data () {
    return {
       chart:null,
       Dynamic_Data:{
         water_t:{name:'水温', unit:"℃",range:[44,46],com_range:[5,20],k:1,data:[45]},
         guolu_t:{name:"锅炉温度",unit:"℃",range:[73,75],com_range:[5,20],k:3,data:[74]},
       },
       AxisXtime:[],
       initTime:null,
       curTime:null,
       refresh:{
         interval:null,
         timeRefresh:60000
       }
     
    }
  },
  methods:{
    addData(shift){
        let now = this.curTime;
        let newDate = new Date(now)
        let hh = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
        let mm = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
        let ss = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
        this.AxisXtime.push(hh+':'+mm+':'+ss);
        for(let key in this.Dynamic_Data){
           let data = this.Dynamic_Data[key].data
           let step = this.Dynamic_Data[key].range[1]-this.Dynamic_Data[key].range[0]
           let k =  (Math.random()<0.5)?1: -1;
           step = step*k*Math.random()
           let value = data[data.length-1]+step
           if(value>this.Dynamic_Data[key].range[1]){
              value=this.Dynamic_Data[key].range[1]-0.5
           }
           else if(value <this.Dynamic_Data[key].range[0]){
             value=this.Dynamic_Data[key].range[0]+0.5
           }
           if(this.deviceConfig.isRun){
              data.push(Number((value).toFixed(2)))
           }
           else{
             
             let fake = (this.Dynamic_Data[key].com_range[0]+this.Dynamic_Data[key].com_range[1])/2
             fake = fake+ Math.random()
             data[0]=fake
             data.push(Number((fake).toFixed(2)))
           }
          
           if(shift){
             data.shift()
           }
        }
        if(shift){
          this.AxisXtime.shift()
        }
        
        this.curTime = this.curTime +this.refresh.timeRefresh;
    },
    getInitData(){
        let now = new Date()
        let h = now.getHours()
        let m = now.getMinutes()
        let s = now.getSeconds()
        this.initTime = now.getTime()-h*3600*1000-m*60*1000-s*1000;
        this.curTime = this.initTime;
        let queueLen =Math.round( (now.getTime() - this.initTime)/this.refresh.timeRefresh);
        for(let i=0; i<queueLen;i++){
          this.addData();
        }
    },
    formatFun(params){
        console.log(params)
        // for(let i=0;i<params.length;i++){
            
        // }
       
    },
    initChart(){
      let chartDom = document.getElementById('tempchart');
      this.chart = this.$echarts.init(chartDom,'dark');
      //init data
     this.getInitData();
     let option ={
        title: {
            show:false
        },
        grid:{
          left:'15%',
          right:'10%',
          top:'15%',
          bottom:'20%'
        },
        tooltip: {
            trigger: 'axis',
            
            axisPointer: {
                animation: false
            }
        },
        backgroundColor: 'transparent',
        legend:{
          show:true,
          bottom:'5%'
          
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: false
            },
            // axisLabel:{
            //     formatter:function(value){
            //         console.log('value',value)
            //         let t=new Date(value)
            //         return t.getHours()+':'+t.getMinutes()+':'+t.getSeconds()      
            //     }
            // },
            data:this.AxisXtime
        },
          yAxis:[
            {
             name:'温度℃',
              type: 'value',
              boundaryGap: [0, '100%'],
              splitLine: {
                  show: false
              },
              axisLine:{
                show:true
              },
              axisTick:{
                show:true
              },
           
          }
 
        ],
        series: [{
            name: '水温',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            yAxisIndex:0,
            itemStyle:{
                color:'#00B0FF',
            },
            emphasis: {
                focus: 'series'
            },
            areaStyle:{
              color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: "rgba(0,174,255,0.6)"// 100% 处的颜色
                            }, {
                                offset: 1, color: "rgba(0,174,255,0)"  // 0% 处的颜色
                            }],
                            global: false // 缺省为 false
                  }
            },
            data: this.Dynamic_Data.water_t.data
        },
        {
            name: '锅炉温度',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            yAxisIndex:0,
                  itemStyle:{
                color:'#7cffb2',
            },
            emphasis: {
                focus: 'series'
            },
            areaStyle:{
              color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color:  "rgba(124,255,179,0.6)" // 100% 处的颜色
                            }, {
                                offset: 1, color: "rgba(124,255,179,0)"  // 0% 处的颜色
                            }],
                            global: false // 缺省为 false
                  }
            },
            data: this.Dynamic_Data.guolu_t.data
        }
        ]
      };
      this.chart.setOption(option);
    }
  },
  mounted(){
      this.initChart();
      let _this=this
      this.refresh.interval = setInterval(() => {
        _this.addData(false);
        _this.chart.setOption({
           xAxis: {
                data: _this.AxisXtime,
            },
            series: [
              {
                name: '水温',
                data: _this.Dynamic_Data.water_t.data
             },
              {
                name: '锅炉温度',
                data: _this.Dynamic_Data.guolu_t.data
             }
            ]
        })
      }, _this.refresh.timeRefresh);
  },
  beforeDestroy(){
      if(this.refresh.interval){
        clearInterval(this.refresh.interval)
      }
  }
}
</script>

<style lang="scss">
.top-middle-cmp {
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  .chart-name {
    position: absolute;
    right: 70px;
    text-align: right;
    font-size: 20px;
    top: 10px;
  };
  .chart{
     position: absolute;
     width:100%
  }
}
</style>