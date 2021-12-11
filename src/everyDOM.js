

export default function everyday () {

   //Important variables
    const content = document.querySelector('.content');
    content.classList.add('every');
    const save = document.createElement('button');
    save.setAttribute('type','submit');
    save.textContent = 'Save';
    let row;
    let hours;
    let minutes;
    const form = document.createElement('form');
    form.setAttribute('name','formEvery');
    form.setAttribute('autocomplete','off');
    content.appendChild(form).classList.add('formEvery');
    form.appendChild(save).classList.add('saveEvery');
    form.setAttribute('id','formEvery')
    const storeForm = {};
//Creating all the inputs for the hour, minute and text
    for (let i=0;i<=24;i++) {

       row = document.createElement('input');
       hours = document.createElement('input');
       minutes = document.createElement('input');
        form.appendChild(hours).classList.add('hours');
        form.appendChild(minutes).classList.add('minutes');
        form.appendChild(row).classList.add('row');

        hours.setAttribute('type', 'number');
        hours.setAttribute('min', '0');
        hours.setAttribute('max','24');
        hours.setAttribute('name',`hours`)
        if (i<=9) {
        hours.setAttribute('value','0'+i);
        }
        else {hours.setAttribute('value',i)};

        minutes.setAttribute('type','number');
        minutes.setAttribute('min', '0');
        minutes.setAttribute('max','60');  
        minutes.setAttribute('value', 0);
        minutes.setAttribute('name',`minutes`);

        row.setAttribute('name',`row`);
    
    }

    
   form.addEventListener('submit',(e)=>{
       e.preventDefault()
    
         
        
     })
 
}