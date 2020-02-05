<?php
require_once 'config.php';

function connect()
{
    $credentials = getCredentials();
    return new PDO('mysql:host=' . $credentials['host'] . ';dbname=' . $credentials['database'] . ';port=' . $credentials['port'], $credentials['user'], $credentials['pass']);
}

function onPdoErrorNull($supplier)
{
    try {
        return $supplier();
    } catch (PDOException $e) {
        return null;
    }
}

function getOrUpdate($service, $id, $supplier) {
    $fromDatabase = getFromDatabase($service, $id);
    if ($fromDatabase != null) {
        return $fromDatabase;
    }

    $response = $supplier();
    updateDatabase($service, $id, $response);

    return $response;
}

function getFromDatabase($service, $id = null)
{
    return onPdoErrorNull(function () use ($service, $id) {
        $pdo = connect();
        $query = "SELECT service, id, caching_date, response FROM moria_cache WHERE service = :service";
        if ($id != null) {
            $query .= " AND id = :id";
        }
        $query .= ";";
        $statement = $pdo->prepare($query);
        $statement->bindValue(":service", $service, PDO::PARAM_STR);
        if ($id != null) {
            $statement->bindValue(":id", $id, PDO::PARAM_STR);
        }

        $statement->execute();

        $result = $statement->fetch();

        if ($result) {
            $timestamp = strtotime($result['caching_date']);
            $currentTime = time();

            if (($currentTime - $timestamp) < (12 * 60 * 60)) {
                return $result['response'];
            }
        }

        return null;
    });
}

function updateDatabase($service, $id, $response) {
    return onPdoErrorNull(function () use ($service, $id, $response) {
        $pdo = connect();
        $query = "INSERT INTO moria_cache (service, id, caching_date, response) VALUES (:service, :id, CURRENT_TIMESTAMP, :response);";
        $statement = $pdo->prepare($query);
        $statement->bindValue(":service", $service, PDO::PARAM_STR);
        $statement->bindValue(":id", $id, PDO::PARAM_STR);
        $statement->bindValue(":response", $response, PDO::PARAM_STR);
        return $statement->execute();
    });
}