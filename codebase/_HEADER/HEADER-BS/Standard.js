import HeaderBS from './index.js'


export default class Standard extends HeaderBS{

    COMPONENT_ID = 1016
    COMPONENT_NAME = "headerbs-standard"
    COMPONENT = {}
    TEMPLATE = `
        <nav>
            <a></a>
            <button>
                <!-- PAS BESOIN DE L'ATTRIBUT 'aria-controls' pour <button/> => https://www.accede-web.com/notices/interface-riche/panneaux-depliants/#ancre-06-->
            </button>
            <menu>
            </menu>
            <form></form>
        </nav>
    `
    /*
    ELEMENTS_DATAS = {
        logo: {
            content: "",
            attr: {}
        },
        dropdown: {
            attr: {
            }
        }
    }
    */

    constructor(){
        super()
    }
    // APPELÉ LORSQUE L'ÉLEMENNT EST CONNECTÉ À LA PAGE
    connectedCallback(){
        this.createElements()

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

    standard = () => {

    }

}


// window.customElements.define('headerbar-standard', Standard)



