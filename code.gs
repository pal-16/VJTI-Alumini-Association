function createFormSubmitTrigger() {

  var form = FormApp.getActiveForm();
  var currentTriggers = ScriptApp.getProjectTriggers();
  if(currentTriggers.length > 0)
    return;
  ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
}

function onFormSubmit(e) {

  var formResponse = e.response;
  var stateMap={ 
 // key value pair from official doc
  }

  var itemResponses = formResponse.getItemResponses();  
  var email;
  var state;
  var name;
  var link;
  itemResponses.forEach(function(itemResponse) {
    var res = itemResponse.getItem().getTitle();
    if(res=="Email"){
      var response = itemResponse.getResponse();
      email=response;
    }else if(res=="First Name"){
      var response = itemResponse.getResponse();
      name=response;
    }else if(res=="Current State of Residence"){
      var response = itemResponse.getResponse();
      state=response;
    }   
  });
  link=stateMap[state];


   sendEmail(email,link, name, state);
}

function sendEmail(email,link,name,state) {
  var temp = HtmlService
      .createTemplateFromFile('email-script');
  
  temp.name = name;
  temp.link=link;
  temp.state=state;
  
  var message = temp.evaluate().getContent();
  
  MailApp.sendEmail({
    to: email,
    subject: "Invitation to join VJTI in USA Community",
    htmlBody: message
  });
  
}