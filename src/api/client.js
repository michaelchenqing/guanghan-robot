import {websocket_addr, websocket_key, websocket_iv, http_api} from '../config/env'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)

export const TIMER = {
    scale: 120,
    _timer: null,
    timing: function() {
        if (this.scale > 0) {
            this.scale--
        }
    },
    clear: function() {
        this.scale = 120
        clearInterval(this._timer)
    },
    end: function() {
        this.scale = 5
        clearInterval(this._timer)
    }
}

export const WSC = {
    wsuri: null,
    websock: null,
    token: null,
    cbPool: {},
    login: 0,
    result: null,

    initParam: function() {
        this.wsuri = null
        this.websock = null
        this.token = null
        this.cbPool = {}
        this.login = 0,
        this.result= null
    },

    close: function() {
      this.websock.close();
    },

    initWebpack: function (cardno) { // 初始化websocket
        this.initParam();
        let timestamp = parseInt(Date.parse(new Date()) / 1000);
        let signTxt = String(cardno) + String(timestamp)
        this.wsuri = websocket_addr + "?token="+websocket_iv+"&cardno="+cardno+"&timestamp="+timestamp+"&sign=" + this.encryptMd5(signTxt, websocket_iv)
        this.websock = new WebSocket(this.wsuri) // 这里面的this都指向vue
        this.websock.onopen = this.websocketopen
        this.websock.onsend = this.websocketsend
        this.websock.onmessage = this.websocketonmessage
        this.websock.onclose = this.websocketclose
        this.websock.onerror = this.websocketerror
    },

    websocketopen: function (e) { // 打开
        console.log('websocket连接成功')
    },

    websocketclose: function () { // 关闭
        console.log('websocket连接关闭')
        TIMER.clear();
        if (!WSC.token) {
            WSC.login = 2
        }
        WSC.token = null
        WSC.websock = null
    },

    websocketerror: function (e) { // 错误
        console.log('websocket发生错误', e)
    },

    websocketonmessage: function (e) { // 数据接收
        if (!WSC.token) {
            console.log("生成token", e.data)
            WSC.token = e.data
            WSC.login = 1
        } else {
            let data = JSON.parse(e.data)
            if (data.requestId == undefined) {
                console.log("接收到系统广播", data)
                if (data.result == 1) {
                    WSC.result = 1;
                    Vue.jsonp(http_api, data.body).then(json => {
                        console.log(json)
                    }).catch(err => {
                        console.log(err)
                    })
                    WSC.login = 4;
                    TIMER.end();
                    TIMER._timer = setInterval(() => { 
                        TIMER.timing()
                    }, 1000)
                    return;
                } else {
                    WSC.result = 2;
                }
            } else {
                console.log("接收数据", data)
                WSC.dealResolve(data)
            }
        }
        TIMER.clear();
        TIMER._timer = setInterval(() => { 
            TIMER.timing()
        }, 1000)
    },

    websocketsend: function (agentData, module, method) { // 数据发送
        TIMER.clear();
        if (this.token) {
            const requestId = Date.now().toString(36)
            const data = {
                requestId: requestId,
                token:this.token,
                module: module,
                method: method,
                arguments: agentData,
            }
            console.log('发送数据:', data)
            this.websock.send(JSON.stringify(data))
            return new Promise((resolve, reject) => {
                this.cbPool[requestId] = resolve
            });
        } else {
            console.log('连接尚未开启')
        }
    },

    dealResolve(data) {
        const resolve = this.cbPool[data.requestId];
        if (typeof resolve === 'function') {
            resolve(data)
        }
    },

    encryptMd5: function (strs, wiv)  {
        let plain = websocket_key + strs + wiv;
        let encrypted = CryptoJS.MD5(plain).toString();
        return encrypted.slice(8, -8).toUpperCase()
    }

}