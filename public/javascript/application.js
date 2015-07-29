$(document).ready(function() {
  
  var allContacts = $('#all-contacts');
  var form = $("#new-form");
  var contactCard = $(".contact-card")
  var contactProfile = $("#contact-profile")
  showContacts();


  // event listener to show contents of a single card on click
  $(document).on('click', ".contact-card",function(e) {

    e.stopPropagation
    e.preventDefault
    var id = $(this).data('contact-id')
    $.getJSON("/contacts/" + id, function (data) {
      console.log(contactProfile)
      var contact = data
      var cardHtml =  "<div id='shown-profile' data-contact-id="+ contact.id + "> Name: " + contact.firstname + '<br>' + contact.lastname + "</div>";
      contactProfile.html(cardHtml)
      contactProfile.addClass('selected')
    })
  });
  
// method for showing all contents 
  var grabContactHtml = function (contact) {
      return "<div class='contact-card' data-contact-id="+ contact.id + ">" + contact.firstname + ' ' + contact.lastname + "<br>" + contact.phone + "<br>" + contact.email + "</div>";
      }

  function showContacts() {
      $.getJSON('/contacts', function(contacts) {
        var htmlContents = '';
      
        contacts.forEach(function (contact) {
          var contactView = grabContactHtml(contact)
          htmlContents += contactView
        });
        allContacts.html(htmlContents)
    });
  };
    

  
  // listener to update contact list upon form submission 
  form.on('submit', function(e) {
    
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
      encode      : true,
      success     : showContacts
    });   
  });

  $('#delete-contact').on('click', function() {
    var id = $('#shown-profile').data('contact-id');
    
    $.ajax({
      type      : 'DELETE',
      url       : '/contacts/'+id,
      dataType  : 'json',
      encode    : true,
      success   : $(".contact-card[data-contact-id="+id+"]").remove(),
    })

    // .done(function(data)
    // {
    //   console.log(data, this);
    //   $(".contact-card[data-contact-id="+id+"]").remove()
    // })
  });  
});
