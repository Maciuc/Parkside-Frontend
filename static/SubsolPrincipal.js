import { font_family_default, border_radius_default } from "./index.js";

let shadow;

class SubsolPrincipal extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .panou {
                    margin-top: 4%;
                    border-top: 5px solid #F9C74F;
                    font-family: ${font_family_default};
                    display: flex;
                    flex-direction: column;
                }

                .title {
                    float: left;
                    width: fit-content;
                    color: black;
                    font-size: 2rem;
                    background-color: #F9C74F;
                    padding: 2rem 4rem;
                    border-radius: 0 0 ${border_radius_default} 0;
                }

                .button-contact {
                    margin: 2rem 0 0 3rem;
                    border-radius: 1rem;
                    padding: 1rem 1.5rem;
                    float: left;
                    bisplay: block;
                    width: fit-content;
                }
            </style>
            <div class="panou">
                <div class="title">
                    Sponsori și parteneri
                </div>
                <div>
                    <button class="button-contact" onclick="location.href='/feedback.html'">
                        CONTACTEAZĂ-NE
                    </button>
                    <button class="button-mergi-sus">
                        Înapoi sus
                    </button>
                </div>
            </div>
        `;
    }

    goOnTopOfPage() {
        console.log("ok");
        window.scrollTo(0, 0);
    }

    constructor() {
        super();
        shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    connectedCallback() {
        shadow.querySelector(".button-mergi-sus").addEventListener("click",this.goOnTopOfPage);
    }
}
  
customElements.define('subsol-principal', SubsolPrincipal);