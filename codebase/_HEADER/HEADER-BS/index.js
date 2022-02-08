import Header from '../../Header.js'


export default class HeaderBS extends Header{

    COMPONENT_ID = 1015
    COMPONENT_NAME = "headerbs"

    constructor(){
        super()

        
        this.elementsList = [
            "logo",
            "dropdown",
            "menu",
            "form"
        ]
        this.elements = {}
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



    logo = {
        contents: ["Navbar"],
        attrs: {
            href: "#",
        },
        value: `
            <b></b>
        `,
        value_: [
            "_a"
        ]
    }
    dropdown = {
        // contents:"",
        attrs: {
            "data-bs-toggle": "collapse",
            "data-bs-target": "#navbarSupportedContent",
            "aria-controls": "navbarSupportedContent",
            "aria-expanded": "false",
            "aria-label": "Toggle navigation",
        },
        value: `
        <button>
            <span></span>
        </button>
        `,
        value_: [
            "_button:dropdown"
        ]
    }
    form = {
        contents: {
            default: "Search"
        },
        attrs: {
        },
        childs: {
            ">input": {attrs:{placeholder:"Search", "aria-label": "Search", type: "search"}},
            ">button": {contents: "__default__", attrs: {type:"submit"}}
        },
        // value: "form>input+button",
        value: `
            <form>
                <input/>
                <button></button>
            </form>
        `
    }
    sample = {
        contents: {
            links: ["Home", "Link", "Dropdown", "Disabled"],
            dropdown: ["Actionn", "Another action", "", "Something else here"]
        },
        attrs: {
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
        value: `
            <menu>
                <li>
                    <a></a>
                </li>
                <li>
                    <a></a>
                </li>
                <li>
                    <a></a>
                    <ul>
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a></a></li>
                    </ul>
                </li>
                <li>
                    <a></a>
                </li>
            </menu>
        `,
        addToValue: [
            ">li:nth-of-type(3)>ul>(li>a)*4",
        ],
        replaceIntoValue: {
            ">li:nth-of-type(3)>ul>li:nth-of-type(3)": ">hr.dropdown-divider", 
            ">li:nth-of-type(3)>ul>li:nth-of-type(2)": ">li:nth-of-type(3)>ul>li:nth-of-type(1)", 
        },
        addCJSToValue: {

        }
    }
}
