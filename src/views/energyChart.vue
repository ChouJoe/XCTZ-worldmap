<template>
  <div >
    <div class="align-center mt-4 justify-center d-flex">
     <dv-decoration-6 style="width:200px;height:20px;" />
      <span class='pl-2' style='color:#18FFFF; font-size:18px'>每日耗能曲线图</span>
    </div>
    <div style='height:280px;width:400px' id='energychart'></div>
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
         ele:{name:'用电量', unit:"度",range:[0,8000],com_range:[0,0],k:1.5,data:[0]},
         water:{name:"用水量",unit:"吨",range:[0,100],com_range:[0,0],k:3,data:[0]},
         gas:{name:'用气量',unit:"m³",range:[0,8000],com_range:[0,0],k:1,data:[0]} 
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
           let stepmax_pers;
           if(!this.deviceConfig.isRun){
              stepmax_pers =Math.round( (this.Dynamic_Data[key].com_range[1]-this.Dynamic_Data[key].com_range[0])/(3600*60)*100000)/100000
           }
           else{
              stepmax_pers =Math.round( (this.Dynamic_Data[key].range[1]-this.Dynamic_Data[key].range[0])/(3600*60)*100000)/100000
           }
           
           let k =  this.Dynamic_Data[key].k;
           let step =Math.floor(stepmax_pers*(this.refresh.timeRefresh/1000)*k*Math.random()*1000)/1000
           data.push(Number((data[data.length-1]+step).toFixed(2)))
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
      let chartDom = document.getElementById('energychart');
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
             name:'用电(度)/用气(m³)',
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
              }
          },
           {
             name:'用水(吨)',
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
              min:this.deviceConfig.isRun?-20:0
              
          },
        ],
        series: [{
            name: '用电量',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            yAxisIndex:0,
            itemStyle:{
                color:'#4992ff',
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
                                offset: 0, color: "rgba(73,146,255,0.6)"// 100% 处的颜色
                            }, {
                                offset: 1, color: "rgba(73,146,255,0)"  // 0% 处的颜色
                            }],
                            global: false // 缺省为 false
                  }
            },
            data: this.Dynamic_Data.ele.data
        },
        {
            name: '用水量',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            yAxisIndex:1,
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
            data: this.Dynamic_Data.water.data
        },
        {
            name: '用气量',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            yAxisIndex:0,
            itemStyle:{
                color:'#ff6e76',
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
                                offset: 0, color: "rgba(255,110,117,0.6)"  // 100% 处的颜色
                            }, {
                                offset: 1, color: "rgba(255,110,117,0)"  // 0% 处的颜色
                            }],
                            global: false // 缺省为 false
                  }
            },
            data: this.Dynamic_Data.gas.data
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
                name: '用电量',
                data: _this.Dynamic_Data.ele.data
             },
              {
                name: '用水量',
                data: _this.Dynamic_Data.water.data
             },
              {
                name: '用气量',
                data: _this.Dynamic_Data.gas.data
             },
            ]
        })
      },  _this.refresh.timeRefresh);
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