let dummybooks = [
  {
    title : 'Mathematics class 11',
    cover : 'books/rs.jpg',
    author : 'R. S. Agrawal',
    cost : '₹ 920',
    by : "sureshkumar@8363",
    from : '53-A Chanduli Nagar, Delhi',
    _id : 'dummy001',
    phone : 8057428072,
    dummy : true
},{
    title: 'Organic Chemestry class 11',
    cover: 'books/organic.jpg',
    author: 'NCERT',
    cost: '₹ 120',
    by: "surajk9189",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 9739282933,
    _id: 'dummy002',
    dummy: true
    
},{
    title: 'Chemestry Part 1 class 11',
    cover: 'books/chemestry.jpg',
    author: 'NCERT',
    cost: '₹ 920',
    by: "sureshkumar@8363",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 1837392749,
    _id: 'dummy003',
    dummy: true
},{
    title: 'Physics Part 1 class 11',
    cover: 'books/ph1.jpg',
    author: 'R. S. Agrawal',
    cost: '₹ 920',
    by: "sureshkumar@8363",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 9474938383,
    _id: 'dummy004',
    dummy: true
},{
    title: 'Physics Part 2 class 11',
    cover: 'books/ph2.jpg',
    author: 'NCERT',
    cost: '₹ 920',
    by: "sureshkumar@8363",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 8272927392,
    _id: 'dummy005',
    dummy: true
},{
    title: 'Maths Concept King',
    cover: 'books/conceptking.jpeg',
    author: 'Gagan Pratap Sir',
    cost: '₹ 920',
    by: "sureshkumar@8363",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 8593740263,
    _id: 'dummy006',
    dummy: true
},{
    title: 'Indian Economy',
    cover: 'books/indianeconomy.jpeg',
    author: 'StudyIQ Publications',
    cost: '₹ 920',
    by: "sureshkumar@8363",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 6882639373,
    _id: 'dummy007',
    dummy: true
},{
    title: 'Fundamentals Of Geography',
    cover: 'books/fog.jpeg',
    author: 'studyIQ publications',
    cost: '₹ 920',
    by: "sureshkumar@8363",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 7393729173,
    _id: 'dummy008',
    dummy: true
},{
    title: 'Tell Me A Story',
    cover: 'books/tellmeastory.jpeg',
    author: 'Ravinder Singh',
    cost: '₹ 199',
    by: "RameshSingh53738",
    from: '53-A Nagpur, Gujrat',
    phone : 2729272833,
    _id: 'dummy009',
    dummy: true
},{
    title: 'Harry Potter and the Goblet of Fire',
    cover: 'books/hpandgof.jpeg',
    author: 'J. K. Rowling',
    cost: '₹ 799',
    by: "sureshkumar@8363",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 8493839372,
    _id: 'dummy010',
    dummy: true
},{
    title: 'The Greatest Short Stories',
    cover: 'books/shortstoryleo.jpeg',
    author: 'Leo Tolstoy',
    cost: '₹ 620',
    by: "sureshkumar@8363",
    from: '53-A Chanduli Nagar, Delhi',
    phone : 6482927393,
    _id: 'dummy011',
    dummy: true
}]


//=========================================

var dummybooknames=dummybooks.map(v=>v.title);
var dummybookids=dummybooks.map(v=>v._id);

//=========================================

class bkdummy {
  static get exists(){
    return !!localStorage.getItem('bkshelf_dummy');
  }
  static setstorage(obj) {
    localStorage.setItem('bkshelf_dummy',JSON.stringify(obj));
  }
  static getstorage(){
    return JSON.parse(localStorage.getItem('bkshelf_dummy'));
  }
  static getBooks(){
    let cart = this.getstorage().cart;
    let bookids = [];
    bookids = cart.filter(v=>v!=null);
    let books = [];
    bookids.forEach((id)=>{
      let bk = dummybooks.find(v=>v._id==id);
      books.push(bk);
    })
    return books;
  }
}

//===========================================

  if (!bkdummy.exists) {
    bkdummy.setstorage ({
      cart: []
    })
  }
  
//===========================================

function addtodummycart(dummy_id){
  if (!loginned()) return gotologin();

  let cart = bkdummy.getstorage().cart;
  if (window.cartaction !="add"){ 
    delete cart[cart.findIndex(val=>val==dummy_id)];
    bkdummy.setstorage({cart});
    btnaddtocart.innerText = 'add to cart';
    window.cartaction = 'add';
  } else {
    btnaddtocart.innerText = 'remove from cart';
    window.cartaction = 'remove';
    let temp;
    if(window.cartaction=='remove'){ 
      cart.push(dummy_id);
      bkdummy.setstorage({cart});
    }
  }
}

//===========================================

function isindummycart(dummy_id){
  let result = false;
  let dummy = bkdummy.getstorage();
  //console.log(dummy); return;
  for(let i=0;i<dummy.cart.length;i++){
    if(dummy.cart[i]==dummy_id){
      result = true;
      break;
    }
  }
  return result;
}

//==========================================

function isadummyid(id){
  return dummybookids.includes(id);
}

//=========================================
//addtodummycart();

dummybooks.forEach((res)=>{
  let cont = document.createElement('div');
      cont.classList.add('book');
      cont.addEventListener('click', () => showbook(cont));
      Object.assign(cont.dataset, {
        title: res.title,
        cost: res.cost,
        src : res.cover,
        by: res.by,
        author: res.author,
        from: res.from,
        _id: res._id,
        phone : res.phone,
        incart : isindummycart(res._id)
      })
      //console.log(res.from);
      let book = `
        <div class="details">
          ${res.title} <br> ${res.cost}
        </div>
        <img src="${res.cover}" alt="image"><br>
    `
      cont.innerHTML = book;
      bookpane.appendChild(cont);
})

//=========================================
