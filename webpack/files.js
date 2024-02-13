module.exports = function(){
	return {
		module:{
			rules: [//тут указываем массив настроек для лоадеров
				{
					test:/\.(pdf)$/,
					type: "asset/resource",
				}
			]
		}
	}
}