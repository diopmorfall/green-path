import { Component, Input, Output, EventEmitter, Type, ViewChild, ViewContainerRef, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-multi-step-form',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './multi-step-form.html',
    styleUrl: './multi-step-form.css',
    host: {
        class: 'w-full md:w-3/4 lg:w-3/5 block'
    }
})
export class MultiStepForm implements OnDestroy, AfterViewInit {
    @Input() formStepsLabels: string[] = [];
    @Input() formStepsComponents: Type<any>[] = [];

    @Output() stepData = new EventEmitter<{ data: any, stepIndex: number }>();
    @Output() formSubmitted = new EventEmitter<void>();

    currentStepIndex: number = 0;
    private formStepCompletedSubscription: Subscription | undefined;
    
    @ViewChild('formStepHost', { static: false, read: ViewContainerRef }) formStepHost!: ViewContainerRef;
    
    ngAfterViewInit(): void {
        this.loadStepComponent(this.currentStepIndex);
    }

    ngOnDestroy(): void {
        this.formStepHost.clear();
        if(this.formStepCompletedSubscription){
            this.formStepCompletedSubscription.unsubscribe();
        }
    }

    loadStepComponent(stepIndex: number): void {
        if (this.formStepCompletedSubscription) {
            this.formStepCompletedSubscription.unsubscribe();
        }
        this.formStepHost.clear();
        const componentRef = this.formStepsComponents[stepIndex];
        const componentInstance = this.formStepHost.createComponent(componentRef);

        // Once each step component has a 'formCompleted' output
        if (componentInstance.instance.formCompleted) {
            this.formStepCompletedSubscription = componentInstance.instance.formCompleted.subscribe((data: any) =>
                {
                    this.stepData.emit({ data: data, stepIndex: this.currentStepIndex });
                    this.nextFormStep();
                });
        }
    }

    nextFormStep(): void {
        if (this.currentStepIndex < this.formStepsComponents.length - 1) {
            this.currentStepIndex++;
            this.loadStepComponent(this.currentStepIndex);
        } else {
            this.formSubmitted.emit();
        }
    }

    prevFormStep(): void {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            this.loadStepComponent(this.currentStepIndex);
        }
    }
}
