option1 = {
    radar: {
        center: ["50%", "55%"],
        radius: "70%",
        shape: "circle",
          splitArea: {
            areaStyle: {
                  color: ['#f8f8f8', '#fff']
              }
        },
        splitNumber:3,
        axisLine: {
            lineStyle: {
                  color:'#333',
                opacity: .1
            }
        },axisLine: {
            show: true,
            lineStyle: {
                type: "dotted",
                color: "#ccc"
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: "dottted",
                color: "#ccc"
            }
        },
        name: {
            formatter:'{value}',
            textStyle: {
                   color:'#333',
                fontSize:12
            }
        },
        indicator: [
			{ name: '任务型', max: 5,  },
            { name: '趋向型', max: 5, },
            {name: '逃避型',  max: 5, }]
    },
    series: [{
        type: 'radar',
         symbol: "circle",
        symbolSize:5,
        label: {
            normal: {
				position:'inside',
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 13,
                }
            }
        },
        areaStyle: {
            normal: {
                opacity: 0.8
            }
        },
        data: [ {value:[3,5,1]}]
    }],
 
    color: [
    new echarts.graphic.LinearGradient(0, 0, 1, 0, 
    [{offset: 0, color: '#90F7EC'},{offset: 1, color: '#32CCBC'}], false)]
};
	  var domMain1 = document.getElementById('echart1');
        var myChart1 = echarts.init(domMain1, 'default');
        myChart1.setOption(option1, true);

option2 = {
    radar: {
        center: ["50%", "53%"],
        radius: "70%",
        shape: "circle",
          splitArea: {
            areaStyle: {
                color: ['#f8f8f8', '#fff']
            }
        },
        splitNumber:3,
        axisLine: {
            lineStyle: {
                  color:'#333',
                opacity: .1
            }
        },axisLine: {
            show: true,
            lineStyle: {
                type: "dotted",
                color: "#ccc"
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: "dottted",
                color: "#ccc"
            }
        },
        name: {
            formatter:'{value}',
            textStyle: {
                   color:'#333',
                fontSize:12
            }
        },
        indicator: [
			{ name: '负面情绪\n', max: 5},
            { name: '逃避社交\n评价情境', max: 5},
            {name: '获得他人关注',  max: 5 },
            {name: '获得实质利益',  max: 5}]
    },
    series: [{
        type: 'radar',
         symbol: "circle",
        symbolSize:5,
        label: {
			position:'outside',
            normal: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 13,
                }
            }
        },
        areaStyle: {
            normal: {
                opacity: 0.8
            }
        },
		  data: [ {value: [5,2,3,4]}]
  
    }],
 
    color: [new echarts.graphic.LinearGradient(0, 0, 1, 0, 
    [{offset: 0, color: '#ABDCFF'},{offset: 1, color: '#0396FF'}], false)]
};
	var domMain2= document.getElementById('echart2');
        var myChart2 = echarts.init(domMain2, 'default');
        myChart2.setOption(option2, true);