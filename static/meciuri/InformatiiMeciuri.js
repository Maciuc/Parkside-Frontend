import MeniuPrincipal from "../MeniuPrincipal.js";
import SubsolPrincipal from "../SubsolPrincipal.js";
import GameCard from "./GameCard.js";
import {backendServerAddress, CustomDate} from "../index.js";

let shadow;

class InformatiiMeciuri extends HTMLElement {
    render()
    {
        shadow.innerHTML = `
            <style>
                .componenta {
                    margin: 2rem 10%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                }

                .tabel-meciuri {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 50% 50%;
                    margin: 3rem;
                }

                .tabel-meciuri .meci {
                    border: 1px solid #ddd;
                    margin-left: -1px;
                    margin-top: -1px;
                }

                .header, .footer {
                    position: absolute;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 3rem;
                }

                .header {
                    top: 0;
                }
                
                .footer {
                    bottom: 0;
                }

                .header:hover #button-meciuri-anterioare, .footer:hover #button-meciuri-ulterioare {
                    transform: scale(1.5,1.5);
                    background-color: #ddd;
                }

                .button-mai-multe-meciuri {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 1.5rem;
                    height: 1.5rem;
                    font-size: 1.5rem;
                    transition: all linear 0.25s;
                    border-radius: 50%;
                    background-color: #fff;
                    color: white;
                    text-align: center;
                    font-weight: bold;
                    cursor: context-menu;
                }   

                .header:hover #button-meciuri-anterioare:hover, .footer:hover #button-meciuri-ulterioare:hover{ 
                    transform: scale(1.75,1.75);
                    background-color: #bbb;
                }

                @media screen and (max-width: 900px)  {
                    .tabel-meciuri  {
                        grid-template-columns: 100%;
                    }
                }
            </style>

            <meniu-principal>
            </meniu-principal>
            <div class="componenta">
                <div class="header">
                    <div class="button-mai-multe-meciuri" id="button-meciuri-anterioare">
                        +
                    </div>
                </div>
                <div class="tabel-meciuri">
                </div>
                <div class="footer">
                    <div class="button-mai-multe-meciuri" id="button-meciuri-ulterioare">
                        +
                    </div>
                </div>        
            </div>
            <subsol-principal>
            </subsol-principal>
        `;
    }

    constructor() {
        super();
        shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    /**
     * @returns informatiile despre echipa pentru care se doreste afisarea calendarului de meciuri
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

    /**
     * 
     * @param dataDeReferinta data ce va fi limita superioara/inferioara pentru meciurile ce vor fi obtinute
     * @param numarMaximMeciuri numarul maxim de meciuri ce vor fi returnate
     * @param meciuriUlterioare daca true, atunci meciurile returnate se vor disputa pe o data mai mare decat dataDeReferinta; 
     *                          false, atunci meciurile returnate se vor disputa pe o data anterioara datei dataDeReferinta
     * @description returneaza informatiile despre 'numarMeciuri' meciuri
     */
    returneazaInformatiileDespreMeciuri(dataDeReferinta,numarMaximMeciuri,meciuriUlterioare) {
        let count = 0;
        const meciuriFiltrate = [];

        const dataDeInteres = new CustomDate(dataDeReferinta);

        if(meciuriUlterioare === true)
        {
            for(let i=0;i<this.dataBase.length;i++)
            {
                if(count < numarMaximMeciuri)
                {
                    const data_meci = new CustomDate(this.dataBase[i]["MatchDate"]);

                    if(data_meci.compareTo(dataDeInteres) > 0)
                    {
                        meciuriFiltrate.push(this.dataBase[i]);
                        count++;
                    }
                }
                else {
                    break;
                }  
            }
        }
        else {
            for(let i=this.dataBase.length-1;i>=0;i--)
            {
                if(count < numarMaximMeciuri)
                {
                    const data_meci = new CustomDate(this.dataBase[i]["MatchDate"]);

                    if(data_meci.compareTo(dataDeInteres) < 0)
                    {
                        meciuriFiltrate.splice(0,0,this.dataBase[i]);
                        count++;
                    }
                }
                else {
                    break;
                }  
            }
        }

        return meciuriFiltrate;
    } 

    meciulSeJoacaAcasa(meciAcasa) {
        return meciAcasa === true;
    }
    /**
     * 
     * @param destination referinta tag div, clasa meci
     * @param gameData json cu datele aferente unui meci
     * @description seteaza continutul tagului tableData folosind datele primite
     */
    incarcaContinutulMeciului(destination,gameData) {
        let gameCard = document.createElement("game-card");

        let numeEchipa1;
        let siglaEchipa1;
        let numeEchipa2;
        let siglaEchipa2;
        let scor;

        if(this.meciulSeJoacaAcasa(gameData["PlayingHome"])) {
            numeEchipa1 = gameData["numeEchipa"];
            siglaEchipa1 = gameData["siglaEchipa"];
            numeEchipa2 = gameData["EnemyTeamName"];
            siglaEchipa2 = gameData["EnemyTeamImageBase64"];
            scor = gameData["MainTeamPoints"] + ":" + gameData["EnemyTeamPoints"];
        }
        else {
            numeEchipa1 = gameData["EnemyTeamName"];
            siglaEchipa1 = gameData["EnemyTeamImageBase64"];
            numeEchipa2 = gameData["numeEchipa"];
            siglaEchipa2 = gameData["siglaEchipa"];
            scor = gameData["EnemyTeamPoints"] + ":" + gameData["MainTeamPoints"];
        }

        gameCard.setAttribute("numeEchipa1",numeEchipa1);
        gameCard.setAttribute("siglaEchipa1",siglaEchipa1);
        gameCard.setAttribute("numeEchipa2",numeEchipa2);
        gameCard.setAttribute("siglaEchipa2",siglaEchipa2);
        gameCard.setAttribute("numeCampionat", gameData["ChampionshipName"]);
        gameCard.setAttribute("data", gameData["MatchDate"] + ", " + gameData["MatchHour"]);
        gameCard.setAttribute("locatie", gameData["Location"]);
        gameCard.setAttribute("scor", scor);
        gameCard.setAttribute("meciAcasa", gameData["PlayingHome"]);

        destination.appendChild(gameCard);
    }

    returneazaParteaVizualaAMeciului(informatiiMeci,dateleEchipei) {
        let meci = document.createElement("div");
        meci.setAttribute("class","meci");
        
        let informatiiCompleteMeci = Object.assign(informatiiMeci,dateleEchipei);

        this.incarcaContinutulMeciului(meci,informatiiCompleteMeci);

        return meci;
    }

    dataPrimuluiMeciAfisat;
    dataUltimuluiMeciAfisat

    /**
     * @param dataDeReferinta data ce va fi limita superioara/inferioara pentru meciurile ce vor fi obtinute
     * @param numarMaximMeciuri numarul maxim de meciuri ce vor fi returnate
     * @param meciuriUlterioare daca != 0, atunci meciurile returnate se vor disputa pe o data mai mare sau egala decat dataDeReferinta; 
     *                          daca = 0, atunci meciurile returnate se vor disputa pe o data anterioara datei dataDeReferinta
     */
    actualizeazaMeciurileAfisate(dataDeReferinta,numarMaximMeciuri,meciuriUlterioare) {
        let tabel = shadow.querySelector(".tabel-meciuri");

        let dateleEchipei = this.returneazaDateleEchipei(); 

        let informatiiMeciuri = this.returneazaInformatiileDespreMeciuri(dataDeReferinta,numarMaximMeciuri,meciuriUlterioare);
        let numarMeciuri = informatiiMeciuri.length;
        
        if(meciuriUlterioare)
        {
            if(numarMeciuri !== 0) {
                this.dataUltimuluiMeciAfisat = informatiiMeciuri[numarMeciuri-1]["MatchDate"];

                for(let i=0;i<numarMeciuri;i++) {
                    tabel.appendChild(this.returneazaParteaVizualaAMeciului(informatiiMeciuri[i],dateleEchipei));
                }
            }
            else {
                this.shadowRoot.querySelector(".componenta").removeChild(this.shadowRoot.querySelector(".footer"));
            } 
        }
        else {
            if(numarMeciuri !== 0) {
                this.dataPrimuluiMeciAfisat = informatiiMeciuri[0]["MatchDate"];

                for(let i=numarMeciuri-1;i>=0;i--) {
                    tabel.insertBefore(this.returneazaParteaVizualaAMeciului(informatiiMeciuri[i],dateleEchipei),tabel.firstChild);
                }
            }
            else {
                this.shadowRoot.querySelector(".componenta").removeChild(this.shadowRoot.querySelector(".header"));
            }
        }
    }

    incarcaContinutulPaginii() {
        let timpulCurent = new Date();

        let dataCurenta = timpulCurent.getDate() + "." + (timpulCurent.getMonth() + 1) + "." + timpulCurent.getFullYear();

        this.actualizeazaMeciurileAfisate(dataCurenta,2,false);
        if(this.dataPrimuluiMeciAfisat !== undefined) {
            if(this.returneazaInformatiileDespreMeciuri(this.dataPrimuluiMeciAfisat,2,false).length == 0) {
                this.shadowRoot.querySelector(".componenta").removeChild(this.shadowRoot.querySelector(".header"));
            }

            this.dataUltimuluiMeciAfisat = this.shadowRoot.querySelector(".tabel-meciuri").lastElementChild.firstElementChild.shadowRoot.querySelector(".data").firstElementChild.innerText; 
            
            const dataAnterioara = this.dataUltimuluiMeciAfisat;

            this.actualizeazaMeciurileAfisate(this.dataUltimuluiMeciAfisat,2,true);

            if(this.dataUltimuluiMeciAfisat !== dataAnterioara) {
                if(this.returneazaInformatiileDespreMeciuri(this.dataUltimuluiMeciAfisat,2,true).length == 0) {
                    this.shadowRoot.querySelector(".componenta").removeChild(this.shadowRoot.querySelector(".footer"));
                }
            } 
        }
        else {
            let ieri = new Date(new Date(timpulCurent.getFullYear() + "." + (timpulCurent.getMonth() + 1) + "." + timpulCurent.getDate()) - 1);
            const data_ieri = ieri.getDate() + "." + (ieri.getMonth() + 1) + "." + ieri.getFullYear();

            this.actualizeazaMeciurileAfisate(data_ieri,2,true);

            if(this.dataUltimuluiMeciAfisat !== undefined) {
                this.dataPrimuluiMeciAfisat = this.shadowRoot.querySelector(".tabel-meciuri").firstElementChild.firstElementChild.shadowRoot.querySelector(".data").firstElementChild.innerText; 
            
                if(this.returneazaInformatiileDespreMeciuri(this.dataUltimuluiMeciAfisat,2,true).length == 0) {
                    this.shadowRoot.querySelector(".componenta").removeChild(this.shadowRoot.querySelector(".footer"));
                }
            }
        }
    }

    connectedCallback() {
        this.preiaToateMeciurile()
        .then(data => {
            this.dataBase = data;
                     
            this.shadowRoot.querySelector("#button-meciuri-anterioare").addEventListener("mouseup",()=>{
                this.actualizeazaMeciurileAfisate(this.dataPrimuluiMeciAfisat,2,false);

                if(this.returneazaInformatiileDespreMeciuri(this.dataPrimuluiMeciAfisat,2,false).length == 0) {
                    this.shadowRoot.querySelector(".componenta").removeChild(this.shadowRoot.querySelector(".header"));
                }
            });

            this.shadowRoot.querySelector("#button-meciuri-ulterioare").addEventListener("mouseup",()=>{
                this.actualizeazaMeciurileAfisate(this.dataUltimuluiMeciAfisat,2,true);

                if(this.returneazaInformatiileDespreMeciuri(this.dataUltimuluiMeciAfisat,2,true).length == 0) {
                    this.shadowRoot.querySelector(".componenta").removeChild(this.shadowRoot.querySelector(".footer"));
                }
            });

            this.incarcaContinutulPaginii();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });  
    }
}
  
customElements.define('informatii-meciuri', InformatiiMeciuri);