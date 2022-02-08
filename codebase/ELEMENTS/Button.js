


export default class Button{

    // constructor(option){

    //     if(!option)
    //         return this._()
    //     else return this?.[option]
    // }

    _ = (caller) => {
        return '<button></button>'
    }
    dropdown = (caller) => {
        let $element = $(this._())
        , data = {
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
        $element.append('<span/>')
        return {$element, data}
    }
}

