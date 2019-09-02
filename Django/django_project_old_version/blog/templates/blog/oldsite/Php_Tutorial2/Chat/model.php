<?php>

function insertLine($id,$pseudonym,$commentary,$date)
{
  $db=connect()
  $req = $db -> query("INSERT INTO Room (id,pseudonym,commentary,date) VALUES ($id,$pseudonym,$commentary,$date)");
}

function connect()
{
  try
  {
    $db= new PDO('mysql:host=localhost;dbname=Chat;charset=utf8', 'root', 'root');
  }
  catch(Exception $e)
  {
    die('Error : '.$e->getMessage());
  }
  return $db
}

function getRoom()
{
  $request=db->query("SELECT * FROM Room");
  echo 'Visiteurs:'$requests[]''


  return $request
}
