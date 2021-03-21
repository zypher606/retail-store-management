import { Router } from '@material-ui/icons';
import {
  ProductStoreScreen,
  SalesScreen,
} from '../screens';

export const Routes = {
  DEFAULT: '/',
  SALES_SCREEN: '/sales',
  LOGIN: '/login',
  REGISTER: '/register',
  MAILBOX: '/mailbox',
  MAILBOX_THREAD: (thread_id: string) => `/mailbox/thread/${thread_id}`,
}

export interface IRoute {
  path: string;
  component: any;
  isProtected: boolean;
}

export const RouteMappings: IRoute[] = [
  {
    path: Routes.DEFAULT,
    component: ProductStoreScreen,
    isProtected: false,
  },
  {
    path: Routes.SALES_SCREEN,
    component: SalesScreen,
    isProtected: false,
  },
  // {
  //   path: Routes.REGISTER,
  //   component: RegisterScreen,
  //   isProtected: false,
  // },
  // {
  //   path: Routes.MAILBOX,
  //   component: MailboxScreen,
  //   isProtected: true,
  // },
  // {
  //   path: Routes.MAILBOX_THREAD(":thread_id"),
  //   component: MailThreadScreen,
  //   isProtected: true,
  // },
]