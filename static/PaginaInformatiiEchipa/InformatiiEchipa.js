import InfoCard from "./InfoCard.js";

let shadow;

class InformatiiEchipa extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .page {
                    max-height: fit-content;
                }

                .container {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;  
                }      
            </style>

            <div class="page">
                <div class="container">
                </div>
            </div>
        `;
    }

    constructor() {
        super();
        shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    getData() {
        return [
            {
                Nume: "Gheorghescu",
                Prenume: "Gheorghe",
                Numar: "7",
                Inaltime: "1.80 m"
            },
            {
                Nume: "Zamfirescu",
                Prenume: "Zamfir",
                Numar: "9",
                Inaltime: "1.83 m"
            },
            {
                Nume: "Ionescu",
                Prenume: "Ion",
                Numar: "4",
                Inaltime: "1.75 m"
            }
        ];
    }

    updateInformation() {
        let numarInformatiiPrincipale = 2;

        let jsonList = this.getData();

        for(let i=0;i<jsonList.length;i++) {
            let persoana = jsonList[i];

            let infoCard = document.createElement('info-card');
            let k=0;
            for(let caracteristica in persoana) {
                if(k++ < numarInformatiiPrincipale) {
                    infoCard.shadowRoot.querySelector(".main-info").innerHTML += `
                        <div class="content">
                            <b>${caracteristica}:</b> ${persoana[caracteristica]}
                        </div>`;
                }
                else {
                    infoCard.shadowRoot.querySelector(".detailed-info").innerHTML += `
                        <div class="content">
                            <b>${caracteristica}:</b> ${persoana[caracteristica]}
                        </div>`;
                }
            }

            shadow.querySelector(".container").appendChild(infoCard);
        }
    }

    connectedCallback() {
        this.updateInformation();
    }
}
  
customElements.define('informatii-echipa', InformatiiEchipa);