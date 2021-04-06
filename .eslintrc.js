module.exports = {
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 5,
        "sourceType": "module"
    },
    "rules": {
        "no-undef": 0,//不能有未定义的变量
    },
    "globals":{
        "Ledconfig":true,
        "DeviceComm":true
    }
};