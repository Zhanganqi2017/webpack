//文件名可以为 .eslintrc.*
module.export = {
    "parser": "babel-eslint",
    "extends": "airbnd-base",
    "rules": {
        //"semi": "error"
        "indent": ["error", 4]
    },
    "env": {
        "browser": true,
        "node": true
    }
}