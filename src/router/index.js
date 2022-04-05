import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed'
import YourFeed from '@/views/YourFeed'
import TagFeed from '@/views/TagFeed'
import Article from '@/views/Article'
import Register from '@/views/auth/Register'
import Login from '@/views/auth/Login'
import CreateArticle from '@/views/CreateArticle'
import EditArticle from '@/views/EditArticle'
import Settings from "@/views/Settings"
import UserProfile from "@/views/UserProfile"


const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed
  },
  {
    path: '/tag/:slug',
    name: 'tag',
    component: TagFeed
  },
  {
    path: '/article/new',
    name: 'createArticle',
    component: CreateArticle
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: Article
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: EditArticle
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: UserProfile
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'profileFavorites',
    component: UserProfile
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
