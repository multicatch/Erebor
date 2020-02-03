<?php
require_once '../request_utils.php';

cors();

header("Content-Type: application/json");
echo getFromApi("students_list");