<?php

/*
$bonjours=array("bonjour","salut","wesh");
$reponses=array("bonjour"=>"au revoir","salut"=>"a plus","wesh"=>"tg");


for ($i=0;$i<3;$i++)
{
  echo "<p>".$reponses[$bonjours[$i]]."</p>";
}


foreach ($reponses as $bonjour => $reponse)
{
  echo "<p>"."Quand une personne dit ".$bonjour.". La reponse est: ".$reponse.". </p>";
}


$phrase="salut comment ça va aujourd'hui?";
$nombre=str_shuffle($phrase);

echo $phrase;
echo "Il y a ".$nombre . " de caracteres dans cette phrase.";
*/

function direBonjour($nom)
{
  echo "Bonjour ".$nom;
}

direBonjour("Jack");

?>
