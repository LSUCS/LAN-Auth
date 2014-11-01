<?php

    //Config
    include "config.php";
    include "telnet.php";
    $core1 = new PHPTelnet();
    $core2 = new PHPTelnet();
    
    //Set up TELNET connections
    $result1 = $core1->Connect($config["network"]["core1"],$config["network"]["user"], $config["network"]["password"]);
    $result2 = $core2->Connect($config["network"]["core2"],$config["network"]["user"], $config["network"]["password"]);
    
    if ($result1 != 0 || $result2 != 0) {
        // NOTE: $result may contain newlines
        die($result1 . " " . $result2);
    }
    
    //Write
    $core1->DoCommand("wr", $result1);
    $core2->DoCommand("wr", $result2);
        
    //Close down telnet
    $core1->DoCommand("end", $result1);
    $core1->DoCommand("exit", $result1);
    $core2->DoCommand("end", $result2);
    $core2->DoCommand("exit", $result2);
    $core1->Disconnect();
    $core2->Disconnect();

    
?>
