module.exports = function(){
	return {
		module:{
			rules: [//тут указываем массив настроек для лоадеров
				{//Тут описываем настройки лоадера
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					// loader:'file-loader',//Уже не нужен, т.к. webpack 5 сам работает со шрифтами. настраиваем file-loader, чтобы он работал только со шрифтами 
				}
			]
		}
	}
}