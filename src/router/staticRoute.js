// import index from '../pages/index/index.vue'
const index = resolve => require.ensure([], () => resolve(require('../pages/index/index.vue')), 'index')
// import pageIndex from '../pages/inner/pageIndex/index.vue'
const pageIndex = resolve => require.ensure([], () => resolve(require('../pages/inner/pageIndex/index.vue')),'pageIndex')

// [ ====== carManager ====== ]
// import carManager from '../pages/inner/carManager/index.vue'
const carManager = resolve => require.ensure([],() => resolve(require('../pages/inner/carManager/index.vue')),'carManager')

// import carUseDetail from '../pages/inner/carUseDetail/index.vue'
const carUseDetail = resolve => require.ensure([],() => resolve(require('../pages/inner/carUseDetail/index.vue')),'carUseDetail')


// [ ====== incomingRank ====== ]
// import incomingRank from '../pages/inner/incomingRank/index.vue'
const incomingRank = resolve => require.ensure([],() => resolve(require('../pages/inner/incomingRank/index.vue')),'incomingRank')

// import queryCharts from '../pages/inner/queryCharts/index.vue'
const queryCharts = resolve => require.ensure([],() => resolve(require('../pages/inner/queryCharts/index.vue')),'queryCharts')

// import queryLists from '../pages/inner/queryLists/index.vue'
const queryLists = resolve => require.ensure([],() => resolve(require('../pages/inner/queryLists/index.vue')),'queryLists')


// import incomingDetail from '../pages/inner/incomingDetail/index.vue'
const incomingDetail = resolve => require.ensure([],() => resolve(require('../pages/inner/incomingDetail/index.vue')),'incomingDetail')

// import allDaysData from '../pages/inner/alldaysData/index.vue'
const allDaysData = resolve => require.ensure([],() => resolve(require('../pages/inner/alldaysData/index.vue')),'allDaysData')

// import hotMap from '../pages/inner/hotMap/index.vue'
// import abnormalData from '../pages/inner/abnormalData/index.vue'
const abnormalData = resolve => require.ensure([],() => resolve(require('../pages/inner/abnormalData/index.vue')),'abnormalData')


// [ ====== partnerManager ====== ]
// import partnerManager from '../pages/inner/partnerManager/index.vue'
const partnerManager = resolve => require.ensure([],() => resolve(require('../pages/inner/partnerManager/index.vue')),'partnerManager')

// import addpartner from '../pages/inner/partnerManager/addpartner.vue'
const addpartner = resolve => require.ensure([],() => resolve(require('../pages/inner/partnerManager/addpartner.vue')),'addpartner')

// import updatepartner from '../pages/inner/partnerManager/updatepartner.vue'
const updatepartner = resolve => require.ensure([],() => resolve(require('../pages/inner/partnerManager/updatepartner.vue')),'updatepartner')

// import partnerDetail from '../pages/inner/partnerDetail/index.vue'
const partnerDetail = resolve => require.ensure([],() => resolve(require('../pages/inner/partnerDetail/index.vue')),'partnerDetail')

// import vehicleDistribution from '../pages/inner/partnerManager/vehicleDistribution.vue'
const vehicleDistribution = resolve => require.ensure([],() => resolve(require('../pages/inner/partnerManager/vehicleDistribution.vue')),'vehicleDistribution')

// import earningsDetail from '../pages/inner/earningsDetail/index.vue'
const earningsDetail = resolve => require.ensure([],() => resolve(require('../pages/inner/earningsDetail/index.vue')),'earningsDetail')


// [ ====== settlementRecord ====== ]
// import settlementRecord from '../pages/inner/settlementRecord/index.vue'
const settlementRecord = resolve => require.ensure([],() => resolve(require('../pages/inner/settlementRecord/index.vue')),'settlementRecord')

// import applyaccount from '../pages/inner/settlementRecord/applyaccount.vue'
const applyaccount = resolve => require.ensure([],() => resolve(require('../pages/inner/settlementRecord/applyaccount.vue')),'applyaccount')

// import applysubmitted from '../pages/inner/settlementRecord/applysubmitted.vue'
const applysubmitted = resolve => require.ensure([],() => resolve(require('../pages/inner/settlementRecord/applysubmitted.vue')),'applysubmitted')


// [ ====== accountManager ====== ]
// import accountManager from '../pages/inner/accountManager/index.vue'
const accountManager = resolve => require.ensure([],() => resolve(require('../pages/inner/accountManager/index.vue')),'accountManager')

// import addaccount from '../pages/inner/accountManager/addaccount.vue'
const addaccount = resolve => require.ensure([],() => resolve(require('../pages/inner/accountManager/addaccount.vue')),'addaccount')

// import addaccount2 from '../pages/inner/accountManager/addaccount2.vue'
const addaccount2 = resolve => require.ensure([],() => resolve(require('../pages/inner/accountManager/addaccount2.vue')),'addaccount2')


// [ ====== memberCenter ====== ]
// import memberCenter from '../pages/inner/memberCenter/index.vue'
const memberCenter = resolve => require.ensure([],() => resolve(require('../pages/inner/memberCenter/index.vue')),'memberCenter')

// import bindEamil from '../pages/inner/memberCenter/bindEamil.vue'
const bindEamil = resolve => require.ensure([],() => resolve(require('../pages/inner/memberCenter/bindEamil.vue')),'bindEamil')

// import updateEmail from '../pages/inner/memberCenter/updateEmail.vue'
const updateEmail = resolve => require.ensure([],() => resolve(require('../pages/inner/memberCenter/updateEmail.vue')),'updateEmail')

// import bindTel from '../pages/inner/memberCenter/bindTel.vue'
const bindTel = resolve => require.ensure([],() => resolve(require('../pages/inner/memberCenter/bindTel.vue')),'bindTel')

// import updateTel from '../pages/inner/memberCenter/updateTel.vue'
const updateTel = resolve => require.ensure([],() => resolve(require('../pages/inner/memberCenter/updateTel.vue')),'updateTel')

// import amendPassword from '../pages/inner/memberCenter/amendPassword.vue'
const amendPassword = resolve => require.ensure([],() => resolve(require('../pages/inner/memberCenter/amendPassword.vue')),'amendPassword')



// [ ====== roleManager ====== ]
// import roleManager from '../pages/inner/roleManager/index.vue'
const roleManager = resolve => require.ensure([],() => resolve(require('../pages/inner/roleManager/index.vue')),'roleManager')

// import addrole from '../pages/inner/roleManager/addrole.vue'
const addrole = resolve => require.ensure([],() => resolve(require('../pages/inner/roleManager/addrole.vue')),'addrole')

// import messageCenter from '../pages/inner/messageCenter/index.vue'
const messageCenter = resolve => require.ensure([],() => resolve(require('../pages/inner/messageCenter/index.vue')),'messageCenter')


// [ ====== logManager ====== ]
// import logManager from '../pages/inner/logManager/index.vue'
const logManager = resolve => require.ensure([],() => resolve(require('../pages/inner/logManager/index.vue')),'logManager')

// import loginlog from '../pages/inner/logManager/loginlog.vue'
const loginlog = resolve => require.ensure([],() => resolve(require('../pages/inner/logManager/loginlog.vue')),'loginlog')

// import operationLog from '../pages/inner/logManager/operationLog.vue'
const operationLog = resolve => require.ensure([],() => resolve(require('../pages/inner/logManager/operationLog.vue')),'operationLog')


// [ ====== settlementManager ====== ]
// import settlementManager from '../pages/inner/settlementManage/index.vue'
const settlementManager = resolve => require.ensure([],() => resolve(require('../pages/inner/settlementManage/index.vue')),'settlementManager')

// import settlementRecordDetail from '../pages/inner/settlementManage/settlementRecordDetail.vue'
const settlementRecordDetail = resolve => require.ensure([],() => resolve(require('../pages/inner/settlementManage/settlementRecordDetail.vue')),'settlementRecordDetail')



let staticRoutes = [
  {
    path: '/',
    component: index,
    children: [
      {
        path: '/system/office',
        name: '首页',
        component: pageIndex,
        auth: 10
      },
      {
        path: '/index/partnerManager',
        name: '合伙人管理',
        component: partnerManager,
        auth: 20,
        children: [{
          path: '/index/partnerManager/addpartner',
          name: '添加合伙人',
          component: addpartner
        },
        {
          path: '/index/partnerManager/updatepartner',
          name: '编辑合伙人',
          component: updatepartner
        }]
      },
      {
        path: '/index/carManager',
        name: '车辆管理',
        component: carManager,
        auth: 30
      },
      {
        path: '/index/earningsDetail',
        name: '收益明细',
        component: earningsDetail,
        auth: 40
      },
      {
        path: '/index/incomingRank',
        component: incomingRank,
        auth: 50,
        children: [
          {
            path: '/',
            name: '查看列表',
            component: queryLists
          },
          {
            path: '/index/incomingRank/queryCharts',
            name: '查看统计图',
            component: queryCharts
          }
        ]
      },
      // {
      //   path: '/index/allDaysData',
      //   name: '24小时数据走势',
      //   component: allDaysData
      // },
      // {
      //   path: '/index/hotMap',
      //   name: '热力图',
      //   component: hotMap
      // },
      // {
      //   path: '/index/abnormalData',
      //   name: '异常数据',
      //   component: abnormalData
      // },
      {
        path: '/index/settlementManager',
        name: '结算管理',
        hidden: false,
        component: settlementManager,
        auth: 60
      },
      {
        path: '/index/memberCenter',
        name: '个人中心',
        auth: 70,
        component: memberCenter,
        children: [{
            path: '/index/memberCenter/bindEamil',
            name: '绑定邮箱',
            component: bindEamil
        }, 
        {
            path: '/index/memberCenter/updateEmail',
            name: '修改邮箱',
            component: updateEmail
        },
        {
            path: '/index/memberCenter/bindTel',
            name: '绑定手机号',
            component: bindTel
        }, 
        {
            path: '/index/memberCenter/updateTel',
            name: '修改手机号',
            component: updateTel
        }, 
        {
            path: '/index/memberCenter/amendPassword',
            name: '修改密码',
            component: amendPassword
        }]
      },
      {
        path: '/index/accountManager',
        name: '账号管理',
        auth: 80,
        component: accountManager,
        children: [{
          path: '/index/accountManager/addaccount',
          name: '添加平台账号',
          component: addaccount
        }, {
          path: '/index/accountManager/addaccount2',
          name: '添加加盟商账号',
          component: addaccount2
        }]
      },
      {
        path: '/index/roleManager',
        auth: 90,
        name: '角色管理',
        component: roleManager,
        children: [{
          path: '/index/roleManager/addrole',
          name: '添加角色',
          component: addrole
        }]
      },
      {
        path: '/index/earningsDetail',
        name: '收入明细',
        component: earningsDetail,
        auth: 40
      },
    //   {
    //     path: '/index/settlementRecord',
    //     name: '结算记录',
    //     component: settlementRecord
    //   },
    //   {
    //     path: '/index/applyaccount',
    //     name: '申请结算(单月待结算)',
    //     component: applyaccount
    //   },
    //   {
    //     path: '/index/applysubmitted',
    //     name: '申请结算(结算状态)',
    //     component: applysubmitted
    //   },
    //   {
    //     path: '/index/messageCenter',
    //     name: '信息中心',
    //     component: messageCenter
    //   },
      // {
      //   path: '/index/logManager',
      //   name: '',
      //   component: logManager,
      //   children: [
      //     {
      //       path: '',
      //       name: '登录日志',
      //       component: loginlog
      //     },
      //     {
      //       path: '/index/logManager/operationLog',
      //       name: '操作日志',
      //       component: operationLog
      //     }
      //   ]
      // }
    ]
  },
  {
      auth: 30,
      path: '/carUseDetail',
      name: '车辆明细',
      component: carUseDetail
  },
  {
    auth: 30,
    path: '/index/vehicleDistribution/:id',
    name: '车辆分配',
    component: vehicleDistribution
  },
  {
    auth: 20,
    path: '/index/partnerDetail/:id',
    name: '加盟商明细',
    component: partnerDetail
  },
  {
    path: '/index/settlementRecord/detail',
    name: '结算记录明细',
    auth: 60,
    component: settlementRecordDetail
  }
]
export default staticRoutes;
