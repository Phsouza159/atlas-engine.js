/**
 * ALTAS ENGINE - 2019
 * VERSION : 1.0.0
 * 
 * By : Paulo Henrique R.
 * pauloh159@live.com
 * 
 *  * PROJETO DE ESTUDOS *
 */

"use strict";

import { start } from './atlas.natives';
import { eLogs, eHttoRequest } from './enum/atlas.enum';
import * as core from './modules/atlas.core';
import * as sys from './modules/atlas.sys';
import * as mod from './modules/atlas.mod';

(function () {

    let cahceAtlas ;

    /**
     * Construtor
     * @param {object} args 
     */
    function AtlasCtor(args) {

        if(AtlasApp != null)
            AtlasApp = cahceAtlas;

        try{
            AtlasApp = new AtlasApp(args);

            window.AtlasApp = AtlasApp

            AtlasApp.start(AtlasApp);

        }catch(e)
        {
            new AtlasApp().sys.pagErroCodView(503 , `<b>Erro interno</b><p>Mensagem: ${e} </p>`);
        }
    };

    /**
     * 
     * @param {object} args 
     */
    var AtlasApp = function (args) {
        if (args != null) {

            if (typeof args != 'object')
                this.log('args não é um objeto', eLogs.fatal);

            this.core.pagLoad(this);

            this.logView('atlas init!');

            this.core.vars(args, this);
            
        }
        else {
            console.warn('Atlas is start. configuracao não pode ser null')
        }
        return this;
    };

    AtlasApp.prototype.log = function (cod, text) {
        let log = [
        /* 000 - log */ (text) => { console.log(text); },
        /* 001 - log */ (text) => { console.info(text); },
        /* 002 - log */ (text) => { console.warn(text); },
        /* 003 - log */ (text) => { console.error(text); },
        ];

        cod = cod == null ? 3 : cod;

        try {
            log[cod](text);
        }
        catch (e) {
            console.warn(e);
        }
    }

    AtlasApp.prototype.setCookie = function(name , value , duration = null) {
        let cookie = `${name}=${escape(value)}`;

        document.cookie = cookie;
    }

    AtlasApp.prototype.getCookie = function(name) {
        let cokies = document.cokie;
        let prefix = `${name}=`;
        let begin = cokies.indexOf(`;${prefix}`);

        if(begin == -1)
        {
            begin = cokies.indexOf(prefix);

            if(begin != 0)
            {
                return null;
            }
        }else {
            begin += 2;
        }

        let end = cokies.indexOf(';' , begin);

        if(end == -1)
        {
            end = cokies.length;
        }

        return unescape(cokies.substring(begin + prefix.length , end));
    }

    AtlasApp.prototype.logView = function (text) {
        //let id = 'atlas-log', element, p;
        //element = document.getElementById('atlas-log');
        //p = document.createElement('p');
        //p.innerText = text;
        console.log(text);
        // element.appendChild(p);
    }

    let listObjetoDestruir = [
        (self) => document.getElementById('style-atlas'),
        (self) => document.getElementById('atlas-load-body'),
        (self) => [...document.querySelectorAll('[data-insertatlas]')],
        (self) => document.getElementById(self.id), 
        (self) => {
            let names    = self.rout.map(e => e.name);
            let elements = names.map(e => document.getElementById(`script-route-${e}`));
            return elements;
        }
    ];

    let removerElementoDOM = (e) => {
        if(e != null && typeof e == 'object')
        {
            let parent = e.parentNode;

            parent.removeChild(e);
        }
    }

    AtlasApp.prototype.destroir = () => {
        let self =  globalThis.AtlasApp;
        
        listObjetoDestruir.map( item => {
            let e = item(self);

            if(e != null && !Array.isArray(e) ){
                removerElementoDOM(e);
            }
            else if( Array.isArray(e)){
                e.map( i => {
                    removerElementoDOM(i);
                });
            }
        });
    }

    AtlasApp.prototype.start                    = start;
    AtlasApp.prototype.mod                      = {};
    AtlasApp.prototype.mod.for                  = mod.lacoFor;
    AtlasApp.prototype.mod.form                 = mod.form;
    AtlasApp.prototype.mod.setForm              = mod.setForm;
    AtlasApp.prototype.mod.cacheForm            = mod.cacheForm;
    AtlasApp.prototype.mod.sendJson             = mod.sendJson;
    AtlasApp.prototype.mod.dataSendJson         = mod.dataSendJson;
    AtlasApp.prototype.mod.get                  = mod.get;

    AtlasApp.prototype.core                     = function() {this.init = {}};
    AtlasApp.prototype.core.vars                = core.vars;
    AtlasApp.prototype.core.pagLoad             = core.pagLoad;
    AtlasApp.prototype.core.removePagLoad       = core.removePagLoad;
    AtlasApp.prototype.core.rout                = core.rout;
    AtlasApp.prototype.core.routScript          = {};
    AtlasApp.prototype.core.onloadRoutImportScript = core.onloadRoutImportScript;
    AtlasApp.prototype.core.onloadRoutExecultScript = core.onloadRoutExecultScript;
    AtlasApp.prototype.core.loadMaster          = core.loadMaster;
    AtlasApp.prototype.core.loadRouts           = core.loadRouts;
    AtlasApp.prototype.core.setRoutView         = core.setRoutView;
    AtlasApp.prototype.core.loadModules         = core.loadModules;
    AtlasApp.prototype.core.onloadRout          = core.onloadRout;
    AtlasApp.prototype.core.loadLinks           = core.loadLinks;
    AtlasApp.prototype.core.loadScripts         = core.loadScripts;
    AtlasApp.prototype.core.partialViews        = core.partialViews;
    AtlasApp.prototype.core.getPartial          = core.getPartial;
    AtlasApp.prototype.core.importModules       = core.importModules;
    AtlasApp.prototype.core.component           = core.component;
    AtlasApp.prototype.core.addCache            = core.addCache;
    AtlasApp.prototype.core.execultCache        = core.execultCache;
    AtlasApp.prototype.core.formatarLink        = core.formatarLink;

    AtlasApp.prototype.sys                      = function() {};
    AtlasApp.prototype.sys.cache                = [];
    AtlasApp.prototype.sys.view                 = new Set;
    AtlasApp.prototype.sys.OnGet                = sys.OnGet ;
    AtlasApp.prototype.sys.OnPost               = sys.OnPost;
    AtlasApp.prototype.sys.pagErroCodView       = sys.pagErroCodView;
    AtlasApp.prototype.sys.apiQuery             = sys.apiQuery;
    AtlasApp.prototype.sys.queryParametres      = sys.queryParametres;
    AtlasApp.prototype.sys.queryParametres.text = sys.queryParametrestext;
    AtlasApp.prototype.sys.queryParametres.prop = sys.queryParametresprop;
    AtlasApp.prototype.sys.queryParametres.function = sys.queryParametresfunction;
    AtlasApp.prototype.sys.queryParametres.validarText = sys.queryParametresvalidarText;
    
    cahceAtlas = AtlasApp;

    window.AtlasApp = AtlasApp;
    window.AtlasCtor = AtlasCtor;

})();