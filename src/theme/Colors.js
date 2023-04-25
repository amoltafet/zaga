
const light = {
    primary: '#6200ee',
    primaryVariant: '#3700b3',
    secondary: '#03dac6',
    secondaryVariant: '#018786',
    background: '#ffffff',
    text: '#000000',
};

const dark = {
    primary: '#bb86fc',
    primaryVariant: '#3700b3',
    secondary: '#03dac6',
    secondaryVariant: '#03dac6',
    background: '#121212',
    text: '#ffffff',
};

let currentTheme = dark;

function getTheme() {
    return currentTheme;
}

function setTheme(theme) {
    console.log("Theme changed to " + theme);
    currentTheme = theme;
}

export { getTheme, setTheme };

