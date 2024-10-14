let myLibrary = [];
let c=0;
let i=0;
function Book(title, author, pages, read) {
  this.title=title;
  this.author=author;
  this.pages=pages;
  this.read=read;
  this.src="";
}

const t=document.querySelector("#title");
const a=document.querySelector("#author");
const p=document.querySelector("#pages");
const r=document.querySelector("#read");
const cards=document.querySelector(".cards");
const add=document.querySelector("#add");

add.addEventListener("click",function(e){addBookToLibrary(e)});
function addBookToLibrary(e) {
    if(t.validity.valid&&a.validity.valid&&p.validity.valid)
    {
    const b=new Book(t.value,a.value,p.value,r.checked);
    myLibrary.push(b);
    localStorage.setItem("myLib",JSON.stringify(myLibrary));
    e.preventDefault();
    t.value=null;
    a.value=null;
    p.value=null;
    r.checked=false;
    display();
    }
}

function remove(t,a){
    for(i=0;i<myLibrary.length;i++)
        {
            if(myLibrary[i].title===t)
                {
                    if(myLibrary[i].author===a)
                        break;
                }
        }
    let cs=document.querySelectorAll(".card");
    for(let j=0;j<cs.length;j++)
    {
        let e=cs[j];
        if(e.children[0].textContent==myLibrary[i].title&&e.children[1].children[0].textContent==myLibrary[i].author)
        {
            e.remove();
            break;
        }
    }
    myLibrary.splice(i,1);
    localStorage.setItem("myLib",JSON.stringify(myLibrary));
}

function toggle(t,a){
    for(i=0;i<myLibrary.length;i++)
        {
            if(myLibrary[i].title===t)
                {
                    if(myLibrary[i].author===a)
                        {
                            myLibrary[i].read=!myLibrary[i].read;
                            document.querySelectorAll(".card").forEach(e => {
                                if(e.children[0].textContent==myLibrary[i].title&&e.children[1].children[0].textContent==myLibrary[i].author)
                                {
                                    e.children[1].children[2].textContent=(myLibrary[i].read)?"Read":"Not read";
                                    e.children[1].children[3].textContent=(!myLibrary[i].read)?"Read":"Not read";
                                }
                            });
                        }
                }
        }
        localStorage.setItem("myLib",JSON.stringify(myLibrary));
}

async function display() {
    for(let j=c;j<myLibrary.length;j++)
        {
            let obj=myLibrary[j];
            let class1="",class2="";
            let ft="",fa="",cca;
            for(i=0;i<obj.title.length;i++)
            {
                if(obj.title.charAt(i)!=" ")
                    class1+=obj.title.charAt(i);
                cca=obj.title.charCodeAt(i);
                if(obj.title.charAt(i)!=" "&&!(cca<=122&&cca>=97)&&!(cca>=65&&cca<=90))
                {
                    ft+="\\"+obj.title.charAt(i);
                }
                else
                ft+=obj.title.charAt(i);
            }
            for(i=0;i<obj.author.length;i++)
            {
                if(obj.author.charAt(i)!=" ")
                    class1+=obj.author.charAt(i);
                cca=obj.author.charCodeAt(i);
                if(obj.author.charAt(i)!=" "&&!(cca<=122&&cca>=97)&&!(cca>=65&&cca<=90))
                {
                    fa+="\\"+obj.author.charAt(i);
                }
                else
                fa+=obj.author.charAt(i);
            }
            if(obj.src=="")
            {
            let t="",a="";
            let title=obj.title.toLowerCase();
            let author=obj.author.toLowerCase();
            for(i=0;i<title.length;i++)
            {
                if(title.charAt(i)==' ')
                    t+='+';
                else
                t+=title.charAt(i);
            }
            for(i=0;i<author.length;i++)
            {
                if(author.charAt(i)==' ')
                    a+='+';
                else
                a+=author.charAt(i);
            }
            await fetch(`https://bookcover.longitood.com/bookcover?book_title=${t}&author_name=${a}`,{mode:'cors'})
            .then(function(response) {
            return response.json();
            })
            .then(function(response){
                cards.innerHTML=cards.innerHTML+`<div class=\"card ${class1}${class2}\"><h4 class=\"title\">${obj.title}</h1><div class=\"left\"><h5 class=\"author\">${obj.author}</h5><p class=\"pages\">${obj.pages} pages</p><p class=\"read\">${(obj.read)?"Read":"Not read"}</p><button onclick=\"toggle('${ft}','${fa}')\" class=\"t_read\">${(!obj.read)?"Read":"Not read"}</button><button onclick=\"remove('${ft}','${fa}')\" class=\"remove\">Remove</button></div><div class="right"><img src=\"${response["url"]}\" class=\"${obj.title}${obj.author}\"></div></div>`;
                myLibrary[j].src=response["url"];
            });
        }
        else
        cards.innerHTML=cards.innerHTML+`<div class=\"card ${class1}${class2}\"><h4 class=\"title\">${obj.title}</h1><div class=\"left\"><h5 class=\"author\">${obj.author}</h5><p class=\"pages\">${obj.pages} pages</p><p class=\"read\">${(obj.read)?"Read":"Not read"}</p><button onclick=\"toggle('${ft}','${fa}')\" class=\"t_read\">${(!obj.read)?"Read":"Not read"}</button><button onclick=\"remove('${ft}','${fa}')\" class=\"remove\">Remove</button></div><div class="right"><img src=\"${obj.src}\" class=\"${obj.title}${obj.author}\"></div></div>`;
        }
    c=myLibrary.length;
    localStorage.setItem("myLib",JSON.stringify(myLibrary));
}

if(!localStorage.getItem("myLib"))
{
myLibrary.push(new Book("And then there were none","Agatha Christie",345,true));
myLibrary.push(new Book("Zero Day","Mark Russinovich",212,false));
myLibrary.push(new Book("The Jungle Book","Rudyard Kipling",432,false));
myLibrary.push(new Book("Man Eater of Malgudi","R.K. Narayan",213,true));
localStorage.setItem("myLib",JSON.stringify(myLibrary));
}
else
myLibrary=JSON.parse(localStorage.getItem("myLib"));
display();