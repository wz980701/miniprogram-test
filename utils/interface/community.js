import { wxRequest } from '../request';

export const getCommunityApplyList = async () => {
    return await wxRequest('/community/getApplyList', {
        data: {
            communityId: 1
        }
    })
}
export const getCommunityUsers = async () => {
    return await wxRequest('/community/getUsers', {
        data: {
            communityId: 1
        }
    })
}
export const getCommunityInfo = async () => {
    return await wxRequest('/community/getInfo', {
        data: {
            communityId: 1
        }
    })
}
export const createCommunity = async () => {
    return await wxRequest('/community/create', {
        method: 'post',
        data: {
            communityName: '音乐社',
            info: 'music'
        }
    })
}

export const addAnnouce = async () => {
    return await wxRequest('/community/addAnnounce', {
        method: 'post',
        data: {
            content: '公告2',
            communityId: 1
        }
    });
}

export const getAnnounceList = async () => {
    return await wxRequest('/community/getAnnounceList', {
        data: {
            communityId: 1
        }
    });
}

export const updateAnnounce = async () => {
    return await wxRequest('/community/updateAnnounce', {
        method: 'post',
        data: {
            id: 6,
            content: '公告修改2'
        }
    });
}

export const deleteAnnounce = async () => {
    return await wxRequest('/community/deleteAnnounce', {
        data: {
            id: 6
        }
    });
}

export const getCurrentUserLevel = async () => {
    return await wxRequest('/community/getCurrentUserLevel', {
        data: {
            communityId: 1
        }
    });
}

export const allCommunityList = async () => {
    return await wxRequest('/community/allCommunityList', {
        data: {}
    });
}
export const update = async () => {
    return await wxRequest('/community/update', {
        method: 'post',
        data: {
            id: 1,
            communityName: '轮滑社',
            info: '冲冲冲2'
        }
    });
}

export const search = async () => {
    return await wxRequest('/community/search', {
        method: 'post',
        data: {
            text: '社'
        }
    });
}

export const removeImgs = async () => {
    return await wxRequest('/file/removeImgs', {
        method: 'post',
        data: {
            imgIds: [1]
        }
    });
}

export const getImgs = async () => {
    return await wxRequest('/file/getImgs', {
        data: {
            communityId: 1
        }
    });
}

export const join = async () => {
    return await wxRequest('/community/join', {
        data: {
            communityId: 1
        }
    })
}

export const getApplyList = async () => {
    return await wxRequest('/community/getApplyList', {
        data: {
            communityId: 1
        }
    });
}

export const userCommunityList = async () => {
    return await wxRequest('/community/userCommunityList', {
        data: {}
    });
}

export const getSelectCommunityList = async () => {
    return await wxRequest('/community/getSelectCommunityList', {
        data: {
            level: 100
        }
    })
}

export const passUser = async () => {
    return await wxRequest('/community/passUser', {
        data: {
            id: 5
        }
    })
}

export const getUsers = async () => {
    return await wxRequest('/community/getUsers', {
        data: {
            communityId: 1
        }
    })
}

export const removeUser = async () => {
    return await wxRequest('/community/removeUser', {
        data: {
            id: 5
        }
    })
}

export const addManager = async () => {
    return await wxRequest('/community/addManager', {
        data: {
            id: 5
        }
    })
}