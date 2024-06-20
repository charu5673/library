const myLibrary = [];
var c=0;
function Book(title, author, pages, read) {
  this.title=title;
  this.author=author;
  this.pages=pages;
  this.read=read;
}
const t=document.querySelector("#title");
const a=document.querySelector("#author");
const p=document.querySelector("#pages");
const r=document.querySelector("#read");
const cards=document.querySelector(".cards");
const add=document.querySelector("#add");
add.addEventListener("click",function(e){addBookToLibrary(e)});
function addBookToLibrary(e) {
    if(t.value==null||t.value==""||a.value==null||a.value==""||p.value==null||p.value=="")
        {
            e.preventDefault();
            return;
        }
        for(i=0;i<myLibrary.length;i++)
            {
                if(myLibrary[i].title===t.value)
                    {
                        if(myLibrary[i].author===a.value)
                            {
                                e.preventDefault();
                                return;
                            }
                    }
            }
    const b=new Book(t.value,a.value,p.value,r.checked);
    myLibrary.push(b);
    e.preventDefault();
    t.value=null;
    a.value=null;
    p.value=null;
    r.checked=false;
    display();
}

function remove(t,a){
    var i;
    for(i=0;i<myLibrary.length;i++)
        {
            if(myLibrary[i].title===t)
                {
                    if(myLibrary[i].author===a)
                        break;
                }
        }
    myLibrary.splice(i,1);
    r_display();
}

function toggle(t,a){
    var i;
    for(i=0;i<myLibrary.length;i++)
        {
            if(myLibrary[i].title===t)
                {
                    if(myLibrary[i].author===a)
                        {
                            myLibrary[i].read=!myLibrary[i].read;
                        }
                }
        }
    r_display();
}

function r_display() {
    cards.innerHTML=null;
    for(var i=0;i<myLibrary.length;i++)
        {
            cards.innerHTML=cards.innerHTML+createCard(myLibrary[i]);
        }
    c=myLibrary.length;
}

function display() {
    for(var i=c;i<myLibrary.length;i++)
        {
            cards.innerHTML=cards.innerHTML+createCard(myLibrary[i]);
        }
    c=myLibrary.length;
}
function createCard(obj) {
    return `<div class=\"card\"><h4 class=\"title\">${obj.title}</h1><h5 class=\"author\">${obj.author}</h5><p class=\"pages\">${obj.pages} pages</p><p class=\"read\">${(obj.read)?"Read":"Not read"}</p><button onclick=\"toggle('${obj.title}','${obj.author}')\" class=\"t_read\">${(!obj.read)?"Read":"Not read"}</button><button onclick=\"remove('${obj.title}','${obj.author}')\" class=\"remove\">Remove</button></div>`;
}
myLibrary.push(new Book("And then there were none","Agatha Christie",345,true));
myLibrary.push(new Book("Zero Day","Mark Russinovich",212,false));
myLibrary.push(new Book("The Jungle Book","Rudyard Kipling",432,false));
myLibrary.push(new Book("Man Eater of Malgudi","R.K. Narayan",213,true));
display();