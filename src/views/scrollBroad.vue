
<template>
  <div id="scroll-board">
     <div class='d-flex' style='color:#18FFFF; font-size:14px'>
     <span >报警信息</span>
     <v-spacer/>
     <dv-decoration-1 style="width:100px;height:20px;" />
     </div>
    <dv-scroll-board v-if='deviceConfig.isRun' :config="config" />
  </div>
</template>

<script>
export default {
  name: 'ScrollBoard',
  props:{
      deviceConfig:{
          type:Object,
          require:true
      }
  },
  data () {
    return {
      config: {
        data: [
          ['<span style="color:#00E676;">系统正常</span>'],
          ['<span style="color:#00E676;"></span>'],
          ['<span style="color:#00E676;"></span>'],
          ['<span style="color:#00E676;"></span>'],
          ['<span style="color:#00E676;"></span>'],
          ['<span style="color:#00E676;"></span>'],
        ],
        align: ['left'],
        rowNum: 7,
        headerBGC: 'transparent',
        headerHeight: 45,
        oddRowBGC: 'transparent',
        evenRowBGC: 'transparent'
      }
    }
  }
}
</script>

<style lang="scss">
#scroll-board {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
</style>
