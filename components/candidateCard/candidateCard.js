const app = getApp();

Component({
    properties: {
        id: {
            type: String,
            value: 'xxxxx'
        },
        candidateName: {
            type: String,
            value: '候选人姓名',
        },
        candidatePhoto: {
            type: String,
            value: ''
        },
        acquiredCount: {
            type: String,
            value: 180
        },
        supportProportion: {
            type: Number,
            value: "1"
        },
        status: {
            type: Boolean,
            value: false
        }
    },
    data: {

    },
    methods: {
        handleVote(event) {
            if (this.data.status) {
                wx.showToast({
                    title: '您已经投过该候选人',
                    mask: true,
                    icon: 'none',
                    duration: 2000,
                })
            } else {
                this.triggerEvent('vote', {
                    id
                }, {
                    bubbles: false,
                    composed: false
                });
            };
        }
    }
})