const borderRadiusSetting = {};
for (let i = 1; i <= 100; i++) {
    borderRadiusSetting[i] = `${i / 10}rem`;
}
module.exports = { ...borderRadiusSetting, half: '50%' };
