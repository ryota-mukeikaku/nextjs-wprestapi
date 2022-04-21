const letterSpaceSetting = {};

// 文字間がトラッキング表記の場合
// for (let i = 1; i <= 1000; i++) {
//   letterSpaceSetting[i] = `${i / 1000}em`;
// }

// 文字間がパーセント表記の場合
for (let i = 1; i <= 100; i++) {
  letterSpaceSetting[i] = `${i / 100}em`;
}

module.exports = letterSpaceSetting;
