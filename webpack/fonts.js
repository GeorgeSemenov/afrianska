module.exports = function(){
	return {
		module:{
			rules: [//тут указываем массив настроек для лоадеров
				{//Тут описываем настройки лоадера
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					loader:'file-loader',//настраиваем file-loader, чтобы он работал только со шрифтами
				}
			]
		}
	}
}