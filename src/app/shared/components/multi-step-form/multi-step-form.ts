import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-multi-step-form',
    imports: [CommonModule],
    templateUrl: './multi-step-form.html',
    styleUrl: './multi-step-form.css',
    host: {
        class: 'w-full md:w-3/4 block'
    }
})
export class MultiStepForm implements OnInit {
    @Input() formStepsLabels: string[] = [];
    currentStep: number = 1;

    ngOnInit(): void {
        
    }
    
}
