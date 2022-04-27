class Storage{
    constructor(){
        this.isSupported();
    }
    isSupported(){
        if(typeof localStorage == 'undefined'){
            return 0;
        }
    }
    //expires以day为单位
    set(key,val,expires){
        let stamp = new Date().getTime();
        let obj = {
            val:val,
            stamp:stamp,
            way:'webStorageCache',
            expires:expires,
        }
        let str = JSON.stringify(obj);
        localStorage.setItem(key,str);
    }
    get(key){
        let obj = this.getObj(key);
        let val = obj['val'];
        return val;
    }
    delete(key){
        localStorage.removeItem(key);
    }
    deleteAllExpires(){
        for (let key in localStorage) {
            if(this.isWSC(key) && !this.isValid(key)){
                localStorage.removeItem(key);
            }
        }
    }
    clear(){
        for (let key in localStorage) {
            localStorage.removeItem(key);
        }
    }
    //验证是否为webStorageCache
    isWSC(key){
        let str = localStorage.getItem(key);
        if(str === null){
            return false
        }else if(str.indexOf('webStorageCache') === '-1'){
            return false;
        }else{
            return true;
        }
    }
    //拿到对象 验证是否为webStorageCache 防止JSON.parse报错
    getObj(key){
        if(this.isWSC(key)){
            let str = localStorage.getItem(key);
            let obj = JSON.parse(str);
            return obj;
        }
    }
    isValid(key){
        if(this.isWSC(key)){
            let obj = this.getObj(key);
            const timeSum = obj['expires']*24*60*60*1000 + obj['stamp'];
            let now = new Date().getTime();
            if(now <= timeSum){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    touch(key,expires){
        if(this.isValid(key)){
            let obj = this.getObj(key);
            obj['expires'] = expires;
            let val = obj.val;
            this.set(key,val,expires);
        }
    }
    add(key,val,expires){
        if(!this.isWSC(key) || !this.isValid(key)){
            this.set(key,val,expires);
        }
    }
    replace(key,val){
        if(this.isWSC(key)&&this.isValid(key)){
            let obj = this.getObj(key);
            expires = obj['expires'];
            this.set(key,val,expires);
        }
    }
}
// localStorage.setItem('wo',88)
// let storage = new Storage();
// storage.set('nanlei',[1],2);
// storage.set('nl',false,0)
// storage.get('nanlei');
// storage.get('nl')
// storage.touch('nanlei',2)
// console.log(storage.isWSC('nanlei'));
// storage.add('wo',null,4)
// storage.add('nanlei',null,4)
// storage.replace('nanlei',[3])