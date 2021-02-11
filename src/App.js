import { useState } from 'react';
import range from 'lodash/range';

const numbers = range(0, 10);
const signs = ['+', '-', '*', '/'];
const functions = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}

const calcResult = (text) => {
  let res = 0;
  let func = functions['+'];

  text.split(' ').forEach(item => {
    if (!item) return;

    if (signs.includes(item)) {
      return func = functions[item];
    }

    res = func(res, Number.parseInt(item));
  });
  console.log({
    r: text.split(' ')
  });
  return res;
}

export const App = () => {
  const [main, setMain] = useState('0');
  const [line, setLine] = useState('');
  // const [prevSign, setPrevSign] = useState('');

  const appendMain = (number) => setMain(prevText => prevText === '0' ? number : `${prevText}${number}`)

  const dispatchAction = (sign) => {
    setLine(prevLine => {
      if (!prevLine) {
        return `${main} ${sign}`
      }
      return `${prevLine} ${main} ${sign}`
    })
    setMain('0');
    // setPrevSign(sign)
  }

  return (
    <main>
      <div>{main}</div>
      <div>
        {numbers.map(number => (
          <button onClick={() => appendMain(number)}>{number}</button>
        ))}
      </div>
      <div>
        {signs.map(sign => (
          <button onClick={() => dispatchAction(sign)}>{sign}</button>
        ))}
      </div>
      <div>{line}</div>
      <div>{calcResult(line)}</div>
    </main>
  );
}
