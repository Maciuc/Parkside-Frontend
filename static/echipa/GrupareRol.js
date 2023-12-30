let shadow;

class GrupareRol extends HTMLElement {
    static get observedAttributes() {
        return ["rol"];
    }

    get rol() {
        return this.getAttribute("rol");
    }

    render()
    {
        shadow.innerHTML = `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 5rem;
                    border-top: 0.1rem solid grey;
                }

                .titlu {
                    color: black;
                    font-size: 3rem;
                    margin-bottom: 2.5rem;
                }

                .slot {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 3rem;
                }
            </style>

            <div class="container">
                <div class="titlu">
                    ${this.rol}
                </div>
                <div class="slot">
                    <slot>
                    </slot>
                </div>
            </div>
        `;
    }

    constructor() {
        super();
        shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    connectedCallback() {
    }
}
  
customElements.define('grupare-rol', GrupareRol);

export default GrupareRol;