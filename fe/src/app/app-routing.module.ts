import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {LoginPageComponent} from './page/login-page/login.page';
import {LoginLayoutComponent} from './layout/login-layout/login.layout';
import {RegisterPageComponent} from './page/register-page/register.page';
import {GenLayoutComponent} from './layout/gen-layout/gen.layout';
import {FileNotFoundPageComponent} from './page/file-not-found-page/file-not-found.page';
import {ProfilePageComponent} from './page/profile-page/profile.page';
import {SettingsPageComponent} from './page/settings-page/settings.page';
import {BulkEditPageComponent} from './page/bulk-edit-page/bulk-edit.page';
import {HelpCenterPageComponent} from './page/help-center-page/help-center.page';
import {ProfileHelpPageComponent} from './page/profile-help-page/profile-help.page';
import {UserHelpPageComponent} from './page/user-help-page/user-help.page';
import {ViewHelpPageComponent} from './page/view-help-page/view-help.page';
import {SettingsHelpPageComponent} from './page/settings-help-page/settings-help.page';
import {BulkEditHelpPageComponent} from './page/bulk-edit-help-page/bulk-edit-help.page';
import {HelpCenterHelpPageComponent} from './page/help-center-help-page/help-center-help.page';
import {ImportHelpPageComponent} from './page/import-help-page/import-help.page';
import {ImportPageComponent} from './page/import-page/import.page';
import {UserRolePageComponent} from './page/user-role-page/user-role.page';
import {UserGroupPageComponent} from './page/user-group-page/user-group.page';
import {UserPeoplePageComponent} from './page/user-people-page/user-people.page';
import {UserLayoutComponent} from './layout/user-gen-layout/user-gen.layout';
import {HelpCenterLayoutComponent} from './layout/help-center-gen-layout/help-center-gen.layout';
import {ImportExportLayoutComponent} from './layout/import-export-gen-layout/import-export-gen.layout';
import {ViewLayoutComponent} from './layout/view-gen-layout/view-gen.layout';
import {PricingPageComponent} from './page/pricing-page/pricing.page';
import {PricingHelpPageComponent} from './page/pricing-help-page/pricing-help.page';
import {DashboardLayoutComponent} from './layout/dashboard-layout/dashboard.layout';
import {DashboardPageComponent} from './page/dashboard-page/dashboard.page';
import {ViewRulesPageComponent} from './page/view-rules-page/view-rules.page';
import {ViewAttributesPageComponent} from './page/view-attributes-page/view-attributes.page';
import {ViewDataTabularPageComponent} from './page/view-data-tabular-page/view-data-tabular.page';
import {ViewDataThumbnailPageComponent} from './page/view-data-thumbnail-page/view-data-thumbnail.page';
import {ViewDataListPageComponent} from './page/view-data-list-page/view-data-list.page';
import {ViewViewsPageComponent} from './page/view-views-page/view-views.page';
import {AuthGuard} from './guard/auth-guard/auth.guard';
import {ErrorPageComponent} from './page/error-page/error.page';
import {JobsPageComponent} from './page/jobs-page/jobs.page';
import {JobsHelpPageComponent} from './page/jobs-help-page/jobs-help.page';
import {ExportPageComponent} from './page/export-page/export.page';
import {ExportHelpPageComponent} from './page/export-help-page/export-help.page';
import {ForumPageComponent} from './page/forum-page/forum.page';
import {ForumHelpPageComponent} from './page/forum-help-page/forum-help.page';
import {AllForumsPageComponent} from './page/forum-page/all-forums.page';
import {AllTopicsInForumPageComponent} from './page/forum-page/all-topics-in-forum.page';
import {AllPostsInTopicPageComponent} from './page/forum-page/all-posts-in-topic.page';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard-layout/dashboard',
  },

  // login-layout
 {
   path: 'login-layout',
   component: LoginLayoutComponent,
   children: [
     {
       path: 'login',
       component: LoginPageComponent,
     } as Route,
     {
       path: 'register',
       component: RegisterPageComponent,
     } as Route
   ]
 } as Route,



  // dashboard-layout
  {
    path: 'dashboard-layout',
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    data: {
      sideNav: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardPageComponent,
      }
    ]
  } as Route,


  // user-gen-layout
 {
   path: 'user-gen-layout',
   component: UserLayoutComponent,
   canActivate: [AuthGuard],
   data: {
     sideNav: 'user'
   },
   children: [
     {
       path: 'role',
       canActivate: [AuthGuard],
       component: UserRolePageComponent,
       data: {
         subSideNav: 'role'
       }
     } as Route,
     {
       path: 'group',
       canActivate: [AuthGuard],
       component: UserGroupPageComponent,
       data: {
         subSideNav: 'group'
       }
     } as Route,
     {
       path: 'people',
       canActivate: [AuthGuard],
       component: UserPeoplePageComponent,
       data: {
         subSideNav: 'people'
       }
     } as Route,
     {
       path: 'user-help',
       canActivate: [AuthGuard],
       component: UserHelpPageComponent,
       outlet: 'help'
     } as Route,
   ]
 } as Route,


  // help-center-gen-layout
  {
    path: 'help-center-gen-layout',
    canActivate: [AuthGuard],
    component: HelpCenterLayoutComponent,
    data: {
      sideNav: 'help-center'
    },
    children: [
      {
        path: 'help-center',
        canActivate: [AuthGuard],
        component: HelpCenterPageComponent,
        data: {
          subSideNav: 'help-center'
        }
      },
      {
        path: 'help-center-help',
        canActivate: [AuthGuard],
        component: HelpCenterHelpPageComponent,
        outlet: 'help'
      } as Route,

      {
        path: 'forum',
        canActivate: [AuthGuard],
        component: ForumPageComponent,
        data: {
          subSideNav: 'forum'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            canActivate: [AuthGuard],
            component: AllForumsPageComponent,
          } as Route,
          {
            path: ':forumId',
            pathMatch: 'full',
            canActivate: [AuthGuard],
            component: AllTopicsInForumPageComponent,
          } as Route,
          {
            path: ':forumId/topic/:topicId',
            pathMatch: 'full',
            canActivate: [AuthGuard],
            component: AllPostsInTopicPageComponent,
          } as Route,
        ]
      } as Route,
      {
        path: 'forum-help',
        canActivate: [AuthGuard],
        component: ForumHelpPageComponent,
        outlet: 'help'
      } as Route
    ]
  },


  // import-export layout
  {
    path: 'import-export-gen-layout',
    canActivate: [AuthGuard],
    component: ImportExportLayoutComponent,
    data: {
      sideNav: 'import-export'
    },
    children: [
      {
        path: 'import',
        canActivate: [AuthGuard],
        component: ImportPageComponent,
        data: {
          subSideNav: 'import'
        }
      } as Route,
      {
        path: 'import-help',
        canActivate: [AuthGuard],
        component: ImportHelpPageComponent,
        outlet: 'help'
      } as Route,
      {
        path: 'export',
        canActivate: [AuthGuard],
        component: ExportPageComponent,
        data: {
          subSideNav: 'export'
        }
      } as Route,
      {
        path: 'export-help',
        canActivate: [AuthGuard],
        component: ExportHelpPageComponent,
        outlet: 'help'
      } as Route,
    ]
  } as Route,


  // view-gen-layout
  {
    path: 'view-gen-layout',
    canActivate: [AuthGuard],
    component: ViewLayoutComponent,
    data: {
      sideNav: 'view'
    },
    children: [
      {
        path: 'rules',
        canActivate: [AuthGuard],
        component: ViewRulesPageComponent,
        data: {
          subSideNav: 'rules'
        }
      } as Route,
      {
        path: 'attributes',
        canActivate: [AuthGuard],
        component: ViewAttributesPageComponent,
        data: {
          subSideNav: 'attributes'
        }
      } as Route,
      {
        path: 'data-tabular',
        canActivate: [AuthGuard],
        component: ViewDataTabularPageComponent,
        data: {
          subSideNav: 'data-tabular'
        }
      } as Route,
      {
        path: 'data-thumbnail',
        canActivate: [AuthGuard],
        component: ViewDataThumbnailPageComponent,
        data: {
          subSideNav: 'data-thumbnail'
        }
      } as Route,
      {
        path: 'data-list',
        canActivate: [AuthGuard],
        component: ViewDataListPageComponent,
        data: {
          subSideNav: 'data-list'
        }
      } as Route,
      {
        path: 'views',
        canActivate: [AuthGuard],
        component: ViewViewsPageComponent,
        data: {
          subSideNav: 'views'
        }
      } as Route,
      {
        path: 'view-help',
        canActivate: [AuthGuard],
        component: ViewHelpPageComponent,
        outlet: 'help'
      } as Route,
    ]
  } as Route,


  // gen-layout
 {
   path: 'gen-layout',
   canActivate: [AuthGuard],
   component: GenLayoutComponent,
   children: [
     // profile
     {
       path: 'profile',
       canActivate: [AuthGuard],
       component: ProfilePageComponent,
       data: {
         sideNav: 'profile'
       }
     } as Route,
     {
       path: 'profile-help',
       canActivate: [AuthGuard],
       component: ProfileHelpPageComponent,
       outlet: 'help'
     } as Route,


     // settings
     {
       path: 'settings',
       canActivate: [AuthGuard],
       component: SettingsPageComponent,
       data: {
         sideNav: 'settings'
       }
     } as Route,
     {
       path: 'settings-help',
       canActivate: [AuthGuard],
       component: SettingsHelpPageComponent,
       outlet: 'help'
     } as Route,

     // bulk-edit
     {
       path: 'bulk-edit',
       canActivate: [AuthGuard],
       component: BulkEditPageComponent,
       data: {
         sideNav: 'bulk-edit'
       }
     } as Route,
     {
       path: 'bulk-edit-help',
       canActivate: [AuthGuard],
       component: BulkEditHelpPageComponent,
       outlet: 'help'
     } as Route,

     // jobs
     {
       path: 'jobs',
       canActivate: [AuthGuard],
       component: JobsPageComponent,
       data: {
         sideNav: 'jobs',
       } as Route
     },
     {
       path: 'jobs-help',
       canActivate: [AuthGuard],
       component: JobsHelpPageComponent,
       outlet: 'help',
     } as Route,


     // pricing
     {
       path: 'pricing-structure',
       canActivate: [AuthGuard],
       component: PricingPageComponent,
       data: {
         sideNav: 'pricing'
       }
     } as Route,
     {
       path: 'pricing-help',
       canActivate: [AuthGuard],
       component: PricingHelpPageComponent,
       outlet: 'help'
     }
   ]
 } as Route,
  {
    path: 'error',
   component: ErrorPageComponent
 } as Route,
 {
   path: '**',
   component: FileNotFoundPageComponent
 } as Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
