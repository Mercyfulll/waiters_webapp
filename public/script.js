// Flash message element
const Message = document.querySelector('.success')
const MessageE = document.querySelector('.error')
const MessageEr = document.querySelector('.errors')
const messageAd = document.querySelector('.adminErrors')


if(Message.innerHTML !== '' || MessageE.innerHTML !== '' || MessageEr.innerHTML !== '' || messageAd.innerHTML !== ''){
    setTimeout(function(){
      MessageE.innerHTML = '';
      Message.innerHTML = '';
      MessageEr.innerHTML= '';
    }, 3500);
}