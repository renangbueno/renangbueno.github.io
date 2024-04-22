const secoes = [...document.querySelectorAll("section")];
const getLinkById = (id) => document.querySelector(`a[href='#${id}']`);
const horarios = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", 
                  "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", 
                  "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", 
                  "17:30", "18:00"];
const sel_horarios = document.getElementById("horario");
const opcao_horarios = Array.from(sel_horarios.options);
var today = new Date().toISOString().split('T')[0]; // Data de hoje formatada
var reservas = [];
var valores = {
    'Corte': 30,
    'Barba': 25,
    'Corte e Barba': 45,
    'Pacote': 60
};
var criar_reserva = document.getElementById("criar_reserva");
var ver_reserva = document.getElementById("ver_reserva");

function criarReserva(){
  localStorage.clear();
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var pagamento_app = document.getElementById("pagamento_app");
  var telefone = document.getElementById("telefone").value;
  var numreserva = Math.floor(Math.random() * 1000); // Gera um valor aleatório de 0 até 1000
  var dia = document.getElementById('dia').value;
  var diaformatado = dia.split('-').reverse().join('/'); // Formata data para DD/MM/AA
  var reserva = { // Cria um objeto com os valores do formulário
    nome: document.getElementById('nome').value,
    telefone: document.getElementById("telefone").value,
    dia: diaformatado,
    horario: document.getElementById("horario").value,
    servico: document.getElementById('servico').value,
    numreserva: numreserva,
    pagou: false
  };

  // ver se telefone já tem reserva
  for(let i = 0; i<reservas.length; i++){
    if (reservas[i].telefone == telefone){
      alert("Este número já possui uma reserva: " + reservas[i].numreserva);
      return;
    }
  }
  // Caso não tenha reserva
  reservas.push(reserva); // Adiciona o objeto dentro do array
   // armazena a lista completa de reservas
  console.log(reservas);  
  
  localStorage.setItem('reservas', JSON.stringify(reservas));
  document.getElementById("modal_titulo").innerHTML = 'Reserva criada!';
  document.getElementById("modal_texto").innerHTML = 'Olá, ' + reserva.nome + '! <br><br> Anote o número da sua reserva: ' + numreserva + '<br><br>Obrigado por usar nossa plataforma!';
  modal.style.display = "block";
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  document.getElementById('form-reserva').reset();  
}

function verReserva(telefone, numreserva){
  var reservas = JSON.parse(localStorage.getItem('reservas'));
  for(let i = 0; i<reservas.length; i++){
    if(reservas[i].telefone == telefone && reservas[i].numreserva == numreserva){
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      document.getElementById("modal_titulo").innerHTML = 'Reserva encontrada!';
      document.getElementById("modal_texto").innerHTML = `
          Olá, ${reservas[i].nome}!<br><br>
          <b>Reserva:</b> ${numreserva}<br>
          Telefone: ${reservas[i].telefone}<br>
          Dia: ${reservas[i].dia}<br>
          Serviço: ${reservas[i].servico}<br>
          Valor: R$${valores[reservas[i].servico]}<br>
          Pago: ${reservas[i].pagou ? 'Sim' : 'Não'}<br><br>
          Obrigado por usar nossa plataforma!
      `;      
      modal.style.display = "block";
      span.onclick = function() {
      modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
    }
    else{
      return;
    }
  }
}

function embaralharHorarios (array){
  for (let i = horarios.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [horarios[i], horarios[j]] = [horarios[j], horarios[i]];
}
}

const inView = (section) => {
    let top = section.offsetTop;
    let height = section.offsetHeight;
  
    while (section.offsetParent) {
      section = section.offsetParent;
      top += section.offsetTop;
    }
  
    return (
      top < window.scrollY + window.innerHeight &&
      top + height/1.2 > window.scrollY
    );
  };
  
  window.onscroll = () => {
    let next = false;
  
    secoes.forEach((secoes) => {
      const a = getLinkById(secoes.id);
  
      if (inView(secoes) && !next) {
        a.classList.add("barra_navegacao--current");
        next = true;
      } else {
        a.classList.remove("barra_navegacao--current");
      }
    });
  };

window.onload = function() {
  document.getElementById('dia').setAttribute('min', today); // Atribui o mínimo de hoje no input de data
  embaralharHorarios(horarios);
  // Embaralha os horarios
  let horariosSelecionados = horarios.slice(0, 4); // 0 = start - 4 = end 
                                                    //ou seja, pega os elementos 0, 1, 2 e 3
  while(sel_horarios.options.length > 0){ // Enquanto o select tiver mais que 0 opções, ele remove
    sel_horarios.remove(0);
  }
  horariosSelecionados.sort();
  horariosSelecionados.forEach(horario => {
    let option = new Option(horario, horario);
    // Coloca duas variáveis de horario para value e text
    sel_horarios.add(option);
  
  });
};

criar_reserva.addEventListener('click', function(){
  alert('clicou');
  criarReserva();
});

ver_reserva.addEventListener('click', function(){
  var tel = document.getElementById("consulta_telefone").value;
  var nro = document.getElementById("consulta_reserva").value;
  verReserva(tel, nro);
});

document.getElementById("pagamento_app").addEventListener('click', function(){
  window.location.href = 'pagamento.html';
  
});