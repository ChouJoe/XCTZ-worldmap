<template>
    <v-dialog style='width:50%' v-model='show' persistent>
    <v-card class='bkg' >
    <div class='mx-2 my-2 d-flex'>
        <h1 style='color:#EEEEEE'>{{`${config.name}-${config.deviceName}`}}</h1>
        <v-spacer/>
        <v-icon large color='white' @click='closeMenu'>mdi-close</v-icon>
    </div>
    <v-row class='mx-2 my-2'>
  
        <dv-border-box-13 :style="{'height':'320px','width':'300px'}" >
            <div class='d-flex align-center pt-4 pl-3' >
                <v-icon color='#18FFFF'>mdi-chart-box</v-icon>
                <div style='color:#18FFFF; font-size:14px'>
                    设备运行数据
                </div>
                <dv-decoration-3 style="width:150px;height:30px;" />
            </div>
            <template v-for="(item,index) in  config.DeviceComm">
             <div :key='index' >
                <div class='pt-1 pl-4'>
                        <div class='white--text' style='font-size:12px'>
                        <v-icon small :color='item.color'>{{item.icon}}</v-icon>
                        {{item.name}}
                        </div>
                        <div class='ml-8' style='color:#00E5FF;font-size:18px;font-weight:bold'>{{item.value}}</div>
                </div>
             </div>
            </template>
        </dv-border-box-13>

  
        <dv-border-box-13 :style="{'height':'320px','width':'420px'}" >
        <energy-chart :deviceConfig='config' style='height:100%'></energy-chart>
        </dv-border-box-13>
  

        <dv-border-box-13 :style="{'height':'320px','width':'420px'}" >
        <temp-chart :deviceConfig='config' style='height:100%'></temp-chart>
        </dv-border-box-13>

        <dv-border-box-12  :style="{'height':'320px','width':'250px'}" >
                <scroll-broad :deviceConfig='config' class='pa-3' />
        </dv-border-box-12>
        <dv-border-box-13 :style="{'height':'320px','width':'420px'}" >
        <history-chart :deviceConfig='config' style='height:100%'></history-chart>
        </dv-border-box-13>
    </v-row>
    <dv-border-box-12>
        <v-row class='mx-2 py-2'>
                <template v-for="(item,index) in Ledconfig">
                    <v-col class='pa-0' col-md-3 :key="index">
                        <template v-if='config.isRun'>
                                <dv-decoration-11 :color="['#00E676','#00E676']" style="width:200px;height:55px;font-size:12px;color:#fff">
                                {{item.id==2?item.name[0]:item.name}}
                                </dv-decoration-11>
                        </template>
                        <template v-else>
                                <dv-decoration-11 :color="item.id==2?['#FF1744','#FF1744']:['#9E9E9E','#9E9E9E']" style="width:200px;height:55px;font-size:12px;color:#fff">
                                {{item.id==2?item.name[1]:item.name}}
                                </dv-decoration-11>
                        </template>
                    </v-col>
                </template>
        </v-row>
    </dv-border-box-12>
    </v-card>
    </v-dialog>
</template>
<script>
import energyChart from './energyChart'
import tempChart from './tempChart'
import scrollBroad from './scrollBroad.vue'
import historyChart from './historyChart'

export default {
    props:{
       showMenu:{
           type:Boolean,
           default:true
       },
       config:{
           type:Object,
           require:true
       }
    },
    watch:{
        showMenu:{
            immediate:true,
            handler:function(val){
                this.show = val;
            }
        }
    },
   components:{
       energyChart,
       tempChart,
       scrollBroad,
       historyChart
   },
    data(){
        return{
            Ledconfig:Ledconfig,
            DeviceComm:DeviceComm,
            show:false
        }
    },
    methods:{
        closeMenu(){
            this.$emit('closeMenu',false)
        }
    },
    mounted(){
        console.log('m')
    },
    destroyed(){
        console.log('d')
    }
}
</script>
<style scoped>
.bkg{
  background:url(../assets/img/bg-1.png) no-repeat #000;
  background-size: cover;
  border-color: turquoise;
   border-style:solid;
    border-width:2px;

}
</style>