import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoForm } from './company-info-form';

describe('CompanyInfoForm', () => {
  let component: CompanyInfoForm;
  let fixture: ComponentFixture<CompanyInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInfoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
