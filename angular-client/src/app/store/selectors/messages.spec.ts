import { Store, StoreModule } from '@ngrx/store';
import { AppState, reducers } from '../reducers';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { getMessages } from './messages';

describe('Messages selector', () => {
  let store: Store<AppState>;
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [StoreModule.forRoot(reducers)] });

    store = TestBed.get(Store);
  });

  it('should select messages with the `getMessages` selector', () => {
    let result;
    store.select(getMessages).subscribe((val) => (result = val));

    expect(result).toEqual([]);
  });
});
