
window.funcs = {
     append(childs_) {
          childs_ = !childs_?[]: typeof childs_=='string'?  [childs_]:
                      !Array.isArray(childs_)&&typeof childs_=='object'?       Object.entries(childs_):childs_
                      Array.isArray(childs_)&&typeof childs_[0]=='string'?       childs_.mapDOM():childs_
          childs_.forEach(elt=>{this.appendChild(elt[1])})
     }
}

Array.prototype.mapDOM_ = function(){
     const o = {}
     for(eltName of this)
          o = {...o, [eltName]: document.createElement(eltName)}
     return o
}
Array.prototype.mapDOM = function(){
     const name = "mapDOM"
     window.dom = window.dom || {}
     this.forEach(
          (eltName)=>
               {
                    if(eltName.indexOf(':') == -1)      window.dom[eltName] = document.createElement(eltName)
                    else{
                         let [eltName___, ...attrs] = eltName.split(':').length == 2 
                              ? eltName.split(':') 
                              : [new Error(`error, the formats not suitable for prototype.mapDOM: ${eltName}, ${eltName.split(':')}, ${eltName.split(':').lentgth}`), false]
                         window.dom[eltName___+'_'+attrs[0]] = document.createElement(eltName___)
                         switch(eltName___){
                              case"input":
                                   window.dom[eltName___+'_'+attrs[0]].type = attrs[0]
                                   window.dom[eltName___+'_'+attrs[0]].name = (
                                        ['file', 'submit'].filter(    attrType => 
                                             attrType.indexOf(attrs[0]) == -1 ?                false:true
                                        )
                                   )
                                   .map( filteredAttrType => 'input_' + filteredAttrType )
                              break
                              case"label":
                                   window.dom[eltName___+'_'+attrs[0]].for = 'input_file'
                              break
                              case"":
                              break
                              default:
                                   window.dom[eltName___+'_'+attrs[0]].textContent = attrs[0]
                              break
                         }

                         window.dom[eltName___+'_'+attrs[0]].append = funcs.append.bind(window.dom[eltName___+'_'+attrs[0]].funcs)
                    }
                    if(window.dom[eltName]) window.dom[eltName].append=funcs.append.bind(window.dom[eltName])
               }
          )
          return window.dom
}















