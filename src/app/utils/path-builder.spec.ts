import { PathBuilder } from './path-builder';

describe('PathBuilder', () => {

  it('builds a collection path', () => {
    const builder = new PathBuilder(['root']);

    expect(builder.build()).toBe('root');
  });

  it('builds a collection/doc path', () => {
    const builder = new PathBuilder(['root']);

    expect(builder.build('rootId')).toBe('root/rootId');
  });

  it('builds a nested collection path', () => {
    const builder = new PathBuilder(['root', 'sub']);

    expect(builder.build('rootId'))
      .toBe('root/rootId/sub');
  });

  it('builds a full document path', () => {
    const builder = new PathBuilder(['root', 'sub']);

    expect(builder.build('rootId', 'subId'))
      .toBe('root/rootId/sub/subId');
  });

  it('ignores excess document ids (invalid combinations)', () => {
    const builder = new PathBuilder(['root']);

    expect(builder.build('rootId', 'subId'))
      .toBe('root/rootId');
  });

  it('allows indexed access to collection ids via at()', () => {
    const builder = new PathBuilder(['root', 'sub']);

    expect(builder.at(0)).toBe('root');
    expect(builder.at(1)).toBe('sub');
    expect(builder.at(2)).toBeUndefined();
  });

});
