Component({
    properties: {

    },
    data: {
        focus: false
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
        }
    }
})