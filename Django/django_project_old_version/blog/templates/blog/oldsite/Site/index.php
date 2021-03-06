<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title> Welcome to the website of Marc Partensky </title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>

    <?php include("nav.php");?>

    <section id="all">

      <header>
        <h1>Welcome to the website of Marc Partensky </h1>
        <section id="introduction">
          <h2> Introduction </h2>
            <p> Welcome to my website where I post all kinds of web projects, such as: maths and physics stuff, games and good looking visualizations.
            My name is Marc Partensky I am 19 years old, and i love programming.
            In a way, this place is a kind of repository for my projects, so if you're here I advise you to take a look on few of them. ;)</p>
        </section>
      </header>

      <?php include("projects.php"); ?>

      <section id="achievements">
        <h1> Achievements </h2>

          <section class=achievements id=chess>
            <h2>  Chess </h2>
            <article>
              <p> This is a chess game made in python using pygame. In this video
                two bots are programmed to play in a random way. However the
                clever bot version already exists and is able to think n moves
                in advance using brute force for creating and resolving minmax
                trees.</p>
              <video src="Videos/Random Play Chess.mp4" controls> </video>
            </article>
          </section>

          <section class=achievements id="fourrier">
            <h2>  Fourier </h2>
            <article>
              <p> This is an visualization of the Fourier transform abilites.
              It uses some arbitrary coefficients for the Fourier transform and
              draw shape using the Fourier Transform formula to get x and y positions.
              In these videos randoms coefficients are used, giving different
              shapes.</p>
              <video src="Videos/Fourier Transform Demo 2.mov" controls> </video>
              <video src="Videos/Fourier transform test 1.mov" controls> </video>
              <video src="Videos/Fourier Transform.mov" controls> </video>
              <video src="Videos/Fourrier Transform Demo.mov" controls> </video>
            </article>
          </section>

          <section class=achievements id="javascript">
            <h2> Javascript </h2>
            <p> These are few demos of the projects available on top.<p>
            <article>
              <video src="Videos/Gros fun en Javascript.mov" controls> </video>
              <video src="Videos/Gros visuel sur Javascript.mov" controls> </video>
            </arcticle>
          </section>

          <section class=achievements id="pyglet">
            <h2> Pyglet aka Illuminati <h2>
              <p> This one isn't a project but it's fun to see it though. <p>
              <article>
                <video src="Videos/pyglet illuminati.mov" controls> </video>
              </article>
          </section>

          <section class=achievements id="othello">
            <h2> Othello <h2>
              <p> This is an Othello game made using python with pygame. In this
                video a bot is playing randomly like in the Chess game video
                against a human, even though, ai bots are already implemented,
                using minmax trees at multiples levels. I just showed this bot so
                we don't have to wait for the ai to think.
              <article>
                <video src="Videos/Tipe de la vitesse.mov" controls> </video>
              </article>
          </section>

          <section class=achievements id="collisions">
            <h2> Collisions <h2>
              <article>
                <p> This is a little project that uses circles that move and
                  collide according to physics. Though the collision algorithm is
                  not efficient because it deals with the possibility of all circles
                  colliding one another, the implementation of the behaviour of
                  the balls after colliding respects the conservation of energy
                  using defined mass and velocity for each circle.</p>
                <video src="Videos/Collisions.mov" controls> </video>
              </article>
          </section>

      </section>

    </section>

    <footer id="contact">
      <h2> Contact </h2>
        <p><a href="mailto:marc.partensky@gmail.com">Mail: marc.partensky@gmail.com</a></p>
        <p>Tel: 07 67 44 36 62</a></p>
    </footer>

  </body>
</html>
