/***********************************

> 应用名称：KeepStyle
> 脚本功能：去除home页上方活动、底部社区、底部商城以及我的页面推广信息
> 脚本作者：Cuttlefish
> 微信账号：墨鱼手记
> 更新时间：2022-10-23
> 通知频道：https://t.me/ddgksf2021
> 投稿助手：https://t.me/ddgksf2013_bot
> 问题反馈： ddgksf2013@163.com 
> 特别说明：⛔⛔⛔
            本脚本仅供学习交流使用，禁止转载售卖
            ⛔⛔⛔
            
[rewrite_local]

# ～ Keep（2022-10-23）@ddgksf2013
^https?:\/\/api\.gotokeep\.com\/(athena\/v\d\/people\/my|config\/v\d\/basic) url script-response-body https://github.com/ddgksf2013/Cuttlefish/raw/master/Script/keepStyle.js

[mitm]

hostname=api.gotokeep.com

***********************************/


if ($request.url.indexOf('athena/v5/people/my') != -1) {
    let obj = JSON.parse($response.body);
    obj.data.floatingInfo = {}
    $done({ body: JSON.stringify(obj) });
}
else if( $request.url.indexOf('config/v3/basic') != -1 ){
    let obj = JSON.parse($response.body);
    obj.data.bottomBarControl.defaultTab = "home";
    //obj.data.bottomBarControl.tabs.forEach((e, i) => {if (e.tabType == "entry" || e.tabType == "mall") bottomBarTabs.splice(i--, 1);});
    obj.data.bottomBarControl.tabs = Object.values(obj.data.bottomBarControl.tabs).filter(item => !(item["tabType"]=="entry"||item["tabType"]=="mall"));
    obj.data.homeTabs = Object.values(obj.data.homeTabs).filter(item => !(item["type"]=="uni_web_activity"));
    $done({ body: JSON.stringify(obj) });
}
