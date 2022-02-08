


export default class Menu{

    // constructor(option){

    //     if(!option)
    //         return this._()
    //     else return this?.[option]
    // }

    _ = (caller) => {
        return '<menu></menu>'
    }

    sample = (caller) => {
        // let $element = $(this._())
        let $element = $(`
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
        `)
        , data = {
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

        return {$element, data}
    }
}

