let calendarData={};

let expandBtnMenu=document.querySelector("#menu-container .expand-menu");
let MenuContainer=document.querySelector("#menu-container");
let MenuItemsContainer=document.querySelector("#menu-items");
let ImageContainer=document.querySelector("#photo-container");
let NextImgBtn=document.querySelector("#container > #images > .next-image");
let PrevImgBtn=document.querySelector("#container > #images > .prev-image");
let backgoroundPopup=document.querySelector("#black-bg");

expandBtnMenu.onclick=()=>{
    if(MenuContainer.getAttribute("expaded")=='false')
    {
        MenuContainer.setAttribute("expaded","true")
        MenuContainer.classList.add("visible-menu");
        MenuContainer.classList.remove("hidden-menu");
        expandBtnMenu.style='rotate:180deg; font-size:22px';
    }
    else{
        MenuContainer.setAttribute("expaded","false")
        MenuContainer.classList.remove("visible-menu");
        MenuContainer.classList.add("hidden-menu");
        expandBtnMenu.style='rotate: 0deg';
    }
}
function ChangeActiveMenuItem(el){
    document.querySelectorAll("#menu-items .item").forEach(element=>{
        if(el.getAttribute('site') == element.getAttribute('site')){
            // element.classList.add("item-selected");\
            element.scrollIntoView({behavior: 'smooth'});
        }
        else{
            // element.classList.remove("item-selected")
        }
    });
    HideMenu();
    location.href=el.getAttribute('site');
}
function HideMenu()
{
    MenuContainer.classList.remove("visible-menu");
    MenuContainer.classList.add("hidden-menu");
    expandBtnMenu.style='rotate: 0deg';
    MenuContainer.setAttribute("expaded","false");
}
document.querySelector("#SendMessage").onclick=()=>{
    let Fname=document.querySelector("#contact-form > #user-fname").value;
    let email=document.querySelector("#contact-form > #user-email").value;
    let mess=document.querySelector("#contact-form > #message-text").value;

    if(Fname!='' && email!='' && mess!='')
    {
        fetch("./",{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Fname:Fname,
                email:email,
                mess:mess
            })
        }).then(response=>{
            response.json().then(data=>{
                console.log(data);
            });
        }).catch(err=>{
            console.log("coś się popsuło!")
        });
    }
    else{
        alert("wypełnij proszę wszyskie pola!")
    }
}






let images_slider=[];
["1.jpg", "2.jpg", "3.jpg"].forEach(img=>{
    let _img=new Image();
    _img.src='./imgs/slider_images/'+img;
    images_slider.push(_img)
});
let counter=0;
NextImgBtn.onclick=()=>{
    if(counter<2)
    {
        counter++;
        ImageContainer.innerHTML=null;
        ImageContainer.appendChild(images_slider[counter]);
        document.querySelectorAll(".bar-img-active .step").forEach((stepElem,index)=>{
            if(index==counter)
            {
                stepElem.classList.remove("step-noactive");
                stepElem.classList.add("step-active");
            }
            else{
                stepElem.classList.remove("step-active");
                stepElem.classList.add("step-noactive");
            }
        })
    }
}
PrevImgBtn.onclick=()=>{
    if(counter>0)
    {
        counter--;
        ImageContainer.innerHTML=null;
        ImageContainer.appendChild(images_slider[counter]);
        document.querySelectorAll(".bar-img-active .step").forEach((stepElem,index)=>{
            if(index==counter)
            {
                stepElem.classList.remove("step-noactive");
                stepElem.classList.add("step-active");
            }
            else{
                stepElem.classList.remove("step-active");
                stepElem.classList.add("step-noactive");
            }
        })
    }
}

async function GenerateCalendar(fullyear,number_days, month_index)
{
    const months=[
        "styczeń","luty","marzec","kwiecień","maj"," czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"
    ];
    document.querySelector("#calendar > .title-section").innerText=`Kalendarz wydarzeń (${months[month_index]})`;
    let tilesContainer=document.querySelector("#calendar-tiles");
    tilesContainer.innerHTML=null;

    // puste kafle - układające odpowiednio dni w kalendarzu.
    for(let _i1=0;_i1<calendarData.blank_tiles[month_index];_i1++)
    {
        tilesContainer.innerHTML+=`<div class="calendar-blank-tile"></div>`;
    }


    //widoczne kafle
    for(let i=1;i<=number_days;i++)
    {
        let fullday=(i<10) ? `0${i}` : i;
        let month=((month_index+1)<10) ? `0${month_index+1}` : month_index+1;
        let _data_1=`${fullday}-${month}-${fullyear}`;
        tilesContainer.innerHTML+=`<div class="calendar-tile" onclick="DisplayDetailsDay(this)" data-1="${_data_1}">${i}</div>`;
    }
}
function DisplayDetailsDay(el)
{
    console.log(el);
}
function ActualDate()
{
    let datetime=new Date();
    let final_dt={
        year: datetime.getFullYear(),
        month: (datetime.getMonth()+1<10)?`0${datetime.getMonth()+1}`:`${datetime.getMonth()+1}`,
        day: (datetime.getDate()<10)?`0${datetime.getDate()}`:`${datetime.getDate()}`,
    };

    return `${final_dt.year}-${final_dt.month}-${final_dt.day}`;
}


async function downloadCalendarDetails()
{
    calendarData = await (await fetch("./data/calendar/2023.json")).json();

    let date=new Date(2023,(new Date().getMonth()+1),0);
    GenerateCalendar(date.getFullYear(),date.getDate(), date.getMonth());
}

document.addEventListener("DOMContentLoaded",async ()=>{
    await downloadCalendarDetails();
    ImageContainer.innerHTML=null;
    ImageContainer.appendChild(images_slider[0]);
    document.querySelectorAll(".bar-img-active .step")[0].classList.add("step-active");
    document.querySelectorAll(".bar-img-active .step")[0].classList.remove("step-noactive");


});

//  ===================================================================
//  ===================================================================
//  ===================================================================
//  ===================================================================
function testData()
{
    document.querySelector("#contact-form > #user-fname").value="Dariusz";
    document.querySelector("#contact-form > #user-email").value="darcio3326@gmail.com";
    document.querySelector("#contact-form > #message-text").value="Chciałem się zapytać czy Państwa kalendarz udostępnia publiczne API?\n\npozdrawiam, Marek";
}

// OSM CODE 
let osm=new ol.layer.Tile({
    source: new ol.source.OSM(),
});

let orto2019=new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: './data/map_tiles_orto/{z}/{x}/{y}.png'
    })
});

var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: './data/gmina_DT.kml',
        format: new ol.format.KML()
    })
});
const map = new ol.Map({
    target: 'main-osm-map',
    layers: [
        osm,
        orto2019,
        vector
    ],
    view: new ol.View({
        extent: [2297389.5982784154, 6457608.857509619, 2373826.626563592, 6495827.371652206],
        center: [2335609.564302438, 6476713.322607741],
        zoom: 18,
        minZoom: 13,
        maxZoom: 21
    }),
    // interactions:[]
});


// window.onscroll=(evt)=>{
//     console.log(window.scrollY);
// }


function test(fromUser)
{
    const result = /^[A-Za-z0-9_.-@]+$/.test(fromUser);
    console.log(result); // true

    let posMenu=document.querySelector("#menu-items").getBoundingClientRect();
    let posLogo=document.querySelector("#logo-menu").getBoundingClientRect();
}