import { BooleanPipePipe } from './boolean-pipe.pipe';

describe('BooleanPipePipe', () => {
  it('Debe crear una instancia', () => {
    const pipe = new BooleanPipePipe();
    expect(pipe).toBeTruthy();
  });

  it("Debe retornar 'Sí'" , () => {
    const pipe = new BooleanPipePipe();
    const result = pipe.transform('1');
    expect(result).toEqual('Sí');
  });

  it("Debe retornar 'No'" , () => {
    const pipe = new BooleanPipePipe();
    const result = pipe.transform('0');
    expect(result).toEqual('No');
  });
});
