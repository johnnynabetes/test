const loadExternalJs = (src) => new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    document.body.appendChild(script);
})

const stringFormat = (args) => {
    const str = args.shift();
    return str.replace(/{(\d+)}/g, function (match, number) {
        return args[number] || match;
    });
}

export {
    loadExternalJs,
    stringFormat
}