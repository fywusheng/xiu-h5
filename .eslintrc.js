/*
 * @Description: ESLint规则配置
 * @Version: 0.1
 * @Autor: chenyt
 * @Date: 2020-04-09 11:26:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-11 15:31:48
 */
module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    plugins: [
        "vue"
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        "arrow-spacing": [
            2,
            {
                // 强制箭头函数的箭头前后使用一致的空格
                before: true,
                after: true,
            },
        ],
        "block-spacing": [2, "never"], // 禁止或强制在代码块中开括号前和闭括号后有空格
        "brace-style": [
            2,
            "1tbs",
            {
                // 强制在代码块中使用一致的大括号风格
                allowSingleLine: true,
            },
        ],
        camelcase: [
            0,
            {
                // 强制使用骆驼拼写法命名约定
                properties: "always",
            },
        ],
        "comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
        "comma-spacing": [
            2,
            {
                // 逗号前后的空格
                before: false,
                after: true,
            },
        ],
        "comma-style": [2, "last"], // 逗号风格，换行时在行首还是行尾
        curly: [2, "all"], // 必须使用 if(){} 中的{}
        "dot-location": [2, "property"], // 对象访问符的位置，换行的时候在行首还是行尾
        eqeqeq: [
            0,
            "smart",
            // {
            //     null: "ignore",
            // },
        ], // 必须使用全等
        indent: [1, 2], // 设置为2格缩进

        // "indent": ["error", 2],// 设置为4格缩进
        "key-spacing": [
            2,
            {
                // 强制在对象字面量的属性中键和值之间使用一致的间距
                beforeColon: false,
                afterColon: true,
            },
        ],
        "keyword-spacing": [
            2,
            {
                // 强制在关键字前后使用一致的空格
                before: true,
                after: true,
            },
        ],
        "no-cond-assign": 2, // 禁止在条件表达式中使用赋值语句
        "no-const-assign": 2, // 禁止修改const声明的变量
        "no-dupe-args": 2, // 函数参数不能重复
        "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-duplicate-case": 2, // switch中的case标签不能重复
        "no-ex-assign": 2, // 禁止给catch语句中的异常参数赋值
        "no-extra-parens": [2, "functions"], // 禁止非必要的括号
        "no-fallthrough": 2, // 禁止switch穿透
        "no-func-assign": 2, // 禁止重复的函数声明
        "no-inner-declarations": [2, "functions"], // 禁止在块语句中使用声明（变量或函数）
        "no-irregular-whitespace": 2, // 不能有不规则的空格
        "no-lone-blocks": 2, // 禁止不必要的嵌套块
        "no-mixed-spaces-and-tabs": 2, // 禁止混用tab和空格
        "no-multi-spaces": 2, // 不能用多余的空格
        "no-multi-str": 2, // 字符串不能用\换行
        "no-multiple-empty-lines": [
            2,
            {
                // 空行最多不能超过1行
                max: 1,
            },
        ],
        "no-new-object": 2, // 禁止使用new Object()
        "no-new-require": 2, // 禁止使用new require
        "no-new-wrappers": 2, // 禁止使用new创建包装实例，new String new Boolean new Number
        "no-redeclare": 2, // 禁止重复声明变量
        "no-regex-spaces": 2, //禁止在正则表达式字面量中使用多个空格
        "no-return-assign": [2, "except-parens"], // return 语句中不能有赋值表达式
        "no-shadow-restricted-names": 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
        "no-spaced-func": 2, // 函数调用时 函数名与()之间不能有空格
        "no-sparse-arrays": 2, // 禁止稀疏数组， [1,,2]
        "no-undef": 1, // 不能有未定义的变量
        "no-unused-vars": [
            2,
            {
                //不能有声明后未被使用的变量或参数
                vars: "all",
                args: "none",
            },
        ],
        "operator-linebreak": [
            2,
            "after",
            {
                // 换行时运算符在行尾还是行首
                overrides: {
                    "?": "before",
                    ":": "before",
                },
            },
        ],
        quotes: [
            2,
            "double",
            {
                // 引号类型 `` "" ''
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        "semi": [
            "error",
            "never"         // 改成代码结尾不再加分号，加了分号报错，不加分号不报错
        ],
        "space-before-function-paren": [2, "never"], // 函数定义时括号前面要不要有空格
        "space-in-parens": [2, "never"], // 小括号里面要不要有空格
        "space-unary-ops": [
            2,
            {
                // 一元运算符的前/后要不要加空格
                words: true,
                nonwords: false,
            },
        ],
        "use-isnan": 2, // 禁止比较时使用NaN，只能用isNaN()
        "valid-typeof": 2, // 必须使用合法的typeof的值
        "prefer-const": 2, // 首选const
        "no-console": process.env.NODE_ENV === "production" ? 2 : 0, // 生产环境禁止使用console
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0, // 生产环境禁止使用debugger
        "array-bracket-spacing": [2, "never"], // 是否允许非空数组里面有多余的空格
    },
}