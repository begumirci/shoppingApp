import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://atvrxcecfzuczmbjrpyu.supabase.co';
let urlAll = 'https://atvrxcecfzuczmbjrpyu.supabase.co/rest/v1/ourbooks';
let secretkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dnJ4Y2VjZnp1Y3ptYmpycHl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDAxMDk5OSwiZXhwIjoyMDA5NTg2OTk5fQ.RoT4aa8R9yxsee9WrtPxIvjlQOdjIgwx7mD0QDcf2Lk'
const supabase = createClient(supabaseUrl,secretkey);

const OurBooks = document.querySelector('.books-anasayfa');
const specialDialog = document.querySelector('.summary-dialog');
const deneme = document.querySelector('.deneme');


//kitap bilgilerini kapatma tıklaması calısmıyor
deneme.addEventListener('click',(e) => {
    if(e.target.classList.contains('close-dialog')){
        specialDialog.close();
        specialDialog.innerHTML = '';
    };
})
   


let ourBookList = [];

//ön yüze veri atma

async function data(){
    ourBookList = await fetch(`${urlAll}`,{
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${secretkey}`,
        'apikey': secretkey
      }
    }).then(x => x.json());

    for (const book of ourBookList) {
        OurBooks.innerHTML += `<div class="book-row">
                <span class="book-item book-date">${book.year}</span>
                <span class="book-item book-topic">${book.name}</span>
                <button type="button" data-summaryid='${book.id}' class="book-item book-btn btn btn-primary open">ÖZET</button>
            </div>`
    }
    bindSummarybtn();
    
}

//bağlama fonksiyonu

function bindSummarybtn(){
    for (const btn1 of document.querySelectorAll('.open')) {
       btn1.addEventListener('click',showSummary);
  }
}

//kitap bilgilerini ortaya cıkartma

async function showSummary(){
    specialDialog.showModal();
    for (const book of ourBookList) {
        const image = await supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
        
        
        if(this.dataset.summaryid == book.id){
            specialDialog.innerHTML += `<div class="special-book">
            <div class="close-dialog">x</div>
            <div class="book-image2">
                <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
            </div>
            <div class="book-information2">
                <h6 class="author-name2">${book.author}</h6>
                <h4 class="book-name2">${book.name}</h4>
            </div>
            <p class="book-summary">${book.summary}</p>
        </div>`
        }
        
    }
}






data();