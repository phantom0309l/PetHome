var host = '//dwx.fangcunyisheng.com/api';
var dev = '?display=json';
var domain = 'fangcunyisheng.com';

console.log(process.env)

//***重要!!***
//请在各自环境下设置环境变量DEV_USER
//从而使开发环境能够访问自己环境的服务端接口
if (process.env.NODE_ENV === 'development') {
    var dev_user = process.env.DEV_USER || ""
    // if (dev_user == "") {
    //     throw new Error("请设置环境变量 DEV_USER")
    // }

    host = '//dwx.fangcunhulian.cn/api';
    dev = '?dev_user=' + dev_user + '&display=json';
    // domain = '192.168.1.108';
    // domain = 'localhost';
    domain = process.env.VUE_HOST;
} else if (process.env.isTest === true) {
    host = '//dwx.fangcunhulian.cn/api';
    domain = 'fangcunhulian.cn';
}

export default {
    host: host,
    dev: dev,
    domain: domain,
}
