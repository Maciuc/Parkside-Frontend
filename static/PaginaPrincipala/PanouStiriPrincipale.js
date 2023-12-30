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

                .panou img {
                    width: 100%;
                    object-fit: cover;
                    height: 75%;
                    filter: brightness(0.75);
                }

                .container {
                    position: absolute;
                    height: 100%;
                    transition: opacity 2.3s;
                }

                .informatii-stire {
                    width: 100%;
                    height: 25%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #3E4095;
                }

                .rezumat-stire {
                    color: white;
                    padding: 1rem 0;
                    font-family: ${font_family_default};
                    font-size: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem 2rem;
                }

                .button-citeste-stirea {
                    position: absolute;
                    bottom: 1rem;
                    right: 1rem;
                    width: 7rem;
                    height: 3rem;
                    border-width: 0.25rem;
                    border-radius: 0.5rem;
                    font-family: ${font_family_default};
                    font-size: 1.2rem;
                }

                .button-citeste-stirea:hover {
                    background-color: gray;
                    color: white;
                }

                .grup-index-stire {
                    position: absolute;
                }
            </style>

            <div class="panou">
                <div class="container" style="opacity: 0; z-index: -1;">
                    <img>
                    <div class="informatii-stire">
                        <div class="rezumat-stire">
                        </div>
                        <button type="button" class="button-citeste-stirea">detalii</button>
                    </div>
                </div>
                <div class="container" style="opacity: 1; z-index:0;">
                    <img src="${stiriDeAfisat[indexStireCurenta].caleImagine}">
                    <div class="informatii-stire">
                        <div class="rezumat-stire">
                            ${stiriDeAfisat[indexStireCurenta].rezumatStire}
                        </div>
                        <button type="button" class="button-citeste-stirea">detalii</button>
                    </div>
                </div>
            </div>
        `;
    }

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

    afiseazaUrmatoareaStire() {
        indexStireCurenta = (indexStireCurenta + 1) % numarStiriDeAfisat;

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

    connectedCallback() {
        this.containere = this.shadowRoot.querySelectorAll(".container");

        setInterval(this.afiseazaUrmatoareaStire.bind(this), 5000);
    }
  }
  
customElements.define('panou-stiri-principale', PanouStiriPrincipale);