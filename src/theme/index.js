const dark = {
    title: "dark",
    background: "#1f1f1f",
    text: "#fff",
    primary: "#fff",
    secondary: "#fff",
};

const light = {
    title: "light",
    background: "#fff",
    text: "#1f1f1f",
    primary: "#1f1f1f",
    secondary: "#1f1f1f",
};


// grab the event listener for dark mode
let theme = localStorage.getItem("darkMode") === "true" ? dark : light;
console.log(theme);

export { theme };