import {eHttoRequest} from './../enum/atlas.enum';

let apiQuery = function () {

    let isExcult = false;
    let self = globalThis.AtlasApp;
    let modules = self.dataModules;

    let natives = [
        { name: '[data-route]',   dataset: 'route',     method: 'core.setRoutView.{data}',    type: 'onclick' },
        { name: '[data-for]',     dataset: 'for',       method: 'mod.for.{data}',             type: 'onload' , runat : 'ignore' },
        { name: '[data-setForm]', dataset: 'setform',   method: 'mod.setForm.{data}',         type: 'onload' , runat : 'ignore' },
        { name: '[data-form]',    dataset: 'form',      method: 'mod.form.{data}' ,           type: 'onclick' },
        { name: '[data-view]',    dataset: 'view',      method: 'core.getPartial.{data}',     type: 'onload' },
        { name: '[data-get]',     dataset: 'get',       method: 'mod.get.{data}',             type: 'onload' },
    ];

    let args = [...natives, ...modules]

    args.forEach(arg => {

        let elementes = document.querySelectorAll(arg.name);
        let param = arg.method.split('.');
        let fn = self;

        param.map(e => {
            if (!e.includes('{'))
                fn = fn[e]
        })

        elementes.forEach(element => {
            let value = element.dataset[arg.dataset];
            let runat = element.dataset['runat'];
            let isIgnore = arg.ignore == 'ignore';

            if (runat != 'ok' || isIgnore ) {

                isExcult = true;

                if (arg.type == 'onload') {

                    fn(value, element);
                }
                else {
                    element[arg.type] = function () {
                        fn(value, element);
                    }
                }

                element.dataset['runat'] = 'ok';
            }
        });
    });

    return isExcult;
}

/**
 * Requisicao ajax GET
 * @param {string} url da requisicao
 */
let OnGet = async function (url) {

    var get = new Promise((resolve, reject) => {

        var ajax = new XMLHttpRequest();

        ajax.open(eHttoRequest.get, url, true);

        ajax.send()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var data = ajax.responseText;
                resolve(data);
            }
            else if (ajax.readyState == 4) {
                reject(ajax.status);
            }
        }
    });

    return await Promise.all([get]);
}
/**
 * Requisicao ajax POST
 * @param {string} url
 * @param {objec} objec
 */
let OnPost = function (url, objec) {

    var post = new Promise((resolve, reject) => {

        var ajax = new XMLHttpRequest();

        ajax.open(eHttoRequest.post, url, true);
        ajax.setRequestHeader('Content-type', 'application/json'); //x-www-form-urlencoded

        ajax.send(JSON.stringify({ data : objec }));

        ajax.onreadystatechange = function () {

            if (ajax.readyState == 4 && ajax.status == 200) {
                var data = ajax.responseText;

                resolve(data);
            }
            else if (ajax.readyState == 4) {
                reject(ajax.status);
            }
        }
    });
    return post;
}

let queryParametres = function (text) {
    let self = globalThis.AtlasApp;
    let right, left, p1, p2, arg, response;

    if (text.includes('{{') && text.includes('}}')) {
        p1 = text.indexOf('{{');
        p2 = text.indexOf('}}') + 2;

        left = text.substring(0, p1);
        right = text.substring(p2, text.length);
        arg = text.substring(p1, p2);

        response = self.sys.queryParametres.text(arg);

        text = left + response + right;
    }

    if (text.includes('{{') && text.includes('}}')) {
        text = self.sys.queryParametres(text);
    }

    return text;
}

let queryParametrestext = function (text) {
    let self, prop, x, y, f, func, response;
    self = globalThis.AtlasApp;


    if (text.includes('{{') && text.includes('}}')) {
        x = text.indexOf('{{');
        y = text.indexOf('}}');
        f = text.substring(x + 2, y);

        f = self.sys.queryParametres.validarText(f);

        if (typeof f == 'object') {
            return f.response;
        }

        if(f.includes('-') || f.includes('+') || f.includes('*') || f.includes('/') ){
            return queryParametresOperacoes(f);
        }

        if(f.includes('==') || f.includes('!=') || f.includes('>') || f.includes('<') || f.includes('<=') || f.includes('>=') )
        {
           return queryParametrescondicoesMult(f) 
        }

        if(f.includes('[') && f.includes(']')){
            return queryParametresarray(f);
        }

        if (f.includes('.')) {
            return self.sys.queryParametres.prop(f);
        }
        else if (typeof f == 'function' || f.includes('(') || f.includes(')')) {
            return self.sys.queryParametres.function(f);
        }
        else {
            prop = f;
        }
    }
    else {
        prop = text;
    }

    response = globalThis[prop];

    if (response == null) {
        return self.log( eHttoRequest.warn , `QueryParametres :: propriedad '${prop}' undefined.`);
    }
    else if (typeof response == 'function') {
        return self.sys.queryParametres.function(response);
    }
    return response;
}

let queryParametresvalidarText = function (data) {
   let  text = data.toLowerCase();
    if (text == 'false')
        return { response: false };

    else if (text == 'true')
        return { response: true };

    try {
        // let value = parseInt(text);
        // 
        //  if(value == NaN) 
        throw 'invalide';
        //
        // return {response: value};
    }
    catch (e) {
        return data;
    }
}

let queryParametresarray = function(text)
{
    let variavel = text.split('[')[0];
    let begin = text.indexOf('[') + 1;
    let end = text.indexOf(']' , begin - 1);
    let arg = text.substring(begin , end);
    let isNumeric;

    let arr = globalThis[variavel];

    try{
        isNumeric = parseInt(arg);
    }catch(e){}

    if(typeof isNumeric == 'number' && !isNaN(isNumeric))
    {
        return arr[isNumeric];
    }
    else{
        let r = eval(arg);

        return arr[r];
    }
}

let queryParametresOperacoes = function(text) {
    
    let sinal ;

    if(text.includes('+'))
        sinal = '+';
    else if(text.includes('-'))
        sinal = '-';
    else if(text.includes('/'))
        sinal = '/';
    else if(text.includes('*'))
        sinal = '*';

    let arg1 = text.split(sinal)[0].trim();
    let arg2 = text.split(sinal)[1].trim();

    return eval(`${arg1} ${sinal} ${arg2}`);
}

let queryParametrescondicoesMult = function(text) {
    if(text.includes('&&'))
    {
        let args = text.split('&&');
        let cond = [];
        args.map(e => {
           cond.push( queryParametrescondicoes(e) );        
        })

        let r = cond.filter(e => e == false);
        return r.length > 0 ? false : true;
    }
    else {
        return queryParametrescondicoes(text);    
    }
}

let queryParametrescondicoes = function(text) {
    let sinal;

    if(text.includes('=='))
        sinal = '==';
    else if(text.includes('!='))
        sinal = '!=';
    else if(text.includes('<'))
        sinal = '<';
    else if(text.includes('>'))
        sinal = '>';
    else if(text.includes('<='))
        sinal = '<=';
    else if(text.includes('>='))
        sinal = '>=';

    let arg1 = text.split(sinal)[0].trim();
    let arg2 = text.split(sinal)[1].trim();
    
    return eval(`${arg1} ${sinal} ${arg2}`);
}

let queryParametresprop = function (params) {
    let args, self, e, l, i, r;

    self = globalThis.AtlasApp;

    args = params.split('.');
    e = globalThis[args[0]];

    args[0] = null;

    l = args.length - 1;
    i = 0;
    r = null;

    args.map(arg => {
        if (arg != null) {
            i++

            if (i == l) {
                if (typeof e[arg] == 'function' || arg.includes('(') || arg.includes(')')) {
                    r = self.sys.queryParametres.function(e[arg])
                }
                else 
                {
                    e = e[arg];    
                }
            }
            else {
                e = e[arg];
            }
        }
    })

    return r != null ? r : e;
}

let queryParametresfunction = function (params) {
    let self, prop, fun, response;
    self = globalThis.AtlasApp;

    if (typeof params != 'function' && params.includes('(') && params.includes(')')) {
        prop = params.split('(')[0];
        fun = params.split('(')[1];
        fun = fun.split(')')[0];

        response = eval(('prop(' + fun + ')'));

    }
    else {
        response = params();
    }

    if (response == null) {
        self.log(eHttoRequest.warn ,`sys.queryParametres.function :: função sem retorno`);
        return '';
    }

    return response;
}

let pagErroCodView = function (cod, text) {
    let self = globalThis.AtlasApp;
    let e = document.getElementsByTagName('body')[0];

    let data = document.createElement('div');
    let tipo = document.createElement('h1');
    let descricao = document.createElement('h5');
    let section = document.createElement('section');

    tipo.innerText = cod;
    descricao.innerText = text;
    // section.innerHTML = `<button data-rout=\'${self.index}\'>home</button>`
    data.appendChild(tipo)
    data.appendChild(descricao);
    data.appendChild(section);

    e.innerHTML = null;
    e.appendChild(data);

}

export { OnGet , OnPost , pagErroCodView , apiQuery , queryParametres , queryParametrestext 
    , queryParametresvalidarText , queryParametresfunction , queryParametresprop}