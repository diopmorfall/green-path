import { Component } from '@angular/core';

import { MultiStepForm } from '../../../shared/components/multi-step-form/multi-step-form';

@Component({
    selector: 'app-sign-up',
    imports: [MultiStepForm],
    templateUrl: './sign-up.html',
    styleUrl: './sign-up.css',
})
export class SignUp {
    signUpStepsLabels: string[] = ["Company", "Sustainability", "Goals", "Contacts"];}
