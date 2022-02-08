String.prototype.mapDOM = function(){
	this = this.map((x){
		alert('ok')
		
	})
     return this.map(
          (x)=>
               document.createElement(x)
     )
}