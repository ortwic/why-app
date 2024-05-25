import { SafeUrlPipe } from './safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';

const pipe = new SafeUrlPipe({
  sanitize: (context: any, value: any) => value
} as DomSanitizer);

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
