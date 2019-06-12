let iF = (value , element) => {
    let self = globalThis.AtlasApp;
    let arg = value;
    let vdd = self.sys.queryParametres.text(`{{${arg}}}`);

    if (vdd) {
        element.hidden = false;
    }
    else {
        element.hidden = true;
        element.innerHTML = null;
    }
}

let setForm = function (value, element) {
    let self = globalThis.AtlasApp;
    let obj = self.mod.cacheForm.data[value];

    if (obj != null) {
        let key = Object.keys(obj);
        key = key.filter(e => { if (!e.includes('__')) return e; });

        key.map(e => {

            let campo = document.getElementsByName(e);
            if (campo != null && campo.length > 0)
                campo[0].value = obj[e];

        });
    }
}

let form = function (value, element) {
    let self, fm, r, isCache, action , callback;
    let resposta ;
    self = globalThis.AtlasApp;
    fm = document.getElementById(value);
    name = fm.dataset.name;
    callback = fm.dataset.callback;
    isCache = fm.dataset.cache == 'false' ? false : true;

    action = fm.attributes.action;

    r = getChildValuesForm(fm, {});

    if (isCache)
        self.mod.cacheForm.data[name] = r;

    if (action != null) {
        resposta = sendForm(action.value, r);
        self.mod.cacheForm.data[name].__RESPONSE__ = resposta;
    }

    if(callback != null && typeof globalThis[callback] == 'function')
    {
        let func = globalThis[callback];

        func(resposta);
    }
}

let sendForm = async function (url, data, method = 'post') {
    let self = globalThis.AtlasApp;
    let response;

    let urlFormat = self.core.formatarLink(self , url);

    response = await self.sys.OnPost(urlFormat, data)
        .then((data) => {
            return data;
        })
        .then((data) => {
            return JSON.parse(data);
        }).catch((err) => {
            console.warn(err);
            return err;
        });

    return Promise.resolve(response);
}

let cacheForm = {
    data: {}
}

let getChildValuesForm = function (element, data) {
    let x = 0, e, length = 0;

    if (typeof element !== "object")
        return data;

    length = element.length;
    if (length > 0) {
        for (; x < length; x++)
            data = getChildValuesForm(element[x], data);
    }

    if (element.childNodes != null && element.childNodes.length > 0) {
        for (e of element.childNodes)
            data = getChildValuesForm(e, data);
    }
    if (element.nodeName == "INPUT" || element.nodeName == "SELECT" || element.nodeName == "TEXTEAREA") {

        //this.validInputs(element);

        data[element.name] = element.value;
    }

    return data;
}

let lacoForOf = function (value, element) {
    let self = globalThis.AtlasApp;

    if (value.trim().includes('var') || value.trim().includes('let')) {
        let arg = value.split(' ')
            .filter(e => {
                if (e != 'var' && e != 'let' && e != 'of') return e
            }
            );

        let item = arg[0];
        let ob = globalThis[arg[1]];
        let html = element.innerHTML;
        let newHtml = '';

        if (ob != null) {
            for (let y of ob) {
                globalThis[item] = y;

                newHtml += self.sys.queryParametres(html.trim());
            }

            element.innerHTML = newHtml;
        }
        else {
            console.warn(`object ${arg[1]} não definido!`);
        }

        return;
    }
};


let lacoFor = function( value , element) {

    let isOf = value.toLowerCase().includes(' of ');

    element.hidden = true;

    if(isOf){
        lacoForOf(value, element);
    }
    else {
        lacoForIncremental(value , element);
    }

    element.hidden = false;
};

let lacoForIncremental = function (value, element) {

    let self = globalThis.AtlasApp;

    if (value.includes(';')) {
        let par = value.split(';');

        let arg1 = par[0];

        if (arg1.trim().includes('var') || arg1.trim().includes('let')) {
            arg1 = arg1.replace('var', '').trim();

            let variavel = arg1.includes('=') ? arg1.split('=')[0] : arg1;
            let val = arg1.includes('=') ? arg1.split('=')[1] : null;

            try {
                val = parseInt(val);
                if (val == NaN) throw 'invalide';

            } catch (e) {
                val = eval(val);
            }

            if (val != null) {
                globalThis[variavel.trim()] = val;
            }
            else {
                globalThis[variavel.trim()] = variavel;
            }
        }

        let arg2 = par[1];
        let arg3 = par[2];

        let html = element.innerHTML;
        let newHtml = '';

        while (eval(arg2)) {
            newHtml += self.sys.queryParametres(html.trim())
            eval(arg3);
        }

        element.innerHTML = newHtml;
    };
}


let dataSendJson = function (value, element) {

    let self = globalThis.AtlasApp;
    let callback = element.data.callback;
    let url = element.data.url;

    return self.mod.sendJson(value, url, callback);
}

let get = function (value, element) {
    let self = globalThis.AtlasApp;
    let ob = JSON.parse(value);
    let resp = '';
    let callback = globalThis[ob.callback];
    let varResponse = ob.var == null ? '$getResponse' : ob.var;

    ob.url = self.core.formatarLink( self , ob.url );

    self.sys.OnGet(ob.url)
        .then((data) => {

            globalThis[varResponse] = JSON.parse( data );

            if (typeof callback != 'function') return console.warn('callback erro! :: get');

            callback(data[0]);


        })
        .catch((err) => console.warn(err));
}


let sendJson = async function (object, url, callbackName = null) {
    let self = globalThis.AtlasApp;
    let val = typeof object == 'object' ? object : globalThis[object];
    let resp;

    resp = await self.sys.OnPost(url, val)
        .then((data) => {
            return data
        })
        .then((data) => {
            return JSON.parse(data);
        }).catch((data) => {
            console.warn(data);
        });
    if (callbackName != null && typeof callbackName == 'string' && typeof globalThis[callbackName] == 'function') {
        let fn = globalThis[callbackName];

        fn(resp);
    }

    return resp;
}

export {
    lacoFor
    , lacoForOf
    , sendJson
    , dataSendJson
    , form
    , cacheForm
    , setForm
    , get
    , iF
};