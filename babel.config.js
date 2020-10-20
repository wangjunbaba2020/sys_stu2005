module.exports = {
    presets: ["@vue/cli-plugin-babel/preset", ["@babel/preset-env", { "modules": false }]],
    // 即就会转换为es2015的语法
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui", //库的名字
                "styleLibraryName": "theme-chalk" //样式名字
            }
        ]
    ]
};