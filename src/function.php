<?php
session_start();
class functions{

    public function addvalue($id,$txt,$status){

        $tempSession = isset($_SESSION['tempSession']) ? $_SESSION['tempSession'] : array();
        $temp=array("id"=>$id,"text"=>$txt,"status"=>$status);

        array_push($tempSession,$temp);
        $_SESSION['tempSession']=$tempSession;
        echo json_encode($_SESSION['tempSession']);
    }

    public function DeleteValue($id){
        foreach($_SESSION['tempSession'] as $key=>$val){
            if($id==$val['id']){
                array_splice($_SESSION['tempSession'],$key,1);
                break;
            }
        }
        echo json_encode($_SESSION['tempSession']);

    }

    public function updatee($txtid,$update){
        foreach($_SESSION['tempSession'] as $key => $val){
            if($val['text']==$txtid){
                $_SESSION['tempSession'][$key]['text']=$update;
            }
        }
        echo json_encode($_SESSION['tempSession']);

    }

    public function completed($id){
        foreach($_SESSION['tempSession'] as $key => $val){
            
            if($val['id']==$id){
                if($val['status']==0){
                    $_SESSION['tempSession'][$key]['status']=1;
                }
                else if($val['status']==1){
                    $_SESSION['tempSession'][$key]['status']=0; 
                }
                
            }
        }
        echo json_encode($_SESSION['tempSession']);

    }
}
