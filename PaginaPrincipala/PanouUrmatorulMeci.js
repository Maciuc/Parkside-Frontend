import {font_family_default,border_default,border_radius_default} from "/index.js";

const numeEchipa = "CSU Suceava";

function detaliiMeciUrmator(numeEchipaAdversa,data,oraStart,minutStart) {
    this.numeEchipa = numeEchipa;
    this.numeEchipaAdversa = numeEchipaAdversa;
    this.data = data;
    this.oraStart = oraStart;
    this.minutStart = minutStart;
}

var urmatorulMeci;

class PanouUrmatorulMeci extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .panou {
                    margin: 4% 12rem;
                    border-radius: ${border_radius_default};
                    border: ${border_default};
                    font-family: ${font_family_default};
                    font-size: 20px;
                }

                .header {
                    color: white;
                    background-color: F3722C;
                    border-radius: ${border_radius_default} 0px ${border_radius_default} 0px;
                    border-bottom: ${border_default};
                    border-right: ${border_default};
                    padding: 10px 50px;
                    width: fit-content;
                    margin-bottom: 60px;
                }

                .body {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                }

                .body > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 30px;
                }

                .column1, .column2, .column3 {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }

                .echipe, .data, .momentStart {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px;
                    padding: 0.25rem 3rem;
                    width: auto;
                    height: 4rem;
                    color: white;
                    background-color: 4D908E;
                    border-radius: 15px;
                    font-size: 1rem;                
                }
                .echipe {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }

                .numeEchipa, .numeEchipaAdversa, .momentStart {
                    width: fit-content; 
                    text-align: center;
                }
            </style>
            <div class="panou">
                <div class="header">
                    Următorul meci
                </div>
                <div class="body">
                    <div class="column1">
                        Echipe
                        <div class="echipe">
                            <div class="numeEchipa">
                                ${urmatorulMeci.numeEchipa}
                            </div>
                            <div style="padding: 0px 30px;">
                                VS
                            </div>
                            <div class="numeEchipaAdversa">
                                ${urmatorulMeci.numeEchipaAdversa}
                            </div>
                        </div>
                    </div>
                    <div class="column2">
                        Data
                        <div class="data">
                            ${urmatorulMeci.data}
                        </div>
                    </div>
                    <div class="column3">
                        Ora
                        <div class="momentStart">
                            ${urmatorulMeci.oraStart} : ${urmatorulMeci.minutStart}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    incarcaInformatiileMeciuluiUrmator() {
        urmatorulMeci = new detaliiMeciUrmator("Egipt","28.10.2023",12,30);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.incarcaInformatiileMeciuluiUrmator();
        this.render();
    }

    connectedCallback() {
        
    }
}

function actualizeazaUrmatorulMeci(numeEchipaAdversa,data,oraStart,minutStart) {

}
  
customElements.define('panou-urmatorul-meci', PanouUrmatorulMeci);