import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '@/components/FirstPage'
import Home from '@/components/Home'
//五个主页面
import NoticePage from '@/components/NoticePage'
import NewsPage from '@/components/NewsPage'
import PicPage from '@/components/PicPage'
import DocPage from '@/components/DocPage'
import ManagePage from '@/components/ManagePage'
import MemberPage from '@/components/MemberPage'

import PicDetail from '@/components/PicDetail'
import NewsDetail from '@/components/NewsDetail'
//管理员页下属
import NewNews from'@/components/manager/NewNews'
import NewNotice from'@/components/manager/NewNotice'
import NewPic from'@/components/manager/NewPic'
import NewDoc from'@/components/manager/NewDoc'

import ManNotice from'@/components/manager/ManNotice'
import ManNews from'@/components/manager/ManNews'
import ManPic from'@/components/manager/ManPic'
import ManDoc from'@/components/manager/ManDoc'

import User from'@/components/manager/User'
import UserLevel from'@/components/manager/UserLevel'
import UserProject from'@/components/manager/UserProject'
import UserReg from'@/components/manager/UserReg'
//无用
// import Maincourse from '@/components/MainCourse'
// import Coursedetail from '@/components/CourseDetail'
Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   component: Login,
    // },
    {
      // path: '/home/:username',
      path: '/',    
      component: Home,
      children: [
        {
          path: '/',
          component: FirstPage,
        },
        {
          path: 'noticepage',
          component: NoticePage,
        },
        { 
          path: 'newspage',
          component: NewsPage,
        },
        {
          path: 'picpage',
          component: PicPage,
        },
        {
          path: 'docpage',
          component: DocPage,
        },
        { 
          path: 'memberpage',
          component: MemberPage,
        },
        { 
          path: 'newsdetail',
          component: NewsDetail,
        },
        { 
          path: 'picdetail',
          component: PicDetail,
        },
        {
          path: ':username/managepage',
          component: ManagePage,
          children: [
            {
              path: 'newnotice',
              component: NewNotice,
            },
            {
              path: 'newnews',
              component: NewNews,
            },
            {
              path: 'newdoc',
              component: NewDoc,
            },
            {
              path: 'newpic',
              component: NewPic,
            },
            {
              path: 'mannotice',
              component: ManNotice,
            },
            {
              path: 'mannews',
              component: ManNews,
            },
            {
              path: 'mandoc',
              component: ManDoc,
            },
            {
              path: 'manpic',
              component: ManPic,
            },
            {
              path: 'user',
              component: User,
            },
            {
              path: 'userlevel',
              component: UserLevel,
            },
            {
              path: 'userproject',
              component: UserProject,
            },
            {
              path: 'userreg',
              component: UserReg,
            },
          ]
        },
      ]
    }
  ]
})



