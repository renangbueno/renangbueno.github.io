var today = new Date().toISOString().split('T')[0];
document.getElementById('dia').setAttribute('min', today);
console.log(today);

var reservas = [];
var valores = {
    'Corte': 30,
    'Barba': 25,
    'Corte e Barba': 45,
    'Pacote': 60
};

function salvarReserva() {
    var nreserva = Math.floor(Math.random() * 1000);
    var dia = document.getElementById('dia').value;
    var diaFormatado = dia.split('-').reverse().join('/');
    var reserva = {
        nome: document.getElementById('nome').value,
        telefone: +document.getElementById('telefone').value,
        dia: diaFormatado,
        horario: document.getElementById('horario').value,
        servico: document.getElementById('servico').value,
        nreserva: nreserva,
        pagou: false
    };
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas)); // armazena a lista completa de reservas
    console.log(reservas);
    alert('Reserva realizada com sucesso! Seu número de reserva é: ' + nreserva + '. Anote-o para futuras consultas.');
    document.getElementById('form-reserva').reset();
}

var numerorandom=0;
function buscarReserva(telefone, nreserva) {
    var reservas = JSON.parse(localStorage.getItem('reservas')); // lê a lista completa de reservas
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].telefone === telefone && reservas[i].nreserva === nreserva) {

            $('#dadoscliente').html('Olá, ' + reservas[i].nome + '<br>Seu telefone é: ' + reservas[i].telefone + '<br>Você tem uma reserva para o dia: ' + reservas[i].dia + 
            '<br>Horário: ' + reservas[i].horario + '<br>Serviço: ' + reservas[i].servico + '<br>Valor: R$ ' + valores[reservas[i].servico] + ',00' + '<br>Número da reserva: ' + reservas[i].nreserva);
            if(reservas[i].pagou === true){
                $('#pagarpagar').hide();
                $('.pagpix').show();
                $('.pagpix').css({'color': 'green', 'font-size': '20px', 'font-weight': 'bold'})
                $('#dadospagamento').html('Pagamento confirmado');

            }
            else{
                $('.pagpix').css({'color': 'red', 'font-size': '20px', 'font-weight': 'bold'})
                $('.pagpix').show();
                $('#dadospagamento').html('<b>Para confirmar sua reserva, efetue o pagamento de R$ ' + valores[reservas[i].servico] + ',00' + '</b><br>');
                numerorandom = i;
            }
            return reservas[i];
        }
    }
    return null; // Retorna null se não encontrar a reserva
}

$(document).ready(function () {
    $('#reservar').click(function () {
        salvarReserva();
    });

    $('#verreserva').click(function () {
        var telefone = Number($('#telefone2').val());
        console.log(telefone);
        var nreserva = Number($('#numreserva').val());
        console.log(nreserva);
        var reserva = buscarReserva(telefone, nreserva);
        if (reserva !== null) {
            console.log(reserva);
        } else {
            console.log('Reserva não encontrada');
        }
    });

    $('#pagarpagar').click(function () {
        var reservas = JSON.parse(localStorage.getItem('reservas'));
        reservas[numerorandom].pagou = true;
        localStorage.setItem('reservas', JSON.stringify(reservas));
        window.location.href = "pagamento.html";
    });

    

   
});

