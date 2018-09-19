Component({
    properties: {
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
        status: {
            type: Boolean,
            value: false
        }
    },
    data: {
        
    },
    methods: {
        handleVote() {
            if (this.data.status) {
                wx.showToast({
                    title: '您已经投过该候选人',
                    mask: true,
                    icon: 'none',
                    duration: 2000,
                })
            } else {
                wx.showModal({
                    title: '投票',
                    content: '您确定投票吗,投票后将不可以修改',
                    cancelText: '再考虑下',
                    confirmText: '就是他了',
                    success: (res) => {
                        if (res.confirm) {
                            this.setData({
                                status: true
                            })
                        }
                    },
                })
            }
            
        }
    }
})