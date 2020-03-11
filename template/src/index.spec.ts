import { main } from './index';

jest.spyOn(console, 'log');

describe('work fine', () => {
  main();
  expect(console.log).toBeCalledWith('Hello, world');
});
