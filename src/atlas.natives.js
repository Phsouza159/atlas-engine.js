

let start = function (e = this) {
    
    let self = e;

    let init = new Promise((resolve, reject) => {
        console.log('Atlas is start!');

        resolve(self);
    });

    self.core.init = init;

    self.core.init
        .then((self) => {
            return self.securyteConfig(self);
        })
        .then((self) => {
            return configurarUrls(self);
        })
        .then((self) => {
            return self.core.loadMaster(self);
        })
        .then((self) => {
            return self.core.loadModules(self);
        })
        .then((self) => {
            return self.core.partialViews(self);
        })
        .then((self) => {
            // partialViews retornar um array
            self = self[0];
            return self.core.loadLinks(self);
        })
        .then((self) => {
            return self.core.loadScripts(self);
        })
        .then((self) => {
            return self.core.loadRouts(self)
        })
        .then((self) => {
            return self.core.removePagLoad(self);
        })
        .catch((err) => console.warn(err));
};

let recuperarFuncaoText = (text) => {
    let arg = '';
    let fn = globalThis;

    if(text.includes('.'))
    {
        arg = text.split('.');
    }
    else {
        arg = [text];
    }

    arg.map(e => {
        fn = fn[e];
    })

    return fn;
}


let configurarUrls = (self) => {
    let urlParametres = self.core.searchUrlParametres();
    
    urlParametres['aplication'] = self.name;
    urlParametres['user'] = 'anonimo' 
    urlParametres['key'] = '1';

    self.core.gerarSearchUrlParametres(urlParametres , true);

    return self;
}

let excepticon = ( object , typeofObject ,  text) => {
    if(typeof object != typeofObject || object == null)
        throw text;
}

let validarKeySecuryte = (self) => {

    excepticon(self.securyte.key , 'string' , 'Esperado uma chave para securança!' )

    return self.securyte.key;
}

let validarFuncaoIn = (self , text) => {
    let arg = self.securyte.in;
    excepticon( arg , 'string' , `Esperado uma chamada de função de entrada` );

    return recuperarFuncaoText(arg);
}

let validarFuncaoOut = (self) => {
    let arg = self.securyte.out;
    excepticon( arg , 'string' , `Esperado uma chamada de função de saida` );

    return recuperarFuncaoText(arg);
}

let securyteConfig = (self) => {

    if(self.securyte){
        self.securyte.key   = validarKeySecuryte(self);
        self.securyte.in    = validarFuncaoIn(self);
        self.securyte.out   = validarFuncaoOut(self);
        self.securyte.config = self.securyte.cfg;
    }

    return self;
}

let securytEncrypt = (data) => {
    let self = globalThis.AtlasApp;

    if(self.securyte)
    {
        return self.securyte.in( data , self.securyte.config ) 
    }

    return data;
}

let securyteDecrypt = (data) => {
    let self = globalThis.AtlasApp;

    if(self.securyte)
    {
        return self.securyte.out( data , self.securyte.config ) 
    }

    return data;
} 

export { start , securytEncrypt , securyteDecrypt , securyteConfig};
