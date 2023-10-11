// Flash message element
const Message = document.querySelector('.success')
const MessageE = document.querySelector('.error')
const MessageEr = document.querySelector('.errors')
const messageAd = document.querySelector('.adminErrors');

if(Message.innerHTML !== '' || MessageE.innerHTML !== '' || MessageEr.innerHTML !== ''){
    setTimeout(function(){
      MessageE.innerHTML = '';
      Message.innerHTML = '';
      MessageEr.innerHTML = '';
    
    }, 3500);
}

if (messageAd.innerHTML !== '') {
  setTimeout(function () { 
      messageAd.innerHTML = ''; 
  }, 3500);
}

  console.log("Script is executing")
