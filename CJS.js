
export default class CJS extends HTMLElement{


    constructor(){
        super()
        this.CJS = {}
        this.currentElement = ""
    }
    // APPELÉ LORSQUE L'ÉLEMENNT EST CONNECTÉ À LA PAGE
    connectedCallback(){

        // alert('error: this alert should not be happening. Read the browser\'s console logs to understand why.')
        console.log("headerbar:::(cycleLife)connectedCallback => HTMLElement's cyclelife methods should strictly be called from web-component's script HTMLElement.\n \
                        Create a method in the component who called me...");
        
    }


    // APPELÉ LORSQUE L'ÉLEMENNT EST SUPPRIMÉ DE LA PAGE
    disconnectedCallback(){
        alert('okkk')
    }

    
    // APPELÉ À CHAQUE FOIS QUE L'ÉLEMENNT CHANGE DE DOCUMENT
    adoptedCallback (){
    }


    // POUR OBSERVER LES CHANGEMENTS AU NIVEAU DES ATTRIBUTS
    attributeChangedCallback (){
    }
    
    createElements = async (
        test=false
        // , attrsAdded = this.hasAttribute('cjs') ? this.getAttribute('cjs') : {contents:{_:""},attrs:{},childs:{},value:""}
        , attrsAdded = this.hasAttribute('cjs') ? this.getAttribute('cjs') : {contents:{},attrs:{},childs:{},value:""}
        , innerElements = this.innerHTML.trim()=="" ? [] : JSON.parse(this.innerHTML.trim())
    ) => {
        let datas = {}, gotCJS = {}, $element, arr, boolCloud, extractFrom_gotCJS, sanitizeContentsParam, matchingCloudAgainstLocalDatas
        this.safe()

        extractFrom_gotCJS = (gotCJS) => {
            let obj = {HEADER: {}, NAV: {}, MAIN: {}, ASIDE: {}, FOOTER: {}}, splitted = Object.keys(gotCJS).map(elt=>elt.split('$$'))
            for(arr of splitted)if(obj[arr[0]]){
                obj[arr[0]][arr[1]] = gotCJS[arr[0]+"$$"+arr[1]]
            }else alert("Une erreur dans les données hébergées sur votre gsheet à interrompu l'acquisition des donnée.\n\n'L'élement "+arr[0]+"' ne coorespond à aucun des 5 éléments html racines attendus (HEADER,NAV,MAIN,ASIDE,FOOTER).")
            return obj
        }
        sanitizeContentsParam = (obj,param="contents") => {
            param = obj?.[param] || {}
            return param&&typeof param !== "string"&&!Array.isArray(param)
                ? {...param}
                : {...{_:param}}
        }
        matchingCloudAgainstLocalDatas = (eltName) => {
            let bool=false
            , splitted = Object.keys(gotCJS).map(elt=>elt.split('$$'))
            for(arr of splitted){
                if(arr[0]==this.nodeName && arr[1]==eltName)
                    bool=true
            }
            return bool
        }

        gotCJS = JSON.parse(localStorage?.getItem('cloud')||{})
        this.CJS = extractFrom_gotCJS(gotCJS)
        if(!document.body.cjs){
            document.body.cjs = this.CJS
            
            let ls_log = localStorage.getItem('cloud_log')
            , delta = +new Date() - ls_log
            if(delta>1000000){
            // if(true){
                gotCJS = await this.getCJS()
                this.CJS = extractFrom_gotCJS(gotCJS)
                localStorage.setItem("cloud", JSON.stringify(gotCJS))
                document.body.cjs = this.CJS
                alert('okk')
            }
        }

        // let attrsDefault = {contents:{_:""},attrs:{},childs:{},value:""}
        let attrsDefault = {contents:{},attrs:{},childs:{},value:""}
        attrsAdded = typeof attrsAdded!=="object" ? JSON.parse(attrsAdded) : attrsAdded
        if(!this.cjs)
            this.cjs = document.body.cjs[this.nodeName]
        this.innerHTML = ''
        // alert(JSON.stringify(this.elementsList))

        
        if(innerElements.length)this.elementsList = innerElements
        this.elementsList.forEach((eltName,i)=>{
            boolCloud = matchingCloudAgainstLocalDatas(eltName)
            this.currentElement = eltName
            // alert(boolCloud+" __ "+eltName+"\n\n"+JSON.stringify(document.body.cjs[this.nodeName][eltName]))
            let [method, tag, option] = [
                eltName.replace(':','_')
                , ...eltName.split(':')
            ]
            let [attrsAddedToTag, attrsClass, attrsCloud, attrsBlocksElements] = [
                {...attrsDefault, ...(attrsAdded[option]||{})}
                , {...attrsDefault, ...this?.[method]}
                , boolCloud ? {...attrsDefault, ...JSON.parse(document.body.cjs[this.nodeName][eltName])} : {}
                , {}
            ]
            // alert(JSON.stringify(this.nodeName+" __ "+eltName+"\n"+JSON.stringify(attrsCloud)))
            attrsClass.contents = sanitizeContentsParam(attrsClass)
            attrsAddedToTag.contents = sanitizeContentsParam(attrsAdded)
            
            
            datas = this.updateDatas(attrsClass, attrsAddedToTag)
            datas = this.updateDatas(datas, attrsCloud)


            $element = this[tag](datas, option)
            this.elements[eltName] = $element

            $(this).append($element)
        })
    }

    updateDatas = (datas, attrsToMerge) => {
        // alert(JSON.stringify(this.innerHTML+"xx"+datas.value))
        // alert(JSON.stringify(datas.contents)+"\n\n"+JSON.stringify(attrsToMerge.contents))
        // alert(JSON.stringify({...datas?.contents, ...attrsToMerge?.contents}))
        datas.contents = {...datas?.contents, ...attrsToMerge?.contents}
        // alert(JSON.stringify(datas.contents)+"\n\n"+JSON.stringify(attrsToMerge.contents))
        datas.attrs = {...datas?.attrs, ...attrsToMerge?.attrs}
        datas.childs = {...datas?.childs, ...attrsToMerge?.childs}
        // datas.value = datas?.value != attrsToMerge?.value ? attrsToMerge : datas.value
        return datas
    }

    elementsGenerator = (eltName, datas, attrsCloud) => {
        // alert(this.nodeName+" __ "+eltName+"\n\n"+JSON.stringify(attrsCloud))
        // let template = datas.value
        // let value_ = datas.value_
        let [tag, option] = eltName.split(':')
        // $.extend(true,datas,attrsAdded,attrsCloud)
        // alert(JSON.stringify(datas))
        


        // alert(this.nodeName+" __ "+eltName+"\n\n"+JSON.stringify(datas))
        // alert(this.nodeName+" __ "+eltName+"\n\n"+JSON.stringify(attrsCloud))
        datas = this.updateDatas(datas, attrsCloud)


        let [element, attrs] = $(this.getTemplate(eltName, datas))
        
        console.log(datas);
        // value = this.addAttrToComponent($(value), datas)
        template = this.addAttrToComponent(
            !value_ 
                ?  $(template.trim()) 
                : $(this.getTemplate(eltName, value_, datas))
            , datas
        )
        this.addAttrToChilds($(template), datas)

        // if(value_)alert(template[0].outerHTML)
        console.log(template);
        console.log(value_);
        
        // this.cjs_render(datas)
        
        
        return template[0].outerHTML
    }
    cjs_render(datas){
        //UILISER LES KEYS addToValue ET replaceIntoValue ET addCJSToValue
        //POUR RAJOUTER SES DONNÉES DANS attrsCloud
        //ET PERMETTRE AU USER DE  MODIFIER LE WEB-COMPOSANT 
        //VIA LE LANGAGE .cjs cascading javascript
        // do something()...

    }
    getTemplate = (eltName, datas) => {
        let value, valueType, cjs, eltNameType, element, $element, elements = []
        // for(value of valueArray){
        // alert(this[value.substring(1)](datas, eltName.split(':')[1]))
        let [tag, option, ...options] = eltName.split(':')
        eltNameType = eltName.charAt(0)=="_" 
                            ? "element"
                            : this[eltName]||eltName.indexOf(':')!==-1&&this[eltName.split(':')[0]]
                                ? "block"
                                : "non-définie"
                                

        // alert(tag)
        // alert(option)
        // alert(this[tag])
        element=this[tag](datas, option)
        this.elements.push(element)
            
        // alert(wrapper)
        // console.log(wrapper)
        // }
        //À L'AIDE DE LA PRÉSENCE DES chvrons ">" DANS valueArray
        //IMBRIQUER LES DIFFÉRENTS VALEURS DE elements DANS CELUI QUI LES ENGLOBE
        // $wrapper = $(wrapper)
        // elements.forEach((elt)=>{
        //     $wrapper = $wrapper.append(elt)
        // })

        
        return element

    }
    addAttrToComponent = ($elt, target=null) => {
        let $targets = target ? $elt.find(target) : $elt
        // alert(this.nodeName+' __ '+target+' __ '+JSON.stringify(attrs)+"\n\n"+JSON.stringify(contents))

        console.log($elt);
        console.log($elt[0].cjs.attrs);
        $targets.attr($elt[0].cjs.attrs)
        console.log($elt);
        console.log($targets);
        $targets.html($elt[0].cjs.contents?._)

        // alert(JSON.stringify(attrs))
        // alert(JSON.stringify(contents))
        // alert($elt[0].innerHTML)
        return $elt
    }
    addAttrToChilds = ($element, test = false) => {
        let emmet, attrs, datas = $element[0].cjs || {}
        
        console.log($element)
        console.log($element[0].outerHTML)
        // alert(this.nodeName+" ___ "+$element.html()+"\n\n"+JSON.stringify(datas.childs))
        for(emmet in datas.childs){
            let $childs = $element.find(emmet)
            // alert(_.size($childs))
            console.log(emmet);
            let attrs = datas.childs[emmet].attrs
            let contents = 
                typeof datas.childs[emmet].contents == "string" 
                && datas.childs[emmet].contents.includes('__')
                    ? datas.contents[datas.childs[emmet].contents.replace(/_/g, '')]
                    : datas.childs[emmet].contents ? datas.childs[emmet].contents : null
            
            // alert(JSON.stringify(datas.childs[emmet]))

            if(Array.isArray(attrs)){
                // alert(_.size($childs))
                $childs.each((i, child) => {
                    if(test){
                        // alert(this.nodeName+'_'+JSON.stringify(attrs)+'_'+JSON.stringify(contents))
                    }
                    console.log(child);
                    $(child).attr(attrs[i] || attrs[0])
                    console.log(child);
                    if(contents)$(child).html(contents[i])
                })
            }else{
                console.log(contents);
                contents = !contents && !Array.isArray(contents)
                        ? contents
                        : [contents]
                console.log(contents);

                $childs.attr(attrs||{})
                if(contents)$childs.html(contents[0])
            }
        }
    }
    adminBlock = () => {
        let admin_button = $(this).prepend(`
            <div class="modifiable">
                <span>⚙️</span>
                <select>
                    <option selected value="">...Modifier...</option>
                    <option value="update:contents">Update contenu et attributs</option>
                    <option value="add:items">Add items</option>
                    <option value="add:events">Add events</option>
                    <option value="update:item">Remove items</option>
                    <option value=""></option>
                </select>
            </div>
        `)
        , element = this.action = ""
        $(this).find(">div.modifiable>span").on('click', (e) => {
            e.target.parentNode.classList.toggle('on')
        })
        $(this).find('>div.modifiable>select').on('change', (e) => {
            $(e.target).closest('header')[0].action = e.target.value
        })
        let elements = $(this).find('>*:not(.modifiable)')
        elements.each((i,elt)=>{
            $(elt).on('click', (e)=>{
                e.stopPropagation()
                // alert("IL FAUT REMPLACER LE SYSTEME AVEC L'EVENT :this.blur, ET LE REMPLACER PAR DES BOTTOM DE VALIDATION (contents, attrs, css, datas, etc..)" )
                let header = $(e.target).closest('header')[0]
                let [type, action] = header.action.split(':')
                , emmetAdmin_and = "div.attrs,div.css", emmetAdmin = ">div.attrs,>div.css"
                , getData0 = this.getItemPosition_ParentElement_SelectorString(e)
                , getData1 = this.getAdminEmmetThings()

                this.behaviors?.[type]?.[action](e, {...getData0, ...getData1})
            }).on('blur', (e) => {elt.removeAttribute('style')})
        })
    }

    

    getAdminEmmetThings = () => {
        let adminEmmetClasseAttrs = 'div.attrs'
        , adminEmmetClasseCss = 'div.css'
        , adminEmmetClasseApply = 'div.apply'
        , adminEmmetClasseClose = 'div.closeit'
        , adminEmmetClasseSave = 'div.saveit'
        , adminEmmetClasses = `${adminEmmetClasseSave}, ${adminEmmetClasseClose},${adminEmmetClasseAttrs},${adminEmmetClasseCss},${adminEmmetClasseApply},${adminEmmetClasseAttrs}>ul,${adminEmmetClasseCss}>ul,${adminEmmetClasseApply}>ul`
        , adminEmmetClasses_ = `>${adminEmmetClasseSave}, >${adminEmmetClasseClose},>${adminEmmetClasseAttrs},>${adminEmmetClasseCss},>${adminEmmetClasseApply},>${adminEmmetClasseAttrs}>ul,>${adminEmmetClasseCss}>ul,>${adminEmmetClasseApply}>ul`
        , adminEmmetClasses_notClosesSaves = `${adminEmmetClasseAttrs},${adminEmmetClasseCss},${adminEmmetClasseApply}`
        , adminEmmetClasses_notCloseSave = `>${adminEmmetClasseAttrs},>${adminEmmetClasseCss},>${adminEmmetClasseApply}`
        , adminEmmetClasses_notClosesSaves_ = `${adminEmmetClasseAttrs},${adminEmmetClasseCss},${adminEmmetClasseApply},${adminEmmetClasseAttrs}>ul,${adminEmmetClasseCss}>ul,${adminEmmetClasseApply},>ul`
        , adminEmmetClasses_notCloseSave_ = `>${adminEmmetClasseAttrs},>${adminEmmetClasseCss},>${adminEmmetClasseApply},>${adminEmmetClasseAttrs}>ul,>${adminEmmetClasseCss}>ul,>${adminEmmetClasseApply},>ul`
        , adminEmmetClasses_ClosesSaves = `${adminEmmetClasseClose},${adminEmmetClasseSave}`
        , adminEmmetClasses_CloseSave = `>${adminEmmetClasseClose},>${adminEmmetClasseSave}`
        
        return {adminEmmets: {adminEmmetClasses, adminEmmetClasses_, adminEmmetClasses_notClosesSaves, adminEmmetClasses_notCloseSave, adminEmmetClasses_notClosesSaves_, adminEmmetClasses_notCloseSave_, adminEmmetClasses_CloseSave, adminEmmetClasses_ClosesSaves, adminEmmetClasseAttrs, adminEmmetClasseCss, adminEmmetClasseApply, adminEmmetClasseClose, adminEmmetClasseSave}}
    }












    safe = () => {
        if(!this.elementsList || this.elementsList.length==0){
            console.log("Ici, il faut rediriger vers 'le' composant BEM de CJS.\n s'il n'existe pas.. le créer.");
            alert("erreur , veuillez créer une instance de class nommée 'elementsList', \nou y push au moins le nom d'un élément de web-composant concerné.")
        }
    }
    getCJS = async () => {
        console.log(this.nodeName);
        let base_, base0_
        , datas=[], component
        const base0 = 'https://docs.google.com/spreadsheets/d/1UXLVfsBynI8l0tG7U3sXK7vONI_vVkoxd6Iec0E9tcw/gviz/tq?'
        , base = 'https://script.googleusercontent.com/macros/echo?user_content_key=T_kKWkIhKPSUHss-NUx-E41Wzv6unArTgnFW3mdpiZfnxpEeNfHKE8q4grjAqb7B_NjgBpudxEjrfWxTaltIMHjRL4w9StqGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGxgnr8lULIhr8ROCdicMTYmstHgCQDw4CT6dGIwwaprppwC_zwV5sIULkiR-LszbX9Cm161qPWpxGRwOltk9-HiKlrA50qxHQ&lib=MUHJO0eNzKz-rJsLwEoLBZ8e14kaw8T7p'
        , output = document.querySelector('.output')
        , query = encodeURIComponent('Select A,B')
        // const url = base0 + '&tq=' + query;
        , url = base0 + '&tq=' + query;
        // if(false){

            
        alert('clouding')
        base0_ = (rep) => {
            console.log(rep.substr(47));
            const data = JSON.parse(rep.substr(47).slice(0,-2));
            data.table.rows.forEach((main)=>{
                let tmp=[]
                main.c.forEach((ele)=>{
                    tmp.push(ele.v)
                })
                datas.push(tmp)
            })
            return datas

        }
        base_ = (rep) => {
        }
        // return fetch("https://script.google.com/macros/s/AKfycbyLp1ygIqa710GLKcbyyZhDyQMyExDAm2tCFcOJPNW65azneE-w45lPvIvMo_ZvJlY/exec",
        //     {method:"POST", body: [1,3,2]}
        // )
        return fetch(url)
                .then(res => res.text())
                .then(rep =>{
                    datas =  base0_(rep)
                    console.log(datas);
                    // base_(rep)
                    console.log(datas.GoogleSheetData)
                        
                    // return datas
                    
                    localStorage.setItem('cloud', JSON.stringify(_.object(...datas)))
                    localStorage.setItem('cloud_log', +new Date);
                    return _.object(...datas)
                })
            
            /*
            return{
                logo: {
                    contents: {
                        h1: "yes",
                        h2: "man"
                    },
                    attrs: {
                        href: "#",
                    },
                    childs: {
                        ">a>h1": {
                            contents: "__h1__"
                        },
                        ">h2": {
                            contents: "__h2__"
                        }
                    }
                },
                menu: {
                    contents: {
                        links: ["Home", "Link", "Dropdown", "Disabled"],
                        dropdown: ["Actionn", "Another action", "", "Something else here"]
                    },
                    attrs: {
                        // ...attrsAdded
                    },
                    childs: {
                        ">li>a": {
                            contents: '__links__',
                            attrs: [
                                {href:"#home", class:"active", "aria-current": "page"},
                                {href: "#other"},
                                {href: "#dropdown", class: "dropdown-toggle", id: "navbarDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false"},
                                {href: "#disabled", }
                            ]
                        },
                        '>li>ul>li>a': {
                            contents: "__dropdown__",
                            attrs: 
                                [{class: "dropdown-item", href: "#"}]
                        },
                        '>li:nth-of-type(3)': {
                            attrs: {class: "dropdown"}
                        },
                        '>li>ul': {
                            attrs: {class: "dropdown-menu", "aria-labelledby": "navbarDropdown"},
                        },
                    },
                    value: "menu>(li>a)*4",
                    addToValue: [
                        ">li:nth-of-type(3)>ul>(li>a)*4",
                    ],
                    replaceIntoValue: {
                        ">li:nth-of-type(3)>ul>li:nth-of-type(3)": ">hr.dropdown-divider", 
                    },
                    addCJSToValue: {

                    }
                }
            }
            */
    }
    
    
    
    
    
    
    
    
    
}
