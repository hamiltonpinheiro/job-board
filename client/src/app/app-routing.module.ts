import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterPersonComponent } from './pages/register-person/register-person.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard, LoggedInAuthGuard } from './guards';
import { SearchComponent } from './pages/search/search.component';
import { PersonComponent } from './pages/person/person.component';
import { CompanyComponent } from './pages/company/company.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'person/:id', component: PersonComponent },
      { path: 'company/:id', component: CompanyComponent },
      { path: '404', component: PageNotFoundComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',
    canActivateChild: [LoggedInAuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-user', component: RegisterPersonComponent },
      { path: 'register-company', component: RegisterCompanyComponent },
    ],
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
