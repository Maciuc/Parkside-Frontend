import {font_family_default,border_default,border_radius_default} from "../index.js";

function stire(caleImagine,rezumatStire) {
    this.caleImagine = caleImagine;
    this.rezumatStire = rezumatStire;
}

const numarStiriDeAfisat = 3;
var stiriDeAfisat = [];
var indexStireCurenta = 0;

var referintaPanouStiri;


class PanouStiriPrincipale extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .stire {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    background-color: #90BE6D;
                    border-radius: ${border_radius_default};
                    border: ${border_default};
                    margin: 1% 12rem;
                    height: 600px; 
                }

                .stire > img {
                    width: 60%;
                    object-fit: cover;
                    height: 100%;
                    border-radius: ${border_radius_default} 0px 0px ${border_radius_default};
                    border-right: 1px solid black;
                }

                .informatii-stire {
                    width: 40%;
                }

                .rezumat-stire {
                    color: black;
                    padding: 0px 25px;
                    margin: 10% 5%;
                    font-family: ${font_family_default};
                    font-size: 2rem;
                }

                .button-citeste-stirea {
                    background-color: #FEFBD8;
                    float: right;
                    width: 10rem;
                    height: 4rem;
                    margin-right: 10%;
                    border-width: 0.25rem;
                    border-radius: 2rem;
                    font-family: ${font_family_default};
                    font-size: 1.5rem;
                }

                .button-citeste-stirea:hover {
                    background-color: gray;
                    color: white;
                }

                .grup-index-stire {
                    position: absolute;
                }

                @media screen and (max-width: 1200px) {
                    .stire {
                        flex-direction: column;
                        height: fit-content;
                    }

                    .stire > img {
                        width: 100%;
                        border-radius: ${border_radius_default} ${border_radius_default} 0 0;
                        border-right: none;
                        border-bottom: 1px solid black;
                    }

                    .informatii-stire {
                        width: 100%;
                    }

                    .rezumat-stire {
                        margin: 5%;
                    }

                    .button-citeste-stirea {
                        margin-bottom: 2.5%;
                    }
                }
            </style>

            <div class="panou">
                <div class="stire">
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
        stiriDeAfisat.push(new stire("/static/Images/stire1_1.jpg","România a încheiat pe locul secund Trofeul Carpați pentru juniori"));
        stiriDeAfisat.push(new stire("/static/Images/stire2_1.jpg","România va juca astăzi cu Egipt, de la ora 12:30, pentru câștigarea Trofeului Carpați"));
        stiriDeAfisat.push(new stire("/static/Images/stire3_1.jpg","Handbaliștii de la CSU Suceava au fost protagoniștii primului meci pe care echipa națională a României l-a disputat la Trofeul Carpați pentru juniori"));  
    }

    afiseazaUrmatoareaStire() {
        indexStireCurenta = (indexStireCurenta + 1) % numarStiriDeAfisat;

        referintaPanouStiri.shadowRoot.querySelector("img").src = stiriDeAfisat[indexStireCurenta].caleImagine;
        referintaPanouStiri.shadowRoot.querySelector(".rezumat-stire").innerText = stiriDeAfisat[indexStireCurenta].rezumatStire;
    }

    connectedCallback() {
        referintaPanouStiri = document.getElementsByTagName("panou-stiri-principale")[0];
    }
  }
  
customElements.define('panou-stiri-principale', PanouStiriPrincipale);


function afiseazaUrmatoareaStire() {
    referintaPanouStiri.afiseazaUrmatoareaStire();
}

//setInterval(afiseazaUrmatoareaStire, 5000);