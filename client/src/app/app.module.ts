import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterPersonComponent } from './pages/register-person/register-person.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MainCardComponent } from './components/main-card/main-card.component';
import { MessagesModule } from 'primeng/messages';
import { StoreModule } from '@ngrx/store';
import { AppState } from './state/app.state';
import { authReducer } from './state/auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ControlErrorMessageComponent } from './components/control-error-message/control-error-message.component';
import { MenubarModule } from 'primeng/menubar';
import { SearchComponent } from './pages/search/search.component';
import { PersonComponent } from './pages/person/person.component';
import { CompanyComponent } from './pages/company/company.component';
import { personReducer } from './state/person/person.reducer';
import { GLOBAL_MSG_SERVICE_KEY } from './services/notification.service';
import { PersonEffects } from './state/person/person.effects';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ChipModule } from 'primeng/chip';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterPersonComponent,
    RegisterCompanyComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    MainCardComponent,
    ControlErrorMessageComponent,
    SearchComponent,
    PersonComponent,
    CompanyComponent,
    ListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    RatingModule,
    BrowserAnimationsModule,
    CheckboxModule,
    ButtonModule,
    MessagesModule,
    StoreModule.forRoot<AppState>({ auth: authReducer, person: personReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AuthEffects, PersonEffects]),
    HttpClientModule,
    ToastModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    DropdownModule,
    MenubarModule,
    ChipModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: GLOBAL_MSG_SERVICE_KEY, useValue: 'globalToast' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
