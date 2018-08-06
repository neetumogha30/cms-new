import { DirectUrlModule } from './direct-url.module';

describe('NotFoundModule', () => {
  let notFoundModule: DirectUrlModule;

  beforeEach(() => {
    notFoundModule = new DirectUrlModule();
  });

  it('should create an instance', () => {
    expect(DirectUrlModule).toBeTruthy();
  });
});
