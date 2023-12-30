import {font_family_default,border_default,border_radius_default} from "../index.js";

class PanouUrmatorulMeci extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .panou {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 4% 0;
                    font-family: ${font_family_default};
                    font-size: 20px;
                    overflow: hidden;
                }

                .header {
                    display: flex;
                    width: fit-content;
                    justify-content: center;
                    color: white;
                    background-color: #3E4095;
                    margin: 1rem;
                    font-size: 4rem;
                    padding: 1rem 2rem;
                    border-radius: ${border_radius_default};
                }

                .body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .campionat-locatie {
                    display: flex;
                    justify-content: space-around;
                }

                .campionat-locatie {
                    font-size: 2rem;
                }

                .echipe {
                    margin: 0 5rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }

                .echipe img {
                    display: flex;
                    justify-content: center;
                    height: 6rem;
                    width: 6rem;
                    object-fit: contain;
                }

                .echipa1, .echipa2 {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    margin: 0 5rem;
                    width: 50%;
                }

                .echipa1 div, .echipa2 div {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    height: 50%;
                    padding: 2rem 0;
                }

                .data, .scor {
                    display: flex;
                    justify-content: center;
                    border-top: 1px solid grey;
                    width: fit-content;
                    padding: 2rem;
                }

                .data p {
                    margin: 0 2rem;
                }

                .live {
                    background-color: red;
                    font-size: 2.5rem;
                    color: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    transition: all ease-out 0.25s;
                    position: absolute;
                }
            </style>

            <div class="panou">
                <div class="header">
                    Următorul meci
                </div>
                <div class="body">
                    <div class="campionat-locatie">
                    </div>
                    <div class="echipe">
                        <div class="echipa1">
                        </div>
                        <div class="echipa2">
                        </div>
                    </div>
                    <div id="data-scor">
                    </div>
                </div>
            </div>
        `;
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.render();
    }

    /**
     * @returns informatiile despre echipa pentru care se doreste afisarea meciului urmator
     */
    returneazaDateleEchipei() {
        return {
            numeEchipa: "CSU din Suceava",
            siglaEchipa: "/static/imagini/logo.png"
        };
    }
    
    urmMeciIndx=0;
    /**
     * @description returneaza informatiile despre urmatorul meci, sau despre meciul curent (daca acesta se joaca)
     */
    returneazaUrmatorulMeci() {
        if(this.urmMeciIndx < 1) {this.urmMeciIndx++;
            return {
                numeAdversar: "CS Universitatea Cluj",
                siglaAdversar: "/static/imagini/echipe/CS Universitatea Cluj.png",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "",
                data: "30.12.2023,10:00",
                scor: "0:0",
                meciAcasa: 1
            }
        }
        else {
            return {
                numeAdversar: "SCM Politehnica Timișoara",
                siglaAdversar: "/static/imagini/echipe/SCM Politehnica Timișoara.jpg",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "",
                data: "18.02.2024,",
                scor: "0:0",
                meciAcasa: 0
            }
        }
    }

    meciulSeJoacaAcasa(meciAcasa) {
        return meciAcasa === 1;
    }

    indx = 0;
    scoruri = ["0:0","1:0","2:0","2:1","2:3","2:4","3:4","4:4","6:5","7:5"];
    meciulSaTerminat() {
        if(this.indx++ === 9) {
            return true;
        }
        return false;
    }

    meciulSeJoaca(dataMeci) {
        let temp = dataMeci.split(",");

        const data_meci = temp[0];
        const ora_meci = temp[1];

        let timpulCurent = new Date();

        let dataCurenta = timpulCurent.getDate() + "." + (timpulCurent.getMonth() + 1) + "." + timpulCurent.getFullYear();

        if(dataCurenta === data_meci) {
            if(ora_meci.length !== 0) {
                const oraCurenta = timpulCurent.getHours() + ":" + timpulCurent.getMinutes();

                if(oraCurenta >= ora_meci) {
                    if(!this.meciulSaTerminat()) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    returneazaScorulCurent(idMeci) {
        return this.scoruri[this.indx];
    }

    actualizeazaScorul(idMeci) {
        return new Promise((resolve) => {
            const timer = setInterval(()=>{
                if(this.meciulSaTerminat()) {
                    clearInterval(timer);
                    resolve();
                }
                else {
                    this.shadowRoot.querySelector(".scor").innerHTML = this.returneazaScorulCurent(idMeci);
                }
            },3000);
        });
    }

    contor = 0;
    evidentiazaButonulLive(referintaButonLive) {
        this.contor = (this.contor + 1) % 2;

        if(this.contor === 0) {
            referintaButonLive.style.transform = 'scale(1,1)';
        }
        else {
            referintaButonLive.style.transform = 'scale(1.2,1.2)';
        }
    }

    async actualizeazaScorulMeciuluiInDesfasurare(idMeci) {
        const timerRefference = setInterval(()=>{this.evidentiazaButonulLive(this.shadowRoot.querySelector(".live"));},500);
        this.shadowRoot.querySelector(".scor").innerHTML = this.returneazaScorulCurent(idMeci);
        
        await this.actualizeazaScorul(idMeci);

        clearInterval(timerRefference);
        this.shadowRoot.querySelector(".panou").removeChild(this.shadowRoot.querySelector(".live"));
        this.actualizeazaMeciulUrmator();

    }

    actualizeazaMeciulUrmator() {
        let dateleEchipei = this.returneazaDateleEchipei(); 

        let informatiiMeci = Object.assign(this.returneazaUrmatorulMeci(),dateleEchipei);

        let numeEchipa1;
        let siglaEchipa1;
        let numeEchipa2;
        let siglaEchipa2;

        if(this.meciulSeJoacaAcasa(informatiiMeci["meciAcasa"])) {
            numeEchipa1 = informatiiMeci["numeEchipa"];
            siglaEchipa1 = informatiiMeci["siglaEchipa"];
            numeEchipa2 = informatiiMeci["numeAdversar"];
            siglaEchipa2 = informatiiMeci["siglaAdversar"];
        }
        else {
            numeEchipa1 = informatiiMeci["numeAdversar"];
            siglaEchipa1 = informatiiMeci["siglaAdversar"];
            numeEchipa2 = informatiiMeci["numeEchipa"];
            siglaEchipa2 = informatiiMeci["siglaEchipa"];
        }

        let temp = `<p>${informatiiMeci["numeCampionat"]}</p>`;

        if(informatiiMeci.locatie.length !== 0) {
            temp += `<p>${informatiiMeci["locatie"]}</p>`;
        }

        this.shadowRoot.querySelector(".campionat-locatie").innerHTML = temp;

        this.shadowRoot.querySelector(".echipa1").innerHTML = `
            <img src="${siglaEchipa1}">
            <div>${numeEchipa1}</div>
        `;

        this.shadowRoot.querySelector(".echipa2").innerHTML = `
            <img src="${siglaEchipa2}">
            <div>${numeEchipa2}</div>
        `;

        const div = this.shadowRoot.querySelector("#data-scor");

        if(!this.meciulSeJoaca(informatiiMeci.data)) {
            this.shadowRoot.querySelector(".header").innerHTML = 'Următorul meci';

            div.setAttribute("class","data");

            temp = informatiiMeci.data.split(",");

            div.innerHTML = `
                <p>${temp[0]}</p>
            `;
    
            if(temp[1].length > 1) {
                div.innerHTML += `<p>${temp[1]}</p>`
            }
        }
        else {
            this.shadowRoot.querySelector(".header").innerHTML = 'Meci în desfașurare';

            div.setAttribute("class","scor");

            const live = document.createElement("div");
            live.setAttribute("class","live");
            live.innerHTML = "LIVE";

            this.shadowRoot.querySelector(".panou").appendChild(live);

            this.actualizeazaScorulMeciuluiInDesfasurare(0);
        }
    }

    connectedCallback() {
        this.actualizeazaMeciulUrmator();
    }
}
  
customElements.define('panou-urmatorul-meci', PanouUrmatorulMeci);

