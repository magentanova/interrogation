<?php

#use porterstemmer algorithm. google php implementation and import it....

function checkStatementStatus($script,$level,$statementList){
  # if we've completed a cycle....
  if (count($statementList) == 0){
      $statementList = explode('*',$script[$level]['STATEMENTS']);
      $script[$level]['STATED'] = "";
    }
  return array($statementList,$script);
}


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

function getStatements($script,$level){
  
  $statements = $script[$level]['STATEMENTS'];
  #
  ## reduce statement list to those not already stated:
  $allStatementsList = explode('*',$statements);
  $statementList = array();
  $statedList = explode('*',$script[$level]['STATED']);
  foreach($allStatementsList as $statement){
    if (in_array($statement,$statedList) == false){ 
      $statementList[] = $statement;
    }
  }  
  return $statementList;  
}

function writeHint($script,$level){
  echo '<prompt>';
  echo $script[$level]['HINT'];
  echo '</prompt>';
}

function writeLine($script,$level,$prisName){
  
  $statementList = getStatements($script,$level);
  $statementNscript = checkStatementStatus($script,$level,$statementList);
  $statementList = $statementNscript[0];$script = $statementNscript[1];
  $randInd = array_rand($statementList,1); # get a random index in the array
  $line = $statementList[$randInd];
  echo '<text>';
  echo strtoupper($prisName) . ': ' . $line;
  $script[$level]['STATED'] = $script[$level]['STATED'] . '*' . $line;
  // echo $match;
  echo '</text>';
  return $script;
}

function keywordsPresent($inputText,$kwdAry){
  $goodQuestion = true;
  foreach($kwdAry as $kwd){ #check whether all the requisite keywords are in the input string
    if (strpos($inputText,$kwd) === false){
      $goodQuestion = false;
    }
  }
  return $goodQuestion;
}

header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';

echo '<response>';


// parse data passed in through ajax
$inputText = strtolower($_POST['q']);
$prisName = $_POST['prisoner'];
$level = $_POST['level'];
$iniFile = 'interrogate_' . $prisName . '.ini';
// echo "level = " . $level;


if ($inputText !== ''){
  $script = parse_ini_file($iniFile,true);
  # pronounce the appropriate line from the script
  $level = $script['current'];
  $thisLine = $script[$level]['STATEMENTS'];
  
  $kwdAry = explode(',',$script[$level]['KEYWORDS']);
  
  ## check whether we should update level. send it to JS either way.
  $goodQuestion = keywordsPresent($inputText,$kwdAry);
  if ($goodQuestion){ #if all keywords have been matched
      # do what it takes to move on
      $script['current'] += 1;
      $level += 1;
  }
  echo '<level>';
  echo $level;
  echo "</level>";
  ### done updating level

  ### update script and hint
  $script = writeLine($script,$level,$prisName);
  writeHint($script,$level);

  ### write results back into the ini file
  write_php_ini($script,$iniFile);

}

else{
  echo '<text>';
  echo "Aren't you supposed to be interrogating me?";
  echo '</text>';
}

echo '</response>';


?>
