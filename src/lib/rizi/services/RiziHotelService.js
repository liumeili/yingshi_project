import AxiosBaseService from '../AxiosBaseService.js'

class iMService extends AxiosBaseService {
    // 获取验证码
    testapp(params) {
        return this.request('?s=App-Test-testapp', 'post', params);
    }

    // 首页列表页接口,也可用于首页选项卡 (电影-电视剧-动漫的选项卡)
    mainlist(params) {
        return this.request('?s=App-Home-mainlist', 'post', params);
    }

    //获取banner接口
    getbannerlist(params) {
        return this.request('?s=App-Home-getbannerlist', 'get', params);
    }

    // 获取最新推荐列表的接口
    getlatestrecommendlist(params) {
        return this.request('?s=App-Home-getlatestrecommendlist', 'get', params);
    }

    // 获取排行榜接口
    getranklist(params) {
        return this.request('?s=App-Home-getranklist', 'get', params);
    }

    // 频道列表页接口
    getchannelmovielist(params) {
        return this.request('?s=App-Home-getchannelmovielist', 'get', params);
    }

    // 频道筛选初始化接口
    getchannelnavisort(params) {
        return this.request('?s=App-Home-getchannelnavisort', 'get', params);
    }

    // 频道筛选页列表接口
    getchannelsortlist(params) {
        return this.request('?s=App-Home-getchannelsortlist', 'get', params);
    }

    // 获取点赞影片列表接口
    getlikevod(params) {
        return this.request('?s=App-User-getlikevod', 'get', params);
    }



}

export default iMService
