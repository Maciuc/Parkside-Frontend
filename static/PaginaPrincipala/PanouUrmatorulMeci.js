import {font_family_default,border_radius_default,backendServerAddress,CustomDate} from "../index.js";

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
                    text-align: center;
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
                    justify-content: center;
                    font-size: 2rem;
                }

                .campionat-locatie p {
                    margin: 1rem 2.5rem;
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

    preiaToateMeciurile() {
        return new Promise((resolve, reject) => {
            fetch(backendServerAddress + "api/Match/getHomePageMatches")
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }  
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    dataBase = [];
    
    urmMeciIndx=0;
    /**
     * @description returneaza informatiile despre primul meciul cu data >= decat data de referinta
     */
    returneazaUrmatorulMeci(dataDeReferinta) {
        return new Promise(async (resolve) => {
            for(let i=0; i<this.dataBase.length; i++) {
                if(new CustomDate(this.dataBase[i]["MatchDate"]).compareTo(new CustomDate(dataDeReferinta)) > 0) {
                    resolve(this.dataBase[i]);
                }
                else {
                    if(new CustomDate(this.dataBase[i]["MatchDate"]).compareTo(new CustomDate(dataDeReferinta)) == 0) {
                        if(!(await this.meciulSaTerminat(this.dataBase[i]["Id"]))) {
                            resolve(this.dataBase[i]);
                        } 
                    }
                }
            }
    
            resolve({});
        });
    }

    meciulSeJoacaAcasa(meciAcasa) {
        return meciAcasa === true;
    }

    returneazaMeciul(idMeci) {
        return new Promise((resolve, reject) => {
            fetch(backendServerAddress + "api/Match/getMatch/" + idMeci)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }  
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    meciulSaTerminat(idMeci) {
        return new Promise((resolve) => {
            this.returneazaMeciul(idMeci)
            .then(informatiiMeci => {
                resolve(informatiiMeci["IsFinished"]);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    }

    meciulSeJoaca(informatiiMeci) {
        return new Promise(async (resolve) => {
            let timpulCurent = new Date();

            let dataCurenta = timpulCurent.getDate() + "." + (timpulCurent.getMonth() + 1) + "." + timpulCurent.getFullYear();

            if(new CustomDate(informatiiMeci["MatchDate"]).compareTo(new CustomDate(dataCurenta)) == 0) {
                if(informatiiMeci["MatchHour"].length !== 0) {
                    const oraCurenta = timpulCurent.getHours() + ":" + timpulCurent.getMinutes();
        
                    if(oraCurenta >= informatiiMeci["MatchHour"]) {
                        if(! (await this.meciulSaTerminat(informatiiMeci["Id"]))) {
                            resolve(true);
                        }
                    }
                }
            }

            resolve(false);
        });
    }

    returneazaScorulCurent(idMeci) {
        return new Promise((resolve, reject) => {
            this.returneazaMeciul(idMeci)
            .then(data => {
                let score;

                if(data["PlayingHome"]) {
                    score = data["MainTeamPoints"] + ":" + data["EnemyTeamPoints"];
                }
                else {
                    score = data["EnemyTeamPoints"] + ":" + data["MainTeamPoints"];
                }

                resolve(score);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    actualizeazaScorul(idMeci) {
        return new Promise((resolve) => {
            const timer = setInterval(async()=>{
                if(await this.meciulSaTerminat(idMeci)) {
                    clearInterval(timer);
                    resolve();
                }
                else {
                    this.returneazaScorulCurent(idMeci)
                    .then(scor => {
                        this.shadowRoot.querySelector(".scor").innerHTML = scor;
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
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

        this.returneazaScorulCurent(idMeci)
        .then(scor => {
            this.shadowRoot.querySelector(".scor").innerHTML = scor;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
        await this.actualizeazaScorul(idMeci);

        clearInterval(timerRefference);
        this.shadowRoot.querySelector(".panou").removeChild(this.shadowRoot.querySelector(".live"));
        this.actualizeazaMeciulUrmator();
    }

    actualizeazaMeciulUrmator() {
        let dateleEchipei = this.returneazaDateleEchipei(); 

        let timpulCurent = new Date();

        let dataCurenta = timpulCurent.getDate() + "." + (timpulCurent.getMonth() + 1) + "." + timpulCurent.getFullYear();

        this.returneazaUrmatorulMeci(dataCurenta)
        .then(meciulUrmator => {
            if(Object.keys(meciulUrmator).length != 0) {
                let informatiiMeci = Object.assign(meciulUrmator,dateleEchipei);
    
                let numeEchipa1;
                let siglaEchipa1;
                let numeEchipa2;
                let siglaEchipa2;
    
                if(this.meciulSeJoacaAcasa(informatiiMeci["PlayingHome"])) {
                    numeEchipa1 = informatiiMeci["numeEchipa"];
                    siglaEchipa1 = informatiiMeci["siglaEchipa"];
                    numeEchipa2 = informatiiMeci["EnemyTeamName"];
                    siglaEchipa2 = informatiiMeci["EnemyTeamImageBase64"];
                }
                else {
                    numeEchipa1 = informatiiMeci["EnemyTeamName"];
                    siglaEchipa1 = informatiiMeci["EnemyTeamImageBase64"];
                    numeEchipa2 = informatiiMeci["numeEchipa"];
                    siglaEchipa2 = informatiiMeci["siglaEchipa"];
                }
    
                let temp = `<p>${informatiiMeci["ChampionshipName"]}</p>`;
    
                if(informatiiMeci["Location"].length !== 0) {
                    temp += `<p>${informatiiMeci["Location"]}</p>`;
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
    
                this.meciulSeJoaca(informatiiMeci)
                .then(meciulSeJoaca => {
                    if(!meciulSeJoaca) {
                        this.shadowRoot.querySelector(".header").innerHTML = 'Următorul meci';
        
                        div.setAttribute("class","data");
        
                        div.innerHTML = `
                            <p>${informatiiMeci["MatchDate"]}</p>
                        `;
                
                        div.innerHTML += `<p>${informatiiMeci["MatchHour"]}</p>`
                    }
                    else {
                        this.shadowRoot.querySelector(".header").innerHTML = 'Meci în desfașurare';
        
                        div.setAttribute("class","scor");
        
                        const live = document.createElement("div");
                        live.setAttribute("class","live");
                        live.innerHTML = "LIVE";
        
                        this.shadowRoot.querySelector(".panou").appendChild(live);
        
                        this.actualizeazaScorulMeciuluiInDesfasurare(informatiiMeci["Id"]);
                    }
                }); 
            }
            else {
                this.shadowRoot.querySelector(".header").innerHTML = "Următorul meci";
                this.shadowRoot.querySelector(".body").innerHTML = "";
            }
        });

    }

    connectedCallback() {
        this.preiaToateMeciurile()
        .then(data => {
            this.dataBase = data;
                
            this.actualizeazaMeciulUrmator();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });  
    }
}
  
customElements.define('panou-urmatorul-meci', PanouUrmatorulMeci);