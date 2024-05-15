import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './forum/pages/home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ErrorComponent } from './forum/pages/error/error.component';
import { SignInComponent } from './users/pages/sign-in/sign-in.component';
import { SignUpComponent } from './users/pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommunitiesComponent } from './forum/pages/communities/communities.component';
import { SignUp2Component } from './users/pages/sign-up2/sign-up2.component';
import { PostComponent } from './forum/pages/post/post.component';
import { ProfileComponent } from './users/pages/profile/profile.component';
import { RecoveryPasswordComponent } from './users/pages/recovery-password/recovery-password.component';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './forum/pages/search/search.component';
import { SubmitComponent } from './forum/pages/submit/submit.component';
import { TopicComponent } from './forum/pages/topic/topic.component';
import { CreateTopicComponent } from './forum/pages/create-topic/create-topic.component';
import { MatRadioModule } from '@angular/material/radio';
import { ExploreComponent } from './forum/pages/explore/explore.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    SignInComponent,
    SignUpComponent,
    CommunitiesComponent,
    SignUp2Component,
    PostComponent,
    ProfileComponent,
    RecoveryPasswordComponent,
    SearchComponent,
    SubmitComponent,
    TopicComponent,
    CreateTopicComponent,
    ExploreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,

    HttpClientModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
