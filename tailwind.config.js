module.exports = {
    content: require('./tailwind.conf/content'),
    safelist: require('./tailwind.conf/safelist'),
    theme: {
        screens: require('./tailwind.conf/screens'),
        colors: require('./tailwind.conf/colors'),
        fontFamily: {
            jp: "'BIZ UDGothic', sans-serif",
            en: "'Montserrat', sans-serif"
        },
        spacing: require('./tailwind.conf/spacing'),
        maxWidth: require('./tailwind.conf/spacing'),
        fontSize: require('./tailwind.conf/fontSize'),
        letterSpacing: require('./tailwind.conf/letterSpacing'),
        lineHeight: require('./tailwind.conf/lineHeight'),
        keyframes: require('./tailwind.conf/keyframes'),
        animation: require('./tailwind.conf/animations'),
        borderRadius: require('./tailwind.conf/borderRadius'),
        extend: {
            transitionProperty: {
                color: 'color'
            },
            aspectRatio: {
                thumb: '1.6'
            }
        }
    }
}
