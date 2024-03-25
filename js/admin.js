var horarios = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
        var tabela = document.getElementById("tabelaHorarios");

        for (var i = 0; i < horarios.length; i++) {
            var linha = "<tr><th>" + horarios[i] + "</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            tabela.innerHTML += linha;
        }

        $(document).ready(function(){
            $("td").click(function(){
                if ($(this).hasClass("reservado")) {
                    $(this).removeClass("reservado");
                    $(this).text("");
                } else {
                    $(this).addClass("reservado");
                    $(this).text("RESERVADO");
                }
            });            
            $('#dataSelecionada').change(function() {
                var dataSelecionada = new Date(this.value);
                var semanaSelecionada = getWeekNumber(dataSelecionada);
                atualizarTabela(semanaSelecionada);
            });
            var dataAtual = new Date();
            var semanaAtual = getWeekNumber(dataAtual);
            atualizarTabela(semanaAtual);
        });

        function getWeekNumber(d) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
            return weekNo;
        }   

        function atualizarTabela(semana) {
            $('#tabelaHorarios').empty();
            $('#tabelaHorarios').append('<tr><th style="width: 5vh;">HORÁRIO</th><th>SEGUNDA</th><th>TERÇA-FEIRA</th><th>QUARTA-FEIRA</th><th>QUINTA-FEIRA</th><th>SEXTA-FEIRA</th><th>SÁBADO</th><th>DOMINGO</th></tr>');
            for (var i = 0; i < horarios.length; i++) {
                var linha = "<tr><th>" + horarios[i] + "</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                $('#tabelaHorarios').append(linha);
            }
                $("td").click(function(){
                    if ($(this).hasClass("reservado")) {
                        $(this).removeClass("reservado");
                        $(this).text("");
                    } else {
                        $(this).addClass("reservado");
                        $(this).text("RESERVADO");
                    }
                });
            }