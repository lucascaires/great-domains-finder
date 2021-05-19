const fs = require('fs');

//set your config
const MAX_SIZE = 15;
const TLDS = ['.com.br', '.net.br'];
const ALLOWED_CHARS = 'abcdefghijklmnopqrstuvxz';
const ALLOWED_WORDS = ['abc', 'sos'];
const FILE = './lista-maio-2021.txt';

fs.readFile(FILE, (err, data) => {
  const rows = String(data).split("\n")
    .filter(each => {
      const dn = each.replace(new RegExp(TLDS.join('|')), '')
			return each.slice(0,1) !== '#' //ignore commented line
				&& new RegExp(TLDS.join('|')).test(each) //check if has tld
				&& dn.split('')
          .filter(char => ALLOWED_CHARS.split('').includes(char))
          .length === dn.length //check if contain allowed chars
				&& new RegExp(ALLOWED_WORDS.join('|')).test(dn) //check for words			 
				&& dn.length <= MAX_SIZE //check size of domain name w/ tld
		})
	console.table(rows)
});
