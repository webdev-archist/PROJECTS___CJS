Array.prototype.mapDOM = function(){
     return this.map(
          (x)=>
               document.createElement(x)
     )
}