<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Inheritance</title>
        <style>
            *{
                font-family: arial;
            }
            table {
                border-collapse: collapse;
                text-align: center;
            }
            td{
                border: 1px solid black;
                padding: 5px;
            }
        </style>
    </head>
    <body>
        <table>
            <?php

            Abstract class ExtensionBridge {

                private $_exts = array();
                public $_this;

                function __construct() {
                    //$_this = $this;
                }

                public function addExt($object) {
                    $this->_exts[] = $object;
                }

                public function __get($varname) {
                    foreach ($this->_exts as $ext) {
                        if (property_exists($ext, $varname))
                            return $ext->$varname;
                    }
                }

                public function __call($method, $args) {
                    foreach ($this->_exts as $ext) {
                        if (method_exists($ext, $method))
                            return call_user_func_array(array($ext, $method), $args);
                    }
                    throw new Exception("This Method {$method} doesn't exists");
                }

            }

            class NameData {

                private $surname = "";
                private $name = "";

                public function setSurname($surname) {
                    $this->surname = $surname;
                }

                public function setName($name) {
                    $this->name = $name;
                }

                public function getSurname() {
                    return $this->surname;
                }

                public function getName() {
                    return $this->name;
                }

            }

            class LocationData {

                private $address = "";
                private $country = "";

                public function setAddress($address) {
                    $this->address = $address;
                }

                public function setCountry($country) {
                    $this->country = $country;
                }

                public function getAddress() {
                    return $this->address;
                }

                public function getCountry() {
                    return $this->country;
                }

            }

            class Extender extends ExtensionBridge {

                function __construct() {
                    parent::addExt(new NameData());
                    parent::addExt(new LocationData());
                }

                public function __toString() {
                    return '<tr><td>' . $this->getSurname() . '</td><td>' . $this->getName() . '</td><td>' . $this->getCountry() .
                            '</td><td>' . $this->getAddress() . '</td></tr>';
                }

            }

            $list = array(
                array("Mario", "Rossi", "Italia", "via Roma 1"),
                array("Helmut", "Schmidt", "Deutschland", "Berlinerstr. 1"),
                array("John", "Smith", "England", "Baker street 1"),
                array("Toni", "Kakko", "Suomi", "NO-way 1")
            );

            foreach ($list as $value) {
                $o = new Extender();
                $o->setName($value[0]);
                $o->setSurname($value[1]);
                $o->setCountry($value[2]);
                $o->setAddress($value[3]);
                echo $o;
            }
            ?>
        </table>
    </body>
</html>