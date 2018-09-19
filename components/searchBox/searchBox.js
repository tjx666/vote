Component({
    properties: {

    },
    data: {
        focus: false,
        searchResultList: [
            {
                id: 1,
                name: '张三',
                acquiredCount: 180,
            },
            {
                id: 2,
                name: '李四',
                acquiredCount: 160,
            },
            {
                id: 3,
                name: '王二',
                acquiredCount: 120
            }
        ]
    },
    methods: {
        handleInputFocus(event){
            this.setData({
                focus: true
            });
        },
        handleInputBlur(event) {
            this.setData({
                focus: false
            });
        },
        handleSelect(event) {
            const candidateId = event.currentTarget.dataset.selectCandidateId;
            this.triggerEvent('selectcandidate', {candidateId}, { bubbles: false, composed: false })
        }
    }
})