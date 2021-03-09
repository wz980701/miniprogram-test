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