import {font_family_default, backendServerAddress} from "../index.js";

function stire(imagineStire,rezumatStire) {
    this.imagineStire = imagineStire;
    this.rezumatStire = rezumatStire;
}

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
                        <img src="${stiriDeAfisat[indexStireCurenta].imagineStire}">
                    </div>
                    <div class="rezumat-stire">
                        ${stiriDeAfisat[indexStireCurenta].rezumatStire}
                    </div>
                </div>
                <div class="schimba-stirea-curenta">
                </div>
            </div>
        `;
    }

    timerHandler = undefined;
    dots = undefined;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.incarcaStirilePrincipale()
        .then(() => {       
            if(stiriDeAfisat.length !== 0) {
                this.render();

                const butoaneSchimbaStireaCurenta = this.shadowRoot.querySelector(".schimba-stirea-curenta");

                for(let i=0;i<stiriDeAfisat.length;i++) {
                    const dot = document.createElement("div");
                    dot.setAttribute("class","dot");
                    dot.setAttribute("index",i);

                    butoaneSchimbaStireaCurenta.appendChild(dot);
                }

                butoaneSchimbaStireaCurenta.firstElementChild.style.backgroundColor = "white";
            
                this.containere = this.shadowRoot.querySelectorAll(".container");

                this.dots = this.shadowRoot.querySelectorAll(".dot");

                for(let i=0;i<this.dots.length;i++) {
                    this.dots[i].addEventListener('mousedown',(eventInfo) => {this.afiseazaStireaDorita(eventInfo);});
                    this.dots[i].addEventListener('mouseup',() => {this.timerHandler = setInterval(this.afiseazaUrmatoareaStire.bind(this), 5000);});
                }

                this.timerHandler = setInterval(this.afiseazaUrmatoareaStire.bind(this), 5000);
            }  
        });
    }

    afiseazaStireaCurenta() {
        this.dots[indexStireCurenta].style.backgroundColor = "white";

        const containerCurent = this.containere[this.indexContainerCurent];

        containerCurent.style.opacity = 0;
        containerCurent.querySelector("img").src = stiriDeAfisat[indexStireCurenta].imagineStire;
        containerCurent.querySelector(".rezumat-stire").innerText = stiriDeAfisat[indexStireCurenta].rezumatStire;
        containerCurent.style.zIndex = 0;

        this.indexContainerCurent = (this.indexContainerCurent + 1) % 2;
        this.containere[this.indexContainerCurent].style.zIndex = -1;
        this.containere[this.indexContainerCurent].style.opacity = 0;

        containerCurent.style.opacity = 1;
    }

    afiseazaUrmatoareaStire() {
        this.dots[indexStireCurenta].style.backgroundColor = "";
        indexStireCurenta = (indexStireCurenta + 1) % stiriDeAfisat.length;

        this.afiseazaStireaCurenta();
    }

    afiseazaStireaDorita(eventInfo) {
        clearInterval(this.timerHandler);

        this.dots[indexStireCurenta].style.backgroundColor = "";

        const index = eventInfo.target.getAttribute("index");

        indexStireCurenta = index;

        this.afiseazaStireaCurenta();
    }

    returneazaStirilePrincipale() {
        return new Promise((resolve, reject) => {
            fetch(backendServerAddress + "api/News/getLatestPrimaryNewses")
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }  
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    incarcaStirilePrincipale() {
        return new Promise(async (resolve) => {
            this.returneazaStirilePrincipale()
            .then(stiri => {
                for(let i=0;i<stiri.length;i++) {
                    stiriDeAfisat.push(new stire(stiri[i]["ImageBase64"],stiri[i]["Name"])); 
                }
                resolve();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    }
  }
  
customElements.define('panou-stiri-principale', PanouStiriPrincipale);