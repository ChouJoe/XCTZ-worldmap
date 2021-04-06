<template>
    <div class="brand-container">
      <div class="wrap">
        <header>
          <div class="weather">
            <!-- <img :src="imgSrc">
            <span class="tem">{{ weatcherData.tem }}°C</span> 
            <span class="wea">{{ weatcherData.wea }}</span> -->
             <dv-decoration-8 class='deco' style="width:300px;height:50px;" />
          </div>
          <h2>旭成涂装设备全球售后监控中心</h2>
        
          <div class="showTime">
            <div class='mr-12' style='font-size:18px'>
              <span>{{ date }}</span>
              <span>{{ week }}</span>
              <span>{{ nowTime }}</span>
            </div>
            
              
              
            <dv-decoration-8 class='deco' :reverse="true" style="width:300px;height:50px;" />
          
          </div>
         
       </header>
         <!-- <dv-decoration-11  :color="['green', 'green']" style="width:150px;height:60px;color:#fff">设备在线</dv-decoration-11> -->
        <section class="mainbox">
        <div class="item ">
          <div class='map'>
          <div class="chart" id="mapChart"></div>
          <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
          </div>
        </div>
      </section>
      </div>
      <device-menu style='height:100%; width:100%' 
      :config='activeItem'
      v-if='showmenu'
      :showMenu='showmenu'
       @closeMenu="(val)=>{showmenu = val}"></device-menu>
    </div>
</template>
<script>
import chinaJson from 'echarts/map/json/china.json'
import worldJson from 'echarts/map/json/world.json'
import '@/assets/js/flexible'
import axios from 'axios'
// 对世界地图的json文件中的经纬度坐标进行处理
const processLng = lng => {
if (lng > -30) {
lng = lng - 180
} else {
lng = lng + 180
}
return lng
}
//格林兰岛表现怪异
const processLngGe = lng => {
return lng + 180
}
worldJson.features.map((district, index) => {
if (district.properties.name == 'Greenland') {
// WORLDJSON.features.splice(index, 1)
if (district.geometry.type == 'Polygon') {
  district.geometry.coordinates.map(border => {
  border.map(coord => {
  coord[0] = processLngGe(coord[0])

                  })
              })
} 
else {
              district.geometry.coordinates.map(border => {
                  border.map(coordinates => {
                      coordinates.map(coord => {
                          coord[0] = processLngGe(coord[0])
                      })
                  })
              })
          }
} 
else {
          if (district.geometry.type == 'Polygon') {
              district.geometry.coordinates.map(border => {
                  border.map(coord => {
                      coord[0] = processLng(coord[0])

                  })
              })
          } else {
              district.geometry.coordinates.map(border => {
                  border.map(coordinates => {
                      coordinates.map(coord => {
                          coord[0] = processLng(coord[0])
                      })
                  })
              })
          }
      }

})
import DeviceMenu from './DeviceMenu'
export default{
   components:{
      DeviceMenu
   },
    data() {
        return {
          nowTime: '',
          week: '',
          date: '',
          timer: null,
          imgSrc: '',
          weatcherData: {},
          dialog:true,
          showmenu:false,
          CityInfo:CityInfo,
          activeItem:CityInfo[0]
        }
    },
    computed:{
        mapData(){
            let res = this.CityInfo.map((e)=>{
              return {name:e.name, value:e.value, isRun:e.isRun}
            })
            return res
        },
        geoCoordMap(){
           let res = {}
           this.CityInfo.forEach((e)=>{
             res[e.name] =e.location
           })
           return res
        }
    },
    methods:{
      timeFormate(timeStamp) { //显示当前时间
          let newDate = new Date(timeStamp);
          let year = newDate.getFullYear();
          let month = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
          let date = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
          let hh = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
          let mm = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
          let ss = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
          let week = newDate.getDay();
          let weeks = ['日', '一', '二', '三', '四', '五', '六'];
          let getWeek = '星期' + weeks[week];
          this.week = getWeek;
          this.date = year + '.' + month + '.' + date;
          this.nowTime = hh + ':' + mm + ':' + ss;
     },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    },
    getWeather() { // 第三方天气api接口
      axios.get('https://www.tianqiapi.com/api/', {
        params: {
          appid: '26148275',
          appsecret: '2id6H48Y',
          version: 'v6'
        }
      }).then(res => {
        if (res.data) {
          if (res.data.wea_img == 'xue') {
            this.imgSrc = require('../assets/img/brand/xue.png');
          } else if (res.data.wea_img == 'yin') {
            this.imgSrc = require('../assets/img/brand/yin.png');
          } else if (res.data.wea_img == 'yu' || res.data.wea_img == 'bingbao') {
            this.imgSrc = require('../assets/img/brand/yu.png');
          } else if (res.data.wea_img == 'yun') {
            this.imgSrc = require('../assets/img/brand/yun.png');
          } else if (res.data.wea_img == 'wu') {
            this.imgSrc = require('../assets/img/brand/wu.png');
          } else if (res.data.wea_img == 'shachen') {
            this.imgSrc = require('../assets/img/brand/shachen.png');
          } else if (res.data.wea_img == 'lei') {
            this.imgSrc = require('../assets/img/brand/lei.png');
          } else {
            this.imgSrc = require('../assets/img/brand/qing.png');
          }
          this.weatcherData = res.data;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    drawMapChart(){
             //初始化echarts实例
        let _this=this;
        this.$echarts.registerMap('china', chinaJson)
        this.$echarts.registerMap('world',worldJson)
        var myChart = this.$echarts.init(document.getElementById('mapChart'));
        myChart.on('click',function(params){
          _this.activeItem = _this.CityInfo.find(e=>(e.name == params.name))
          console.log('AVTIVEitem', _this.activeItem)
           _this.showmenu = true
        })
        for (let name in this.geoCoordMap){
            if (this.geoCoordMap[name][0] > -30) {
            this.geoCoordMap[name][0] = this.geoCoordMap[name][0] - 180
            }
             else {
            this.geoCoordMap[name][0] = this.geoCoordMap[name][0] + 180
            }
        }
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = _this.geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };

        var option = {
                tooltip : {
                    trigger: 'item'
                },
                //布局e
                geo: {
                   left:'5%',
                   right:'5%',
                   top:'5%',
                   bottom:'5%',
                    show: true,
                    map: 'world',
                    zoom: 1,  //地图绽放
                    scaleLimit: {
                      min:1,
                      max:15
                    },
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    roam: true,//是否开启鼠标缩放和平移漫游
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(104,248,244,0.1)',
                            borderColor: '#3fdaff',
                            borderWidth: 1,
                            shadowColor: 'rgba(63, 218, 255, 0.5)',
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                            color: '#fff'
                        }
                    },
                    regions:[
                        {
                            name:'中国',
                            label:{
                                show:true
                            }
                        },
                         {
                            name:'越南',
                            label:{
                                show:true
                            }
                        },
                         {
                            name:'马来西亚',
                            label:{
                                show:true
                            }
                        },
                         {
                            name:'印度',
                            label:{
                                show:true
                            }
                        },
                         {
                            name:'德国',
                            label:{
                                show:true
                            }
                        },
                         {
                            name:'墨西哥',
                            label:{
                                show:true
                            }
                        },
                       
                   
                     
                    ],
                     nameMap: {
                    "Afghanistan":"阿富汗",
                    "Albania":"阿尔巴尼亚",
                    "Algeria":"阿尔及利亚",
                    "Angola":"安哥拉",
                    "Argentina":"阿根廷",
                    "Armenia":"亚美尼亚",
                    "Australia":"澳大利亚",
                    "Austria":"奥地利",
                    "Azerbaijan":"阿塞拜疆",
                    "Bahamas":"巴哈马",
                    "Bahrain":"巴林",
                    "Bangladesh":"孟加拉国",
                    "Belarus":"白俄罗斯",
                    "Belgium":"比利时",
                    "Belize":"伯利兹",
                    "Benin":"贝宁",
                    "Bhutan":"不丹",
                    "Bolivia":"玻利维亚",
                    "Bosnia and Herz.":"波斯尼亚和黑塞哥维那",
                    "Botswana":"博茨瓦纳",
                    "Brazil":"巴西",
                    "British Virgin Islands":"英属维京群岛",
                    "Brunei":"文莱",
                    "Bulgaria":"保加利亚",
                    "Burkina Faso":"布基纳法索",
                    "Burundi":"布隆迪",
                    "Cambodia":"柬埔寨",
                    "Cameroon":"喀麦隆",
                    "Canada":"加拿大",
                    "Cape Verde":"佛得角",
                    "Cayman Islands":"开曼群岛",
                    "Central African Rep.":"中非共和国",
                    "Chad":"乍得",
                    "Chile":"智利",
                    "China":"中国",
                    "Colombia":"哥伦比亚",
                    "Comoros":"科摩罗",
                    "Congo":"刚果",
                    "Costa Rica":"哥斯达黎加",
                    "Croatia":"克罗地亚",
                    "Cuba":"古巴",
                    "Cyprus":"塞浦路斯",
                    "Czech Rep.":"捷克共和国",
                    "Côte d'Ivoire":"科特迪瓦",
                    "Dem. Rep. Congo":"刚果民主共和国",
                    "Dem. Rep. Korea":"朝鲜",
                    "Denmark":"丹麦",
                    "Djibouti":"吉布提",
                    "Dominican Rep.":"多米尼加共和国",
                    "Ecuador":"厄瓜多尔",
                    "Egypt":"埃及",
                    "El Salvador":"萨尔瓦多",
                    "Equatorial Guinea":"赤道几内亚",
                    "Eritrea":"厄立特里亚",
                    "Estonia":"爱沙尼亚",
                    "Ethiopia":"埃塞俄比亚",
                    "Falkland Is.":"福克兰群岛",
                    "Fiji":"斐济",
                    "Finland":"芬兰",
                    "Fr. S. Antarctic Lands":"所罗门群岛",
                    "France":"法国",
                    "Gabon":"加蓬",
                    "Gambia":"冈比亚",
                    "Georgia":"格鲁吉亚",
                    "Germany":"德国",
                    "Ghana":"加纳",
                    "Greece":"希腊",
                    "Greenland":"格陵兰",
                    "Guatemala":"危地马拉",
                    "Guinea":"几内亚",
                    "Guinea-Bissau":"几内亚比绍",
                    "Guyana":"圭亚那",
                    "Haiti":"海地",
                    "Honduras":"洪都拉斯",
                    "Hungary":"匈牙利",
                    "Iceland":"冰岛",
                    "India":"印度",
                    "Indonesia":"印度尼西亚",
                    "Iran":"伊朗",
                    "Iraq":"伊拉克",
                    "Ireland":"爱尔兰",
                    "Isle of Man":"马恩岛",
                    "Israel":"以色列",
                    "Italy":"意大利",
                    "Jamaica":"牙买加",
                    "Japan":"日本",
                    "Jordan":"约旦",
                    "Kazakhstan":"哈萨克斯坦",
                    "Kenya":"肯尼亚",
                    "Korea":"韩国",
                    "Kuwait":"科威特",
                    "Kyrgyzstan":"吉尔吉斯斯坦",
                    "Lao PDR":"老挝",
                    "Latvia":"拉脱维亚",
                    "Lebanon":"黎巴嫩",
                    "Lesotho":"莱索托",
                    "Liberia":"利比里亚",
                    "Libya":"利比亚",
                    "Lithuania":"立陶宛",
                    "Luxembourg":"卢森堡",
                    "Macedonia":"马其顿",
                    "Madagascar":"马达加斯加",
                    "Malawi":"马拉维",
                    "Malaysia":"马来西亚",
                    "Maldives":"马尔代夫",
                    "Mali":"马里",
                    "Malta":"马耳他",
                    "Mauritania":"毛利塔尼亚",
                    "Mauritius":"毛里求斯",
                    "Mexico":"墨西哥",
                    "Moldova":"摩尔多瓦",
                    "Monaco":"摩纳哥",
                    "Mongolia":"蒙古",
                    "Montenegro":"黑山共和国",
                    "Morocco":"摩洛哥",
                    "Mozambique":"莫桑比克",
                    "Myanmar":"缅甸",
                    "Namibia":"纳米比亚",
                    "Nepal":"尼泊尔",
                    "Netherlands":"荷兰",
                    "New Caledonia":"新喀里多尼亚",
                    "New Zealand":"新西兰",
                    "Nicaragua":"尼加拉瓜",
                    "Niger":"尼日尔",
                    "Nigeria":"尼日利亚",
                    "Norway":"挪威",
                    "Oman":"阿曼",
                    "Pakistan":"巴基斯坦",
                    "Panama":"巴拿马",
                    "Papua New Guinea":"巴布亚新几内亚",
                    "Paraguay":"巴拉圭",
                    "Peru":"秘鲁",
                    "Philippines":"菲律宾",
                    "Poland":"波兰",
                    "Portugal":"葡萄牙",
                    "Puerto Rico":"波多黎各",
                    "Qatar":"卡塔尔",
                    "Reunion":"留尼旺",
                    "Romania":"罗马尼亚",
                    "Russia":"俄罗斯",
                    "Rwanda":"卢旺达",
                    "S. Geo. and S. Sandw. Is.":"南乔治亚和南桑威奇群岛",
                    "S. Sudan":"南苏丹",
                    "San Marino":"圣马力诺",
                    "Saudi Arabia":"沙特阿拉伯",
                    "Senegal":"塞内加尔",
                    "Serbia":"塞尔维亚",
                    "Sierra Leone":"塞拉利昂",
                    "Singapore":"新加坡",
                    "Slovakia":"斯洛伐克",
                    "Slovenia":"斯洛文尼亚",
                    "Solomon Is.":"所罗门群岛",
                    "Somalia":"索马里",
                    "South Africa":"南非",
                    "Spain":"西班牙",
                    "Sri Lanka":"斯里兰卡",
                    "Sudan":"苏丹",
                    "Suriname":"苏里南",
                    "Swaziland":"斯威士兰",
                    "Sweden":"瑞典",
                    "Switzerland":"瑞士",
                    "Syria":"叙利亚",
                    "Tajikistan":"塔吉克斯坦",
                    "Tanzania":"坦桑尼亚",
                    "Thailand":"泰国",
                    "Togo":"多哥",
                    "Tonga":"汤加",
                    "Trinidad and Tobago":"特立尼达和多巴哥",
                    "Tunisia":"突尼斯",
                    "Turkey":"土耳其",
                    "Turkmenistan":"土库曼斯坦",
                    "U.S. Virgin Islands":"美属维尔京群岛",
                    "Uganda":"乌干达",
                    "Ukraine":"乌克兰",
                    "United Arab Emirates":"阿拉伯联合酋长国",
                    "United Kingdom":"英国",
                    "United States":"美国",
                    "Uruguay":"乌拉圭",
                    "Uzbekistan":"乌兹别克斯坦",
                    "Vanuatu":"瓦努阿图",
                    "Vatican City":"梵蒂冈城",
                    "Venezuela":"委内瑞拉",
                    "Vietnam":"越南",
                    "W. Sahara":"西撒哈拉",
                    "Yemen":"也门",
                    "Yugoslavia":"南斯拉夫",
                    "Zaire":"扎伊尔",
                    "Zambia":"赞比亚",
                    "Zimbabwe":"津巴布韦"
                }
                },
                            
                // bmap: {
                //     show: true,
                //     center: [104.114129, 37.550339],
                //     map: 'china',
                //     zoom: 5,
                //     roam: true,
                //     mapStyle: {
                //         styleJson: [{
                //             'featureType': 'water',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'color': '#d1d1d1'
                //             }
                //         }, {
                //             'featureType': 'land',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'color': '#f3f3f3'
                //             }
                //         }, {
                //             'featureType': 'railway',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'visibility': 'off'
                //             }
                //         }, {
                //             'featureType': 'highway',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'color': '#fdfdfd'
                //             }
                //         }, {
                //             'featureType': 'highway',
                //             'elementType': 'labels',
                //             'stylers': {
                //                 'visibility': 'off'
                //             }
                //         }, {
                //             'featureType': 'arterial',
                //             'elementType': 'geometry',
                //             'stylers': {
                //                 'color': '#fefefe'
                //             }
                //         }, {
                //             'featureType': 'arterial',
                //             'elementType': 'geometry.fill',
                //             'stylers': {
                //                 'color': '#fefefe'
                //             }
                //         }, {
                //             'featureType': 'poi',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'visibility': 'off'
                //             }
                //         }, {
                //             'featureType': 'green',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'visibility': 'off'
                //             }
                //         }, {
                //             'featureType': 'subway',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'visibility': 'off'
                //             }
                //         }, {
                //             'featureType': 'manmade',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'color': '#d1d1d1'
                //             }
                //         }, {
                //             'featureType': 'local',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'color': '#d1d1d1'
                //             }
                //         }, {
                //             'featureType': 'arterial',
                //             'elementType': 'labels',
                //             'stylers': {
                //                 'visibility': 'off'
                //             }
                //         }, {
                //             'featureType': 'boundary',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'color': '#fefefe'
                //             }
                //         }, {
                //             'featureType': 'building',
                //             'elementType': 'all',
                //             'stylers': {
                //                 'color': '#d1d1d1'
                //             }
                //         }, {
                //             'featureType': 'label',
                //             'elementType': 'labels.text.fill',
                //             'stylers': {
                //                 'color': '#999999'
                //             }
                //         }]
                //     }
                // },
                series : [
                    {
                        name: '位置',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(this.mapData.filter((e)=>(e.isRun==true))),
                        symbolSize: 10,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke',
                             scale:2
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false,
                                fontSize:8
                            }
                        },
                        itemStyle: {
                                    normal: {
                                        color: '#76FF03',
                                        shadowBlur: 10,
                                        shadowColor: '#05C3F9',
                                         fontSize:8
                                    }
                        },
                        tooltip:{
                          textStyle:{
                              color: '#fff' ,
                              fontStyle: 'normal' ,
                              fontWeight: 'bold',
                              fontFamily: 'sans-serif' ,
                              fontSize: 14 ,
                          },
                          formatter:function(params){
                            return params.marker+" "+params.name
                          }
                        }
                    },
                    {
                        name: '位置',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(this.mapData.filter((e)=>(e.isRun==false))),
                        symbolSize: 10,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke',
                            scale:2
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            }
                        },
                        itemStyle: {
                                normal: {
                                    color: '#F44336',
                                    shadowBlur: 10,
                                    shadowColor: '#05C3F9'
                                }
                            },
                        tooltip:{
                          formatter:function(params){
                            console.log('tooltip',params)
                            return params.marker+" "+params.name
                          }
                        },
                        zlevel: 1
                    }
                ]
            };
            myChart.setOption(option);

    }
},
mounted(){
  this.timer = setInterval(() => {
      this.getWeather();
    }, 1000 * 60 * 60)
  this.nowTimes();
  this.drawMapChart();
},
beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
<style lang="scss" scoped>
.card{
  background-color: transparent;
}
#top-header {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;

  .header-center-decoration {
    width: 40%;
    height: 60px;
    margin-top: 30px;
  }

  .header-left-decoration, .header-right-decoration {
    position: absolute;
    width: 25%;
    height: 60px;
    z-index:1;
    .contain-div{
      z-index:0;
    }
  }

  .center-title {
    position: absolute;
    font-size: 30px;
    color:white;
    font-weight: bold;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
  }
}
.brand-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  .wrap {
    background: url(../assets/img/bg-1.png) no-repeat #000;
    background-size: cover;
    line-height: 1.15;
    height: 100%;
    header {
      position: relative;
      height: 1rem;
      background: url(../assets/img/brand/head_bg.png) no-repeat top center;
      background-size: 100% 100%;
      h2 {
        color: #7ef0ff;
        font-size: 0.475rem;
        text-align: center;
        line-height: 0.75rem;
        letter-spacing: 1px;
      }
      .weather {
        position: absolute;
        left: .05rem;
        top: 0.5rem;
        font-size: 0.25rem;
        color: rgba(126, 240, 255, .7);
        // img {
        //   width: .45rem;
        // }
        // span {
        //   display: inline-block;
        // }
        // .tem {
        //   margin: 0 .1rem 0 .2rem;
        // }
        .deco{
             left: 0rem;
        }
      }
      .showTime {
        position: absolute;
        right: .05rem;
        top: 0.5rem;
        color: rgba(126, 240, 255, .7);
        display: flex;
        .time {
          font-size: .28rem;
          margin-right: .5rem;
        }
        .date {
          span {
             margin-right: 1.2rem;
            display: block;
            &:nth-child(1) {
              font-size: .22rem;
              text-align: right;
            }
            &:nth-child(2) {
              font-size: .24rem;
              margin-bottom:1rem
            }
          }
        }
        .deco{
             position: absolute;
             right: 0rem;
             z-index:0
        }
      }
    }
    
    .mainbox {
      min-width: 1024px;
      max-width: 1920px;
      padding: 0.125rem 0.125rem 0;
      display: flex;
      .item {
        flex: 3;
        &.center {
          flex: 5;
          margin: 0 0.125rem 0.001rem;
          overflow: hidden;

          .resume {
            background: rgba(101, 132, 226, 0.1);
            padding: 0.1875rem;
            .resume-hd {
              position: relative;
              border: 1px solid rgba(25, 186, 139, 0.17);
              ul {
                display: flex;
                %li-line {
                  content: "";
                  position: absolute;
                  height: 50%;
                  width: 1px;
                  background: rgba(255, 255, 255, 0.2);
                  top: 25%;
                }
                li {
                  position: relative;
                  flex: 1;
                  text-align: center;
                  height: 1.2rem;
                  line-height: 1.2rem;
                  font-size: 0.65rem;
                  color: #ffeb7b;
                  padding: 0.05rem 0;
                  font-family: 'DIGITALDREAMFAT';
                  font-weight: bold;
                  &:nth-child(2) {
                    &:after {
                      @extend %li-line;
                      right: 0;
                    }
                    &:before {
                      @extend %li-line;
                      left: 0;
                    }
                  }
                }
              }
              &:before {
                content: "";
                position: absolute;
                width: 30px;
                height: 10px;
                border-top: 2px solid #02a6b5;
                border-left: 2px solid #02a6b5;
                top: 0;
                left: 0;
              }
              &:after {
                content: "";
                position: absolute;
                width: 30px;
                height: 10px;
                border-bottom: 2px solid #02a6b5;
                border-right: 2px solid #02a6b5;
                right: 0;
                bottom: 0;
              }
            }
            .resume-bd {
              ul {
                display: flex;
                li {
                  flex: 1;
                  height: 0.5rem;
                  line-height: 0.5rem;
                  text-align: center;
                  font-size: 0.225rem;
                  color: rgba(255, 255, 255, 0.7);
                  padding-top: 0.125rem;
                }
              }
            }
          }
        }
        
        %map-style {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6.475rem;
          height: 6.475rem;
          background: url(../assets/img/brand/map.png) no-repeat;
          background-size: 100% 100%;
          opacity: 0.3;
        }
        .map {
          position: relative;
          height: 10.125rem;
          .chart {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            height: 10.125rem;
            width: 100%;
          }
          .map1 {
            @extend %map-style;
          }
          .map2 {
            @extend %map-style;
            width: 8.0375rem;
            height: 8.0375rem;
            background-image: url(../assets/img/brand/lbx.png);
            opacity: 0.6;
            -webkit-animation: rotate 15s linear infinite;
            animation: rotate 15s linear infinite;
            z-index: 2;
          }
          .map3 {
            @extend %map-style;
            width: 7.075rem;
            height: 7.075rem;
            background-image: url(../assets/img/brand/jt.png);
            -webkit-animation: rotate1 10s linear infinite;
            animation: rotate1 10s linear infinite;
          }
        }
        .panel {
          position: relative;
          height: 3.875rem;
          border: 1px solid rgba(25, 186, 139, 0.17);
          background: rgba(255, 255, 255, 0.04) url(../assets/img/brand/line.png);
          padding: 0 0.1875rem 0;
          margin-bottom: 0.1875rem;
          &:before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 10px;
            height: 10px;
            border-top: 2px solid #02a6b5;
            border-left: 2px solid #02a6b5;
          }
          &:after {
            position: absolute;
            top: 0;
            right: 0;
            content: "";
            width: 10px;
            height: 10px;
            border-top: 2px solid #02a6b5;
            border-right: 2px solid #02a6b5;
          }

          .panel-footer {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            &:before {
              position: absolute;
              bottom: 0;
              left: 0;
              content: "";
              width: 10px;
              height: 10px;
              border-bottom: 2px solid #02a6b5;
              border-left: 2px solid #02a6b5;
            }
            &:after {
              position: absolute;
              bottom: 0;
              right: 0;
              content: "";
              width: 10px;
              height: 10px;
              border-bottom: 2px solid #02a6b5;
              border-right: 2px solid #02a6b5;
            }
          }

          h2 {
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            color: #fff;
            font-size: 0.225rem;
            font-weight: 400;
            a {
              margin: 0 0.1875rem;
              color: #fff;
              text-decoration: none;
            }
          }
          .chart {
            height: 3rem;
          }
        }
      }

    }

  }

}

@-webkit-keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@-webkit-keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920) {
  html {
    font-size: 80px !important;
  }
}	
</style>
