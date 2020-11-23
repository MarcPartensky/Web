<?php 
    session_start();
    $date = 2;
    $positions = array(array(150, 300), array(200, 328), array(200, 328), array(200, 328), array(200, 328), array(200, 328),
        array(200, 328), array(200, 328), array(200, 328), array(200, 328), array(200, 328), array(200, 328), 
        array(200, 328), array(200, 328), array(200, 328), array(200, 328), array(200, 328), array(200, 328), 
        array(200, 328), array(200, 328), array(200, 328), array(200, 328), array(200, 328), array(200, 328));
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="style.css" type="text/css"/>
        <title> Calendrier de l'Avent</title>
    </head>

    <body>
        <?php if (isset($_POST['email']))
        {
            $_SESSION['email'] = $_POST['email'];
            $type_calendrier = '//google.com';
        ?>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 808" >
                <?php 
                    for ($i = 0; $i < $date - 1; $i++) {
                        echo '<a xlink:href=' . $type_calendrier . '>';
                        echo '<image x=' . $positions[$i][0] . ' y=' . $positions[$i][1] . ' width="100" xlink:href="images/mongolfiere_rouge.png">';
                        echo '</image>';
                        echo '</a>';
                    }
                    echo '<a xlink:href=' . $type_calendrier . '>';
                    echo '<image x=' . $positions[$date - 1][0] . ' y=' . $positions[$date - 1][1] . ' width="100" xlink:href="images/mongolfiere_jaune.png">';
                    echo '</image>';
                    echo '</a>';
                ?>
            </svg>
        <?php
        }
        else
        {
            echo '<script> alert("Veuillez saisir votre email sur la page de connexion") </script>';
        }
        ?>
    </body>
</html>
