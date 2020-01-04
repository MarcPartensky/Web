<?php
#$bdd=new PDO ('mysql:host=locahost;dbname=test','root','root',array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
$bdd = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', '');
$requete=$bdd->prepare('SELECT UPPER(nom) AS nom_masjucule, console, prix FROM jeux_video WHERE console=?');
$requete->execute(array($_GET['console ']));
while ($donnees=$requete->fetch())
{
  echo '<p>'.$donnees['console'].'-'.$donnees['nom_masjucule'].'-'.$donnees['prix'].'euros</p>';
}

?>
