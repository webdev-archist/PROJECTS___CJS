


export default class Form{

    // constructor(option){

    //     if(!option)
    //         return this._()
    //     else return this?.[option]
    // }

    _ = (caller) => {
        return '<form onsubmit="return false"></form>'
    }

    search = (caller) => {
        let $element = $(this._())
        , data = {
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

        $element.append("<input/>")
        $element.append("<button/>")


        return {$element, data}
    }
}

