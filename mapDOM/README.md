# USEFUL 関係があること
## Charge a an img tag with input file image
$('document').ready(function () {
    $("#imgload").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgshow').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
});




node_modules/*
**/node_modules/*

**/img/*
!**/img/_.txt
!**/img/urls.txt