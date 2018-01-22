import Profile from '../components/profile/Index.vue'
import ProfileEdit from '../components/profile/Edit.vue'
import ChatList from '../components/chat/List.vue'
import ChatDetail from '../components/chat/Detail.vue'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import Match from '../components/Match.vue'
const routes = [
  {
    path: '/profile/index',
    name: 'profileLink',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/edit',
    name: 'profileEditLink',
    component: ProfileEdit,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat/list',
    name: 'chatListLink',
    component: ChatList,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat/detail',
    name: 'chatDetailLink',
    component: ChatDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'signInLink',
    component: Signin
  },
  {
    path: '/signup',
    name: 'signUpLink',
    component: Signup
  },
  {
    path: '/match',
    name: 'matchLink',
    component: Match
  },
  {
    path: '*',
    redirect: '/signin'
  }
];
export default routes
