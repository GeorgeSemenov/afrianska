const imageminPlugin = require('imagemin-webpack');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');//Для lossless режима(без потери качества)
const imageminOptinpng = require('imagemin-optipng');//Для lossless режима(без потери качества)
const imageminMozjpeg = require('imagemin-mozjpeg');//Для lossy режими (с потерей качества но большим сжатием)
//const imageminPngquant = require('imagemin-pngquant');//Для lossy режими (с потерей качества но большим сжатием)
const imageminSvgo = require('imagemin-svgo');

module.exports = function(){
	return {
		module:{
			rules: [//тут указываем массив настроек для лоадеров
				{//Тут описываем настройки лоадера
					test: /\.(jpg|png|svg|webp)$/,
					loader:'file-loader?name=/images/[name].[ext]',//настраиваем file-loader
					options:{
						name: './images/[name].[ext]'//указываем маску как будут называться картинки, они будут сохранять свои изначальные имена [name] и разширения [ext]
					}
				}
			]
		},
		plugins:[//Убедиь что плагин сжимающий шакалов и изображения будет находится под другими плагинами работающими с изображениями
			new imageminPlugin({
				bail: false, //Игнорировать ошибки в повреждённых изображениях
				cache: true,
				imageminOptions:{
					//В данном случае будут установелнны настройки lossless без потери качества изображения, можешь поэкспериментировать чтобы подогнать результат под себя или конкретный случай
					//Чтобы посмотреть на случай lossy с потерей качества - загляни на npmjs.com/package/imagemin-webpack
					//О подплагинах вроде imagemin-gifsicle видимо придётся искать инфу отдельно
					plugins:[
						imageminGifsicle({
							interlaced: true
						}),
						//Как я понял одновременно jpegtran является частью moz-jpeg поэтому я не использую их вместе
						//imageminJpegtran({//Для lossless режима(без потери качества)
						//	progressive: true//для lossless режима(без потери качества), если поставить false то ничего не изменится, не знаю в чём тут дело
						//}),
						imageminMozjpeg({//npmjs.com/package/imagemin-mozjpeg
							progressive: true,//false - создаёт baseline jpeg file
							quality: 80//Качество изображения В диапазоне от 0 (худшее) до 100(превосходное), чем меньше качества тем меньше вес, всё просто. Но зависимость не всегда линейная, поэтому придётся поиграться с параметрами. Иногда что 80 что 5 будет давать один результат, не понимаю как это работает.
						}),
						//не стал использовать два обработчика png файлов, помоему это приведёт к некоррестным результатам или просто будет бесполезным
						//imageminOptinpng({//Для lossless режима(без потери качества)
						//	optimizaionLevel: 7 //от 0 до 7 указывает на количество оптимизационных операций, которые требуют минимум усилий. Чем больше optimization level тем лучше будет сжатие, но не всегда
						//}),
						// imageminPngquant({//npmjs.com/package/imagemin-pngquant
						// 	speed:1,//от 1 до 11 Минимальная скорость(1) гарантирует лучшее качество обработки изображений, 10 - более чем в 8 раз быстрее но качество не то (примерно на 5%) на 11 - отключена какая-то важная функция, поэтому не трогаем
						// 	strip: true,//по умолчанию false - удаляет опциональную(не необходимую) meta информацию
						// 	quality:[0.7 , 0.9],//массив <min: number, max: number> пример [0.3, 0.5] - pngquant - использует минимальное количество цветов, чтобы качество изображения умещалась в данный интервал качества(стремилось к максимальному значению)  где 0 - самое худшее а 1 - превосходное. Похоже значения качества дискретны т.е. они могут быть 0.3 а следующее значение 0.5 поэтому и нужно указывать интервал
						// 	dithering: 1//указывает на уровень размытия от 0 до 1(default - без размытия)
						// }),
						imageminSvgo({
							removeViewBox: true
						})
					]
				}
			})
		]
	}
}