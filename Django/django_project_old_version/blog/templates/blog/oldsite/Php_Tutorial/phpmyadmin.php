<?php

#phpinfo();
if (isset($_GET['console']))
{


$bdd= new PDO('mysql:host=localhost;dbname=test','root','root',array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
#$reponse = $bdd->query('SELECT console,nom,prix FROM jeux_video WHERE console="NES" or console="PS2" ORDER BY prix DESC LIMIT 5');
#$requete = $bdd->prepare('SELECT * FROM jeux_video WHERE console=?');
$requete = $bdd->prepare('INSERT INTO jeux_video(nom,possesseur) VALUES(?,?)');
#$requete->execute(array($_GET['console']));
$requete->execute(array($_GET['nom'],$_GET['possesseur']));
#while ($donnees = $requete->fetch())
#{
#  echo '<p>' . $donnees['console'] . '-'. $donnees['nom'] . '-' . $donnees['prix'] . 'euros</p>';
#}
#
#}
?>
