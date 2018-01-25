import Login from './components/Login.vue'
import NotFound from './components/404.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
// import echarts from './components/charts/echarts.vue'

import OverviewData from './components/nav1/OverviewData.vue'
import TeamData from './components/nav1/TeamData.vue'
import PersonData from './components/nav1/PersonData.vue'
import ProfitData from './components/nav1/ProfitData.vue'


import NewActive from './components/nav2/NewActive.vue'
import ActiveList from './components/nav2/ActiveList.vue'

import NewShop from './components/nav3/NewShop.vue'
import ShopList from './components/nav3/ShopList.vue'
import ProjectList from './components/nav3/ProjectList.vue'

import OrderList from './components/nav4/OrderList.vue'
import OrderDetail from './components/nav4/OrderDetail.vue'
import OrderDetail_copy from './components/nav4/OrderDetail_copy.vue'
import OrderLog from './components/nav4/OrderLog.vue'

import UserInfo from './components/nav5/UserInfo.vue'
import UserManage from './components/nav5/UserManage.vue'

import NewUser from './components/nav5/NewUser.vue'
import UserEdit from './components/nav5/UserEdit.vue'
import ActiveEdit from './components/nav2/ActiveEdit.vue'
import ShopDetail from './components/nav3/ShopDetail.vue'
import PersonData_activity from './components/nav1/PersonData_activity.vue'
import PersonData_activity_detail from './components/nav1/PersonData_activity_detail.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '主页',
        iconCls: 'fa fa-home',//图标样式class
        leaf: true,//只有一个节点,不展开
        children: [
            { path: '/main', component: Main, name: '主页'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据分析',
        iconCls: 'fa fa-line-chart',//图标样式class
        children: [
            { path: '/OverviewData', component: OverviewData, name: '数据概览' },
            { path: '/TeamData', component: TeamData, name: '团队数据' },
            { path: '/PersonData', component: PersonData, name: '个人数据' },
            { path: '/ProfitData', component: ProfitData, name: '收益数据' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '活动数据',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/NewActive', component: NewActive, name: '新建活动' },
            { path: '/ActiveList', component: ActiveList, name: '活动列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '店铺管理',
        iconCls: 'fa fa-credit-card-alt',
        children: [
            { path: '/NewShop', component: NewShop, name: '新增店铺' },
            { path: '/ShopList', component: ShopList, name: '店铺列表' },
            { path: '/ProjectList', component: ProjectList, name: '项目列表' },
        ]
    },
    {
      path: '/',
      component: Home,
      name: '订单管理',
      iconCls: 'fa fa-file-text',
      children: [
        { path: '/OrderList', component: OrderList, name: ' 订单列表' },
        { path: '/OrderLog', component: OrderLog, name: ' 订单导入' },
      ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-gear',
        children: [
            { path: '/UserInfo', component: UserInfo, name: '个人信息' },
            { path: '/UserManage',component: UserManage,name: '用户管理'}
        ]
    },
      {
        path: '/',
        component: Home,
        name: '系统管理',
        hidden: true,
        children: [
          {path:'/NewUser',component: NewUser,name: '新建用户'}
        ]
      },
    {
      path: '/',
      component: Home,
      name: '系统管理',
      hidden: true,
      children: [
        {path:'/UserEdit',component: UserEdit,name: '用户编辑'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '活动数据',
      hidden: true,
      children: [
        {path:'/ActiveEdit',component: ActiveEdit,name: '活动修改'}
      ]
    },
  {
    path: '/',
    component: Home,
    name: '店铺管理',
    hidden: true,
    children: [
      {path:'/ShopDetail',component: ShopDetail,name: '店铺详情'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '数据分析',
    hidden: true,
    children: [
      {path:'/PersonData_activity',component: PersonData_activity,name: '个人活动'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '数据分析',
    hidden: true,
    children: [
      {path:'/PersonData_activity_detail',component: PersonData_activity_detail,name: '个人活动详情'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '订单管理',
    hidden: true,
    children: [
      {path:'/OrderDetail',component: OrderDetail,name: '订单详情'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '订单管理',
    hidden: true,
    children: [
      {path:'/OrderDetail_copy',component: OrderDetail_copy,name: '订单详情'}
    ]
  },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点,不展开
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
];

export default routes;
