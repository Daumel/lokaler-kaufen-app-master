// imports and applies the jest extensions
import 'tsarch/dist/jest';

// imports the files entrypoint
import {filesOfProject} from 'tsarch';

describe('', () => {

  // architecture tests can take a while to finish
  jest.setTimeout(60000);

  it('architecture should be cycle free', async () => {
    const rule = await filesOfProject()
      .inFolder('app')
      .should()
      .beFreeOfCycles()
      .check();

    expect(rule).toEqual([]);
  });

  it('api modules must import api utilities', async () => {
    const rule = await filesOfProject()
      .inFolder('api')
      .matchingPattern('^(?!api-utilities\.ts)')
      .should()
      .dependOnFiles()
      .withName('api-utilities\.ts')
      .check();

    expect(rule).toBeTruthy();
  });

  it('modules must not depend on .spec files', async () => {
    const rule = await filesOfProject()
      .inFolder('app')
      .shouldNot()
      .dependOnFiles()
      .withName('.*\.spec\.ts')
      .check();

    expect(rule).toBeTruthy();
  });
});
