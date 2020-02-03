<?php
require_once '../request_utils.php';

cors();

header("Content-Type: application/json");

$id = $_GET['id'];
echo getFromApi("activity_list_for_students", '{"id":"' . $id . '"}');