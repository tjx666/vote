//index.js
//获取应用实例
const app = getApp()

import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option =  {
        color: ['#ef902b'],
        backgroundColor: 'rgb(250, 250, 210)', 
        title: {
            text: '候选人获票排行榜',
            subtext: '实时刷新'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['票数']
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['张三', '李四', '王二']
        },
        series: [
            {
                name: '票数',
                type: 'bar',
                data: [198, 159, 120]
            }
        ]
    };

    chart.setOption(option);
    return chart;
}

Page({
    data: {
        notification: '投票时间截止至10月一日,每个人只能投一票,投票后不可撤销',
        candidateList: [{
                id: 1,
                name: '张三',
                photoSrc: '../../assert/image/avatar.jpg',
                acquiredCount: 150,
            },
            {
                id: 2,
                name: '李四',
                photoSrc: '../../assert/image/avatar.jpg',
                acquiredCount: 130,
            },
            {
                id: 3,
                name: '王二',
                photoSrc: '../../assert/image/avatar.jpg',
                acquiredCount: 110,
            }
        ],
        ec: {
            onInit: initChart
        }
    },
    onLoad: function () {},
})