import { VaccinationCountPipe } from './vaccination-count.pipe';

describe('VaccinationCountPipe', () => {
  it('create an instance', () => {
    const pipe = new VaccinationCountPipe();
    expect(pipe).toBeTruthy();
  });
});
