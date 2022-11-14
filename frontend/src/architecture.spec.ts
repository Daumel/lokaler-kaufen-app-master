// imports and applies the jest extensions
import 'tsarch/dist/jest';

// imports the files entrypoint
import {FileConditionBuilder, filesOfProject} from 'tsarch';

describe('architecture test', () => {
  let files: FileConditionBuilder

  beforeAll(() => {
    files = filesOfProject("tsconfig.app.json")
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

  it('modules must not depend on .spec files', async () => {
    const violations = await filesOfProject()
      .inFolder('app')
      .shouldNot()
      .dependOnFiles()
      .withName('.*\.spec')
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

  // socialLinks.ts wird erkannt, aber loginDto.ts nicht.
  // Wenn man einen Breakpoint bei files.js in der Zeile 230 setzt,
  // dann sieht man, dass loginDto.ts gar nicht in der Liste "projectedNodes"
  // bzw. auch nicht bei der Liste "graph" enthalten ist
  // Nur wenn loginDto.ts ein Package importiert, taucht das bei "graph" und somit auch bei "projectedNodes" auf
  it('models must end with \'Dto\'', async () => {
    const rule = await filesOfProject()
      .inFolder('model')
      .should()
      .matchPattern('.*Dto.ts')
      .check();

    expect(rule).toEqual([]);
  });

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
