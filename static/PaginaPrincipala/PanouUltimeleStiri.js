import {font_family_default,border_radius_default,backendServerAddress} from "../index.js";

let shadow;

let stiri;
let numarStiriAfisate = 1;
let indexulStiriiDinParteaStanga = 0;

class PanouUltimeleStiri extends HTMLElement {

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-family: ${font_family_default};
                    overflow: hidden;
                }

                .container-title {
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    background-color: #3E4095;
                    color: white;
                    margin: 1rem;
                    font-size: 4rem;
                    padding: 1rem 2rem;
                    border-radius: ${border_radius_default};
                }

                .panou {
                    margin-top: 1rem;
                    padding: 2rem 0rem;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                .button-arrow-left {
                    visibility: hidden;
                }

                .button-arrow-left, .button-arrow-right {
                    width: 10rem; 
                    margin: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    border: none;
                }

                .button-arrow-left:hover, .button-arrow-right:hover {
                    transform: scale(1.5,1.5);
                }

                .button-arrow-left img, .button-arrow-right img {
                    width: 100%;
                    fit-object: cover;
                }

                .container-stiri{
                    display: grid;
                    grid-auto-flow: column;
                    grid-auto-columns: calc((100% / 3) - 2rem);
                    gap: 3rem;
                    overflow: hidden;         
                }

                .stire {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: transform ease-in-out 0.25s;;
                    height: 40rem;
                    display: flex;
                    align-items: center;
                    margin: 0 0.75rem; 
                    overflow: hidden;
                }

                .stire .img-container {
                    height: 75%;
                    width: 100%;
                    overflow: hidden;
                    border-bottom: 0.2rem solid #3E4095;
                }

                .stire img {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                    transition: transform ease-out 0.25s;
                }

                .stire .rezumat {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 25%;
                    font-size: 1.25rem;
                    background-color: #3E4095;
                    color: white;
                    width: 100%;
                }

                @media screen and (max-width: 1500px) {
                    .container-stiri {
                        grid-auto-columns: calc((100% / 2) - 1.5rem);
                    }
                } 

                @media screen and (max-width: 650px)  {
                    .container-stiri {
                        grid-auto-columns: calc(100%);
                    }
                }

            </style>

            <div class="container">
                <div class="container-title">
                    Ultimele știri
                </div>
                <div class="panou">
                    <button type="button" class="button-arrow-left">
                        <img src="/static/imagini/left-arrow.png">
                    </button>
                    <div class="container-stiri">
                    </div>
                    <button type="button"class="button-arrow-right">
                        <img src="/static/imagini/right-arrow.png">
                    </button>
                </div>
            </div>
        `;
    }

    incarcaStirile() {
        return new Promise((resolve, reject) => {
            fetch(backendServerAddress + "api/News/getLatestNormalNewses")
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

    constructor() {
        super();
        shadow = this.attachShadow({ mode: "open" });

        this.incarcaStirile()
        .then(data => {
            this.render();

            const containerStiri = this.shadowRoot.querySelector(".container-stiri");

            for(let i=0;i<data.length;i++) {
                let stire = document.createElement("div");
                stire.setAttribute("class","stire");

                stire.innerHTML = `
                    <div class="img-container">
                        <img src="${data[i]["ImageBase64"]}">
                    </div>
                    <div class="rezumat">
                        ${data[i]["Name"]}
                    </div>
                `;

                containerStiri.appendChild(stire);
            }

            stiri = shadow.querySelectorAll(".container-stiri .stire");

            this.addEventListeners();

            this.actualizeazaNumarulStirilorAfisate();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });  

        
    }

    actualizeazaNumarulStirilorAfisate() {
        const latimePagina = window.innerWidth;

        let numarActualizatStiriAfisate;

        const numarStiri = stiri.length;

        if(latimePagina <= 1500) {
            if(latimePagina <=650) {
                numarActualizatStiriAfisate = 1;
            }
            else {
                numarActualizatStiriAfisate = 2;
            }
        }
        else {
            numarActualizatStiriAfisate = 3;
        }

        if(numarStiri > numarActualizatStiriAfisate)  {
            if(numarActualizatStiriAfisate > numarStiriAfisate) {
                if(indexulStiriiDinParteaStanga > numarStiri - numarActualizatStiriAfisate) {
                    this.shadowRoot.querySelector(".button-arrow-right").style.visibility = "visible";
                }
            }
            else 
                if(numarActualizatStiriAfisate < numarStiriAfisate) {
                    if(indexulStiriiDinParteaStanga < numarStiri - numarActualizatStiriAfisate) {
                        this.shadowRoot.querySelector(".button-arrow-right").style.visibility = "visible";
                    }
                }
        }
        else {
            this.shadowRoot.querySelector(".button-arrow-right").style.visibility = "hidden";
        }
        
        numarStiriAfisate = numarActualizatStiriAfisate;
    }

    returneazaDistantaDintreDouaStiri() {
        return stiri[1].offsetLeft - stiri[0].offsetLeft
    }

    transleazaStirile(valoareaTranslare) {
        for(let i=0; i < stiri.length; i++) {
            stiri[i].style.transform = "translateX(-" + valoareaTranslare + "px)";
        }
    }

    moveLeft() {
        if(indexulStiriiDinParteaStanga < stiri.length - numarStiriAfisate) {
            let valoareaTranslare = (this.returneazaDistantaDintreDouaStiri()) * (indexulStiriiDinParteaStanga + 1);
            
            this.transleazaStirile(valoareaTranslare);

            indexulStiriiDinParteaStanga++; 
        }

        if(indexulStiriiDinParteaStanga == stiri.length - numarStiriAfisate) {
            this.shadowRoot.querySelector(".button-arrow-right").style.visibility = "hidden";
        }

        if(indexulStiriiDinParteaStanga>0) {
            this.shadowRoot.querySelector(".button-arrow-left").style.visibility = "visible";
        }
    }

    moveRight() {
        if(indexulStiriiDinParteaStanga > 0) {
            let valoareaTranslare = (this.returneazaDistantaDintreDouaStiri()) * (indexulStiriiDinParteaStanga - 1);
            
            this.transleazaStirile(valoareaTranslare);

            indexulStiriiDinParteaStanga--;
        }

        if(indexulStiriiDinParteaStanga < stiri.length - numarStiriAfisate) {
            this.shadowRoot.querySelector(".button-arrow-right").style.visibility = "visible";
        }

        if(indexulStiriiDinParteaStanga==0) {
            this.shadowRoot.querySelector(".button-arrow-left").style.visibility = "hidden";
        }
    }

    resizePageHandler() {
        this.actualizeazaNumarulStirilorAfisate();

        const numarStiri = stiri.length;

        if(indexulStiriiDinParteaStanga > numarStiri - numarStiriAfisate) {
            indexulStiriiDinParteaStanga = numarStiri - numarStiriAfisate;

            this.shadowRoot.querySelector(".button-arrow-right").style.visibility = "hidden";
        }

        let valoareaTranslare = (this.returneazaDistantaDintreDouaStiri()) * indexulStiriiDinParteaStanga;
            
        this.transleazaStirile(valoareaTranslare);
    }

    enlargeTheImage() {
        this.querySelector(".img-container img").style.transform = "scale(1.1,1.1)";
    }

    shrinkTheImage() {
        this.querySelector(".img-container img").style.transform = "scale(1,1)";
    }


    addEventListeners() {
        for(let i=0;i<stiri.length;i++) {
            stiri[i].addEventListener(`mouseenter`,this.enlargeTheImage);
            stiri[i].addEventListener(`mouseleave`,this.shrinkTheImage);
        }

        shadow.querySelector(".button-arrow-left").addEventListener('click', this.moveRight.bind(this)); 
        shadow.querySelector(".button-arrow-right").addEventListener('click', this.moveLeft.bind(this));
        window.addEventListener('resize',this.resizePageHandler.bind(this));
    }

    connectedCallback() {
    }
}
  
customElements.define('panou-ultimele-stiri', PanouUltimeleStiri);