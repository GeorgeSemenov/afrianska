const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = function(){
	return {
		module:{
			rules: [//тут указываем массив настроек для лоадеров
				{//Тут описываем настройки лоадера
					test: /\.(jpg|png|svg|webp)$/,
					type: "asset/resource",//automatically chooses between exporting a data URI and emitting a separate file. Previously achievable by using url-loader with asset size limit.
					// loader:'file-loader',
				}
			]
		},
	  optimization: {
	    minimizer: [
	      new ImageMinimizerPlugin({
	        minimizer: {
	          implementation: ImageMinimizerPlugin.imageminMinify,
	          options: {
	            // Lossless optimization with custom option
	            // Feel free to experiment with options for better result for you
	            plugins: [
	              ["gifsicle", { interlaced: true }],
	              ["jpegtran", { progressive: true }],
	              ["optipng", { optimizationLevel: 5 }],
	              // Svgo configuration here https://github.com/svg/svgo#configuration
	              // [
	              //   "svgo",
	              //   {
	              //   	plugins: extendDefaultPlugins([
	              //       {
	              //         name: "preset-default",
	              //         params: {
									      //   overrides: {
									      //     // customize default plugin options
									      //     inlineStyles: {
									      //       onlyMatchedOnce: false,
									      //     },

									      //     // or disable plugins
									      //     removeDoctype: false,
									      //   },
									      // },
	              //       },
	              //     ]),
	              //     // plugins: extendDefaultPlugins([
	              //     //   {
	              //     //     name: "removeViewBox",
	              //     //     active: false,
	              //     //   },
	              //     //   {
	              //     //     name: "addAttributesToSVGElement",
	              //     //     params: {
	              //     //       attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
	              //     //     },
	              //     //   },
	              //     // ]),
	              //   },
	              // ],
	            ],
	          },
	        },
	      }),
	    ],
	  },
	}
}