const app = getApp();

Component({
    properties: {
        communityId: {
            type: String
        }
    },
    ready() {
        const userList = this.selectComponent('#userList');
        userList.getUserList();
    }
});