//Этот модуль нужен, чтобы загружать стили не инлайно, как это делается по умаолчанию а отдельным файлом.
//В маленьких проектах инлайно конечно будет быстрее, но в больших - большие стили подгружаются параллельно допустим хедеру или ещё какому-то файлу
const ExtractTextPlugin = require('mini-css-extract-plugin');//Этот плагин выполняет задачу подключения различных css файлов, т.е. заменяет собой style-loader

module.exports = function(){//Тут почему не нужен paths возможно paths - это архаизм от сболее старых весрий webpack?
	return {
		module: {
			rules: [//тут указываем массив настроек для лоадеров
				{//Тут описываем настройки лоадера
					test: /\.scss$/,
					use: [
						'style-loader', 
						{
							loader: ExtractTextPlugin.loader,
							options: {publicPath: '../'},//Это нужно чтобы background-image: url - имел корректный адрес, для всех картинок publicPath устанавливется в webpack.config, а для тех, что используются в стилях - будет применяться этот publickPath.
						},
						{
							loader: 'css-loader',
							options:{
								sourceMap: true,
							}
						}, 
						{
							loader: 'sass-loader',
							options:{
								sourceMap: true,
							}
						}
					],
				},
				{//Тут описываем настройки лоадера для css т.к. мы будем обрабатывать ещё и normalize.css поэтому простые .css файлы
					test: /\.css$/,
					use: [
						'style-loader', 
						{
							loader: ExtractTextPlugin.loader,
							options: {publicPath: '../'},
						}, 
						{
							loader: 'css-loader',
							options:{
								sourceMap: true,
							}
						}
					],
				},
			],
		},
		plugins:[
			new ExtractTextPlugin({
				filename: 'css/[name].[contenthash].css',//Плагин будет создавать внешний css файл в котором будут находиться стили обработанные этим модулем, имя файла будет зависить от входной точки (entry) в common модуле webpack.config.js и будет оно положенно, где находится точка выхода в том-же common модуле webpack.config.js и ещё завёрнуто в папку css
			}),
		],
	};
};