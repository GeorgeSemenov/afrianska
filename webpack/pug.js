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