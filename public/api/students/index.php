<?php
require_once '../request_utils.php';
require_once '../database.php';

cors();

header("Content-Type: application/json");

echo getOrUpdate("students_list", null, function() {
    return getFromApi("students_list");
});