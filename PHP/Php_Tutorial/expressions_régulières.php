<?php

#(preg_match('#<h[^a-zA-Z]>#','Tous les chats sont <h1> gris </h1>.'))
#(preg_match('#Ay(ay){3}#','Ayayayay.'))
# (preg_match('#[0-9]{3}$#','888'))
#. = n'importe quel caractère
#(preg_match('#\.#','Je vais bien.')) Point annulé, pareil pour : "?"
#(preg_match('#^[0-3][0-9]/[0-1][0-9]/[1-2][0-9]{3}$#','12/01/2000'))

#if (preg_match('#^([0-9]{2}/){2}([0-9]{4})$#','12/01/2000'))
#{
#  echo 'VRAI';
#}
#else
#{
#  echo 'FAUX';
#}

$date=preg_replace('#^([0-9]{2})/([0-9]{2})/([0-9]{4})$#','$1-$2-$3 ','12/01/2000');
echo "Date: ".$date;

?>
