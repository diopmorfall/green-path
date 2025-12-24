import { Routes } from '@angular/router';
import { LandingPage } from './components/landing/landing-page/landing-page';
import { SignUp } from './features/auth/signup/sign-up/sign-up';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'signup', component: SignUp },
];
