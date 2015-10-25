<?php

function write_php_ini($array, $file)
{
    $res = array();
    foreach($array as $key => $val)
    {
        if(is_array($val))
        {
            $res[] = "[$key]";
            foreach($val as $skey => $sval) $res[] = "$skey = ".(is_numeric($sval) ? $sval : '"'.$sval.'"');
        }
        else $res[] = "$key = ".(is_numeric($val) ? $val : '"'.$val.'"');
    }
    $data=implode("\r\n", $res);
    $fp=fopen($file, 'w');
    fwrite($fp,$data);
}

$script = parse_ini_file('interrogate_artie.ini',true);
$script['current'] = 0;

write_php_ini($script, "interrogate_artie.ini");

$script = parse_ini_file('interrogate_judd.ini',true);
$script['current'] = 0;

write_php_ini($script, "interrogate_judd.ini");
?>
