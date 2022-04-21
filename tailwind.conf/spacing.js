const spaceSetting = {
  half: "50%",
  full: "100%",
  fit: "fit-content",
  min: "min-content",
  max: "max-content",
  auto: "auto",
  inherit: "inherit",
  0: 0,
};
for (let i = 1; i < 800; i++) {
  spaceSetting[i] = `${i / 10}rem`;
}
for (let i = 800; i <= 1440; i += 10) {
  spaceSetting[i] = `${i / 10}rem`;
}

module.exports = spaceSetting;
