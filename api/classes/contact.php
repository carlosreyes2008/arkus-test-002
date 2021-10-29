<?php 
  class Contact{
      public $id;
      public $name_first;
      public $name_last;
      public $email;
      public $image;

      function __construct($data){
          $this->id = $data[0];
          $this->name_first = $data[1];
          $this->name_last = $data[2];
          $this->email = $data[3];
          $this->image = $data[4];
      }
  }  
?>