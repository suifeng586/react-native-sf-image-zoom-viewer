export default class SFZiCache{

    static cache = {};
    static insertImage = (key,value) => {
        SFZiCache.cache[key] = value;
    }
    static getImage = (key) => {
        if (SFZiCache.cache.hasOwnProperty(key)){
            console.log(key,SFZiCache.cache[key])
            return SFZiCache.cache[key];
        }else{
            return null;
        }

    }

}

