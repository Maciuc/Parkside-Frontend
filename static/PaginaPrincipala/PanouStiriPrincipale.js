import {font_family_default,border_default,border_radius_default} from "../index.js";

function stire(caleImagine,rezumatStire) {
    this.caleImagine = caleImagine;
    this.rezumatStire = rezumatStire;
}

const numarStiriDeAfisat = 3;
var stiriDeAfisat = [];
var indexStireCurenta = 0;

class PanouStiriPrincipale extends HTMLElement {
    indexContainerCurent = 0;
    containere;

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .panou {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                    margin: 1% 0;
                    height: 55rem;
                }

                .img-container img {
                    width: 100%;
                    object-fit: cover;
                    height: 100%;
                    filter: brightness(0.75);
                    transition: transform ease-in-out 0.5s;
                }

                .img-container:hover img {
                    transform: scale(1.05,1.05);
                }

                .container {
                    position: absolute;
                    height: 100%;
                    transition: opacity 2.3s;
                }

                .img-container {
                    height: 75%;
                    overflow: hidden;
                }

                .rezumat-stire {
                    height: 25%;
                    background-color: #3E4095;
                    color: white;
                    font-family: ${font_family_default};
                    font-size: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 2rem;
                }

                .schimba-stirea-curenta {
                    position:absolute;
                    bottom: 0px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    margin: 1.5rem;
                }

                .dot {
                    height: 1rem;
                    width: 1rem;
                    border-radius: 50%;
                    border: 0.15rem solid white;
                    margin: 0 1.5rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    transition: transform ease-out 0.25s;
                }

                .dot:hover {
                    transform: scale(1.5,1.5);
                }
            </style>

            <div class="panou">
                <div class="container" style="opacity: 0; z-index: -1;">
                    <div class="img-container">
                        <img>
                    </div>
                    <div class="rezumat-stire">
                    </div>
                </div>
                <div class="container" style="opacity: 1; z-index:0;">
                    <div class="img-container">
                        <img src="${stiriDeAfisat[indexStireCurenta].caleImagine}">
                    </div>
                    <div class="rezumat-stire">
                        ${stiriDeAfisat[indexStireCurenta].rezumatStire}
                    </div>
                </div>
                <div class="schimba-stirea-curenta">
                    <div class="dot" style="background-color: white;" index="0">
                    </div>
                    <div class="dot" index="1">
                    </div>
                    <div class="dot" index="2">
                    </div>
                </div>
            </div>
        `;
    }

    timerHandler = undefined;
    dots = undefined;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.preiaContinutulUtlimelorNStiri();
        this.render();
    }

    preiaContinutulUtlimelorNStiri() {
        stiriDeAfisat.push(new stire("./static/imagini/stire1_1.jpg","România a încheiat pe locul secund Trofeul Carpați pentru juniori"));
        stiriDeAfisat.push(new stire("./static/imagini/stire2_1.jpg","România va juca astăzi cu Egipt, de la ora 12:30, pentru câștigarea Trofeului Carpați"));
        stiriDeAfisat.push(new stire("./static/imagini/stire3_1.jpg","Handbaliștii de la CSU Suceava au fost protagoniștii primului meci pe care echipa națională a României l-a disputat la Trofeul Carpați pentru juniori"));  
    }

    afiseazaStireaCurenta() {
        this.dots[indexStireCurenta].style.backgroundColor = "white";

        const containerCurent = this.containere[this.indexContainerCurent];

        containerCurent.style.opacity = 0;
        containerCurent.querySelector("img").src = stiriDeAfisat[indexStireCurenta].caleImagine;
        containerCurent.querySelector(".rezumat-stire").innerText = stiriDeAfisat[indexStireCurenta].rezumatStire;
        containerCurent.style.zIndex = 0;

        this.indexContainerCurent = (this.indexContainerCurent + 1) % 2;
        this.containere[this.indexContainerCurent].style.zIndex = -1;
        this.containere[this.indexContainerCurent].style.opacity = 0;

        containerCurent.style.opacity = 1;
    }

    afiseazaUrmatoareaStire() {
        this.dots[indexStireCurenta].style.backgroundColor = "";
        indexStireCurenta = (indexStireCurenta + 1) % numarStiriDeAfisat;

        this.afiseazaStireaCurenta();
    }

    afiseazaStireaDorita(eventInfo) {
        clearInterval(this.timerHandler);

        this.dots[indexStireCurenta].style.backgroundColor = "";

        const index = eventInfo.target.getAttribute("index");

        indexStireCurenta = index;

        this.afiseazaStireaCurenta();
    }

    connectedCallback() {
        this.containere = this.shadowRoot.querySelectorAll(".container");

        this.dots = this.shadowRoot.querySelectorAll(".dot");

        for(let i=0;i<this.dots.length;i++) {
            this.dots[i].addEventListener('mousedown',(eventInfo) => {this.afiseazaStireaDorita(eventInfo);});
            this.dots[i].addEventListener('mouseup',() => {this.timerHandler = setInterval(this.afiseazaUrmatoareaStire.bind(this), 5000);});
        }

        this.timerHandler = setInterval(this.afiseazaUrmatoareaStire.bind(this), 5000);
    }
  }
  
customElements.define('panou-stiri-principale', PanouStiriPrincipale);