(function () {
    var alfabet, words, guessInput, guess, guessButton, hurufTertebak, hurufCocok, output, man, letters, nyawa, jawaban, numhurufCocok, pesan;

    function setup() {
        alfabet = "abcdefghijklmnopqrstuvwxyz";
        nyawa = 7;
        words = ["kucing", "hamster", "kelinci", "sapi", "ayam"];
        pesan = {
            win: 'You win!',
            lose: 'Game over!',
            terpakai: ' sudah terpakai ',
            bukanHuruf: ' hanya gunakan a-z '
        };
        hurufTertebak = hurufCocok = '';
        numhurufCocok = 0;

        jawaban = words[Math.floor(Math.random() * words.length)];

        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.innerHTML = 'Kamu punya sisa' + nyawa + ' nyawa';
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Nama binatang:</li>';

        var letter, i;
        for (i = 0; i < jawaban.length; i++) {
            letter = '<li class="letter letter' + jawaban.charAt(i).toUpperCase() + '">' + jawaban.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = pesan.win;
            output.classList.add('win');
        } else {
            output.innerHTML = pesan.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    window.onload = setup();

    // button
    document.getElementById("restart").onclick = setup;

    guessInput.onclick = function () {
        this.value = '';
    };

    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        if (guess) {
            if (alfabet.indexOf(guess) > -1) {
                if ((hurufCocok && hurufCocok.indexOf(guess) > -1) || (hurufTertebak && hurufTertebak.indexOf(guess) > -1)) {
                    output.innerHTML = 'Huruf '+ '"' + guess.toLowerCase() + '"' + pesan.terpakai;
                    output.classList.add("warning");
                }
                else if (jawaban.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    for (var j = 0; j < jawaban.length; j++) {
                        if (jawaban.charAt(j) === guess) {
                            numhurufCocok += 1;
                        }
                    }

                    hurufCocok += guess;
                    if (numhurufCocok === jawaban.length) {
                        gameOver(true);
                    }
                }
                else {
                    hurufTertebak += guess;
                    nyawa--;
                    man.innerHTML = 'Kamu punya sisa ' + nyawa + ' nyawa';
                    if (nyawa === 0) gameOver();
                }
            }
            else {
                output.classList.add('error');
                output.innerHTML = pesan.bukanHuruf;
            }
        }
        else {
            output.classList.add('error');
            output.innerHTML = pesan.bukanHuruf;
        }
    };
}());
