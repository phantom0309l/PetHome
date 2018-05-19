import config from './config.js'
import cookie from '../lib/cookie.js'
var urls = {
    'index': '/index/index',
    'user': {
        'isbind': '/bind/isbind',
    },
    'pipe': {
        'listofday': '/pipe/listofday',
        'pipelist': '/pipe/list',
    },
    'report': {
        'list': '/report/list',
        'one': '/report/one',
    },
    'doctorcomment': {
        'addpost': '/doctorcomment/addpost',
        'add4patientpost': '/doctorcomment/add4patientpost',
    },
    'bind': {
        'binduserpost': '/bind/binduserpost',
        'unbindpost': '/bind/unbindpost',
    },
    'sickbed': {
        'list': '/bedtkt/list',
        'refuse': '/bedtkt/refuse',
        'refusejson': '/bedtkt/refusejson',
        'pass': '/bedtkt/pass',
        'passjson': '/bedtkt/passjson',
        'senddate': '/bedtkt/sendjson',
        'historylist': '/bedtkt/historylist',
        // ''
    },
    'bedtkt': {
        'one': '/bedtkt/one',
        'info': '/bedtkt/info',
        'history4onepatient': '/bedtkt/history4onepatient',
        'apply': '/bedtkt/apply',
        'applypass': '/bedtkt/applypass',
        'applyrefuse': '/bedtkt/applyrefuse',
    },
    'bedtktlog': {
        'list': '/bedtktlog/list',
    },
    'schedule': {
        'list': '/schedule/list',
    },
    'appointment': {
        'list': '/revisittkt/list',
        'schedulelist': '/revisittkt/schedulelist',
        'historylistbypatient': '/revisittkt/historylistbypatient',
        'checkuptpllist': '/revisittkt/checkuptpllist',
        'addjson': '/revisittkt/addjson',
        'markhisjson': '/revisittkt/markhisjson',
    },
    'patient': {
        'list': '/patient/list',
        'listforpatientids': '/patient/listforpatientids',
        'info': '/patient/info',
        'allinfo': '/patient/allinfo',
        'cancerreport': '/patient/cancerreport',
        //SNAP-IV 评估图接口
        'get_adhd_dataJson': '/patient/get_adhd_dataJson',
        //治疗反应问卷 体重 统计图接口
        'getZlfywjWeightChartJson': '/patient/getZlfywjWeightChartJson',
    },
    'patienttag': {
        'list':'/patienttag/list',
        'modifypost': '/patienttag/modifypost',
    },
    'patienttagtpl': {
        'list': '/patienttagtpl/list'
    },
    'doctor': {
        'config': '/doctor/config',
        'menzhenconfig': '/doctor/menzhenconfig',
        'info': '/doctor/info',
        'modifypwdjson': '/doctor/modifypwdjson',
        'configpost': '/doctor/configpost',
        'menzhenconfigpost': '/doctor/menzhenconfigpost',
        'isauditchufangpost': '/doctor/isauditchufangpost',
        'weekrpt': '/doctor/weekrpt',
        'adhdweekrpt': '/doctor/adhdweekrpt',
        'multidiseaseweekrpt': '/doctor/multidiseaseweekrpt',
    },
    'doctortask': {
        'weektasklist': '/doctortask/weektasklist',
        'faqs': '/doctortask/faqs',
        'train': '/doctortask/train',
        'pipepatients': '/doctortask/pipepatients',
        'scale': '/doctortask/scale',
        'auditjson': '/doctortask/auditjson',
    },
    'prescription': {
        'list': '/prescription/list',
        'one': '/prescription/one',
        'auditjson': '/prescription/auditjson',
    },
    'paper': {
        'tpllist4onepatient': '/papertpl/list4onepatient',
        'list': '/paper/list',
        'one': '/paper/one',
    },
    'revisitrecord': {
        'list': '/revisitrecord/list4onepatient'
    },
    'pushmsg': {
        'sendmsg2onepatient': "/pushmsg/sendmsg2onepatient",
    },
    'picture': {
        'addjson': '/picture/addjson',
    },
    'wxpicmsgmgr': {
        'sendpic2onepatient': '/wxpicmsgmgr/sendpic2onepatient',
    },
    'revenue': {
        'list': '/revenue/list',
        'showitem': '/revenue/showitem'
    },
    'my': {
        'groupedchartstatistics': '/my/groupedchartstatistics',
    },
    'callorder': {
        'missedcall': '/callorder/missedcall',
    },
    'doctorworkcalendar': {
        'list': '/doctor_workcalendar/list',
        'listforpatient': '/doctor_workcalendar/listforpatient',
        'one': '/doctor_workcalendar/one',
        'configs': '/doctor_workcalendar/configs',
        'addormodifyjson': '/doctor_workcalendar/addormodifyjson',
        'deletejson': '/doctor_workcalendar/deletejson',
    },
    'shoporder': {
        'list': '/shoporder/list',
        'monthrpt': '/shoporder/monthrpt',
    },
    'drug': {
        'detailjson': '/drug/detailjson',
    },
    'doctorshopproductref': {
        'list': '/doctorshopproductref/list',
        'bindorunbind': '/doctorshopproductref/bindorunbind',
    },
    'letter': {
        'list': '/letter/list',
    },
    'pvlog':{
        'saveurldatajson':'/pvlog/saveurldatajson',
    }
}

export default {
    'get': function(str) {
        var params = str.split('.');
        var url = '';
        if (params.length == 1) {
            url = urls[params[0] + ''];
        }else if (params.length == 2) {
            url = urls[params[0] + ''][params[1] + ''];
        }else if (params.length == 3) {
            url = urls[params[0] + ''][params[1] + ''][params[2] + ''];
        }

        url = config.host + url + config.dev;
        return url;
    }
}
