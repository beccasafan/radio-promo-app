module.exports = {
    style: {
        css: {
            loaderOptions: (options) => {
                options.camelCase = true;
                
                if (!options.modules) {
                    options.modules = true;
                    options.getLocalIdent = function(content, localIdentName, localName, options) {
                        return localName;
                    };
                }
                return options;
            }
        }
    }
};