// imports and applies the jest extensions
import 'tsarch/dist/jest';

// imports the files entrypoint
import {FileConditionBuilder, filesOfProject} from 'tsarch';

describe('architecture test', () => {
  let files: FileConditionBuilder;

  beforeAll(() => {
    files = filesOfProject("tsconfig.app.json");
  })

  // architecture tests can take a while to finish
  jest.setTimeout(60000);

  it('architecture should be cycle free', async () => {
    const violations = await files
      .inFolder('app')
      .should()
      .beFreeOfCycles()
      .check();

    expect(violations).toEqual([]);
  });

  it('modules must not depend on test files', async () => {
    const violations = await filesOfProject()
      .inFolder('app')
      .shouldNot()
      .dependOnFiles()
      .withName('.*\.(spec|test)')
      .check();

    expect(violations).toEqual([]);
  });

  it('models must not depend have outward dependencies', async () => {
    const violations = await filesOfProject()
      .inFolder('model')
      .shouldNot()
      .dependOnFiles()
      .matchingPattern('^(?!src/app/data/client/model/.*)')
      .check();

    expect(violations).toEqual([]);
  });

  it('models must end with \'Dto\'', async () => {
    const rule = await filesOfProject()
      .inFolder('model')
      .should()
      .matchPattern('.*Dto.ts')
      .check();

    expect(rule).toEqual([]);
  });

  // Wenn man einen Breakpoint bei files.js in der Zeile 187 setzt,
  // dann sieht man, dass node/http nicht in der Liste "projectedNodes"
  // bzw. auch nicht in der Liste "graph" enthalten ist
  // it('modules must not import the http module', async () => {
  //   const violations = await filesOfProject()
  //     .inFolder('app')
  //     .shouldNot()
  //     .dependOnFiles()
  //     .matchingPattern(".*http.*")
  //     .check();
  //
  //   expect(violations).toEqual([]);
  // });
});
