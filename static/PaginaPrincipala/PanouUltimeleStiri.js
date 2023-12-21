import {font_family_default,border_radius_default,border_default} from "../index.js";

let shadow;

let stiri;
let indexulStiriiDinParteaStanga = 0;

class PanouUltimeleStiri extends HTMLElement {

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    font-family: ${font_family_default};
                    margin: 0rem 12rem;
                    border: ${border_default};
                    border-radius: 1rem;
                    overflow: hidden;
                }

                .container-title {
                    background-color: #D62828;
                    width: fit-content;
                    color: white;
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    border-radius: 0 0 ${border_radius_default} 0;
                    border-bottom: ${border_default};
                    border-right: ${border_default};
                    padding: 1rem 2rem;
                }

                .panou {
                    padding: 2rem 0rem;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                .button-arrow-left, .button-arrow-right {
                    width: 5rem; 
                    height: 2rem;
                    margin: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .button-arrow-left img, .button-arrow-right img {
                    width: 75%;
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
                    transition: transform ease-in-out 0.5s;
                    background-color: #4D908E;
                    height: 20rem;
                    border: 0.1rem solid black;
                    border-radius: 0.75rem;
                    color: white;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                }

                @media screen and (max-width: 1500px) {
                    .container-stiri {
                        grid-auto-columns: calc((100% / 2) - 1.55rem);
                    }
                } 

                @media screen and (max-width: 650px)  {
                    .container-stiri {
                        grid-auto-columns: calc(100% - 0.35rem);
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
                        <div class="stire">
                            Rezumat stire 1
                        </div>
                        <div class="stire">
                            Rezumat stire 2
                        </div>
                        <div class="stire">
                            Rezumat stire 3
                        </div>
                        <div class="stire">
                            Rezumat stire 4
                        </div>
                        <div class="stire">
                            Rezumat stire 5
                        </div>
                        <div class="stire">
                            Rezumat stire 6
                        </div>
                    </div>
                    <button type="button"class="button-arrow-right">
                        <img src="/static/imagini/right-arrow.png">
                    </button>
                </div>
            </div>
        `;
    }

    constructor() {
        super();
        shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    moveLeft() {
        if(indexulStiriiDinParteaStanga < stiri.length - 1) {
            let valoareaTranslare = (stiri[indexulStiriiDinParteaStanga + 1].offsetLeft - stiri[indexulStiriiDinParteaStanga].offsetLeft) * (indexulStiriiDinParteaStanga + 1);
            
            for(let i=0; i < stiri.length; i++) {
                stiri[i].style.transform = "translateX(-" + valoareaTranslare + "px)";
            }

            indexulStiriiDinParteaStanga++; 
        }
    }

    moveRight() {
        if(indexulStiriiDinParteaStanga > 0) {
            let valoareaTranslare = (stiri[indexulStiriiDinParteaStanga].offsetLeft - stiri[indexulStiriiDinParteaStanga - 1].offsetLeft) * (indexulStiriiDinParteaStanga - 1);
            
            for(let i=0; i < stiri.length; i++) {
                stiri[i].style.transform = "translateX(-" + valoareaTranslare + "px)";
            }

            indexulStiriiDinParteaStanga--;
        }
    }

    addEventListeners() {
        shadow.querySelector(".button-arrow-left").addEventListener('click', this.moveRight); 
        shadow.querySelector(".button-arrow-right").addEventListener('click', this.moveLeft);
    }

    connectedCallback() {
        this.addEventListeners();

        stiri = shadow.querySelectorAll(".container-stiri .stire");
    }
}
  
customElements.define('panou-ultimele-stiri', PanouUltimeleStiri);