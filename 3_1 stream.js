const { Transform } = require('stream');
const os = require('os');

const morseMap = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    ',': '--..--',
    '.': '.-.-.-',
    '?': '..--..',
    '/': '-..-.',
    '-': '-....-',
    '(': '-.--.',
    ')': '-.--.-',
    ' ': ' ',
    '\n': '\n',
    '\'': '.----.',
};
morseMap[os.EOL] = os.EOL;


//https://docs.oracle.com/javase/7/docs/api/javax/xml/crypto/dsig/Transform.html

const toMorse = new Transform({
  transform(chunk, encoding, callback){
    this.push(chunk
      .toString()
      .split('')
      .map(char => morseMap[char])
      .join('|')
      );
    callback();
  }
});


const fromMorse = new Transform({
  transform(chunk, encoding, callback){
    this.push(chunk
      .toString()
      .split('|')
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
      .map(morsecode => Object.keys(morseMap).find(key => morseMap[key] === morsecode))
      .join('')
    );
    callback();
  }
});


module.exports = {
  toMorse,
  fromMorse
}
