let donationSection = document.getElementById('donation');
let historySection = document.getElementById('history');
let navBtns = document.getElementById('nav_btns');
let navBtnSection = document.getElementById('nav-btn-section');
let input = document.getElementsByTagName('input');
let totalrender = document.getElementById('total');
let donateTotalHtml = document.getElementsByClassName('donate_total');
let modalText = document.getElementsByClassName('modal-text');
let modalTotal = document.getElementsByClassName('modal-total');
let modalHead = document.getElementsByClassName('modal-head');
let modalIcon = document.getElementsByClassName('modal-icon');



// console.log(donateTotal);
let total = 10500;
let historyCount = 0;
let index;



// donation EventListener
donationSection.addEventListener('click', (e)=>{
    let target = e.target;
    if(target.id === 'donate1'){
        index = 0;
        calculation(index);
    }
    else if(target.id === 'donate2'){
        index = 1;
        calculation(index);
    }
    else if(target.id === 'donate3'){
        index = 2;
        calculation(index);
    }
    // console.log(target.id);
})

// sticky navbar
window.addEventListener('scroll', function(){
    const headerSection = document.getElementsByClassName('header')[0];
    if(window.scrollY > 100){
        headerSection.style.backgroundColor = 'transparent';
        // navBtnSection.style.marginTop = '1px';
    }else{
        headerSection.style.backgroundColor = '#F9F7F3';
        // navBtnSection.style.marginTop = '80px';
    }
});

// page opener
navBtns.addEventListener('click', (e)=>{
    let target = e.target;
    if(target.id === 'donation_btn'){
        target.style.backgroundColor = '#B4F461';
        target.nextElementSibling.removeAttribute('style');
        historySection.classList.add('hidden');
        donationSection.classList.remove('hidden');
    }
    else if(target.id === 'history_btn'){
        target.style.backgroundColor = '#B4F461';
        target.previousElementSibling.removeAttribute('style');
        donationSection.classList.add('hidden');
        historySection.classList.remove('hidden');
    }
});

// calculation
function calculation(index){
    let inputValue = input[index].value;
    if(inputValue === ''){
        return renderModal('Cant be Empty', total, index, false);
    }
    else if(inputValue === '0'){
        return renderModal('You cannot donate 0 BDT', total, index, false);
    }

    for(const value of inputValue){
        if(isNaN(value) || value === ' '){
            return renderModal('Not a valid amount', total, index, false);
        }
    }
    let donateAmmout = parseFloat(input[index].value);
    let donateTotal = parseFloat(donateTotalHtml[index].innerHTML);
    if(donateAmmout <= total){
        total -= donateAmmout;  
        donateTotal += donateAmmout;
        input[index].value = '';
        render(total, donateTotal, donateAmmout, index);
    }else{
        renderModal('Insufficient Balance', total, index, false)
    }
}




// home page render
function renderHomePage(total, donateTotal, index){
    totalrender.innerHTML = `${total} BDT`;
    donateTotalHtml[index].innerHTML = `${donateTotal} BDT`;
}


// redner modal
function renderModal(head, total, index, isValid){
    if(isValid === true){
        if(index === 0 && isValid === true){
            modalText[index].innerHTML = `Thank you for the donation for Noakhali`;
        }
        else if(index === 1 && isValid === true){
            modalText[index].innerHTML = `Thank you for the donation for Feni`;
        }
        else if(index === 2 && isValid === true){
            modalText[index].innerHTML = `Thank you for the donation for Qouta Movement`;
        }
        modalHead[index].innerHTML = head;
        modalTotal[index].innerHTML = total;
        modalIcon[index].src = 'asset/img/thanks.png';
    }
    else{
        modalHead[index].innerHTML = 'Unsuccessfull';
        modalText[index].innerHTML = head;
        modalTotal[index].innerHTML = total;
        modalIcon[index].src = 'asset/img/sadface.png';
    }
}

// history card
function historyCard(donateAmmout, index){
    let date = new Date;
    let place;
    if(historyCount < 1){
        historySection.innerHTML = '';
        historyCount++;
    }
    if(index === 0){
        place = 'Noakhali';
    }
    else if(index === 1){
        place = 'Feni';
    }
    else if(index === 2){
        place = 'Qouta Movement';
    }
    const newHistoryCard = document.createElement('div');
    newHistoryCard.innerHTML
    = `<div class="history_card_container mb-6">
    <div class="card bg-base-100 w-full shadow-xl">
        <div class="card-body">
            <h2 class="card-title">${donateAmmout} Taka is Donated for ${place}, Bangladesh</h2>
            <p>Date: ${date}</p>
            </div>
        </div>
    </div>`;
                
    historySection.prepend(newHistoryCard);
}
// document.addEventListener('DOMContentLoaded', (e)=>{
//     document.getElementById('a').addEventListener('click', ()=>{
//         console.log('hi');
//     });
// })

   
    


// main render
function render(total, donateTotal, donateAmmout, index){
    renderHomePage(total, donateTotal, index);
    renderModal('Congratulations!', total, index, true);
    historyCard(donateAmmout, index);
}