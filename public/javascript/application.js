$(document).ready(function() {
  
  var allContacts = $('#all-contacts');
  var form = $("#new-form");
  var contactCard = $(".contact-card")

  console.log(contactCard)
  // event listener to show contents of a single card on click
  $(document).on('click', ".contact-card",function(e) {
    e.stopPropagation
    e.preventDefault
    console.log(this)

    var id = $(this).data('contact-id')

    $.getJSON("/contacts/" + id, function (data) {
      console.log(data);
    })
  });
  
  function grabContactHtml(contact) {
        return "<div class='contact-card' data-contact-id="+ contact.id + ">" + contact.firstname + "</div>";
      }

  var showContacts =  function() {
    $.getJSON('/contacts', function(contacts) {
      var html = '';
    
      contacts.forEach(function (contact) {
        var contactView = grabContactHtml(contact)
        html += contactView
      });
      allContacts.html(html)
    });
  };

  showContacts();
  // listener to update contact list upon form submission 
  form.on('submit', function(e) {
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
      encode      : true,
      success     : showContacts
    });   
  });
});
