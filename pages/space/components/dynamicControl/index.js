const app = getApp();

Component({
    data: {
        showDialog: false,
        content: ''
    },
    methods: {
        onSendComment () {
            this.setData({
                showDialog: true
            });
        },
        onCloseDialog () {
            this.setData({
                showDialog: false
            });
        },
        onInput (e) {
            this.setData({
                content: e.detail.value
            });
        }
    }
});