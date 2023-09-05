import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './forum/pages/home/home.component';
import { ErrorComponent } from './forum/pages/error/error.component';
import { FeaturesComponent } from './forum/pages/features/features.component';
import { SignInComponent } from './users/pages/sign-in/sign-in.component';
import { SignUpComponent } from './users/pages/sign-up/sign-up.component';
import { CommunitiesComponent } from './forum/pages/communities/communities.component';
import { SignUp2Component } from './users/pages/sign-up2/sign-up2.component';
import { ProfileComponent } from './users/pages/profile/profile.component';
import { RecoveryPasswordComponent } from './users/pages/recovery-password/recovery-password.component';
import { PostComponent } from './forum/pages/post/post.component';
import { SearchComponent } from './forum/pages/search/search.component';
import { SubmitComponent } from './forum/pages/submit/submit.component';
import { CreateTopicComponent } from './forum/pages/create-topic/create-topic.component';
import { TopicComponent } from './forum/pages/topic/topic.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:param',
    component: SearchComponent
  },
  {
    path: 'explore',
    component: FeaturesComponent
  },
  {
    path: 't/:name',
    component: TopicComponent
  },
  {
    path: 'submit',
    component: SubmitComponent
  },
  {
    path: 't/:name/:id',
    component: PostComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-up-2',
    component: SignUp2Component
  },
  {
    path: 'u/:username',
    component: ProfileComponent
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent
  },
  {
    path: 'topic',
    component: TopicComponent
  },
  {
    path: 'create-topic',
    component: CreateTopicComponent
  },
  {
    path: 'communities',
    component: CommunitiesComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
