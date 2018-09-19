Component({
    properties: {
        initNotification: {
            type: String,
            value: '我要策马奔腾无尽苍穹，卷落一路风雨腾起彩虹,漂泊在你心海幸福依旧,清风一缕前世今生相逢   '
        },
        space: {
            type: Number,
            value: 1
        },
        interval: {
            type: Number,
            value: 20
        }
    },
    data: {
        notification: '',
        offsetLeft: 0,
        windowWidth: 0,
        textLength: 0,
    },
    methods: {
        // 查询节点宽度
        queryViewWidth(selector) {
            const query = wx.createSelectorQuery().in(this);
            const text = query.select(selector);
            return new Promise(resolve => {
                text.boundingClientRect(info => {
                    resolve(info.width);
                }).exec();
            });
        }
    },
    created() {
        // 设置一个间隔 interval 时间修改一次 offsetLeft 的定时器
       this.animateInterval = setInterval(__=> {
            if (this.data.offsetLeft <= 0) {
                if (this.data.offsetLeft > -this.data.textLength) {
                    this.setData({
                        offsetLeft: this.data.offsetLeft - this.data.space
                    })
                } else {
                    this.setData({
                        offsetLeft: this.data.windowWidth
                    })
                }
            } else {
                this.setData({
                    offsetLeft: this.data.offsetLeft - this.data.space
                })
            }
        }, this.data.interval);
    },
    attached() {
        this.setData({
            notification: this.data.initNotification,
        })
    },
    ready() {
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        this.queryViewWidth('.notification').then(width => {
            this.setData({
                windowWidth,
                textLength: width
            });
        });
    },
    detached() {
        // 关闭定时器
        clearInterval(this.animateInterval);
    }
})