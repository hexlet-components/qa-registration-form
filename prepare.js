// @ts-check
const fs = require('fs');

const prepare = (from, to) => {
  const content = fs.readFileSync(from, 'utf-8');
  const answers = content.split('\n');
  const encodedAnswers = answers.map((line) => Buffer.from(line.trim(), 'utf8').toString('base64')).filter((line) => line).sort();
  const encodedContent = encodedAnswers.join('\n');
  fs.writeFileSync(to, encodedContent, 'utf-8');
};

prepare('./solution', '__fixtures__/text');
