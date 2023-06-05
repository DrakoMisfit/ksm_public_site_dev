class COOKIE_ENGINE{
    constructor()
    {
        console.log("initialize cookies script...");
        this.Init();
    }
    Init()
    {

        // if(localStorage.getItem("RdV76xNzG7WX5WeNvx5f37xm")==null)
        // {
            
        //     document.body.style.overflowY='hidden';
        // }
        // else{
        //     document.body.style.overflowY='scroll';
        // }
        document.body.style.overflowY='hidden';
        this.GenerateCookieHTML();
    }
    GenerateCookieHTML()
    {
        let cookieBg=document.createElement("div");
        cookieBg.id="cookie-background";

        let parent=document.createElement("div");
        parent.id="cookie-main-container";

        let closeCookieBtn=document.createElement("div");
        closeCookieBtn.id="close-cookie-btn";
        closeCookieBtn.innerText="rozumiem";
        parent.appendChild(closeCookieBtn);

        document.body.append(cookieBg,parent);
    }
}



















// enable cookie
let cookieEngine;
window.addEventListener("DOMContentLoaded",async()=>{
    cookieEngine=new COOKIE_ENGINE();
});