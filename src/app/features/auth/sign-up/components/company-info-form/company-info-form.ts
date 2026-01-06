import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-company-info-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './company-info-form.html',
    styleUrl: './company-info-form.css',
})
export class CompanyInfoForm {
    @Output() formCompleted = new EventEmitter<any>();

    companyInfoFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.companyInfoFormGroup = this.formBuilder.group({
            companyName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]] // Example: 10-digit phone number
        });
    }

    onSubmit(): void {
        if (this.companyInfoFormGroup.valid) {
            this.formCompleted.emit(this.companyInfoFormGroup.value);
        } else {
            this.companyInfoFormGroup.markAllAsTouched();
        }
    }
}
