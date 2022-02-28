<?php
require_once "function.php";
$obj=new functions();

$action =$_POST['action'];

switch($action){
    case 'add':
        $txt=$_POST['text'];
        $id=$_POST['id'];
        $status=$_POST['status'];
        $obj->addvalue($id,$txt,$status);
        break;
    case 'delete':
        $id=$_POST['id'];
        $obj->DeleteValue($id);
        break;
    case 'update':
        $txtid=$_POST['txtid'];
        $update=$_POST['update'];
        $obj->updatee($txtid,$update);
        // echo $txtid;
        // echo $update;
        break;
    case 'comp':
        $id=$_POST['id'];
        $obj->completed($id);
}
