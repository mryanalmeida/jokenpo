function jogar(escolha) {
    // Marcar o botão de rádio correspondente
    document.getElementById(escolha).checked = true;

    // Lógica do jogo
    let sorteio = Math.floor(Math.random() * 3); // 0, 1 ou 2
    switch (sorteio) {
        case 0:
            document.getElementById('pc').src = "img/pcpedra.png";
            break;
        case 1:
            document.getElementById('pc').src = "img/pcpapel.png";
            break;
        case 2:
            document.getElementById('pc').src = "img/pctesoura.png";
            break;
    }

    // Verificar vencedor ou declarar empate
    if ((document.getElementById('pedra').checked && sorteio === 0) ||
        (document.getElementById('papel').checked && sorteio === 1) ||
        (document.getElementById('tesoura').checked && sorteio === 2)) {
        document.getElementById('placar').innerHTML = "Empate";
    } else if ((document.getElementById('pedra').checked && sorteio === 2) ||
        (document.getElementById('papel').checked && sorteio === 0) ||
        (document.getElementById('tesoura').checked && sorteio === 1)) {
        document.getElementById('placar').innerHTML = "Jogador venceu";
    } else {
        document.getElementById('placar').innerHTML = "Computador venceu";
    }

    // Resetar seleção do jogador
    const radios = document.getElementsByName('grupo');
    for (const radio of radios) {
        radio.checked = false; // Desmarcar todas as opções
    }

    // Resetar a página após 5 segundos
    setTimeout(() => {
        location.reload(); // Reseta a página
    }, 5000); // 5000 milissegundos = 5 segundos
}
