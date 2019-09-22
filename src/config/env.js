/**
 * 配置编译环境和线上环境之间的切换
 */

let websocket_addr = ''
let websocket_key = ''
let websocket_iv = ''
let http_api = 'http://127.0.0.1:8081'

if (process.env.NODE_ENV === 'development') {
    websocket_addr = 'ws://45.40.202.228:8080'
    // websocket_addr = 'ws://127.0.0.1:9111'
    websocket_key = '700040D41F47592C'
    websocket_iv = '7AF3C134BEAA99E5'
} else if (process.env.NODE_ENV === 'production') {
    // websocket_addr = 'ws://192.168.30.51:9111'
    // websocket_key = 'A89226D089EE57FA'
    // websocket_iv = '57EF7B0E6E582178'
    websocket_addr = 'ws://192.168.30.51:8080'
    websocket_key = '700040D41F47592C'
    websocket_iv = '7AF3C134BEAA99E5'
}

export {
    websocket_addr,
    websocket_key,
    websocket_iv,
    http_api
}