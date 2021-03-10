import { wxRequest } from '../request';

export const deleteDynamic = async () => {
    return await wxRequest('/dynamic/delete', {
        data: {
            dynamicId: 3
        }
    });
}

export const detail = async () => {
    return await wxRequest('/dynamic/detail', {
        data: {
            dynamicId: 4
        }
    });
}

export const like = async () => {
    return await wxRequest('/dynamic/like', {
        data: {
            dynamicId: 4
        }
    });
}

export const userList = async () => {
    return await wxRequest('/dynamic/userList', {
        data: {}
    });
}

export const communityList = async () => {
    return await wxRequest('/dynamic/communityList', {
        data: {
            communityId: 1
        }
    });
}

export const ownerList = async () => {
    return await wxRequest('/dynamic/ownerList', {
        data: {}
    });
}

export const addComment = async () => {
    return await wxRequest('/dynamic/addComment', {
        method: 'post',
        data: {
            content: 'comment1',
            dynamicId: 6
        }
    })
}

export const editComment = async () => {
    return await wxRequest('/dynamic/editComment', {
        method: 'post',
        data: {
            content: 'comment5',
            id: 2
        }
    });
}

export const removeComment = async () => {
    return await wxRequest('/dynamic/removeComment', {
        data: {
            id: 2
        }
    })
}