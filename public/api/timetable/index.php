<?php
require_once '../request_utils.php';
require_once '../database.php';

cors();

header("Content-Type: application/json");

$id = $_GET['id'];

echo getOrUpdate("activity_list_for_students", $id, function () use ($id) {
    return getFromApi("activity_list_for_students", '{"id":"' . $id . '"}');
});