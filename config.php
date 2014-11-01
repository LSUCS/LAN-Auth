<?php

    require "passwords.php";

    $config = array();
    
    //Database
    $config["database"] = array("host" => "127.0.0.1",
                                "user" => "root",
                                "pass" => $dbPassword,
                                "db"   => "lan-auth");
                                
    //API
    $config["api"] = array( "key" => $apiKey,
                           "auth_url" => "http://lan.lsucs.org.uk/index.php?page=api&action=lanauth");
                           
    //Network
    $config["network"] = array("user" => "lsucs",
                                "password" => $routerPassword,
                               "core1" => "192.168.0.2",
                               "core2" => "192.168.0.3",
                               "port" => 22);

?>
