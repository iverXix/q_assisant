'use strict';
const mp_wx_data = {
	AppID: 'wx9e3e4982d7fe7477',
	AppSecret: '738ed8ce076daa622951416cf5b05095'
}
exports.main = async (event, context) => {
    const db = uniCloud.database();
    const pro_user = db.collection('uni-id-users');



    let result = {};
    switch (event.action) {

        case 'code2Session':
            const res_session = await uniCloud.httpclient.request(
                'https://api.weixin.qq.com/sns/jscode2session', {
                    method: 'GET',
                    data: {
                        appid: mp_wx_data.AppID,
                        secret: mp_wx_data.AppSecret,
                        js_code: event.js_code,
                        grant_type: 'authorization_code'
                    },
                    dataType: 'json'
                }
            )
            console.log(res_session)
            const success = res_session.status === 200 && res_session.data && res_session.data.openid
            if (!success) {
                return {
                    status: -2,
                    msg: '从微信获取登录信息失败'
                }
            }
            const res_user = await pro_user.where({
                mp_wx_openid: res_session.data.openid
            }).get()
            if (res_user.data && res_user.data.length === 0) {

                const register = await uniCloud.callFunction({
                    name: 'login',
                    data: {
                        action: 'register',
                        open_id: res_session.data.openid,
                        user_info: event.user_info
                    }
                }).then(res => {
                    result = res
                })
            } else {
                const update = await uniCloud.callFunction({
                    name: 'login',
                    data: {
                        action: 'update',
                        open_id: res_session.data.openid,
                        _id: res_user.data[0]._id,
                        user_info: event.user_info
                    }
                }).then(res => {
                    result = res
                })
            }
            break;
        case 'register':
            const res_reg = await pro_user.add({
                nickName: event.user_info.nickName,
                avatarUrl: event.user_info.avatarUrl,
                mp_wx_openid: event.open_id,
				u_level:"初级鉴赏官",
				score:0,
				new_score:0,
                register_date: new Date().getTime()
				
            })
            if (res_reg.id) {
                const res_reg_val = await uniCloud.callFunction({
                    name: 'login',
                    data: {
                        action: 'getUser',
                        open_id: event.open_id
                    }
                }).then(res => {
                    result = res
                })
            } else {
                result = {
                    status: -1,
                    msg: '微信登录'
                }
            }
            break;
        case 'update':
            const res_update = await pro_user.doc(event._id).update({
                nickName: event.user_info.nickName,
                avatarUrl: event.user_info.avatarUrl,
                mp_wx_openid: event.open_id
            })
            const res_update_val = await uniCloud.callFunction({
                name: 'login',
                data: {
                    action: 'getUser',
                    open_id: event.open_id
                }
            }).then(res => {
                result = res
            })
            break;
        case 'getUser':
            const res_val = await pro_user.where({
                mp_wx_openid: event.open_id
            }).get()
            return res_val.data[0]
            break;
    }
    return result;
};