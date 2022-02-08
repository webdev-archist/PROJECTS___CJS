


export default class Hgroup{

    constructor(option){

        this.currentElement = "hgroup:"+option
    }

    _ = (caller) => {
        return '<hgroup></hgroup>'
    }

    logo = (caller) => {
        // let $element = $(this._())
        let $element = $(`
            <hgroup>
                <a>
                    <h1></h1>
                </a>
                <h2></h2>
            </hgroup>
        `)
        , data = {
            contents: {
                h1: "yes",
                h2: "man"
            },
            childs: {
                ">a>h1": {
                    contents: "__h1__"
                },
                ">h2": {
                    contents: "__h2__"
                }
            },
            value: `
                <hgroup>
                    <a>
                        <h1></h1>
                    </a>
                    <h2></h2>
                </hgroup>
            `
        }

        return {$element, data}
    }

}