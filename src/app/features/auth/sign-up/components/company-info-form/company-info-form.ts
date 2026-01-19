import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-company-info-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule],
    templateUrl: './company-info-form.html',
    styleUrl: './company-info-form.css',
})
export class CompanyInfoForm {
    @Output() formCompleted = new EventEmitter<any>(); //! change this with a proper interface

    companyInfoFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.companyInfoFormGroup = this.formBuilder.group({
            companyName: ['', [Validators.required]],
            vatNumber: ['', [Validators.required]],
            industry: ['', [Validators.required]],
            companySize: ['', [Validators.required]]
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
