// $('#someForm').on('submit', function(e) {
//         e.preventDefault();

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// function submitEmail(){

//         //get the name field value
//         var name = $('#name');
//         //get the name field value
//         var email = $('#email');
//         //get the comments
//         var message = $('#message');

//         //validation

//         var nameEmpty = name.val().trim() == "";
//         var emailEmpty = email.val().trim() == "";
//         var messageEmpty = message.val().trim() == "";
//         var emailFormatInvalid = !validateEmail(email.val());
        
//         if(nameEmpty || emailEmpty || messageEmpty || emailFormatInvalid){

//             if(nameEmpty){
//                 document.getElementById("name").style.borderColor = "#00BFFF";
//                 document.getElementById("name").style.background = "#00BFFF";
//             }else{
//                 document.getElementById("name").style.borderColor = "#CCCCCC";
//                 document.getElementById("name").style.background = 'white';
//             }

//             if(emailEmpty || emailFormatInvalid){
//                 document.getElementById("email").style.borderColor = "#00BFFF";
//                 document.getElementById("email").style.background = "#00BFFF";
//             }else{
//                 document.getElementById("email").style.borderColor = "#CCCCCC";
//                 document.getElementById("email").style.background = 'white';
//             }

//             if(messageEmpty){
//                 document.getElementById("message").style.borderColor = "#00BFFF";
//                 document.getElementById("message").style.background = "#00BFFF";
//             }else{
//                 document.getElementById("message").style.borderColor = "#CCCCCC";
//                 document.getElementById("message").style.background = 'white';
//             }

//         }else{
//             document.getElementById("name").style.borderColor = "#CCCCCC";
//             document.getElementById("email").style.borderColor = "#CCCCCC";
//             document.getElementById("message").style.borderColor = "#CCCCCC";
//             document.getElementById("name").style.background = 'white';
//             document.getElementById("email").style.background = 'white';
//             document.getElementById("message").style.background = 'white';
//             console.log('form validation success'); 

//             //send to formspree
//             $.ajax({
//                 url:'https://formspree.io/Alexandre.Stelzig@gmail.com',
//                 method:'POST',
//                 data: {name:name.val(),
//                     _replyto:email.val(),
//                     email:email.val(),
//                     message:message.val(),
//                     _subject:'Email from AlexandreStelzig.github.io'},
//                 dataType:"json",
//                 success:function() {
//                     $('#name').val("");
//                     $('#email').val("");
//                     $('#message').val("");
//                     alert('Thank you for your contacting me! I will respond to your email as soon as possible.')
//                 },
//                 error: function(XMLHttpRequest, textStatus, errorThrown) {
//                     alert("Something went wrong while sending the email...");
//                 }

//             });     
//         }
// };

var $contactForm = $('#contact-form');
$contactForm.submit(function(e) {
    e.preventDefault();
    // $.ajax({
    //     url: '//formspree.io/Alexandre.Stelzig@gmail.com',
    //     method: 'POST',
    //     data: $(this).serialize(),
    //     dataType: 'json',
    //     beforeSend: function() {
    //         $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
    //     },
    //     success: function(data) {
    //         $contactForm.find('.alert--loading').hide();
    //         $contactForm.append('<div class="alert alert--success">Message sent!</div>');
    //     },
    //     error: function(err) {
    //         $contactForm.find('.alert--loading').hide();
    //         $contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
    //     }
    // });
    $.post('https://formspree.io/Alexandre.Stelzig@gmail.com', {data: $(this).serialize(), dataType: 'json'})
});