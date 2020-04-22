import Typography from 'typography';

const typography = new Typography({
    title: 'organic-moringa-theme',
    baseFontSize: "16px",
    baseLineHeight: 1.5,
    headerFontFamily: ["Rubik","Roboto"],
    headerWeight: 500,
    headerColor: '#3A722E',
    bodyFontFamily: ["Rubik","Roboto"],
    bodyWeight: 'normal',
    googleFonts: [
        {
            name: 'Rubik',
            styles: [
                '700',
                '700i',
                '500',
                '500i',
                '400',
                '400i',
                '300',
                '300i',
            ],
        },
        {
            name: 'Roboto',
            styles: [
                '700',
                '700i',
                '500',
                '500i',
                '400',
                '400i',
                '300',
                '300i',
            ],
        }
    ],

    // overrideStyles: ({adjustFontSizeTo, rythm }, options, styles) => ({
    //     h1: {
    //         ...adjustFontSizeTo('48px'),            
    //         fontStyle: 'normal',
    //     },
    //     h2: {
    //         ...adjustFontSizeTo('38px'),            
    //         fontStyle: 'normal',
    //     },
    //     h3: {
    //         ...adjustFontSizeTo('32px'),            
    //         fontStyle: 'italic',
    //     },
    //     h4: {
    //         ...adjustFontSizeTo('24px'),            
    //         fontStyle: 'normal',
    //     },
    //     button: {
    //         ...adjustFontSizeTo('18px'),
    //     },

    // })
});

typography.injectStyles();

export default typography;