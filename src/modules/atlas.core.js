import { eLogs } from "../enum/atlas.enum";
/**
 * Carregar variaveis de configuracao
 * @param {object} ob 
 * @param {object} self 
 */
let vars = function (ob, self) {

    self.root       = ob.hasOwnProperty('root')     ? ob.root       : window.location.href;
    self.id         = ob.hasOwnProperty('id')       ? ob.id         : '#load-html';
    self.index      = ob.hasOwnProperty('index')    ? ob.index      : 'index';
    self.urlName    = ob.hasOwnProperty('urlName') ? (Array.isArray(ob.urlName) ? ob.urlName : ['index']) : ['index'];

    self.master     = ob.hasOwnProperty('master')   ? ob.master     : null;
    if(master != null)
        self.master.url = formatarLink( self , self.master.url);

    let modulesJson = ob.hasOwnProperty('modulesJson') ? ob.modulesJson : null;
    if(modulesJson != null)
        self.modulesJson= formatarLink( self , modulesJson);
    
    self.dataModules = new Set();

    self = formatarRotas(self , ob);
    self = formatarScripts(self , ob)
    self = formatarLinksCss(self , ob);
    self = formatarLinksPartialViews(self , ob);

    self.logView('atlas config var ok!');
    
    self.cache = ob;

    return self.core;
};
/**
 * formatar links com ./ para raiz root 
 * @param {object} self 
 * @param {string} link 
 */
let formatarLink = ( self , link ) => {
    if(link.includes('./')){
        return link.replace( './' , self.root);
    }

    return link;
}

let formatarRotas = ( self , ob ) => {
    let rotas;

    rotas = ob.hasOwnProperty('rout') ? ob.rout : self.log('Rout paramentros invalido', erros.fatal);

    rotas.map( rota => {
        rota.url = formatarLink( self , rota.url); 
    })

    self.rout = rotas;
    return self;
}

let formatarScripts = (self , ob) => {
    let script , resp = [];
    
    script = ob.hasOwnProperty('required') ? (Array.isArray(ob.required.scripts) ? ob.required.scripts : [ob.required.scripts]) : new Array();
    
    script.map(e => {
        resp.push( formatarLink( self , e ) )
    })

    self.scripts = resp;
    return self;
}

let formatarLinksCss = ( self , ob) => {
    let keysLinks , resp = [];

    keysLinks = self.links = ob.hasOwnProperty('required') ? (Array.isArray(ob.required.links) ? ob.required.links : [ob.required.links]) : [];
    
    keysLinks.map( key => {
        resp.push( formatarLink( self , key) );
    })

    self.links = resp;
    return self;
}

let formatarLinksPartialViews = ( self , ob ) => {
    let views ;
   
    self.partialViews = {};
    self.partialViews.views = [];
    views = [...(ob.hasOwnProperty('required') ? (ob.required.hasOwnProperty('partialViews') ? ob.required.partialViews : []) : [])];
    
    views.map( v => {
        v.view = formatarLink( self , v.view);
    })

    self.partialViews.objs = views;
    return self;
}
// end format

let csspageLoad = ".atlas-load{position:absolute;top:0;margin:0;padding:0;background:#1d81af;height:100vh;width:100%;display:grid;place-content:center;overflow:hidden}.box:after{content:'';width:10px;height:100px;border-top:5px solid transparent;animation:in-out 3s linear infinite;position:absolute}.box:nth-child(1){transform:rotate(0)}.box:nth-child(1):after{border-color:#9fd}.box:nth-child(2){transform:rotate(7.2deg)}.box:nth-child(2):after{border-color:#99ffdf}.box:nth-child(3){transform:rotate(14.4deg)}.box:nth-child(3):after{border-color:#99ffe0}.box:nth-child(4){transform:rotate(21.6deg)}.box:nth-child(4):after{border-color:#99ffe2}.box:nth-child(5){transform:rotate(28.8deg)}.box:nth-child(5):after{border-color:#99ffe4}.box:nth-child(6){transform:rotate(36deg)}.box:nth-child(6):after{border-color:#99ffe6}.box:nth-child(7){transform:rotate(43.2deg)}.box:nth-child(7):after{border-color:#99ffe7}.box:nth-child(8){transform:rotate(50.4deg)}.box:nth-child(8):after{border-color:#99ffe9}.box:nth-child(9){transform:rotate(57.6deg)}.box:nth-child(9):after{border-color:#99ffeb}.box:nth-child(10){transform:rotate(64.8deg)}.box:nth-child(10):after{border-color:#99ffec}.box:nth-child(11){transform:rotate(72deg)}.box:nth-child(11):after{border-color:#9fe}.box:nth-child(12){transform:rotate(79.2deg)}.box:nth-child(12):after{border-color:#99fff0}.box:nth-child(13){transform:rotate(86.4deg)}.box:nth-child(13):after{border-color:#99fff1}.box:nth-child(14){transform:rotate(93.6deg)}.box:nth-child(14):after{border-color:#99fff3}.box:nth-child(15){transform:rotate(100.8deg)}.box:nth-child(15):after{border-color:#99fff5}.box:nth-child(16){transform:rotate(108deg)}.box:nth-child(16):after{border-color:#99fff7}.box:nth-child(17){transform:rotate(115.2deg)}.box:nth-child(17):after{border-color:#99fff8}.box:nth-child(18){transform:rotate(122.4deg)}.box:nth-child(18):after{border-color:#99fffa}.box:nth-child(19){transform:rotate(129.6deg)}.box:nth-child(19):after{border-color:#99fffc}.box:nth-child(20){transform:rotate(136.8deg)}.box:nth-child(20):after{border-color:#99fffd}.box:nth-child(21){transform:rotate(144deg)}.box:nth-child(21):after{border-color:#9ff}.box:nth-child(22){transform:rotate(151.2deg)}.box:nth-child(22):after{border-color:#99fdff}.box:nth-child(23){transform:rotate(158.4deg)}.box:nth-child(23):after{border-color:#99fcff}.box:nth-child(24){transform:rotate(165.6deg)}.box:nth-child(24):after{border-color:#99faff}.box:nth-child(25){transform:rotate(172.8deg)}.box:nth-child(25):after{border-color:#99f8ff}.box:nth-child(26){transform:rotate(180deg)}.box:nth-child(26):after{border-color:#99f7ff}.box:nth-child(27){transform:rotate(187.2deg)}.box:nth-child(27):after{border-color:#99f5ff}.box:nth-child(28){transform:rotate(194.4deg)}.box:nth-child(28):after{border-color:#99f3ff}.box:nth-child(29){transform:rotate(201.6deg)}.box:nth-child(29):after{border-color:#99f1ff}.box:nth-child(30){transform:rotate(208.8deg)}.box:nth-child(30):after{border-color:#99f0ff}.box:nth-child(31){transform:rotate(216deg)}.box:nth-child(31):after{border-color:#9ef}.box:nth-child(32){transform:rotate(223.2deg)}.box:nth-child(32):after{border-color:#99ecff}.box:nth-child(33){transform:rotate(230.4deg)}.box:nth-child(33):after{border-color:#99ebff}.box:nth-child(34){transform:rotate(237.6deg)}.box:nth-child(34):after{border-color:#99e9ff}.box:nth-child(35){transform:rotate(244.8deg)}.box:nth-child(35):after{border-color:#99e7ff}.box:nth-child(36){transform:rotate(252deg)}.box:nth-child(36):after{border-color:#99e6ff}.box:nth-child(37){transform:rotate(259.2deg)}.box:nth-child(37):after{border-color:#99e4ff}.box:nth-child(38){transform:rotate(266.4deg)}.box:nth-child(38):after{border-color:#99e2ff}.box:nth-child(39){transform:rotate(273.6deg)}.box:nth-child(39):after{border-color:#99e0ff}.box:nth-child(40){transform:rotate(280.8deg)}.box:nth-child(40):after{border-color:#99dfff}.box:nth-child(41){transform:rotate(288deg)}.box:nth-child(41):after{border-color:#9df}.box:nth-child(42){transform:rotate(295.2deg)}.box:nth-child(42):after{border-color:#99dbff}.box:nth-child(43){transform:rotate(302.4deg)}.box:nth-child(43):after{border-color:#99daff}.box:nth-child(44){transform:rotate(309.6deg)}.box:nth-child(44):after{border-color:#99d8ff}.box:nth-child(45){transform:rotate(316.8deg)}.box:nth-child(45):after{border-color:#99d6ff}.box:nth-child(46){transform:rotate(324deg)}.box:nth-child(46):after{border-color:#99d5ff}.box:nth-child(47){transform:rotate(331.2deg)}.box:nth-child(47):after{border-color:#99d3ff}.box:nth-child(48){transform:rotate(338.4deg)}.box:nth-child(48):after{border-color:#99d1ff}.box:nth-child(49){transform:rotate(345.6deg)}.box:nth-child(49):after{border-color:#99cfff}.box:nth-child(50){transform:rotate(352.8deg)}.box:nth-child(50):after{border-color:#99ceff}@keyframes in-out{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}";
/**
 * @param {object} self 
 */
let pagLoad = function(self) {
    let e = document.getElementsByTagName('body')[0];
    let load = document.createElement('div');
    let head = document.getElementsByTagName('head')[0];

    let style = document.createElement('style');
    style.setAttribute('id' , 'style-atlas');
    style.innerHTML = csspageLoad;

    let body = document.createElement('div');
    body.setAttribute('class' , 'main');

    for(let x = 0 ; x < 50 ; x++){
        let div = document.createElement('div');
        div.setAttribute('class' , 'box');

        body.appendChild(div);
    }

    load.setAttribute('id' , 'atlas-load-body');
    load.setAttribute('class' , 'atlas-load');
   
    load.appendChild(body);
    e.appendChild(load);
    head.appendChild(style);
   
    return self;
};
/**
 * @param {object} self 
 */
let removePagLoad = function (self) {  
    
    setTimeout( function() {
        let body = document.getElementById('atlas-load-body');
        let style = document.getElementById('style-atlas');

        body.innerHTML = null;    
        style.innerHTML = null;
    
    } , 3000 );
    return self;
}
/**
 * Carregar rotas
 * @param {object} self 
 */
let loadRouts = async function (self) {
    let rout = self.rout;
    let length = self.rout.length;
    let i = 0;

    rout.map(item => {
        self.sys.OnGet( item.url )
            .then((data) => {

                let value = data[0];
                let route = verificarHtmlScript( item , value );
                self.sys.view.add(route);

                i++;
                if (i == length) return true;

                return false;
            })
            .then((data) => {
                self.logView('Atlas - route init');
                let index = null;

                if (data) {
                    index = self.core.rout(self.index);
                    self.core.setRoutView(index);

                    return data;
                }
            })
            .catch((data) => console.warn(data));
    });
    return self;
}
/**
 * Verificar se existe algum script no html
 * caso ache algum script, remove ele do html(formartarHtmlScript) e passa para o objeto Route
 * @param {object(route)} route 
 * @param {string} data html da view
 */
let verificarHtmlScript = function (route , data ) {

    route.script = [];
    route.data = data;
    route.scriptIsSet = false;

    while(data.includes('<script>')){
        let ob = formartarHtmlScript(data);
//// ? verificar 
        data = ob.data;
        route.script.push(ob.script);
    }

    return route;
};

/**
 * Remover o script do html
 * @param {string} data html da view
 * @returns { object } data : html formatado sem script, script : texto script 
 */
let formartarHtmlScript = function(data){
    const sc = '<script>';
    const scf = '</script>';

    let begin = data.indexOf(sc) + sc.length;
    let end = data.indexOf(scf , begin);

    let script = data.substring(begin , end);
    let dataNew = data.substring(0 , begin - sc.length) + data.substring(end + scf.length , data.length);  
    
    return { data : dataNew , script : script };
}


/**
 * Recuperar Rout
 * @param {string} path da url da rora
 */
let rout = function (path) {
    let self = globalThis.AtlasApp;
    let response = null;

    for (let r of self.sys.view) {
        if (r.path == path) {
            response = r;
        }
    }
    
    return response == null ? {
        title: 'notFound' , 
        data : '<h1>Página não encontrada</h1>' ,
        path : '/index' ,
        name : 'nout Found'
    } : response;
}

/**
 * Gerar rout na tela
 * @param {objec} rout
 */
let setRoutView = function (rout, callBack = null) {

    let self = globalThis.AtlasApp;
    let element = document.getElementById(self.id);
    let title = document.getElementsByTagName('title')[0];
    let urlParamtres = window.location.search;

    if (typeof rout != 'object')
        rout = self.core.rout(rout);

    if (typeof callBack == 'object' || callBack == null)
        callBack = self.core.onloadRout;

    if (rout.title != null)
        title.innerHTML = rout.title;

    element.innerHTML = rout.data;

    window.history.pushState("object or string", rout.title, `${rout.path}${urlParamtres}`);

    setScript(rout);

    self.logView(`rota '${rout.name}' carregada com sucesso.`);
    
    
    try {
        if (typeof callBack == 'function')
            callBack();

    } catch (e) { console.warn(e) }

    self.path = rout.path;
    self.core.onloadRoutExecultScript(self);
    //self.core.execultCache(self);
}
/**
 * gerar script do objeto route no body caso ele não exista
 * @param {object} route 
 */
let setScript = function (route) {
    let e = document.getElementById(`script-route-${route.name}`);

    if( e == null && route.script.length > 0 ){
        let script = document.createElement('script');
        let b = document.getElementsByTagName('body')[0];

        script.type = 'text/javascript';
        script.setAttribute('id' , `script-route-${route.name}`);

        let textScript ;

        route.script.map( e => { textScript += e });

        script.innerHTML = textScript

        b.appendChild(script);
    }
}
/**
 * callbak : execulta quando a rout e carregada
 */
let onloadRout = async function () {

    let init = new Promise((resolve, reject) => {
        
        let self = globalThis.AtlasApp;
        let r = true;

        while(r){
            try{
                r = self.sys.apiQuery()
            }catch(e){
                console.warn(e);
                r = false;
            }
        };

        resolve(self);
    })

    setTimeout(() => {
        let self = globalThis.AtlasApp;
        self.sys.apiQuery();

    }, 1000);

    return await Promise.all([init]);
}

/**
 * Execultar funcao pre definida ao carregar a route
 * @param {string} name 
 * @param {function} func 
 */

let onloadRoutImportScript = function( name , func){
    let self = globalThis.AtlasApp;

    self.core.routScript[name] = func;

    self.core.onloadRoutExecultScript(self);

    return self;
}
// execultar funcao acima
let onloadRoutExecultScript = function( self ){
    let name = self.path; 
    let fn = self.core.routScript[name];

    if(typeof fn == 'function')
        fn();

    return self;
}
/**
 * Carregar modulos 
 * @param {object} self 
 */
let loadModules = async function (self) {
    if (self.modulesJson == null) return self.core;

    let url = self.modulesJson;
    let modules = fetch(url);

    self.logView('atlas load modules init.');

    await modules
        .then((data) => {
            
            if(data.status != 200)
            {
                throw `erro ao carregar modulo :: ${data.statusText}`;
            }

           return data.json();
        })
        .then((data) => {

            let urlBase = data.urlPathModule;
            let modules = data.modules;

            let body = document.getElementsByTagName('body')[0];

            modules.map(mod => {

                let script = document.createElement('script');
                script.src = `${urlBase}${mod.path}`;

                self.logView(`atlas load modules '${mod.Name}' ok `);

                body.appendChild(script);
            });
            return self;
        })
        .catch((err) => console.warn(err));

    return self;
}

/**
 * Carregar links css|less
 * @param {object} self 
 */
let loadLinks = function (self) {

    let head = document.getElementsByTagName('head')[0];

    self.links.map(link => {

        let linkcChild = document.createElement('link');

        if (link.includes('.less')) {
            linkcChild.rel = 'stylesheet/less';
        }
        else if (link.includes('.css')) {
            linkcChild.rel = 'stylesheet';
        }
        else {
            self.log(`${link} aparentemente não é um link/arquivo css`, erros.warn)
        }
        linkcChild.type = 'text/css';
        linkcChild.href = `${link}`;

        head.appendChild(linkcChild);

        let name = link.split('/');
        name = name[name.length - 1];

        self.logView(`atlas load link css '${name}' ok.`);
    })

    return self;
};
/**
 * Carregar scripts
 * @param {object} self 
 */
let loadScripts = function (self) {

    let body = document.getElementsByTagName('body')[0];

    self.scripts.map(script => {
        let scriptChid = document.createElement('script');
        scriptChid.src = `${script}`;

        body.appendChild(scriptChid);


        let name = script.split('/');
        name = name[name.length - 1];

        self.logView(`atlas load script '${name}' ok.`);
    });

    return self;
}

/**
 * Importar modulos para app
 * @param {string} name nome do mudulo
 * @param {function} newModule funcao do modulo
 */
let importModules = function (name, newModule, callBack = '') {
    let self = globalThis.AtlasApp;

    self.mod[name] = newModule;

    if (typeof callBack == 'function') {
        callBack();
    }
}
/**
 * Carregar partial views
 * @param {object} self 
 */
let partialViews = async function (self) {
    //let self = globalThis.AtlasApp;
    let objs = self.partialViews.objs;
    let e = document.getElementById(self.id);

    let promise = new Promise((resolve, reject) => {
        try {
            objs.map(obj => {

                self.sys.OnGet(obj.view)
                    .then((data) => {

                        let ids = obj.ids;
                        e.innerHTML = data;

                        ids.map(id => {
                            obj.data = document.getElementById(id);

                            self.partialViews.views[`${obj.name}.${id}`] = obj.data;
                        })


                    });
            });
            resolve(self);
            e.innerHTML = null;
        }
        catch (e) { reject(e) }
    });

    promise
        .then((data) => data)
        .catch((data) => {
            console.log(data);
            return globalThis.AtlasApp;
        })

    return await Promise.all([promise]);
}
/**
 * Carregar componentes - aux para partialViews
 * @param {object} self 
 * @param {string} data : html da partialView 
 * @param {string} component : html do component a ser substituido 
 */
let component = function (self , data , component ) {  
    if(component.length > 0)
    {
        component.map(e => {
            let p = e.split('=')[0];
            let value = e.split('=')[1];
            let prefix = `{{${p}}}`;

            data = data.replace(prefix , value);
        })
    }

    return data;
}
/**
 * Carregar partialView no html
 * @param {string} value : nome da partial view 
 * @param {object} element : objeto a onde sera inserido a partialView
 */
let getPartial = function (value, element) {
    let self = globalThis.AtlasApp;
    let name = value;
    let component = element.dataset.component;
    let insertChild = element.dataset.insertchild;
    let partial = document.createElement('div');

    if (self.partialViews.views[name] == null) {
        return console.warn(`partial view : ${name} não encontrada.`);
    }

    partial.innerHTML = self.partialViews.views[name].innerHTML;

    if(component != null)
    {
        component = component.split(';');

        partial.innerHTML = self.core.component(self , partial.innerHTML , component);
    }

    if(insertChild == null || insertChild == 'bottom')
    {
        element.appendChild(partial);
    }
    else if(insertChild == 'top'){
        element.insertBefore( partial , element.firstChild );
    }
    else{
        console.warn(`insertChild: ${insertChild}, não reconhecido`);
        element.appendChild(partial);
    }
}
/**
 * Carregar master page
 * @param {objec} self 
 */
let loadMaster = async function(self) {
    
    if(self.master == null)
        return self;
    
    let id = self.master.idInsert;
    let e = document.getElementById(id);

    if(e == null){
        self.log(eLogs.fatal , `Não foi possivel pegar o ID : ${id}`);
        return self;
    }

    let data = await self.sys.OnGet(self.master.url);

    e.innerHTML = data;

    return self;
}
/**
 * addicionar funcao ao chache
 * @param {function} func 
 */
let addCache = function( func ) {
    let self = globalThis.AtlasApp;

    if(typeof func != 'function') return console.warn('func não e uma função!');

    self.sys.cache.push( func );

    return self;
}
/**
 * Execultar funcoes que estao no cache
 * @param {object} self 
 */
let execultCache = function( self ) {
    let cahce = self.sys.cache;

    cahce.forEach( fn => {
        
        fn();
    });

    return self;
}

export { 
    loadModules 
    , setRoutView 
    , loadRouts 
    , rout 
    , onloadRout 
    , loadLinks 
    , loadScripts 
    , partialViews 
    , getPartial 
    , importModules 
    , vars 
    , pagLoad 
    , removePagLoad
    , loadMaster
    , component 
    , onloadRoutImportScript
    , onloadRoutExecultScript
    , addCache 
    , execultCache };