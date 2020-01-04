// if (/raclette/.test('Je mangerais bien une raclette savoyarde !')) {
//     alert('Ça semble parler de raclette');
// } else {
//     alert('Pas de raclette à l\'horizon');
// }
//
//
// var email = prompt("Entrez votre adresse e-mail :", "javascript@siteduzero.com");
//
// if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
//     alert("Adresse e-mail valide !");
// } else {
//     alert("Adresse e-mail invalide !");
// }

// var sentence = "Si ton tonton";
//
// var result = /\bton\b/.exec(sentence); // On cherche à récupérer le mot « ton »
//
// if (result) { // On vérifie que ce n'est pas null
//     alert(result); // Affiche « ton »
// }

var text = 'bla bla [b]un peu de texte[/b] bla [b]bla bla en gras[/b] bla bla';

text = text.replace(/\[b\]([\s\S]*?)\[\/b\]/g, '<strong>$1</strong>');

alert(text);
