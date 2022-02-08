import CJS from '../CJS.js'
import A from './ELEMENTS/A.js'
import B from './ELEMENTS/B.js'
import Button from './ELEMENTS/Button.js'


export default class Elements extends CJS {


  // cb = (datas, option, OBJECT_NAME) => {
  //   let element = new OBJECT_NAME(option)
  //   return !option ? element._(datas) : element?.[option](datas)
  // }
  
  behaviors = {
    update: {
      contents: (e, datas) => {
        e.stopPropagation()
        let {element,cjs,position,selector,adminEmmets} = datas
        let {adminEmmetClasses, adminEmmetClasses_notClosesSaves_, adminEmmetClasses_notCloseSave, adminEmmetClasseAttrs, adminEmmetClasseCss, adminEmmetClasseClose, adminEmmetClasseSave} 
            = adminEmmets
        let cjsChild
        , isElementItSelf = e.target==element
        , closeSaveBottons = `
          <div class="saveit">💾</div>
          <div class="closeit">x</div>
        `, targetButtons = `
          <div class="attrs">attrs</div>
          <div class="css">css</div>
          <div class="apply">apply</div>
        `, elementButtons = closeSaveBottons+targetButtons

        //EMPECHER QUE L'ÉLÉMENT SOIT CLIQUER À NOUVEAU (CAR CELA ENTRAINE DES BUGS)
        // $(element).off('click');
        //FIN---pas très utiles finalement...
        console.log("zzzzzzzzzzzzzzzz");
        console.log(e.target);
        console.log(element);
        if(isElementItSelf){
          if($(e.target).find(adminEmmetClasseClose).length){
            console.log($(adminEmmetClasses));
            console.log(e.target.nodeName);
            $(e.target).find(">div>*").fadeOut()
            $(e.target).find(adminEmmetClasses_notClosesSaves_).fadeOut()
            $(e.target).find(adminEmmetClasses_notCloseSave).fadeIn()
          }else{
            $(e.target).prepend(elementButtons)
          }
        }else{
          //SI ON CLIQUE D'ABORD SUR UN SOUS-ÉLÉMENT ET QUE L'ÉLÉMENT LUI MÊME N'A PAS SES BOUTONS ADMIN
          //ALORS ON CRÉE D'ABORD TOUS LES BOUTONS D'ADMIN POUR L'ÉLÉMENT LUI-MÊME
          if(!$(element).find(adminEmmetClasseClose).length){
            $(element).prepend(elementButtons)
          }
          
          //2-PUIS ON ACTIVE OU CRÉE LES BOUTONS D'ADMIN POUR LE SOUS-ÉLÉMENTS DANS LES 2 CONDITIONS SUIVANTES
          if($(e.target).find(adminEmmetClasseAttrs).length){
            $(e.target).find(">div>*").fadeOut()
            $(e.target).find(adminEmmetClasses_notCloseSave).fadeToggle()
          }else{ 
            $(e.target).prepend(targetButtons)
          }
        }
        
        element.classList.add('modifying')
        
        console.log(!!cjs.childs);
        console.log(Object.keys(cjs.childs)==0);
        console.log(cjs.contents._);
        //CONDITION IF POUR SAVOIR S'IL S'AGIT D'UN ÉLÉMENT SANS ENFANT OU AVEC
        //111-SOIT UN ÉLÉMENT SANS ENFANT DÉFINI DANS LE CJS
        //222-SOIT, LORSQUE L'ÉLÉMENT LUI-MÊME(isElementItSelf) EST CLIQUÉ
        //333-ET QUE, L'ATTRIBUT 'contenus' DOIT IMP2RATIVEMENT AVOIR AU MOINS UN PARAMETÈRE 'contenus._'

        // alert(JSON.stringify(cjs.contents)+"\n"+e.target.nodeName)

        
        // if(false){}
        if(!cjs.contents){
          cjs.contents = {_: ""}
        }else if(!cjs.contents._){
          cjs.contents._ = ""
        }
        if((!cjs.childs || Object.keys(cjs.childs)==0) || isElementItSelf /*&& Object(cjs.contents).keys.length == 1*/){
          
          if(cjs.childs){
            //222-S'IL S'AGIT DE L'ÉLÉMENT LUI-MÊME QUI EST CLIQUÉ 
            //222-ET CE MÊME S'IL CONTIENT UNE PROPRIÉTÉ '.childs' DANS DANS SON cjs
          }else e.target.setAttribute('contenteditable', true)
          if(!isElementItSelf){
            alert("..erreur...évènement inattendu..\nIl est n'est supposé passé ici qu'un event 'click' sur l'élément lui-même(isElementItSelf).")
          }
          if(!e.target.behaviorUpdateEventsActived){
            this.addUpdateEventsToTarget(e, element,cjs,cjsChild,position,selector,adminEmmets)
          }
          // }else alert('kkjj')
        }else{
            // alert('yeheuuu'+e.target.nodeName)
            // alert('yeheuuu'+element.nodeName)
        //111-UN ÉLÉMENT AVEC ENFANTS DÉFINIS DANS LE CJS
        //222-OU S'IL S'AGIT D'UN DES ENFANTS DE L'ÉLÉMENT LUI-MÊME QUI EST CLIQUÉ
          _.each(cjs.childs,(cjsChild, emmet)=>{
            let path = emmet.split('>')
            , fullpath = ("body>"+element.parentNode.nodeName+">"+element.nodeName+emmet).toLowerCase()
            , tmp
            let matchEmmetTag = e.target.nodeName == path.at(-1).toUpperCase()
            , isElementContentsExist = (cjs.contents?.[e.target.nodeName.toLowerCase()] || cjs?.contents[cjsChild?.contents?.replace(/_/g,'')])
            , isChildCJSExistInDOM = document.querySelectorAll(fullpath).length
            , isChildExistInDOM = _.some(document.querySelectorAll(fullpath), (event)=>event.innerHTML==e.target.innerHTML)
            
            // alert(fullpath)
            if(matchEmmetTag
              && isElementContentsExist
              && isChildCJSExistInDOM
              && isChildExistInDOM
            ){
              e.target.cjsChild = cjsChild
              e.target.setAttribute('contenteditable', true)
              console.log(e.target.nodeName);
              console.log(e.target.behaviorUpdateEventsActived)
              if(!e.target.behaviorUpdateEventsActived)
                this.addUpdateEventsToTarget(e, element,cjs,cjsChild,position,selector,adminEmmets)
              // else 
                // alert('jj')
                // console.log(e.target.behaviorUpdateEventsActived);
            }
          })
        }
        e.target.focus()
      },
      attrs(e, element, position, selector){
        e.stopPropagation()
        console.log($(e.target).find('ul').length)
        if(e.target.className=="attrs"&&e.target.nodeName=="DIV"){
          let {cjs, element, target} = e.data
          , {childs, attrs: cjsRelatedAttrs} = cjs
          , $targets, matchedEmmet, $matchedTargets
          , $ul = $('<ul/>')
          
          cjsRelatedAttrs = typeof cjsRelatedAttrs == "undefined" ? [] : cjsRelatedAttrs
          
          $ul.append($('<li>+</li>').on('click',(ev)=>{
            ev.stopPropagation()
            $ul.append("<li><span contenteditable>key</span>: <span contenteditable>value</span></li>")
          }))
          /*.append($('<li>-</li>').on('click',(ev)=>{
            ev.stopPropagation()
            $ul.find(">li:last-of-type").remove()
          }))
          */

          console.log(cjs);
          console.log(element);
          console.log(target);
          _.each(childs, (obj, emmet)=>{
            // if(obj.attrs)alert(emmet)
            $targets = $(element).find(emmet)
            $targets.each((i, elt)=>{
              if(elt==target){
                matchedEmmet = emmet
                $matchedTargets = $targets
              }
            })
          })
          
          //SI L'ÉVÈNEMENT EST SUR UN ITEM (OU SOUS-ÉLEMENT (ENFANT))
          //SINON cjsRelatedAttrs CONTIENT DÉJÀ LES BONNES INFORMATIONS
          if(matchedEmmet){
            cjsRelatedAttrs = childs[matchedEmmet].attrs ? childs[matchedEmmet].attrs : []
          }else if(e.target.parentNode!=element){
            // childs[selector] = {attrs: [], contents: ''}
            alert("..erreur...évènement inattendu..\nvous essayez d'accéder aux attributs d'un élément non pris en compte dans les paramètres.")
          }
          _.each(cjsRelatedAttrs[position], (value, key)=>{
            $ul.append(`<li><span>${key}</span>: <span>${value}</span></li>`)
          })
          $(e.target).append($ul)

          console.log(e.target);
          console.log(e.target.outerHTML);
          console.log($(e.target).find('ul'));
          console.log('ii')
        }
      },
      // cfb(){/*Content-Form-Background*/},
      form(e){},
      background(e){},
      styles(e){
        e.stopPropagation()
        // alert('style')
        console.log('style'+e.target.nodeName)
      },
      datas(e){},
    },
    add: {
      items(){
        // alert('item')
        console.log('item')
      },
      events(){
        // alert('event')
        console.log('event')
      }
    },
    remove: {
      item(){
        // alert('remove')
        console.log('remove')
      }
    },
    applyChanges: (e, element,cjs,cjsChild,position,selector,adminEmmets) => {
      alert('okkk')
      let target = e.target.parentNode
      $(target).find(adminEmmets.adminEmmetClasses_notCloseSave).fadeOut()
      target.removeAttribute('contenteditable')

      let isElementItSelf = target==element
      , keys = $(target).find('>div.attrs>ul>li>span:first-of-type')
      , values = $(target).find('>div.attrs>ul>li>span:last-of-type')
      , cjsNew = {}
      , changes = target.innerHTML.replace(/<[^>]*>.*<\/[^>]*>/g, '').trim()
      _.each(keys, (key, i) =>{
        cjsNew[key.innerHTML] = values[i].innerHTML
      })
      if(_.findKey(cjs.childs,val=>val==cjsChild)){
        console.log(cjs.childs[_.findKey(cjs.childs,val=>val==cjsChild)]);
        cjs.childs[_.findKey(cjs.childs,val=>val==cjsChild)].attrs = cjsNew
        console.log(cjs.childs[_.findKey(cjs.childs,val=>val==cjsChild)]);
        console.log(cjs)
      }else alert("Pas de correspondance pour la sauvegarde données.")
      // cjs.attrs = cjsNew
      console.log(JSON.stringify(cjsNew));

      console.log("cjsChild:", cjsChild);
      
      console.log(_.findKey(cjs.childs,val=>val==cjsChild));
      if(cjs.contents[target.nodeName.toLowerCase()]){
        if(Array.isArray(cjs.contents[cjsChild.contents.replace(/_/g,'')]))
          cjs.contents[target.nodeName.toLowerCase()][position] = changes
        else cjs.contents[target.nodeName.toLowerCase()] = changes
      }else if(cjs.contents[cjsChild.contents.replace(/_/g,'')]){
        if(Array.isArray(cjs.contents[cjsChild.contents.replace(/_/g,'')]))
          cjs.contents[cjsChild.contents.replace(/_/g,'')][position] = changes
        else cjs.contents[cjsChild.contents.replace(/_/g,'')] = changes
      }

      console.log(cjsChild, cjs.childs, cjsNew, isElementItSelf);
      element.cjs = cjs
      element.parentNode.cjs[element.eltName] = cjs
      document.body.cjs[element.parentNode.nodeName][element.eltName] = cjs      
    }
  }
  addBehaviorsToComponent = ($elt) => {
    $elt[0].behaviors = this.behaviors
    // $elt.on('click', this.behaviors.update.contents)
    // $elt.on('click', 'span  .attrs', this.behaviors.update.attrs)
    return $elt
  }
  addUpdateEventsToTarget = (e, element,cjs,cjsChild,position,selector,adminEmmets) => {
    e.stopPropagation()
    let isElementItSelf = e.target==element
    
    //on :click on .attrs
    $([e.target]).on('click', `>${adminEmmets.adminEmmetClasseAttrs}`, {cjs,element, target: e.target}, (ev)=>{
      ev.stopPropagation()
      console.log('attttttrs');
      console.log(ev.target);
      if($(ev.target).find('ul').length)
        // console.log(('yyyyuuuuuu'));
        $(ev.target).find('ul').fadeToggle()
      else element.behaviors.update.attrs(ev, element, position, selector)
    })
    //on :click on .css
    $([e.target]).on('click', `>${adminEmmets.adminEmmetClasseCss}`, {cjs,element, target: e.target}, (ev)=>{
      ev.stopPropagation()
      console.log('csssssssss'+e.target.nodeName);
      // if(!$(ev.target).find('textarea').length)
        element.behaviors.update.styles(ev)
    })
    //on :blur on target
    // $(e.target).on('blur', (event)=>{
    if(cjsChild&&!isElementItSelf){
      if(!element.behaviorUpdateEventsActived){
        element.behaviorUpdateEventsActived = true
        //on :click on .attrs
        $([element]).on('click', `>${adminEmmets.adminEmmetClasseAttrs}`, {cjs,element, target: e.target}, (ev)=>{
          ev.stopPropagation()
          console.log('attttttrs');
          console.log(ev.target);
          if($(ev.target).find('ul').length)
            // console.log(('yyyyuuuuuu'));
            $(ev.target).find('ul').fadeToggle()
          else element.behaviors.update.attrs(ev, element, position, selector)
        })
        //on :click on .css
        $([element]).on('click', `>${adminEmmets.adminEmmetClasseCss}`, {cjs,element, target: e.target}, (ev)=>{
          ev.stopPropagation()
          console.log('csssssssss'+e.target.nodeName);
          // if(!$(ev.target).find('textarea').length)
            element.behaviors.update.styles(ev)
        })
        
        //on :click on .closeit button
        $(element).on('click', `>${adminEmmets.adminEmmetClasseClose}`, [element,e.target], (ev)=>{
          ev.stopPropagation()
          ev.data[0].classList.remove('modifying')
          $(ev.data[0]).find(`${adminEmmets.adminEmmetClasses}`).fadeOut()
          ev.data[1].removeAttribute('contenteditable')
          e.target.removeAttribute("style")
          element.removeAttribute("style")
        })
        //on :click on .saveit button
        $(element).on('click', `>${adminEmmets.adminEmmetClasseSave}`, [element,e.target], (ev)=>{
          ev.stopPropagation()
          $(element).find(`>${adminEmmets.adminEmmetClasseClose}`).trigger('click')
  
          alert("have to save now ?")
        })
      }

      //on :click on .apply
      $([e.target]).on('click', `>${adminEmmets.adminEmmetClasseApply}`, (ev)=>{
        ev.stopPropagation()
        console.log('appllllllly'+e.target.nodeName);
        // if(!$(ev.target).find('textarea').length)
          element.behaviors.applyChanges(ev, element,cjs,cjsChild,position,selector,adminEmmets)
      })

      // $(e.target).on('focusout', (event)=>{
      //   $(e.target).find(adminEmmets.adminEmmetClasses_notCloseSave).fadeOut()
      //   e.target.removeAttribute('contenteditable')

      //   let keys = $(e.target).find('>div.attrs>ul>li>span:first-of-type')
      //   , values = $(e.target).find('>div.attrs>ul>li>span:last-of-type')
      //   , cjsNew = {}
      //   _.each(keys, (key, i) =>{
      //     cjsNew[key.innerHTML] = values[i].innerHTML
      //   })
      //   // cjs.attrs = cjsNew
      //   console.log(JSON.stringify(cjsNew));

      //   console.log("cjsChild:", cjsChild);
      //   if(cjs.contents[e.target.nodeName.toLowerCase()]){
      //       if(Array.isArray(cjs.contents[cjsChild.contents.replace(/_/g,'')]))
      //       cjs.contents[e.target.nodeName.toLowerCase()][position] = e.target.innerHTML
      //       cjs.contents[e.target.nodeName.toLowerCase()] = e.target.innerHTML
      //   }else if(cjs.contents[cjsChild.contents.replace(/_/g,'')]){
      //       if(Array.isArray(cjs.contents[cjsChild.contents.replace(/_/g,'')]))
      //       cjs.contents[cjsChild.contents.replace(/_/g,'')][position] = e.target.innerHTML
      //       else cjs.contents[cjsChild.contents.replace(/_/g,'')] = e.target.innerHTML
      //   }

      //   console.log(cjsChild, cjs.childs, cjsNew, isElementItSelf);
      //   element.cjs = cjs
      //   element.parentNode.cjs[element.eltName] = cjs
      //   document.body.cjs[element.parentNode.nodeName][element.eltName] = cjs
      // })
    }
    // alert(element.behaviorUpdateEventsActived)
    if(isElementItSelf){
      // alert(e.target.behaviorUpdateEventsActived)
      console.log('---------------');
      // alert('ddd')
      console.log('____________');
    }

    
    
    e.target.behaviorUpdateEventsActived = true
  }
  //getItemPosition_and_ParentElement EST UTILISE DANS Elements.js::behaviors.update.contents
  // IL SERT É DÉSENCOMBRER CETTE OBJECT behaviors
  getItemPosition_ParentElement_SelectorString = (e) => {
    let element = e.target
    , cjs = element.cjs
    , parentTree = 0
    , position, i_position = 0
    , selector = ''


    while(!cjs){
        selector = ">"+element.nodeName.toLowerCase()+selector

        element = element.parentNode
        cjs = element.cjs
        parentTree++

    }

    //CALCULER POUR CONNAITRE LA POSITION DE L'ITEM AU SEIN DE L'ÉLÉMENT
    $(element).find(e.target.nodeName).each((i, elt)=>{
      let closestParentElement = e.target, cpt = parentTree
      while(cpt!=0){
        closestParentElement = closestParentElement.parentNode
        cpt--
      }
      if(closestParentElement == element){
        if(e.target == elt)
          position = i_position
        i_position++
      }
    })
    position = typeof position == "undefined" ? 0 : position
    //--FIN

    return {element, cjs, position, selector}
  }

  getBlur_commitChangesEvent = (e, element,cjs,cjsChild,position,adminEmmets) => {
    console.log("uuuuuuuuuuuuu______");
    //on :blur on target
    $(e.target).on('blur', (event)=>{
    console.log("uuuuuuuuuuuuu");
    console.log(e.target);
    console.log(adminEmmets);
    console.log(adminEmmets.adminEmmetClasses_notCloseSave);
    console.log($(e.target).find(adminEmmets.adminEmmetClasses_notCloseSave));
    // $(e.target).off('blur')
        let keys = $(e.target).find('>div.attrs>ul>li>span:first-of-type')
        , values = $(e.target).find('>div.attrs>ul>li>span:last-of-type')
        , cjsNew = {}
        _.each(keys, (key, i) =>{
        cjsNew[key.innerHTML] = values[i].innerHTML
        })
        // alert(JSON.stringify(cjsChild)+"\n\n"+JSON.stringify(cjsNew))
        console.log();
        $(e.target).find(adminEmmets.adminEmmetClasses_notCloseSave).fadeOut()
        e.target.removeAttribute('contenteditable')
        // localStorage.setItem('cloud_log', +new Date);
        console.log(cjsChild);
        if(cjsChild){
          if(cjs.contents[e.target.nodeName.toLowerCase()]){
              if(Array.isArray(cjs.contents[cjsChild.contents.replace(/_/g,'')]))
              cjs.contents[e.target.nodeName.toLowerCase()][position] = e.target.innerHTML
              cjs.contents[e.target.nodeName.toLowerCase()] = e.target.innerHTML
          }else if(cjs.contents[cjsChild.contents.replace(/_/g,'')]){
              if(Array.isArray(cjs.contents[cjsChild.contents.replace(/_/g,'')]))
              cjs.contents[cjsChild.contents.replace(/_/g,'')][position] = e.target.innerHTML
              else cjs.contents[cjsChild.contents.replace(/_/g,'')] = e.target.innerHTML
          }
          // cjs.attrs = cjsNew
          console.log(JSON.stringify(cjsNew));
        }
        if(isElementItSelf&&cjsChild){
          // cjs.attrs = cjsNew
          console.log('---------------');
          console.log(JSON.stringify(cjsNew));
          console.log('____________');
        }
        element.cjs = cjs
        element.parentNode.cjs[element.eltName] = cjs
        document.body.cjs[element.parentNode.nodeName][element.eltName] = cjs
    })
  }

  
  _(datas, eltName, {$element, data}){
    $element[0].cjs = this.updateDatas(data, datas)
    $element[0].eltName = eltName
    this.addAttrToComponent($element)
    this.addAttrToChilds($element)
    return this.addBehaviorsToComponent($element)
  }
  
  a(datas, option){
    let element = new A(option)
    return this._(datas, 'a:'+option, !option ? element._(this.nodeName) : element?.[option](this.nodeName))
  }
  b(datas, option){
    let element = new B(option)
    return this._(datas, 'b:'+option, !option ? element._(this.nodeName) : element?.[option](this.nodeName))
  }
  button(datas, option){
    let element = new Button(option)
    return this._(datas, 'button:'+option, !option ? element._(this.nodeName) : element?.[option](this.nodeName))
  }
}
