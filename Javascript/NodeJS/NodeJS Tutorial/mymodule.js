var direBienvenue = function(res) {
  res.write("Vous êtes à l\'accueil, que puis-je pour vous ?");
}

var direBonjour = function(res) {
    res.write('Salut mon gars');
}

var direByeBye = function(res) {
    res.write('Vas-y casses-toi fdp');
}

exports.direBienvenue = direBienvenue;
exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;
