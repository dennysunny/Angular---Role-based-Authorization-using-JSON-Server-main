import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxCommonComponent } from './textbox-common.component';

describe('TextboxCommonComponent', () => {
  let component: TextboxCommonComponent;
  let fixture: ComponentFixture<TextboxCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextboxCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextboxCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
