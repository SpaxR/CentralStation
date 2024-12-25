import { TestBed } from '@angular/core/testing';
import { appConfig } from '../src/app/app.config';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom'; // includes jest-dom extensions
import './helpers/fixes'; // applies fixes

beforeEach(() => {
  userEvent.setup();
  return TestBed.configureTestingModule({
    providers: [
      ...appConfig.providers,
      provideHttpClientTesting(),
      provideNoopAnimations(),
    ],
  });
});
