import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-company-info-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    templateUrl: './company-info-form.html',
    styleUrls: ['./company-info-form.css'],
})
export class CompanyInfoForm {
    @Output() formCompleted = new EventEmitter<any>(); //! change this with a proper interface

    companyInfoFormGroup: FormGroup;
    EU_VAT_REGEX = new RegExp('^(ATU[0-9]{8}|BE[01][0-9]{9}|BG[0-9]{9,10}|HR[0-9]{11}|CY[A-Z0-9]{9}|CZ[0-9]{8,10}|DK[0-9]{8}|EE[0-9]{9}|FI[0-9]{8}|FR[0-9A-Z]{2}[0-9]{9}|DE[0-9]{9}|EL[0-9]{9}|HU[0-9]{8}|IE([0-9]{7}[A-Z]{1,2}|[0-9][A-Z][0-9]{5}[A-Z])|IT[0-9]{11}|LV[0-9]{11}|LT([0-9]{9}|[0-9]{12})|LU[0-9]{8}|MT[0-9]{8}|NL[0-9]{9}B[0-9]{2}|PL[0-9]{10}|PT[0-9]{9}|RO[0-9]{2,10}|SK[0-9]{10}|SI[0-9]{8}|ES[A-Z]([0-9]{8}|[0-9]{7}[A-Z])|SE[0-9]{12}|GB([0-9]{9}|[0-9]{12}|GD[0-4][0-9]{2}|HA[5-9][0-9]{2}))$')
    //shape-only VAT validator, proper VIES validation is needed
    companyBusinessModels: string[] = [
        "SaaS", "Software House", "Startup", "Digital marketing/creative agency"
    ]
    companySizes: string[] = [
        "Micro (1-9 employees)",
        "Small (10-49 employees)",
        "Medium (50-249 employees)"
    ]

    constructor(private formBuilder: FormBuilder) {
        this.companyInfoFormGroup = this.formBuilder.group({
            companyName: ['', [Validators.required]],
            vatNumber: ['', [Validators.required, this.euVatValidator()]],
            companyBusinessModel: ['', [Validators.required]],
            companySize: ['', [Validators.required]]
        });
    }

    euVatValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const validationValue = (control.value || '').toString().trim()

            if (!validationValue) return null;
            return this.EU_VAT_REGEX.test(validationValue) ? null : { euVatInvalid: true }
        }
    }

    onSubmit(): void {
        if (this.companyInfoFormGroup.valid) {
            this.formCompleted.emit(this.companyInfoFormGroup.value);
        } else {
            this.companyInfoFormGroup.markAllAsTouched();
        }
    }
}
