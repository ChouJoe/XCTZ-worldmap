const Ledconfig=[
    {name:"设备在线",id:1},
    {name:['设备运行','设备维护'],id:2},
    {name:"设备故障",id:3},
    {name:'可燃气体检测',id:4},
    {name:"前处理1水泵自检",id:5},
    {name:'前处理2水泵自检',id:6},
    {name:"前处理3水泵自检",id:7},
    {name:'前处理4水泵自检',id:8},
    {name:"前处理5水泵自检",id:9},
    {name:'前处理6水泵自检',id:10},
    {name:"前处理7水泵自检",id:11},
    {name:'前处理8水泵自检',id:12},
    {name:"前处理9水泵自检",id:13},
    {name:'前处理10水泵自检',id:14},
    {name:"前处理11水泵自检",id:15},
    {name:'前处理12水泵自检',id:16},
    {name:"设备烘干燃烧室循环风机自检",id:17},
    {name:'固化燃烧室循环风机自检',id:18},
    {name:"红外加热GPS正常工作",id:19},
    {name:'粉房设备状态',id:20},
    {name:"纯水设备状态",id:21},
    {name:'锅炉燃烧机控制器状态',id:22}
]
const dotsize = 20
const DeviceComm=[
    { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
    {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
    {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
    {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
    {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
]
const BasicHistoryData={

    week:{
        date:['4/1','4/2','4/3','4/4','4/5','4/6','4/7'],
        ele:[7000,6000,6500,5500,5200,4300,6800],
        gas:[7000,6000,6500,5500,5200,4300,6800],
        water:[56,35,87,67,80,90,56]
    },
    month:{
        date:['3/11-3/17','3/18-3/24','3/25-3/31','4/1-4/7'],
        ele:[35000,38000,40000,45000],
        gas:[30000,35000,43000,46900],
        water:[550,600,510,460]
    }
}
const CityInfo=[
    {
        name:'济宁1',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[116.35,35.24],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'济宁2',
        value:dotsize,
        deviceName:'东华重工支架大修喷粉线',
        location:[116.63,35.28],
        isRun:false,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'山东.梁山',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[116,35],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'浙江.宁波',
        value:dotsize,
        deviceName:'',
        location:[121,29.8],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'江苏.常熟',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[120.75,31.65],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'苏州.胥口',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[120.6,31.3],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'苏州.吴江',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[120.6,31.5],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'南阳',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[112.53,33],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'吉林.长春',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[125.29,43.83],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'湖南.株洲',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[113.17,27.96],
        isRun:false,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'石龙区',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[112.9,33.9],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'吉隆坡',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[101.42,3.08],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'越南.归仁',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[109.226,13.780],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'越南.波来古市',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[108.00,13.967, ],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'越南.广义',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[108.807,15.13],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'越南.胡志明市',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[106.628,10.822],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'印度.卡基纳达',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[82.203,17.078],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'印度.坎曼',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[80.161,17.22],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'印度.孟买',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[72.873,19.122],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'墨西哥城',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[-99.097,19.493],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'德国.慕尼黑',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[11.504,48.324],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    },
    {
        name:'马来西亚.班台',
        value:dotsize,
        deviceName:'东华重工油缸喷粉线',
        location:[100.630,4.463],
        isRun:true,
        DeviceComm:[
            { name:"设备累计电耗", value:'176312KW ',icon:'mdi-flash',color:'#FDD835'},
            {name:"设备累计用水", value:'12234m³',icon:'mdi-water',color:'#00B0FF'},
            {name:"设备累计燃气", value:'142238m³',icon:'mdi-gas-station',color:'#1DE9B6'},
            {name:"设备总运行时间", value:'1年1月23日12小时12分',icon:'mdi-clock',color:'#FF7043'},
            {name:"设备本次运行时间", value:'0年0月23日12小时12分',icon:'mdi-timetable',color:'#FF5722'}
        ]
    }
]