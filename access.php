<?php
 
    //Config
    include "config.php";
    include "telnet.php";
    $core1 = new PHPTelnet();
    $core2 = new PHPTelnet();
 
 
    //Set up database
    $db = new mysqli($config["database"]["host"], $config["database"]["user"], $config["database"]["pass"], $config["database"]["db"]);
    if (mysqli_connect_errno()) die("Unable to connect to SQL Database: " . mysqli_connect_error());
 
    //Set up TELNET connections
    $result1 = $core1->Connect($config["network"]["core1"],$config["network"]["user"], $config["network"]["password"]);
    $result2 = $core2->Connect($config["network"]["core2"],$config["network"]["user"], $config["network"]["password"]);
 
 
 
    if ($result1 != 0 || $result2 != 0) {
        // NOTE: $result may contain newlines
        die($result . " " . $result);
    }

    $core1->DoCommand('conf t', $result1);
    $core2->DoCommand('conf t', $result2);
 
    //Get all unimported entries
    $res = query("SELECT * FROM `lan-auth` WHERE imported = 0");
    while ($row = $res->fetch_assoc()) {
        $core1->DoCommand("access-list 1 permit " . $row["ip"],$result1);
        $core2->DoCommand("access-list 1 permit " . $row["ip"],$result2);
        query("UPDATE `lan-auth` SET imported = 1 WHERE ip = '%s'", $row["ip"]);
    }
 
    //Close down telnet
    $core1->DoCommand("end", $result1);
    $core1->DoCommand("exit", $result1);
    $core2->DoCommand("end", $result2);
    $core2->DoCommand("exit", $result2);
    $core1->Disconnect();
    $core2->Disconnect();

 
    //DB function
    function query() {
        global $db;
        $args = func_get_args();
        $sql = array_shift($args);
        foreach ($args as $key => $value) $args[$key] = $db->real_escape_string(trim($value));
        $res = $db->query(vsprintf($sql, $args));
        if (!$res) die("MySQLi Error: " . mysqli_error($db));
        else return $res;
    }
 
?> 
