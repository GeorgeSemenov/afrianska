const path = require('path');//Без этой записи переменная path - не будет работать ниже и утебя всегда будет выходить ошибка ReferenceError: path is not defined
// module.exports = function(){//неудашная попытка поставить кэширование на компиляцию pug файлов
// 	return {
// 		module:{
// 			rules: [//тут указываем массив настроек для лоадеров
// 				{//Тут описываем настройки лоадера
// 					test: /\.pug$/,
// 					use:[
// 						{
// 							loader: 'cache-loader'
// 						}, 
// 						{
// 							loader: 'pug-loader',
// 							options:{//настраиваем pug-loader
// 								pretty: true//сделать код компилируемого файла "красивого" раставляем отступы , переносы и т.д.						
// 							}
// 						}
// 					],
// 					// include: path.resolve(__dirname, 'cacheStore'),
// 				}
// 			]
// 		}
// 	}
// }


module.exports = function(){
	return {
		module:{
			rules: [//тут указываем массив настроек для лоадеров
				{//Тут описываем настройки лоадера
					test: /\.pug$/,
					loader:'pug-loader',//настраиваем pug-loader
					options:{
						pretty: true//сделать код компилируемого файла "красивого" раставляем отступы , переносы и т.д.
					}
				}
			]
		}
	}
}