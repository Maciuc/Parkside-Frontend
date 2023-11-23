import {font_family_default,border_default} from "../index.js";

class InfoCard extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 17rem;
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
                    display: flex;
                    justify-content: center;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                }

                .detailed-info {
                    background-color: black;
                    display: fixed;
                    position: absolute;
                    top: 0;
                    float: left;
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
                }

                .content {
                    margin: 0.55rem 0;   
                }
            </style>

            <div class="card">
                <div class="top">
                    <div class="img-container">
                        <img src="/static/Images/stire1_1.jpg">
                    </div>
                    <div class="detailed-info">
                    </div>
                </div>
                <div class="main-info">
                </div>
            </div>
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

    connectedCallback() {
        this.shadowRoot.querySelector(".top").addEventListener(`mouseenter`,this.showDetailedInfo);
        this.shadowRoot.querySelector(".top").addEventListener(`mouseleave`,this.hideDetailedInfo);
    }
}
  
customElements.define('info-card', InfoCard);

export default InfoCard;