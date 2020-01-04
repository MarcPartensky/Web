var goal=10;
alert('boulet');

do {
  input=prompt('Choississez un nombre:');
  test=parseInt(input);

  if (test>goal) {
    alert('Trop grand');
  }
  if (test<goal) {
    alert('Trop petit');
  }

} while (goal!=test);

alert('Nice t as trouvé bg');
