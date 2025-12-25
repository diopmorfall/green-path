import { Routes } from '@angular/router';
import { LandingPage } from './components/landing/landing-page';
import { SignUp } from './features/auth/sign-up/sign-up';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'signup', component: SignUp },
];
