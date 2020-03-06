import AxiosBaseService from '../AxiosBaseService.js'

class iMService extends AxiosBaseService {
    // 测试
    testapp(params) {
        return this.request('?s=App-Test-testapp', 'post', params);
    }

    // 用户登录发送验证码
    regSendCode(params) {
        return this.request('?s=App-Login-regSendCode', 'get', params);
    }

    // 用户验证码登录
    phoneCodeLogin(params) {
        return this.request('?s=App-Login-phoneCodeLogin', 'get', params);
    }

    // 获取公共配置的接口，前端需缓存这个接口获取到的信息
    getConfig(params) {
        return this.request('?s=App-Home-getConfig', 'post', params);
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

    // 获取影视详情页信息的接口
    getmoviedetail(params) {
        return this.request('?s=App-User-getmoviedetail', 'get', params);
    }

    // 获取影视播网页url接口,调这个接口，会累加当日的播放次数
    getplayurl(params) {
        return this.request('?s=App-User-getplayurl', 'get', params);
    }

    // 获取用户信息接口,在需要的时候调用
    getuserinfo(params) {
        return this.request('?s=App-User-getuserinfo', 'get', params);
    }

    // 对影片添加喜欢的接口
    likevod(params) {
        return this.request('?s=App-User-likevod', 'get', params);
    }

    // 对影片取消添加喜欢的接口
    unlikevod(params) {
        return this.request('?s=App-User-unlikevod', 'get', params);
    }

    // 对影片添加收藏的接口
    collectvod(params) {
        return this.request('?s=App-User-collectvod', 'get', params);
    }

    // 对影片取消收藏影片接口
    uncollectvod(params) {
        return this.request('?s=App-User-uncollectvod', 'get', params);
    }

    // 获取收藏影片列表接口
    getcollectvod(params) {
        return this.request('?s=App-User-getcollectvod', 'get', params);
    }

    // 获取我的观看历史记录
    getplayhistory(params) {
        return this.request('?s=App-User-getplayhistory', 'get', params);
    }

    // 购买VIP列表
    vipinit(params) {
        return this.request('?s=App-User-vipinit', 'get', params);
    }

    // 热点：列表
    hotpointlist(params) {
        return this.request('?s=App-Home-hotpointlist', 'get', params);
    }

    // 任务：分享推广信息
    getsharedetail(params) {
        return this.request('?s=App-User-getsharedetail', 'get', params);
    }

    // 任务：帮助规则介绍
    getsharerule(params) {
        return this.request('?s=App-User-getsharerule', 'get', params);
    }

    // 搜索获取大片列表
    searchresult(params) {
        return this.request('?s=App-User-searchresult', 'get', params);
    }

    // 分享记录数据
    getsharelog(params) {
        return this.request('?s=App-User-getsharelog', 'get', params);
    }

    // 保存修改用户信息接口
    edituserdata(params) {
        return this.request('?s=App-User-edituserdata', 'get', params);
    }











































































}

export default iMService
