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
                    width: fit-content;
                    height: 30rem;
                    border: ${border_default};
                    border-radius: 0.25rem;
                    padding: 0.3rem;
                }

                .top {
                    position: relative;
                    height: 80%; 
                    width: 100%;
                }

                .img-container {
                    display: flex;;
                    justify-content: center;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                }

                .detailed-info {
                    background-color: black;
                    display: fixed;
                    position: absolute;
                    width: 0;
                    height: 0;
                    transition: all 0.5s ease-out;
                    color: white;
                    font-size: 0;
                }

                .detailed-info .content {
                    margin: 0.25rem 1rem;
                    width: fit-content;
                    height: fit-content;
                }

                img {
                    object-fit: cover; 
                    transition: transform ease-out 0.5s;
                }

                .main-info, .detailed-info {
                    font-family: ${font_family_default};
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 20%;
                }

                .main-info {
                    font-size: 1.5rem;
                    color: black;
                }

                .content {
                    margin: 0.55rem 0;   
                }
            </style>

            <a class="referinta-pagina-detalii">
                <div class="card">
                    <div class="top">
                        <div class="img-container">
                            <img>
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

    hideDetailedInfo() {
        let detailedInfo = this.querySelector(".detailed-info");
        detailedInfo.style.width = "0%";
        detailedInfo.style.height = "0%";
        detailedInfo.style.fontSize = "0px";
    }
    
    showDetailedInfo() {
        let detailedInfo = this.querySelector(".detailed-info");
        detailedInfo.style.width = "100%";
        detailedInfo.style.height = "100%";
        detailedInfo.style.fontSize = "1rem";
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

    enlargeTheImage() {
        this.shadowRoot.querySelector(".img-container img").style.transform = "scale(1.1,1.1)";
    }

    shrinkTheImage() {
        this.shadowRoot.querySelector(".img-container img").style.transform = "scale(1,1)";
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".img-container img").src = this.imagine;
        this.shadowRoot.querySelector(".top").addEventListener(`mouseenter`,this.showDetailedInfo);
        this.shadowRoot.querySelector(".top").addEventListener(`mouseleave`,this.hideDetailedInfo);
        this.shadowRoot.querySelector("a.referinta-pagina-detalii").addEventListener(`mouseenter`,this.enlargeTheImage.bind(this));
        this.shadowRoot.querySelector("a.referinta-pagina-detalii").addEventListener(`mouseleave`,this.shrinkTheImage.bind(this));
    }
}
  
customElements.define('info-card', InfoCard);

export default InfoCard;