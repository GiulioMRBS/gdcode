<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Home page</title>
    </head>
    <body>
        <?php
$inhalt = "";
if (($handle = fopen("myfile.csv", "r")) !== FALSE) {
    echo '<table>';
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        for ($c = 0; $c < count($data); $c++) {
            echo '<tr>';
            $toadd = $data[$c];
            $arr = explode(";", $toadd);
            foreach ($arr as $value) {
                echo '<td>' . $value . '</td>';
            }
            echo '</tr>';
            $inhalt.= $toadd . "\n";
        }
    }
    echo '</table>';
    fclose($handle);
}
//$fp = fopen("mein.txt", 'w+');
//fwrite($fp, $inhalt);
//fclose($fp);
// nome del file che creeremo
$filename = "orari.xls";
// specifichiamo il Content-Type
//header("Content-Type: application/vnd.ms-excel");
// specifichiamo la risorsa
//header("Content-Disposition: inline; filename=$filename");


?></body>
</html>
      
