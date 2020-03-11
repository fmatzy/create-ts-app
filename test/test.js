'use strict';

const { join } = require('path');
const { wrap } = require('jest-snapshot-serializer-raw');
const sao = require('sao');

const generator = join(__dirname, '..');

test('contains all files', async () => {
  const stream = await sao.mock({ generator });

  expect(stream.fileList).toMatchSnapshot('fileList');
  await Promise.all(
    stream.fileList.map(async file => {
      const content = await stream.readFile(file);
      expect(wrap(content)).toMatchSnapshot(file);
    })
  );
});
