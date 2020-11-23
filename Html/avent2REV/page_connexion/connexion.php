<?php session_start();?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="style.css" type="text/css"/>
        <title>Connexion</title>
    </head>
    <body>
        <div id="bloc_page">
            <h1>J'accède à mon calendrier</h1>
            <form method="post" action="../page_accueil/accueil.php">
               <p>
               <label for="email">Votre email</label> : <input type="email" name="email" id="email" required /> 
                    <input type="submit" value="Valider" />
               </p> 
            </form>
        </div>
    </body>
</html>
