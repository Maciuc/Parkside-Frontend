import {font_family_default} from "./index.js";

/**
 * @description lista de functii ce sunt apelate dupa afisarea meniului
 */
export let afterMenuShownEventHandler = [];

/**
 * @description daca are o valoarea diferinta de 0, atunci meniul nu poate fi ascuns
 */
let menuCantBeHiden = 0;

/**
 * @param masterID identificatorul componentei (trebuie sa fie !=0 si multiplu de 2)
 * @description adauga componenta (identificata prin masterID) la lista de componente care blocheaza asunderea meniului
 */
export function blockMenuHidding(masterID) {
    menuCantBeHiden |= masterID;
}

/**
 * @param masterID identificatorul componentei (trebuie sa fie !=0 si multiplu de 2)
 * @description sterge componenta (identificata prin masterID) din lista de componente care blocheaza asunderea meniului
 */
export function unblockMenuHidding(masterID) {
    menuCantBeHiden &= ~masterID;
}

/**
 * @description lista de functii ce sunt apelate inainte de ascunderea meniului
 */
export let beforeHidingMenuEventHandler = [];

/**
 * @description verifica la fiecare 100ms daca meniul poate fi ascuns, iar in caz afirmativ supenda functia care astepta un promise 
 */
function readValue(){
    return new Promise((resolve,reject)=>{

        setTimeout(()=>{
            if(menuCantBeHiden === 0)
            resolve();
        } , 100
        );
    });
}

class MeniuPrincipal extends HTMLElement {

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .meniu {
                    z-index: 2;
                    display: flex;
                    justify-content: space-around;
                    position: sticky;
                    top: 0px;
                    left: 0px;
                    margin-top: 0.5rem;
                    background-color: white;
                    flex-direction: row;
                    align-items: center;
                    height: 7rem;
                    border-bottom: 0.35rem solid #3E4095;
                    transition: top linear 0.5s;
                }

                .logo {
                    display: flex;
                    height: 90%;
                    justify-content: center;
                    margin-left: 1rem;
                }

                .logo > a {
                    display: flex;
                }

                .meniu-a {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .meniu-a a{
                    background-color: white;
                    text-decoration: none;
                    height: 100%;
                    color: #3E4095;
                    font-size: 1.8rem;
                    font-family: ${font_family_default};
                    display: flex;
                    flex-direction: row;
                    margin: 1rem;
                    padding: 0.5rem 1rem;
                }      
                
                .meniu-a a:hover{
                    border-bottom: 0.5rem solid #3E4095;
                }

                .logo:hover {
                    height: 98%;
                }
            </style>

            <div class="meniu">
                <div class="logo">
                    <a href="../../templates/home.html">
                        <img src="/static/Images/logo.png" alt="Logo">
                    </a>
                </div>
                <div class="meniu-a">
                    <a href="/static/echipa/echipa.html">Echipa</a>
                    <a href="">Calendar</a>
                    <a href="/static/clasament/clasament.html">Clasament</a>
                    <a href="../../static/PaginaStiri/Stiri.html">Stiri</a>
                    <a href="">Istorie</a>
                    <a href="../../templates/start.html">Login</a>
                </div>
            </div>    
        `;
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.render();
    }

    lastWindowScrollY = 0;

    async waitUntilMenuCanBeHided() {
        await readValue();
    }

    /**
     * @description la defilarea paginii in sus meniul este ascuns, la defilarea paginii in jos, meniul este afisat
     */
    adaugaRutinaDeTratareAEvenimentuluiDeDefilareAPaginii() {
        window.addEventListener ("scroll",() => {
            let referintaMeniu = this.shadowRoot.querySelector(".meniu");

            let deltaY = window.scrollY - this.lastWindowScrollY;

            let functie;
            if(deltaY > 0) {
                for(let i=0;i<beforeHidingMenuEventHandler.length;i++) {
                    functie = beforeHidingMenuEventHandler[i];
    
                    functie();
                }

                this.waitUntilMenuCanBeHided();
                referintaMeniu.style.top = '-7.35rem';
            }
            else {
                referintaMeniu.style.zIndex = 2;
                referintaMeniu.style.top = '0rem';
            }

            this.lastWindowScrollY = window.scrollY;
        });
    }

    adaugaRutinaDeTratareAEvenimentuluiDeAfisareAMeniului() {
        this.shadowRoot.querySelector(".meniu").addEventListener('transitionend',()=>{
            if(this.shadowRoot.querySelector(".meniu").style.top === '0rem') {
                for(let i=0;i<afterMenuShownEventHandler.length;i++) {
                    let functie = afterMenuShownEventHandler[i];
    
                    functie();
                }
            }
        });
    }

    connectedCallback() {
        this.adaugaRutinaDeTratareAEvenimentuluiDeDefilareAPaginii();

        this.adaugaRutinaDeTratareAEvenimentuluiDeAfisareAMeniului();
    }
  }
  
  customElements.define('meniu-principal', MeniuPrincipal);

  export default MeniuPrincipal;