import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe | null;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    expect(pipe?.transform([], 10)).toBeNull();
  });

  it('should return filtered items', () => {
    expect(pipe?.transform([1, 2, 3, 4, 5], 2)).toEqual([4, 5]);
  });

  afterEach(() => {
    pipe = null;
  });
});
