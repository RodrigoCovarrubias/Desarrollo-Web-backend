function getNumber(n) {
    if (!n) {
      return ' ';
    }
    return n > 9 ? '9+' : n;
  }
  
  function renderBubbleAlert(value) {
    const bubbleAlert = document.createElement('span');
    bubbleAlert.style.backgroundColor = '#E9725A';
    bubbleAlert.style.borderRadius = '15px';
    bubbleAlert.style.color = '#fff';
    bubbleAlert.style.padding = '2px 10px';
    bubbleAlert.style.fontSize = '0.9rem';
    bubbleAlert.style.width = '20px';
    bubbleAlert.innerText = getNumber(value);
  
    return bubbleAlert;
  }
  
  export default renderBubbleAlert;
  