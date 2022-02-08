


export default class A{

    constructor(option){

        this.currentElement = "a:"+option
    }

    _ = (caller) => {
        let element = $('<a></a>')
        , data = {}

        return element
    }

    logo = (caller) => {
        let $element = this._()
        , data = {
            contents: {_:"Navbar"},
            attrs: {
                href: "##__",
            },
            value: `
                <b></b>
            `,
            value_: [
                "_a"
            ]
        }


        return {$element, data}
    }
}

