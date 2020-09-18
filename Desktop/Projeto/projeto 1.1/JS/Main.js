function ValidaCPF() {

    let ao_cpf = document.forms.form1.ao_cpf.value;
    if (ao_cpf.match(/\d/g).join('').length === 11) {
        console.log('cpf invalido.');
        return;
    }
    let cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
    if (cpfValido.test(ao_cpf) == false) {
        //alert("invalido");
        let formattedCpf = ao_cpf.replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4');
        let valorValido = document.getElementById("ao_cpf").value = formattedCpf;
    }
}