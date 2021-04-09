const app = getApp();
import bus from 'iny-bus';

Component({
    properties: {
        itemId: Number,
        likeNum: Number,
        isLike: Boolean
    },
    data: {
        showDialog: false,
        content: ''
    },
    lifetimes: {
        attached: function () {
            this.setData({
                dynamicId: this.data.itemId
            });
        }
    },
    observers: {
        'itemId, likeNum, isLike' (itemId, likeNum, isLike) {
            this.setData({
                dynamicId: itemId,
                curIsLike: isLike,
                curLikeNum: likeNum
            });
        }
    },
    methods: {
        showDialog () {
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
        },
        onLike () {
            app.wxRequest('/dynamic/like', {
                data: {
                    dynamicId: this.data.itemId
                }
            }).then((res) => {
                const { curIsLike, curLikeNum } = this.data;
                this.setData({
                    curIsLike: !curIsLike,
                    curLikeNum: curIsLike ? curLikeNum - 1 : curLikeNum + 1
                });
                bus.emit('UPDATE_DYNAMIC');
            }).catch((err) => {
                wx.showToast({
                    icon: 'none',
                    title: '点赞失败'
                });
                console.log(err);
            });
        },
        onSendComment () {
            const { content, dynamicId } = this.data;
            app.wxRequest('/dynamic/addComment', {
                method: 'post',
                data: {
                    content,
                    dynamicId
                }
            }).then((res) => {
                this.setData({
                    showDialog: false,
                    content: ''
                });
                wx.showToast({
                    icon: 'none',
                    title: '评论成功'
                });
                bus.emit('UPDATE_COMMENT');
            }).catch((err) => {
                console.log(err);
            });
        }
    }
});