import { Component, Type } from '@angular/core';
import { MultiStepForm } from '../../../shared/components/multi-step-form/multi-step-form';
import { CompanyInfoForm } from './components/company-info-form/company-info-form';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [MultiStepForm, CommonModule],
    templateUrl: './sign-up.html',
    styleUrl: './sign-up.css',
})
export class SignUp {
    signUpStepsLabels: string[] = ["Company", "Sustainability", "Goals", "Contacts", "Account"];
    signUpStepsComponents: Type<any>[] = [CompanyInfoForm]; //todo Define the step components here and type them
    collectedFormData: { [key: string]: any } = {};

    handleStepData(data: any, stepIndex: number): void {
        // Assuming stepIndex corresponds to the order in signUpStepsComponents
        const stepName = this.signUpStepsLabels[stepIndex];
        this.collectedFormData[stepName] = data;
        console.log(`Data from step ${stepName}:`, 'Collected Form Data:', this.collectedFormData);
    }

    handleFormSubmit(): void {
        console.log('Final form submitted with data:', this.collectedFormData);
        // Here you would typically send the collectedFormData to a backend service
        alert('Account created successfully! Check console for data.');
    }
}
