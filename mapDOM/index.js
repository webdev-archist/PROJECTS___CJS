
let elts = ['fieldset', 'label:file', 'input:file', 'input:submit'].mapDOM()
let {fieldset, ...childs_} = elts
fieldset.append(childs_)
console.log((fieldset));
window.buildLoad = (target='file_') => {
     window.addEventListener('load', function(){
          document.getElementById(target).onchange = function (evt) {
               const tgt = evt.target || window.event.srcElement,
               files = tgt.files;
          
               // FileReader support
               if (FileReader && files && files.length) {
                    let r = new FileReader();
                    r.onload = function (e) {
                         window.input_file = JSON.isJSON(r.result).jsonDOM()
                         console.log('"input_file" is available, since u\'ve loaded a file')
                    }
                    r.readAsBinaryString(files[0]);
                    // r.readAsDataURL(files[0]);
               }
          
               // Not supported
               else {
               // fallback -- perhaps submit the input to an iframe and temporarily store
               // them on the server until the user's session ends.
               }
          }
     })
}
buildLoad()