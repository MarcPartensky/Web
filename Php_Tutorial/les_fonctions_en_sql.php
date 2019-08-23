
<?php
#$bdd = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', '');
$bdd= new PDO('mysql:host=localhost;dbname=test','root','root',array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
#$reponse = $bdd->query('SELECT UPPER(nom) AS nom_maj FROM jeux_video');
$reponse=$bdd->query('SELECT AVG(prix) AS prix_moyen FROM jeux_video WHERE console='PC'');

echo $donnees['prix_moyen'] . '<br />';

#while ($donnees = $reponse->fetch())
#{
#	echo $donnees['nom_maj'] . '<br />';
#
#}

#$reponse->closeCursor();

?>
