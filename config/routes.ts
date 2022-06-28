export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        component: '@/pages/user/layout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/Register',
          },
        ],
      },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '用户列表', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  { name: '项目列表', icon: 'SnippetsOutlined', path: '/project', component: './ProjectList' },
  { name: '论文列表', icon: 'FormOutlined', path: '/paper', component: './PaperList' },
  { name: '专利列表', icon: 'AuditOutlined', path: '/patent', component: './PatentList' },
  { name: '获奖列表', icon: 'TrophyOutlined', path: '/award', component: './AwardList' },
  { name: '会议列表', icon: 'TeamOutlined', path: '/meeting', component: './MeetingList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
