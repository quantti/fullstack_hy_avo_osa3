module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module"
    },
    "rules": {
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
          "error", "always"
        ],
        "arrow-spacing": [
          "error", { "before": true, "after": true }
        ],
        "indent": [
            "error",
            2
        ],
        "no-console": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
