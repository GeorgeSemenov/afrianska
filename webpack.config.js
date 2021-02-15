const path = require ('path');//Встроенный модуль nodeJS позволяет работать с путями на любой платформе
/*немного о path 
	__dirname- это указание текущей директории
	path.resolve(__dirname,'dist') - возвращает строку, которая ведёт напрямую в текущую папку и добавляет под конец папку dist

*/
//const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // этот плагин нужно подключать, если нужно почистить папки, допустим от старых версий файлов, в именах которых присутствует хэш, обрати внимание что этот плагин подключается иначе, надо из самого файла как буд-то взять класс cleanWebpackPlugin почитай import в JS станет понятнее npm install -D clean-webpack-plugin
const webpack = require('webpack');//Это нужно что бы появилась возможность выделить код webpack из кода js файлов (index.js и blog.js), для этого мы будем использовать метод optimize
const HtmlWebpackPlugin = require('html-webpack-plugin');//Данный плагин позволяет взаимодействовать с html
const merge = require('webpack-merge');//Этот модуль нужен чтобы в webpack.config.js склеивать различные модули, вместо object.assign - теперь кажыдй модуль можно записать в другой файл (как pug.js) и подключить к webpack.config.js
const pug = require ('./webpack/pug');//Подключаем модуль с pug для webpack.config.js ,кстати можно не указывать .js webpack и так всё понимает
const devserver = require('./webpack/devserver');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // чтобы вытащить scss и css код в отдельный фойл а не в style-loader
const sass = require('./webpack/sass');//Напомню, что сами стили(допустим blog.scss) нужно подключать через соответствеющие js файлы (blog.js)
const css = require('./webpack/css');//Модуль для обработки файлов .css напомню что такие файлы нужно подключать особо в каждый соответствующий js файлы (к примеру для index.html нужно подключать в index.js)
const extractCss = require('./webpack/css.extract');//этот модуль далее в программе не используется, можно удалить Модуль для извлечения стилей в отдельный(ые) файл(ы) и дальнейшего подключения к проекту
const images = require('./webpack/images');//Модуль, который обрабатывает изображения
const fonts = require('./webpack/fonts');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // Внимание, этот плагин работает только с mini-css-extract-plugin требует наличие mini-css-extract-plugin убирает дублирующиеся importы в scss например в блоке А и в блоке Б есть импорт блока Г, если на страницу подключить блок А и Б то импортируется на страницу только один раз блок Г discards duplicate selectors in the bundled style sheets from mini-css-extract-plugin

const PATHS = {//Объект с двумя свойствами
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

const common= merge([//модуль merge -  заменяет метод assign т.к. он более наглядный, мы просто передаём массив объектов, которые нужно склеить.
	{//Первый объект
		// content:''//данная строчка указывает, где лежат все исходники этого приложения, если её не вписать, то webpack будет шариться по всем папкам в __dirname(т.е. корневой папке проекта), но если ты его укажешь(допустим context: path.resolve(__dirname,"source"), то можешь не указывать в entry source, т.к. это уже будет предполагаться, но учти что context принимает абсолютный путь поэтому и используем path
		mode:'',//Специально не корректно инициализируем параметр mode, т.к. его мы будем инициализировать в последнюю очередь см функцию module.exports
		entry: {
			'index': PATHS.source + '/pages/index/index.js',//Обрати внимание для кадой страницы мы создаём свою точку входа которая начинается с .js файла
		},
		output: {
			path: PATHS.build,//Устанавливаем путь, куда мы будем пихать наши обработанные файлы
			publicPath: '/',//Устанавливаем путь, куда будет смотреть node сервер(да и наверное остальные) в данном случае он будет смотреть в localhost:8080(или другой порт это не важно)  и если ты указал изображение в images он будет смотреть в localhost:8080/images/menu.png а не в css/images/menu.png т.к. menu.png цепляется через menu.scss который складируется в css/ поэтому путь будет относительно css но public path это меняет чтобы webpack смотрел в корень сервера
			filename: 'js/[name].js'//[name]  -паттерн , в него будут автоматически подставляться имена свойств объекта entry (это точки входа) в данном случае это только index
			/*
				[contenthash] - можно использовать данный паттерн, чтобы имена выходных файлов были уникальными и не кэшировались бы браузерами
				однако стоит понимать, что у тебя быстро забьётся папка с исходниками и придётся устанавливать плюген npm install -D clean-webpack-plugin
			*/
		},
		resolve:{//Это объект, который принимает расширения и алиасы
		// 	extensions: ['.js','.pug','.json','.png'],// Это массив расширений, которые ты хочешь, чтобы вебпак определял самостоятельно. в данном случае я могу теперь не писать в index.js не import '../../img/rings.png' а import '../../img/rings' что упрощает процесс
			alias: {
		// 		'@models': path.resolve(__dirname,'src/models'),//Теперь тебе не нужно каждый раз прописывать import '../../src/models/rings.png' , можно просто прописать import '@models'
				'@': path.resolve(__dirname,'source'),//принцип тот же что и указанно в  строке выше
			}
		},
		plugins:[
			//new CleanWebpackPlugin(),//объект данного класса чистит папки и оставляет только актуальные файлы, допустим у тебя есть двай файла hash1.bundle.js hash2.bundle.js очевидно, что тот файл что выпустился позже и должен использоваться поэтому cleanWebpackPlugin удаляет файлы более старые. лучше вставлять этот плагин вначале всех остальных, если поставишь в конце, то он удалит всё что сделали предыдущие плагины.
			new HtmlWebpackPlugin({// создаём страничку html, при этом она подключает все файлы, указанные в свойствах объекта output
				//title: "pageNane", //можно передать тайтл если очень хочется, но нужно понимать, что этот параметр не работает, если в шаблоне (точке входа) будет указан тайтл, то он будет играть главную роль
				filename:'index.html',//Задаём имя генерируемому файлу
				chunks: ['index', 'common'],//Добавляет на страницу только те файлы, которые начинаются с index (допустим index.js index.css даже несмотря на то что они находятся в отельных папках css/ и js/)
				template: PATHS.source + '/pages/index/index.pug'//в данный плагин мы передадим шаблон разметки pug но сразу же скомпилированную (pug-loader'oм), проще говоря плагин сверстает страницу изходя из разметки, которую ему предоставит pug плагин (см он подключени ниже) после обработки этого шаблона
			}),
			new MiniCssExtractPlugin(), // Видимо без этого мы не сможем использовать loader, который будем использовать в для обработки scss файлов
			new OptimizeCssAssetsPlugin(),//Для оптимизации css и удаленя дублей стилей (если дважды импортируешь файл)
			new webpack.ProvidePlugin({//Этот плагин позволяет отказаться от import в модулях с кодом, т.е. когда webpack будет смотреть в код и найдёт допустим $ он автоматически подключит jquery, в соотвествии с настройками которые ты установишь в этом модуле
				$: 'jquery',//Если будет найден $ он автоматически подключит jquery, jquery должен быть установленн npm i jquery т.е. можно не писать в коде import jquery
				jQuery: 'jquery'
			}),
		],
		optimization:{
			splitChunks:{
				chunks: 'all',//Указывает какие чанки (модули с используемым кодом) будут оптимизироваться (удалятся повторяющийся код и выносится в другой файл), возможные значения 'all'(проверяет все чанки) 'async'(Проверяет только асинхронные) 'initial'
				name: 'common'//Файлы с общим кодом будут называться common.js и common.css, если имя не написать, то там будет vendor~index~blog.js или (css) 
			}
		},
		devtool:'',//этот параметр отвечает за создание source-map их может быть несколько я специально не корректно инициализируем этот параметр , т.к. его мы будем инициализировать в последнюю очередь см функцию module.exports
	},
	pug(),//Второй объект, pug(т.к. это объект, то для этого мы используем merge, который у нас инициализирван файлом (см выше в самом начале), в котором есть описание этого плагина
	images(),
	fonts()
]);

module.exports = function(env){/*webpackу требуется экспортируемый объект из данной конфигурации, поэтому можешь считать что данная строка является точкой входа, можешь читать код начиная отсюда*/
	//Напомню что env или mode:production автоматически минифицирует код.
	//Если же указать env или mode: development, то минификации происходить не будет
	common.mode = env;//Инициализируем режим development или prodaction в объекте common чтобы webpack знал как собирать проект, если эту строку убрать, то консоль выдаст ошибку, т.к. объект common инициализировани не в соотвествии с API webpack'a(т.к. там некорректно инициализирован ключ mode)
	if (env === 'production'){// env - параметр который передаётся в npm scripts - загляни в package.jsone
		common.devtool = false;//сорсмап создаваться не будет
		return merge([
			common,
			extractCss(),//Отделяем файлы стилей в продакшене, хотя ничто не мешает это делать в common(т.е. всегда), напоминаю этот модуль заменяет собой style-loader, т.е. теперь стили не будут писаться инлайно в html файле, а будут вынесены в отдельный файлик.
		])
	}
	if (env === 'development'){
		//return Object.assign(//Метод assign нужен чтобы склеивать объекты. Он принимает три аргумента
			//{},//Первый аргумент assign должен быть пустым объектом, как я понимаю туда будут записываться два других объекта.
		common.devtool = 'eveal-sourcemap';//Будет создаваться сорсмап
		return merge([//модуль merge -  заменяет метод assign см выше в комменатриях , т.к. он более наглядный, мы просто передаём массив объектов, которые нужно склеить.
			common,//Второй и третий аргументы - объекты которые должны быть склеены
			devserver(),//Подключаем модуль devserver, который у нас инициализирван файлом (см выше в самом начале), в котором есть описание этого плагина
			sass(),
			css()
		])
	}
};