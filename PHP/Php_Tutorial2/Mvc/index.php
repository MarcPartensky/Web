<?php
require('model.php');

$posts = getPosts();
echo "Les posts sont ",$posts;

require('indexView.php');
