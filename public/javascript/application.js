$(document).ready(function() {

 
  var form = $("#new-form")
  $("#new-form").on('submit', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var firstname = $("#form-firstname").val();
    var lastname = $("#form-lastname").val();  
    var phone = $("#form-phone").val();
    var email = $("#form-email").val();

    var formData = {
      'firstname': firstname,
      'lastname' : lastname,
      'phone'    : phone,
      'email'    : email
    }
    
      $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/contacts', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
                    encode          : true
    });


      



    });


  






 






});
