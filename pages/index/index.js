//index.js
//获取应用实例
const app = getApp()

import * as echarts from '../../components/ec-canvas/echarts.js';

let chart = null;

function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option = {
        color: ['#ef902b', '#ffa07a'],
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
            data: ['王二', '李四', '张三', ]
        },
        series: [{
            name: '票数',
            type: 'bar',
            data: [120, 160, 180]
        }]
    };

    chart.setOption(option);
    return chart;
}

Page({
    data: {
        notification: '投票时间截止至10月一日,每个人只能投一票,投票后不可撤销',
        candidateList: [{
                id: '1',
                name: '张三',
                photoSrc: '../../assert/image/avatar.jpg',
                acquiredCount: 180,
                supportProportion: 39.1,
            },
            {
                id: '2',
                name: '李四',
                photoSrc: '../../assert/image/avatar.jpg',
                acquiredCount: 160,
                supportProportion: 34.7,
            },
            {
                id: '3',
                name: '王二',
                photoSrc: '../../assert/image/avatar.jpg',
                acquiredCount: 120,
                supportProportion: 26.0,
            }
        ],
        currentCandidateId: "1",
        ec: {
            onInit: initChart
        },
        votedCandidateIds: [],
    },
    handleSelectCandidate(event) {
        const selectCandidate = this.data.candidateList.find(candidate => candidate.id === event.detail.candidateId);
        if (selectCandidate) {
            this.setData({
                currentCandidateId: selectCandidate.id
            });
        }
    },
    handleVote(event) {
        const candidateId = event.detail.id;
        const vote = __ => new Promise((resolve, reject) => {
            wx.request({
                url: `${ app.globalData.serverDomain }/api/v1/users/${openId}`,
                data: {
                    id: this.data.currentCandidateId
                },
                header: {
                    'content-type': 'application/json'
                },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (res) => {
                    resolve(res.data);
                },
                fail: () => {
                    reject('Server error cause voting failed');
                },
                complete: () => {}
            });
        });

        if (this.data.votedCandidateIds.length !== 0) {
            wx.showModal({
                title: '投票',
                content: '您确定投票吗,投票后将不可以修改',
                cancelText: '再考虑下',
                confirmText: '就是他了',
                success: (res) => {
                    if (res.confirm) {
                        vote().then(data => {
                            this.setData({
                                votedCandidateIds: [...this.votedCandidateIds, id]
                            });
                        })
                    }
                },
            });
        } else {
            const votedCandidate = this.data.candidateList.find(candidate => candidate.id === this.data.votedCandidateIds[0]);
            wx.showToast({
                title: `您已经投过其它候选人: ${ votedCandidate.name }`,
                mask: true,
                icon: 'none',
                duration: 2000,
            });
        }
    },
    handleSwiperChange(event) {
        const itemId = event.detail.currentItemId;
        this.setData({
            currentCandidateId: itemId
        });
    },
    onLoad: function () {

    },
})