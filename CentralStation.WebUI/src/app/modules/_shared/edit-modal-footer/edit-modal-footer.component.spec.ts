import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalFooterComponent } from './edit-modal-footer.component';

describe('EditModalFooterComponent', () => {
  let component: EditModalFooterComponent;
  let fixture: ComponentFixture<EditModalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModalFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
