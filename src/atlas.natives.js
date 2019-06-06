

let start = function (e = this) {
    
    let self = e;

    let init = new Promise((resolve, reject) => {
        console.log('Atlas is start!');

        resolve(self);
    });

    self.core.init = init;

    self.core.init
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

export { start };
