const plugin = require("tailwindcss/plugin");

/**
 * Constants
 */

const namespace = "tmspc";

const fontVariables = {
    title: "font-title",
    text: "font-text",
    code: "font-code",
};

const colorVariants = ["-bg", "-fg", "-aux"];
const colorChannels = "-ch";
const colorVariables = [
    "base",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
];

/**
 * Fonts
 */

const fontFamily = {
    title: `--${namespace}-${fontVariables.title}`,
    text: `--${namespace}-${fontVariables.text}`,
    code: `--${namespace}-${fontVariables.code}`,
};

/**
 * Colors
 */

let colors = {};

colorVariables.forEach((variable) => {
    colorVariants.forEach((variant) => {
        colors[`${variable}${variant}`] = withOpacityValue(
            `--${namespace}-${variable}${variant}${colorChannels}`
        );
    });
});

module.exports = plugin.withOptions(
    (userOptions) => {
        const options = userOptions ?? {};

        return ({ addBase }) => {
            if (options.strict) {
                addBase({
                    body: {
                        background: toVar(`--${namespace}-base-bg`),
                        color: toVar(`--${namespace}-base-fg`),
                        fontFamily: toVar(fontFamily.text),
                    },
                    h1: {
                        fontFamily: toVar(fontFamily.title),
                    },
                    h2: {
                        fontFamily: toVar(fontFamily.title),
                    },
                    h3: {
                        fontFamily: toVar(fontFamily.title),
                    },
                    h4: {
                        fontFamily: toVar(fontFamily.title),
                    },
                    h5: {
                        fontFamily: toVar(fontFamily.title),
                    },
                    h6: {
                        fontFamily: toVar(fontFamily.title),
                    },
                    code: {
                        fontFamily: toVar(fontFamily.code),
                    },
                });
            }
        };
    },
    (userOptions) => {
        const options = userOptions ?? {};
        const extraColors = (options.colors || []).reduce((acc, color) => {
            acc[color] = withOpacityValue(`--${color}`);
            return acc;
        }, {});

        if (options.strict) {
            return {
                theme: {
                    fontFamily,
                    colors: {
                        ...extraColors,
                        ...colors,
                    },
                },
            };
        }

        return {
            theme: {
                extend: {
                    fontFamily,
                    colors: {
                        ...extraColors,
                        ...colors,
                    },
                },
            },
        };
    }
);

/**
 * Helpers
 */

function withOpacityValue(variable) {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `rgb(var(${variable}))`;
        }
        return `rgb(var(${variable}) / ${opacityValue})`;
    };
}

function toVar(str) {
    return `var(${str})`;
}
