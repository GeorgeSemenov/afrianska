const path = require("path");
/*Бывает так, что девсервер загружает только статичную версию из 
папки build, или вообще выдаёт обшибку "Cannot get / " в таком случае
нужно залесть в основной файл webpack.config.js и прописать 
common.output.publicPath = "/" Видимо после прошлой сборки в папку build
я зыбыл убрать там точку, ведь для сборки, нужно чтобы стояла ./ */
module.exports = function (pagesPath) {
  console.log(`kek puk = ${pagesPath}/blogpage/blogpage.pug`);
  return {
    devServer: {
      //Можно легко изменить порт, по которому будет находиться сайт и куча других настроек в пункте dev-server
      // hot: true, //это значение по умолчанию true поэтому закоментированно. Это указание на то что мы используем горячую замену модулей Hot Module Replacement при ней может (и скороее всего так и случится) отключится live reload
      static: {
        directory: "./source", //Не используй path.join иначе не будет работать Hot Module Replacement, хотя может это я в прошлый раз криво указал путь ?
        watch: true,
      },
      port: 9004, //теперича сайт будет открываться на этом порту
      // open: true, //при запуске девсервера браузер, выбранный по умолчанию откроется автоматически
      client: {
        overlay: true, //выводит в браузере ошибки, допущенные при сборке с помощью наложения тёмного экрана на браузер.
        progress: true, //Показывает програсс бар компиляции в браузере
      },
      historyApiFallback: {
        rewrites: [
          {
            from: /^\/blogpage$/,
            to: `../source/pages/blogpage/blogpage.pug`,
          },
        ],
      },
    },
  };
};
