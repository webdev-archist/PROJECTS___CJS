import Elements from './Elements.js'
import Hgroup from './BLOCKS/Hgroup.js'
import Form from './BLOCKS/Form.js'
import Menu from './BLOCKS/Menu.js'

export default class Blocks extends Elements {
  
  

    hgroup(datas, option){
      let element = new Hgroup(option)
      return this._(datas, 'hgroup:'+option, !option ? element._(this.nodeName) : element?.[option](this.nodeName))
    }
    form(datas, option){
      let element = new Form(option)
      return this._(datas, 'form:'+option, !option ? element._(this.nodeName) : element?.[option](this.nodeName))
    }
    menu(datas, option){
      let element = new Menu(option)
      return this._(datas, 'menu:'+option, !option ? element._(this.nodeName) : element?.[option](this.nodeName))
    }
}
