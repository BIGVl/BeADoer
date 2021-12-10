

export default function everyday () {

   
    const content = document.querySelector('.content');
    content.classList.add('every');
   
    for (let i=0;i<=24;i++) {

       let row = document.createElement('input');
       let hours = document.createElement('input');
       let minutes = document.createElement('input');
        content.appendChild(hours).classList.add('hours');
        content.appendChild(minutes).classList.add('minutes');
        content.appendChild(row).classList.add('row');

        hours.setAttribute('type', 'number');
        hours.setAttribute('min', '0');
        hours.setAttribute('max','24');
        if (i<=9) {
        hours.setAttribute('value','0'+i);
        }
        else {hours.setAttribute('value',i)};

        minutes.setAttribute('type','number');
        minutes.setAttribute('min', '0');
        minutes.setAttribute('max','60');  
        minutes.setAttribute('value', 0);

    }
}