export const INIT_PAGE = 1;
export const INIT_SIZE = 8;

export const scrollConf = {
        pagination: {
            page: 1,
            totalPage: 0,
            limit: 8,
            length: 0
        },
        empty: {
            img: 'https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/default/空.png'
        },
        refresh: {
            type: 'default',
            style: 'black',
            background: '#000'
        },
        loadmore: {
            type: 'default',
            icon: {
                img:  'http://upload-images.jianshu.io/upload_images/5726812-95bd7570a25bd4ee.gif'
            },
            background: '#f2f2f2', 
            title: {
                show: true,
                text: '加载中',
                color: "#999",
                shadow: 5
            }
        }
}