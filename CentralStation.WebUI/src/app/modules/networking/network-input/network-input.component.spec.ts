import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputNumber } from 'primeng/inputnumber';

import { NetworkInputComponent } from './network-input.component';

describe('NetworkInputComponent', () => {
  let component: NetworkInputComponent;
  let fixture: ComponentFixture<NetworkInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input fields for each part', () => {
    const inputElements = fixture.debugElement.queryAll(By.css('input'));
    expect(inputElements.length).toBe(4);
  });

  it('should render dots in between inputs', () => {
    const inputElements = fixture.debugElement.queryAll(
      By.css('p-inputnumber, p-inputgroupaddon'),
    );

    expect(inputElements.length).toBe(7);
    expect(inputElements[0].nativeElement.textContent).toBe('');
    expect(inputElements[1].nativeElement.textContent).toBe('.');
    expect(inputElements[2].nativeElement.textContent).toBe('');
    expect(inputElements[3].nativeElement.textContent).toBe('.');
    expect(inputElements[4].nativeElement.textContent).toBe('');
    expect(inputElements[5].nativeElement.textContent).toBe('.');
    expect(inputElements[6].nativeElement.textContent).toBe('');
  });

  // Calls onFocus function when an input field is focused
  it('should call select all text when field is focused', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    const nativeInputElement = inputElement.nativeElement as HTMLInputElement;
    nativeInputElement.value = '255';
    fixture.detectChanges();

    inputElement.triggerEventHandler('focus', {
      target: inputElement.nativeElement,
    });

    expect(nativeInputElement.selectionStart).toBe(0);
    expect(nativeInputElement.selectionEnd).toBe(
      nativeInputElement.value.length,
    );
  });

  [0, 1, 2, 3].forEach((index) => {
    let inputElement: InputNumber;

    beforeEach(() => {
      inputElement = fixture.debugElement.queryAll(By.css('p-inputnumber'))[
        index
      ].componentInstance;
    });

    it('should clamp input[' + index + '] values below 0', () => {
      inputElement.value = -1;
      fixture.detectChanges();

      inputElement.onInputBlur(new Event('event'));

      expect(inputElement.value).toBe(0);
    });

    it('should have clamp values over 255', () => {
      inputElement.value = 256;
      fixture.detectChanges();

      inputElement.onInputBlur(new Event('event'));

      expect(inputElement.value).toBe(255);
    });
  });
});
