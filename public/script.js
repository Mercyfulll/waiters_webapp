// Flash message element
const Message = document.querySelector('.success')


if(Message.innerHTML !== ''){
    setTimeout(function(){
      Message.innerHTML = '';
    }, 3500);
}