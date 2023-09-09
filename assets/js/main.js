import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';


const dialogEl = document.querySelector('.basket-modal');
const basket = document.querySelector('.basket-icon');
const closeDialog = document.querySelector('.close-modal');
const usersDialog = document.querySelector('.users-dialog');
const openUsersDialog = document.querySelector('.open-users-dialog');
const closeUsersDialog = document.querySelector('.no-register');
const bookFilter = document.querySelectorAll('.books-category li');
const books = document.querySelector('.books');
const register = document.querySelector('.register');
const registerForm = document.querySelector('.registrationForm');
const loginForm = document.querySelector('.loginForm');
const login = document.querySelector('.login');
const basketlistEl = document.querySelector('.little-books');
const basketCount = document.querySelector('.basket-count');
const totalPrice = document.querySelector('.real-total');



//dialoglar

openUsersDialog.addEventListener('click',openUsers);
function openUsers(){
  usersDialog.showModal();
}

closeUsersDialog.addEventListener('click',closeUsers);
function closeUsers(){
  usersDialog.close();
}

basket.addEventListener('click',openDialog);
function openDialog(){
    dialogEl.showModal();
}

closeDialog.addEventListener('click',dialogClose);
function dialogClose(){
    dialogEl.close();
}


register.addEventListener('click',hideRegister);
function hideRegister(){
  registerForm.classList.remove('unvisible');
  loginForm.classList.add('unvisible');
}
login.addEventListener('click',hideLogin);
function hideLogin(){
  loginForm.classList.remove('unvisible');
  registerForm.classList.add('unvisible');
}  


let bookList = [];
let basketList = [];
let basketNum = 0;
let total =0;



const supabaseUrl = 'https://atvrxcecfzuczmbjrpyu.supabase.co';
let urlAll = 'https://atvrxcecfzuczmbjrpyu.supabase.co/rest/v1/todos';
let secretkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dnJ4Y2VjZnp1Y3ptYmpycHl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDAxMDk5OSwiZXhwIjoyMDA5NTg2OTk5fQ.RoT4aa8R9yxsee9WrtPxIvjlQOdjIgwx7mD0QDcf2Lk'
const supabase = createClient(supabaseUrl,secretkey);

//veri cekme
async function loadData(){

    bookList = await fetch(`${urlAll}`,{
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${secretkey}`,
        'apikey': secretkey
      }
    }).then(x => x.json());

    for (const book of bookList) {
      
     const image = await supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
        
        books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}" >Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
    render();
    bindClick();
}

//filtreleme
function render(){
  let scienceBooks = bookList.filter(book => book.type === 'BİLİM');
  let childrenBooks = bookList.filter(book => book.type === 'ÇOCUK');
  let selfimprovementBooks = bookList.filter(book => book.type === 'KİŞİSEL GELİŞİM');
  let historyBooks = bookList.filter(book => book.type === 'TARİH');
  let financeBooks = bookList.filter(book => book.type === 'FİNANS');
  let novelBooks = bookList.filter(book => book.type === 'ROMAN');
  let detectiveBooks = bookList.filter(book => book.type === 'POLİSİYE');
 for (const filt of bookFilter) {
  filt.addEventListener('click',(e)=>{
    document.querySelector('.books-category .active').classList.remove('active');
    filt.classList.add('active');

  books.innerHTML ='';
   if(e.target.classList.contains('bilim')){

    for (const book of scienceBooks) {
      const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
      books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}">Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
    
   }else if(e.target.classList.contains('cocuk')){
    
    for (const book of childrenBooks) {
      const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
      books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}">Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
  }else if(e.target.classList.contains('kisisel-gelisim')){
    for (const book of selfimprovementBooks) {
      const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
      books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}">Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
  }else if(e.target.classList.contains('tarih')){
    for (const book of historyBooks) {
      const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
      books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}">Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
  }else if(e.target.classList.contains('finans')){
    for (const book of financeBooks) {
      const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
      books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}">Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
  }else if(e.target.classList.contains('roman')){
    for (const book of novelBooks) {
      const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
      books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}">Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
  }else if(e.target.classList.contains('polisiye')){
    for (const book of detectiveBooks) {
      const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
      books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}">Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
  }else {
    for (const book of bookList) {
      const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.image);
      books.innerHTML += `<div class="book">
      <div class="position1">
        <div class="book-image">
          <a href="#"><img src="${image.data.publicUrl}" alt="book-img"></a>
        </div>
        <div class="book-information">
          <h6 class="author-name">${book.author}</h6>
          <div class="position2">
          <h4 class="book-name">${book.name}</h4>
          <h4 class="book-price">${book.price} TL</h4>
          <button class="btn-add" data-bookid="${book.id}">Sepete Ekle</button>
          </div>
        </div>
      </div>
      <p class="book-summary">${book.summary}</p>
    </div>`
    }
   
  }
  bindClick();
  })
}
}

//fonskisyonları bağlama
function bindClick(){
  for (const btn of document.querySelectorAll('.btn-add')) {
    btn.addEventListener('click',addBasket);
  }

  for (const a of document.querySelectorAll('.btn-add')) {
    a.addEventListener('click',openDialog);
  }

  for (const b of document.querySelectorAll('.little-book-remove')) {
    b.addEventListener('click',removeBasket);
  }

  for (const c of document.querySelectorAll('.little-book-decrease')) {
    c.addEventListener('click',decreaseBasket);
  }

  for (const d of document.querySelectorAll('.little-book-increase')) {
    d.addEventListener('click',increaseBasket);
  }

}

//sepet oluşturma
 function basketBooks(){

  basketlistEl.innerHTML = '';
  basketList.forEach((book) => {
    
    const image =  supabase
        .storage
        .from('images')
        .getPublicUrl(book.product.image);

        basketlistEl.innerHTML += `<li class="little-book">
          <div class="position">
            <div class="little-img">
              <img src="${image.data.publicUrl}" width="100" height="100" alt="little-book">
            </div>
            <div class="little-book-information">
              <h3 class="little-book-name">${book.product.name}</h3>
              <p class="little-book-price">${book.product.price}</p>
              <p class="little-book-remove" data-basketid='${book.product.id}'>Sepetten Çıkar</p>
            </div>
          </div>
          <div class="little-book-quantity">
            <span class="little-book-decrease" data-decreaseid='${book.product.id}'>-</span>
            <span class="little-book-number">${book.adet}</span>
            <span class="little-book-increase" data-increaseid='${book.product.id}'>+</span>
          </div>
         </li>`
  });
  if(basketNum > 0){
    basketCount.innerHTML = basketNum;
  }
  if(total > 0){totalPrice.innerHTML = total};
  bindClick();
}
//sepete ekleme
function addBasket(bookId){

 bookId = this.dataset.bookid;
 let myBook = bookList.find(book => book.id == bookId);
 const basketBookIndex = basketList.findIndex(basket => basket.product.id == bookId );

 if(basketBookIndex === -1){
  let addItem = {
  adet: 1,
  product: myBook
 }
 basketList.push(addItem);
 basketNum+=1;
 total += myBook.price;
 }else{
  basketList[basketBookIndex].adet +=1;
  basketNum +=1;
  total += basketList[basketBookIndex].product.price;
 }
  basketBooks();
  
}

//sepetten çıkartma
function removeBasket(bookId){
  bookId = this.dataset.basketid;
  const findedIndex = basketList.findIndex(basket => basket.product.id == bookId);
  if(findedIndex != -1){
    total -= basketList[findedIndex].product.price;
    basketNum -=1;
    basketList.splice(findedIndex,1);
  }
    basketBooks();
  }

//Burayı Sor
//azaltma
function decreaseBasket(bookId){
  bookId = this.dataset.decreaseid;
  const findedIndex = basketList.findIndex(basket => basket.product.id == bookId);

  if(basketList[findedIndex].adet != 1){
    basketList[findedIndex].adet -=1;
  }else{
    removeBasket(bookId);
  }
  total -= basketList[findedIndex].product.price;
  basketNum -= 1;

  basketBooks();
 }
//arttırma
 function increaseBasket(bookId){
  bookId = this.dataset.increaseid;
  const findedIndex = basketList.findIndex(basket => basket.product.id == bookId);
  if(basketList[findedIndex].adet != basketList[findedIndex].product.stock){
    basketList[findedIndex].adet +=1;
  }else{
    alert(`Bu üründen sadece ${basketList[findedIndex].product.stock} tane var.`)
  }
  total += basketList[findedIndex].product.price;
  basketNum +=1;

  basketBooks();
  
 }


loadData();


    