const Doctor = {
    template: '<router-view></router-view>',
}
const Patient = {
    template: '<router-view></router-view>',
}
const EmptyTemplate = {
    template: '<router-view></router-view>',
}
const DoctorTask = {
    template: '<router-view></router-view>',
}

export default [
    {
        path: '/doctor/',
        name: 'doctor',
        component: Doctor,
        children: [
            {
                path: 'bind',
                name: 'doctor-bind',
                component: function(resolve) {
                  require(['../pages/doctor/BindUser.vue'], resolve);
                },
            },
            {
                path: 'config',
                name: 'doctor-config',
                component: resolve => require(['../pages/doctor/SetConfig.vue'], resolve),
            },
            {
                path: 'menzhenconfig',
                name: 'doctor-menzhenconfig',
                component: resolve => require(['../pages/doctor/MenzhenConfig.vue'], resolve),
            },
            {
                path: 'modifypwd',
                name: 'doctor-modifypwd',
                component: resolve => require(['../pages/doctor/ModifyPwd.vue'], resolve),
            },
            {
                path: 'info',
                name: 'doctor-info',
                component: resolve => require(['../pages/doctor/Info.vue'], resolve),
            },
            {
                path: 'income',
                name: 'doctor-income',
                component: resolve => require(['../pages/doctor/DoctorIncome.vue'], resolve),
            },
            {
                path: ':themonth/incomedetail',
                name: 'doctor-incomedetail',
                component: resolve => require(['../pages/doctor/DoctorIncomeDetail.vue'], resolve),
            },
            {
                path: 'adhdweekrpt',
                name: 'adhdweekrpt',
                component: resolve => require(['../pages/rpt/ADHDWeekRpt.vue'], resolve)
            },
            {
                path: 'multiplediseaserpt',
                name: 'multiplediseaserpt',
                component: resolve => require(['../pages/rpt/MultipleDisease.vue'], resolve)
            },
            {
                path: 'shoporderlist',
                name: 'shoporderlist',
                component: resolve => require(['../pages/rpt/ShopOrderList.vue'], resolve)
            }
        ]
    },
    {
        path: '/patient',
        name: 'patient',
        component: Patient,
        children: [
            {
                path: ':patientid/main',
                name: 'patient-main',
                component: resolve => require(['../pages/patient/PatientMain.vue'], resolve)
            },
            {
                path: ':patientid/baseinfo',
                name: 'patient-baseinfo',
                component: resolve => require(['../pages/patient/BaseInfo.vue'], resolve)
            },
            {
                path: ':patientid/pipelist',
                name: 'patient-pipelist',
                component: resolve => require(['../pages/patient/PipeList.vue'], resolve)
            },
            {
                path: 'list',
                name: 'patient-list',
                component: resolve => require(['../pages/patient/PatientList.vue'], resolve),
                meta: {
                    keepAlive: true
                }

            },
            {
                path: 'list4statistic',
                name: 'patient-list4statistic',
                component: resolve => require(['../pages/patient/PatientListForStatistic.vue'], resolve)
            },
            {
                path: 'active',
                name: 'patient-active',
                component: resolve => require(['../pages/patient/ActivePatients.vue'], resolve)
            },
            {
                path: ':patientid/phymareport',
                name: 'patient-phymareport',
                component: resolve => require(['../pages/patient/Phymareport.vue'], resolve)
            },
            {
                path: ':patientid/doctorcomment',
                name: 'patient-doctorcomment',
                component: resolve => require(['../pages/patient/DoctorComment.vue'], resolve)
            },
            {
                path: ':patientid/tagandremark',
                name: 'patient-tagandremark',
                component: resolve => require(['../pages/patient/TagAndRemark.vue'], resolve)
            }
        ]
    },
    {
        path: '/bedtkt',
        name: 'bedtkt',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'bedtkt-list',
                component: resolve => require(['../pages/bedtkt/BookSickBed.vue'], resolve)
            },
            {
                path: 'list/:patientid',
                // name: 'bedtkt-list',
                component: resolve => require(['../pages/bedtkt/BookSickBed.vue'], resolve)
            },
            {
                path: ':bedtktid/main',
                name: 'bedtkt-main',
                component: resolve => require(['../pages/bedtkt/BedtktMain.vue'], resolve)
            },
            {
                path: ':bedtktid/applicationinfomation',
                name: 'bedtkt-applicationinfomation',
                component: resolve => require(['../pages/bedtkt/ApplicationInformation.vue'], resolve)
            },
            {
                path: ':patientid/patienthistory',
                name: 'bedtkt-patienthistory',
                component: resolve => require(['../pages/bedtkt/PatientHistory.vue'], resolve)
            },
            {
                path: 'historylist',
                name: 'bedtkt-historylist',
                component: resolve => require(['../pages/bedtkt/OperationHistory.vue'], resolve)
            },
            {
                path: 'refuse',
                name: 'bedtkt-refuse',
                component: resolve => require(['../pages/bedtkt/RefuseEnter.vue'], resolve)
            },
            {
                path: 'pass',
                name: 'bedtkt-pass',
                component: resolve => require(['../pages/bedtkt/ConfirmEnter.vue'], resolve)
            },
            {
                path: 'sendentermsg',
                name: 'bedtkt-sendentermsg',
                component: resolve => require(['../pages/bedtkt/SendEnterMsg.vue'], resolve)
            },
            // {
            //     path: 'patientstatus/:patientid',
            //     // name: 'bedtkt-patientstatus',
            //     component: resolve => require(['../pages/bedtkt/BookSickBed.vue'], resolve)
            // },
            {
                path: 'apply/:bedtktid',
                name: 'bedtkt-apply',
                component: resolve => require(['../pages/bedtkt/Apply.vue'], resolve)
            },
            {
                path: 'apply/:bedtktid/refuse',
                name: 'bedtkt-apply-refuse',
                component: resolve => require(['../pages/bedtkt/ApplyRefuse.vue'], resolve)
            },
            {
                path: 'apply/:bedtktid/pass',
                name: 'bedtkt-apply-pass',
                component: resolve => require(['../pages/bedtkt/ApplyPass.vue'], resolve)
            },
        ]
    },
    {
        path: '/bedtktlog',
        name: 'bedtktlog',
        component: EmptyTemplate,
        children: [
            {
                path: ':bedtktid/list',
                name: 'bedtktlog-list',
                component: resolve => require(['../pages/bedtkt/BedtktlogList.vue'], resolve)
            }
        ]
    },
    {
        path: '/report',
        name: 'report',
        component: EmptyTemplate,
        children: [
            {
                path: ':reportid/one',
                name: 'report-one',
                component: resolve => require(['../pages/report/One.vue'], resolve)
            },
            {
                path: 'list',
                name: 'report-list',
                component: resolve => require(['../pages/report/List.vue'], resolve)
            }
        ]
    },
    {
        path: '/revisittkt',
        name: 'revisittkt',
        component: EmptyTemplate,
        children: [
            {
                path: 'schedules',
                name: 'revisittkt-schedules',
                component: resolve => require(['../pages/schedule/List.vue'], resolve)
            },
            {
                path: ':thedate/list',
                name: 'revisittkt-list',
                component: resolve => require(['../pages/revisittkt/List.vue'], resolve)
            },
            {
                path: ':patientid/add',
                name: 'revisittkt-add',
                component: resolve => require(['../pages/revisittkt/AddRevisitTkt.vue'], resolve)
            }
        ]
    },
    {
        path: '/paper',
        name: 'paper',
        component: EmptyTemplate,
        children: [
            {
                path: 'tpllist4onepatient',
                name: 'paper-tpllist4onepatient',
                component: resolve => require(['../pages/paper/PaperTplList.vue'], resolve)
            },
            {
                path: ':papertplid/list',
                name: 'paper-list',
                component: resolve => require(['../pages/paper/PaperList.vue'], resolve)
            },
            {
                path: ':paperid/one',
                name: 'paper-one',
                component: resolve => require(['../pages/paper/PaperOne.vue'], resolve)
            },
        ]
    },
    {
        path: '/revisitrecord',
        name: 'revisitrecord',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'revisitrecord-list',
                component: resolve => require(['../pages/revisitrecord/RevisitRecordList.vue'], resolve)
            },
        ]
    },
    {
        path: '/statistic',
        name: 'statistic',
        component: EmptyTemplate,
        children: [
            {
                path: 'statistic',
                name: 'statistic-statistic',
                component: resolve => require(['../pages/statistic/Statistic.vue'], resolve),
            }
        ]
    },
    {
        path: '/callorder',
        name: 'callorder',
        component: EmptyTemplate,
        children: [
            {
                path: 'missedcall',
                name: 'callorder-missedcall',
                component: resolve => require(['../pages/callorder/MissedCall.vue'], resolve)
            },
        ]
    },
    {
        path: '/workcalendar/',
        name: 'workcalendar',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'workcalendar-list',
                component: resolve => require(['../pages/workcalendar/List.vue'], resolve)
            },
            {
                path: 'listforpatient',
                name: 'workcalendar-listforpatient',
                component: resolve => require(['../pages/workcalendar/ListForPatient.vue'], resolve)
            },
            {
                path: 'edit',
                name: 'workcalendar-edit',
                component: resolve => require(['../pages/workcalendar/Edit.vue'], resolve)
            }
        ]
    },
    {
        path: '/weekrpt',
        name: 'weekrpt',
        component: resolve => require(['../pages/rpt/Week.vue'], resolve)
    },
    {
        path: '/doctortask',
        name: 'doctortask',
        component: DoctorTask,
        children: [
            {
                path: 'weektasklist',
                name: 'doctortask-weektasklist',
                component: resolve => require(['../pages/doctortask/WeekTaskList.vue'], resolve),
            },
            {
                path: 'faqs',
                name: 'doctortask-faqs',
                component: resolve => require(['../pages/doctortask/Faqs.vue'], resolve),
            },
            {
                path: 'train',
                name: 'doctortask-train',
                component: resolve => require(['../pages/doctortask/Train.vue'], resolve),
            },
            {
                path: 'pipepatients',
                name: 'doctortask-pipepatients',
                component: resolve => require(['../pages/doctortask/PipePatients.vue'], resolve),
            },
            {
                path: 'scale',
                name: 'doctortask-scale',
                component: resolve => require(['../pages/doctortask/Scale.vue'], resolve),
            }
        ]
    },
    {
        path: '/prescription',
        name: 'prescription',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'prescription-list',
                component: resolve => require(['../pages/prescription/List.vue'], resolve),
            },
            {
                path: 'one',
                name: 'prescription-one',
                component: resolve => require(['../pages/prescription/One.vue'], resolve),
            },
            {
                path: 'refuse',
                name: 'prescription-refuse',
                component: resolve => require(['../pages/prescription/Refuse.vue'], resolve),
            },
        ]
    },
    {
        path: '/shoporder',
        name: 'shoporder',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'shoporder-list',
                component: resolve => require(['../pages/shoporder/List.vue'], resolve)
            },
            {
                path: 'monthrpt',
                name: 'shoporder-monthrpt',
                component: resolve => require(['../pages/shoporder/MonthRpt.vue'], resolve)
            },
        ]
    },
    {
        path: '/drug',
        name: 'drug',
        component: EmptyTemplate,
        children: [
            {
                path: 'detail',
                name: 'drug-detail',
                component: resolve => require(['../pages/drug/Detail.vue'], resolve)
            },
        ]
    },
    {
        path: '/doctorshopproductref',
        name: 'doctorshopproductref',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'doctorshopproductref-list',
                component: resolve => require(['../pages/doctorshopproductref/List.vue'], resolve)
            },
        ]
    },
    {
        path: '/letter',
        name: 'letter',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'letter-list',
                component: resolve => require(['../pages/letter/LetterList.vue'], resolve)
            },
        ]
    },
    {
        path: '/error',
        name: 'error',
        component: resolve => require(['../pages/doctor/Error.vue'], resolve)
    },
    {
        path: '/',
        name: 'empty',
        // redirect: '/error',
        component: resolve => require(['../pages/doctor/Empty.vue'], resolve),
    },
    {
        path: '*',
        // redirect: '/error',
        redirect: to => {
            sessionStorage.setItem('_errorurl_', to.path);
            localStorage.setItem('_errorwxurl_', to.path);
            localStorage.setItem('_errorhref_', window.location.href);
            return '/error';
        }
    }
]
