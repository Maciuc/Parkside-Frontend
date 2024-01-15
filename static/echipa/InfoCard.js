import {font_family_default,border_default, border_radius_default} from "../index.js";

class InfoCard extends HTMLElement {
    static get observedAttributes() {
        return ["imagine"];
    }

    get imagine() {
        return this.getAttribute("imagine");
    }

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                a.referinta-pagina-detalii {
                    text-decoration: none;
                }

                .card {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 20rem;
                    height: 35rem;
                    border: ${border_default};
                    border-radius: 0.25rem;
                    padding: 0.3rem;
                }

                .top {
                    height: 80%; 
                    width: 100%;
                    perspective: 2000px;
                }

                .flip-image {
                    position: relative;
                    transition: transform linear 0.75s;
                    transform-style: preserve-3d;
                    width: 100%;
                    height: 100%;
                }

                .top:hover .flip-image{
                    transform: rotateY(-180deg);
                }

                .img-container {
                    display: flex;
                    position: absolute;
                    justify-content: center;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                }

                .detailed-info {
                    transform: rotateY(180deg);
                    background-color: black;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    color: white;
                    font-size: 1rem;
                    backface-visibility: hidden;
                }
                

                .detailed-info .content {
                    margin: 0.25rem 1rem;
                    width: fit-content;
                    height: fit-content;
                }

                img {
                    object-fit: contain; 
                    width: 100%;
                    height: 100%;
                }

                .main-info, .detailed-info {
                    font-family: ${font_family_default};
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .main-info {
                    font-size: 1.5rem;
                    color: black;
                    height: 20%;
                }

                .main-info .content {
                    margin: 0.55rem 0;
                }
            </style>

            <a class="referinta-pagina-detalii">
                <div class="card">
                    <div class="top">
                        <div class="flip-image">
                            <div class="img-container">
                                <img>
                            </div>
                            <div class="detailed-info">
                            </div>
                        </div>
                    </div>
                    <div class="main-info">
                    </div>
              </div>
            </a>
        `;
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.render();
    }

    showADistinctAppearance() {
        let card = this.shadowRoot.querySelector(".card");
        card.style.border = "1rem solid blue";
        card.style.borderRadius = '1rem';
    }

    showTheDefaultAppearance() {
        let card = this.shadowRoot.querySelector(".card");
        card.style.border = border_default;
        card.style.borderRadius = '0.25rem';
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".img-container img").src = this.imagine;
    }
}
  
customElements.define('info-card', InfoCard);

export default InfoCard;