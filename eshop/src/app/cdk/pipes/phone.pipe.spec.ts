import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  let pipe: PhonePipe | null;

  beforeEach(() => {
    pipe = new PhonePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    expect(pipe?.transform()).toBeNull();
  });

  it('should return formatted phone', () => {
    expect(pipe?.transform('9001234567')).toBe(`+7 (900) 123-45-67`);
  });

  it('should return null if not matched', () => {
    expect(pipe?.transform('asd')).toBeNull();
  });

  it('should add code', () => {
    expect(pipe?.transform('9001234567', '9')).toBe(`+9 (900) 123-45-67`);
  });

  afterEach(() => {
    pipe = null;
  });
});
