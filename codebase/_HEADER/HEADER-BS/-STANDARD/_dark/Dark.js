import Standard from '../../Standard.js'


export default class Dark extends Standard{

    MODIFIER_ID = 1
    MODIFIER_NAME = "_dark"
    COMPONENT = {}

    constructor(){
        super()
    }
    // APPELÉ LORSQUE L'ÉLEMENNT EST CONNECTÉ À LA PAGE
    connectedCallback(){
        this.innerHTML = "oui"

        this.COMPONENT = this.standard()

        // alert('error: this alert should not be happening. Read the browser\'s console logs to understand why.')
        console.log("headerbar:::(cycleLife)connectedCallback => HTMLElement's cyclelife methods should strictly be called from web-component's script HTMLElement.\n \
                        Create a method in the component who called me...");
        
    }


    // APPELÉ LORSQUE L'ÉLEMENNT EST SUPPRIMÉ DE LA PAGE
    disconnectedCallback(){
    }

    
    // APPELÉ À CHAQUE FOIS QUE L'ÉLEMENNT CHANGE DE DOCUMENT
    adoptedCallback (){
    }


    // POUR OBSERVER LES CHANGEMENTS AU NIVEAU DES ATTRIBUTS
    attributeChangedCallback (){
    }


}


// window.customElements.define('headerbar-standard_dark', Dark)



