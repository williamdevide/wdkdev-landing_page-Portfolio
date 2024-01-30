/* This file contains the operations called directly in the main file */


$((function() {
    $(".link-scroll").click((function(e) {
        e.preventDefault();
        let id = e.target.href.split("#");
        document.querySelector("#" + id[1]).scrollIntoView()
    }
    )),
    $(window).scroll((function() {
        let scrollY;
        $(this).scrollTop() > 20 ? $("#myheader").addClass("active") : $("#myheader").removeClass("active")
    }
    )),
    $(".btn-show-menu span,.closemenu").click((function(e) {
        $(".headermenu .mnb").toggleClass("active")
    }
    )),
    $("#formSendMessage .nome").keyup((function(e) {
        validarNome(e.target),
        "" === e.target.value.trim() && (e.target.classList.remove("error"),
        $("#erroNome").hide())
    }
    )),
    $("#formSendMessage .telefone").keydown((function(e) {
        /\D/.test(e.key) && 13 !== e.keyCode && 8 !== e.keyCode && 16 !== e.keyCode && 17 !== e.keyCode && 91 !== e.keyCode && 18 !== e.keyCode && e.preventDefault()
    }
    )),
    $("#formSendMessage .telefone").keyup((function(e) {
        "" === e.target.value.trim() && (e.target.classList.remove("error"),
        $("#erroTel").hide())
    }
    )),
    $("#formSendMessage .email").keyup((function(e) {
        validarEmail(e.target),
        "" === e.target.value.trim() && (e.target.classList.remove("error"),
        $("#erroEmail").hide())
    }
    )),
    $("#formSendMessage .mensagem").keyup((function(e) {
        validarMensagem(e.target),
        "" === e.target.value.trim() && (e.target.classList.remove("error"),
        $("#erroMensagem").hide())
    }
    )),
    $(".prj .img").click((function(e) {
        e.preventDefault();
        let imgUrl = $(this).find("img").attr("src")
          , title = $(this).parent(".prj").find(".name").text();
        $("#modal-prj .body .title h4").text(title),
        $("#modal-prj .body .img img").attr("src", imgUrl),
        $("#modal-prj").addClass("show")
    }
    )),
    $(".close-modal").click((function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $("#" + $(this).data("modal")).removeClass("show")
    }
    )),
    $("#btn-formSendMessage").click((function() {
        let valido = !1
          , form = document.forms.formSendMessage
          , nome = form.nome
          , telefone = form.telefone
          , email = form.email
          , mensagem = form.mensagem;
        if (!1 === validarNome(nome) && (valido = !0),
        !1 === validarEmail(email) && (valido = !0),
        !1 === validarMensagem(mensagem) && (valido = !0),
        !1 === valido) {
            let url = $("#formSendMessage").attr("action")
              , mydata = new FormData(document.forms.formSendMessage);
            $.ajax({
                url: url,
                type: "post",
                contentType: !1,
                processData: !1,
                data: mydata,
                dataType: "json",
                success: function(data) {
                    switch (data.input_name) {
                    case "nome":
                        $("#erroNome").show(),
                        $("#formSendMessage .nome").addClass("error");
                        break;
                    case "telefone":
                        $("#erroTel").show(),
                        $("#formSendMessage .telefone").addClass("error");
                        break;
                    case "email":
                        $("#erroEmail").show(),
                        $("#formSendMessage .email").addClass("error");
                        break;
                    case "mensagem":
                        $("#erroMensagem").show(),
                        $("#formSendMessage .mensagem").addClass("error")
                    }
                    data.success && ($("#failed-formSendMessage").addClass("hide"),
                    $("#success-formSendMessage").removeClass("hide"),
                    $("#success-formSendMessage").css("display", "flex"),
                    $("#formSendMessage input,#formSendMessage textarea").removeClass("error"),
                    $("#formSendMessage input,#formSendMessage textarea").val(""),
                    $(".errorsform").hide(),
                    setTimeout(()=>{
                        $("#success-formSendMessage").addClass("hide")
                    }
                    , 3e3)),
                    data.error && ($("#success-formSendMessage").addClass("hide"),
                    $("#failed-formSendMessage").removeClass("hide"),
                    $("#failed-formSendMessage").css("display", "flex"),
                    $("#failed-formSendMessage p").text(data.message),
                    setTimeout(()=>{
                        $("#failed-formSendMessage").addClass("hide")
                    }
                    , 3e3))
                },
                beforeSend: function() {
                    $(".errorsform").hide(),
                    $("#btn-formSendMessage").prop("disabled", !0),
                    $("#btn-formSendMessage").html('<i class="icon-loading"></i> <span>Enviando</span>')
                },
                complete: function() {
                    $("#btn-formSendMessage").prop("disabled", !1),
                    $("#loading-formSendMessage").addClass("hide"),
                    $("#btn-formSendMessage").html('<span>Enviar mensagem</span> <i class="mdi mdi-arrow-right aniright"></i>')
                }
            })
        }
    }
    ))
}
));
