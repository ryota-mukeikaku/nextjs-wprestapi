const fontSizeSetting = {};
for (let i = 1; i <= 100; i++) {
  fontSizeSetting[i] = `${i / 10}rem`;
}
module.exports = {
  ...fontSizeSetting,
  base: [
    "1.6rem",
    {
      letterSpacing: "0.03em",
      lineHeight: "1.8",
    },
  ],
};
