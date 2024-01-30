class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const fieldsValids = this.isValid();
   
        if (fieldsValids) {
            this.formulario.submit();
            alert('Formulário enviado.');
        }
    }

    isValid() {
        let valid = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let field of this.formulario.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText;
            
            valid = this.validBlank(field, label);

            if (field.classList.contains('nome')) {
                valid = this.validSize(field, label, 2,15);
                valid = this.validCaracters(field, label);
            }

            if (field.classList.contains('sobrenome')) {
                valid = this.validSize(field, label, 3,25);
                valid = this.validCaracters(field, label);
            }

            if (field.classList.contains('cpf')) {
                valid = this.validSize(field, label, 11,11);
                valid = this.validCPF(field, label);
            }

            if (field.classList.contains('usuario')) {
                valid = this.validSize(field, label, 3,18);
                valid = this.validCaracters(field, label);
            }

            if (field.classList.contains('senha')) {
                valid = this.validSize(field, label, 6,12);
            }

            if (field.classList.contains('repetir-senha')) {
                valid = this.validEquals(field, label, this.formulario.querySelector('.senha'), this.formulario.querySelector('.senha').previousElementSibling.innerText);
            }
        } 
        return valid;
    }

    validEquals(field, label, compareField, compareLabel) {
        if(field.value != compareField.value) {
            this.createError(field, `Campo ${compareLabel} e ${label} precisam ser iguais.`);
            return false;
        }
        return true;
    }

    validCPF(field, label) {
        const cpf = new ValidarCPF(field.value);
        if (!cpf.valida()) {
            this.createError(field, `Campo "${label}" inválido.`);
            return false;
        }
        return true;
    }

    validBlank(field, label) {
        if (!field.value) {
            this.createError(field, `Campo "${label}" não pode estar em branco.`);
            return false;
        }
        return true;
    }

    validSize(field, label, minSize, maxSize) {
        if (field.value.length < minSize || field.value.length > maxSize) {
            if (minSize === maxSize) {
                this.createError(field, `Campo "${label}" precisa ter exatamente ${maxSize} caractere(s).`);
            } else {
                this.createError(field, `Campo "${label}" precisa ter entre ${minSize} e ${maxSize} caracteres.`);
            }
            return false;
        }
        return true;
    }

    validCaracters(field, label) {
        if (!field.value.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, `Campo "${label}" precisa conter apenas letras e/ou números. Não utilize caracteres especiais ou caracteres acentuados.`);
            return false;
        }
        return true;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();
