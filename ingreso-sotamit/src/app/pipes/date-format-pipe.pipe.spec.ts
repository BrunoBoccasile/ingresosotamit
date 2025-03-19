import { DateFormatPipePipe } from './date-format-pipe.pipe';

describe('DateFormatPipePipe', () => {
  it('Debe crear una instancia', () => {
    const pipe = new DateFormatPipePipe();
    expect(pipe).toBeTruthy();
  });

    it("Debe retornar fecha formateada YYYY-MM-DD" , () => {
      const pipe = new DateFormatPipePipe();
      const result = pipe.transform(new Date("2025-03-18T00:00:00Z"));
      console.log(result);
      expect(result).toEqual('2025-03-17');
    });
  

});
