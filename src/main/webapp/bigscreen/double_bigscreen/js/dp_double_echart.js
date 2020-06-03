 $(window).load(function(){$(".loading").fadeOut()})  


option1 = {
    tooltip: {
    trigger: 'axis',
    axisPointer: {type: 'shadow'},
    //formatter:'{b}走势' ,
},
legend: {
      x: 'center',
      y: '0',
     // icon: 'circle',
      itemGap:8,
      textStyle: {color: 'rgba(255,255,255,.5)'},
      itemWidth: 12,
      itemHeight: 12,
 },
grid: {
    left: '0',
      top: '30',
    right: '15',
    bottom: '10%',
    containLabel: true
},
xAxis: {
    type: 'category',
    data: ['5.12', '5.13', '5.14', '5.15', '5.16', '5.17','5.18',],
    axisLine: {show:false},
    axisTick:{show:false},
    axisLabel: {
      textStyle: {
       color:'rgba(255,255,255,.5)',
       fontSize:12
      }
    },
  },

  yAxis: {
    type: 'value',
    splitNumber:4,
    axisLine: { show: false },
 axisTick: {show: false},
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,0.05)'
      }
    },
    axisLabel:  {
        textStyle: {
             color: "rgba(255,255,255,.5)",
                   },
               },
  },
series: [ {
    name: '已巡检',
    type: 'bar',
    barWidth: '15%',
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8bd46e'
            }, {
                offset: 1,
                color: '#03b48e'
            }]),
            barBorderRadius: 11,
        }
        
      },
    data: [0,0, 0, 0,0,0, 0]

},
{
    name: '未巡检',
    type: 'bar',
    barWidth: '15%',
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#f1c415'
            }, {
                offset: 1,
                color: '#f5804d'
            }]),
            barBorderRadius: 12,
        },
      },
    data:[247, 247, 247,247,0, 0,708]

}
]
};
var domMain1 = document.getElementById('echart1');
var myChart1 = echarts.init(domMain1, 'default');
myChart1.setOption(option1, true);

option2 = {
    tooltip: {
    trigger: 'axis',
    axisPointer: {type: 'shadow'}
   
},
legend: {
      x: 'center',
      y: '20',
    // icon: 'circle',
      itemGap:8,
      textStyle: {color: 'rgba(255,255,255,.5)'},
      itemWidth: 12,
      itemHeight: 12,
 },
grid: {
    left: '0',
      top: '50',
    right: '15',
    bottom: '0',
    containLabel: true
},
xAxis: {
    type: 'category',
    data: ['5.12', '5.13', '5.14', '5.15', '5.16', '5.17','5.18'],
    axisLine: {show:false},
    axisTick:{show:false},
    axisLabel: {
      textStyle: {
       color:'rgba(255,255,255,.5)',
       fontSize:12
      }
    },
  },

  yAxis: {
    type: 'value',
    splitNumber:4,
    axisLine: { show: false },
 axisTick: {show: false},
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,0.05)'
      }
    },
    axisLabel:  {
        textStyle: {
             color: "rgba(255,255,255,.5)",
                   },
               },
  },
series: [ {
    name: '已整改',
    type: 'bar',
    barWidth: '15%',
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8bd46e'
            }, {
                offset: 1,
                color: '#03b48e'
            }]),
            barBorderRadius: 11,
        }
        
      },
    data: [0,0, 0,1,0,0, 0]

},
    {
    name: '处理中',
    type: 'bar',
  barWidth: '15%',
  itemStyle: {
    normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#3893e5'
        }, {
            offset: 1,
            color: '#248ff7'
        }]),
    barBorderRadius: 11,
    }
  },
    data: [0,0, 0,1,0,0,0]

},
{
    name: '已延期',
    type: 'bar',
    barWidth: '15%',
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#f1c415'
            }, {
                offset: 1,
                color: '#f5804d'
            }]),
            barBorderRadius: 12,
        },
      },
    data:[0,0, 0,1,0,0,0]

}]
};
        var domMain2 = document.getElementById('echart2');
        var myChart2 = echarts.init(domMain2, 'default');
        myChart2.setOption(option2, true);
		
		
        $(window).resize(function(){
            myChart1.resize();
            myChart2.resize();
        })
    


		









