const lineHeightSetting = {};
// 行間がpx表記の場合
for (let i = 1; i <= 200; i++) {
  lineHeightSetting[i] = `${i / 10}rem`;
}

// 行間が倍率表記の場合
// for (let i = 1; i <= 30; i++) {
//   lineHeightSetting[i] = (0.1 * i).toFixed(1);
// }

module.exports = lineHeightSetting;
