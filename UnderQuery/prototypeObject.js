Object.prototype.jsonDOM = function(){
     this[Symbol.iterator] = function(){

     }
     this.next = function(){

     }
     // const o = {}
     // for(name of this)
     //      o = {...o, [name]: document.createElement(name)}
     //      return o
     return document.createElement('div')
}