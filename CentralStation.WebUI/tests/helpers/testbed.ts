import { DebugElement as NativeDebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class DebugElement<TComponent = any> extends NativeDebugElement {
  override get componentInstance(): TComponent {
    return super.componentInstance;
  }

  override get nativeElement(): HTMLElement {
    return super.nativeElement;
  }
}

export function testId(id: string) {
  return By.css(`[data-testid=${id}]`);
}
