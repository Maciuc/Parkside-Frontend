class GameCard extends HTMLElement {
    static get observedAttributes() {
        return ["numeEchipa1","siglaEchipa1","numeEchipa2","siglaEchipa2","numeCampionat","data","locatie","scor","meciAcasa"];
    }

    get numeEchipa1() {
        return this.getAttribute("numeEchipa1");
    }

    get siglaEchipa1() {
        return this.getAttribute("siglaEchipa1");
    }

    get numeEchipa2() {
        return this.getAttribute("numeEchipa2");
    }

    get siglaEchipa2() {
        return this.getAttribute("siglaEchipa2");
    }

    get numeCampionat() {
        return this.getAttribute("numeCampionat");
    }

    get data() {
        return this.getAttribute("data");
    }

    get locatie() {
        return this.getAttribute("locatie");
    }

    get scor() {
        return this.getAttribute("scor");
    }

    get meciAcasa() {
        return this.getAttribute("meciAcasa");
    }

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    padding: 2rem;
                }

                .nume-campionat-si-locatie {
                    margin-bottom: 2rem;
                    display: flex;
                    justify-content: space-between;
                }

                .nume-campionat-si-locatie p {
                    margin: 0 1rem;
                }

                .details {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .echipe {
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    justify-content: space-between;
                }

                .echipa {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin: 0.5rem 0;
                }

                .echipa img {
                    height: 40px;
                    width: 40px;
                    padding-right: 2rem;
                    object-fit: contain; 
                }

                .scor-si-data {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .scor {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    border-right: 1px solid #ddd;
                }

                .scor p {
                    margin: 0 2rem;
                }

                .data {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    margin-left: 2rem;
                    align-items: center;
                }
            </style>
        
            <div class="card">
                <div class="nume-campionat-si-locatie">
                    <p>
                        ${this.numeCampionat}
                    </p>
                    <p>
                        ${this.locatie}
                    </p>
                </div>
                <div class="details">
                    <div class="echipe">
                        <div class="echipa">
                            <img src="${this.siglaEchipa1}">
                            <p>${this.numeEchipa1}</p>
                        </div>
                        <div class="echipa">
                            <img src="${this.siglaEchipa2}">
                            <p>${this.numeEchipa2}</p>
                        </div>
                    </div>
                    <div class="scor-si-data">
                        <div class="scor">
                            <p>
                                ${this.scor.split(":")[0]}
                            </p>
                            <p>
                                ${this.scor.split(":")[1]}
                            </p>
                        </div>
                        <div class="data">
                            <p>
                                ${this.data.split(",")[0]}
                            </p>
                            <p>
                                ${this.data.split(",")[1]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
}
  
customElements.define('game-card', GameCard);

export default GameCard;