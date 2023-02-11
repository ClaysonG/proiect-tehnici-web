let intervals = [
  [48, 57],
  [97, 102],
  [72, 122],
];
let alphaNumSeq = "";

for (let interval of intervals) {
  for (let i = interval[0]; i <= interval[1]; i++) {
    alphaNumSeq += String.fromCharCode(i);
  }
}

function generateToken(n, createdAt) {
  let min = 40;
  let max = 50;
  let range = Math.random() * (max - min) + min;
  let token = `${createdAt}`;
  for (let i = 0; i < range; i++) {
    token += alphaNumSeq[Math.floor(Math.random() * alphaNumSeq.length)];
  }
  return token;
}

module.exports.generateToken = generateToken;
