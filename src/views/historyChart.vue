<template>
  <div >
    <div class="align-center mt-4 justify-space-around d-flex">
     <dv-decoration-6 style="width:100px;height:20px;" />
      <span class='pl-2' style='color:#18FFFF; font-size:18px'>历史耗能曲线图</span>
      <v-btn x-small 
      text color='#1DE9B6' 
      style='font-size:12px;font-weight:bold'
      @click="changeHistorydata">
      {{isDayMode ? '查看本月数据':'查看本周数据'}}
      </v-btn>
    </div>
    <div style='height:280px;width:400px' id='historychart'></div>
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
       AxisXtime:['3/30','3/31','4/1','4/2','4/3','4/4','4/5'],
       initTime:null,
       curTime:null,
       refresh:{
         interval:null,
         timeRefresh:60000
       },
       isDayMode:true,
       BasicHistoryData:null
       
    }
  },
  methods:{
    changeHistorydata(){
        this.isDayMode = !this.isDayMode;
      
        this.chart.setOption({
            xAxis: {
                    data:this.BasicHistoryData[this.isDayMode?'week':'month'].date,
                },
                series: [
                {
                    name: '用电量',
                    data:this.BasicHistoryData[this.isDayMode?'week':'month'].ele,
                },
                {
                    name: '用水量',
                    data: this.BasicHistoryData[this.isDayMode?'week':'month'].water,
                },
                {
                    name: '用气量',
                    data: this.BasicHistoryData[this.isDayMode?'week':'month'].gas,
                },
                ]
            })
      },
    initChart(){
      let chartDom = document.getElementById('historychart');
      this.chart = this.$echarts.init(chartDom,'dark');
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
            
            // axisPointer: {
            //     animation: false
            // }
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
            data:this.BasicHistoryData['week'].date,
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
          },
        ],
        series: [
            {
            name: '用电量',
            type: 'bar',
            yAxisIndex:0,
            itemStyle:{
                color:'#00B0FF',
            },
              emphasis: {
                focus: 'series'
            },
            data: this.BasicHistoryData['week'].ele,
        },
        {
            name: '用气量',
            type: 'bar',
            yAxisIndex:0,
            itemStyle:{
                color:'#ff6e76',
            },
             emphasis: {
                focus: 'series'
            },
            data: this.BasicHistoryData['week'].gas
        },
        {
            name: '用水量',
            type: 'bar',
            yAxisIndex:1,
            itemStyle:{
                color:'#7cffb2',
            },
            emphasis: {
                focus: 'series'
            },
            data: this.BasicHistoryData['week'].water
        }
        ]
      };
      this.chart.setOption(option);
    }
  },
  mounted(){
      this.BasicHistoryData = JSON.parse(JSON.stringify(BasicHistoryData))
      this.BasicHistoryData.week.ele = this.BasicHistoryData.week.ele.map(e=>(Math.round((e+Math.random()*1000)*100)/100))
      this.BasicHistoryData.week.water = this.BasicHistoryData.week.water.map(e=>(Math.round((e+Math.random()*100)*100)/100))
      this.BasicHistoryData.week.gas = this.BasicHistoryData.week.gas.map(e=>(Math.round((e+Math.random()*1000)*100)/100))
      this.BasicHistoryData.month.ele = this.BasicHistoryData.month.ele.map(e=>(Math.round((e+Math.random()*10000)*100)/100))
      this.BasicHistoryData.month.water = this.BasicHistoryData.month.water.map(e=>(Math.round((e+Math.random()*1000)*100)/100))
      this.BasicHistoryData.month.gas = this.BasicHistoryData.month.gas.map(e=>(Math.round((e+Math.random()*10000)*100)/100))
      this.initChart();
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