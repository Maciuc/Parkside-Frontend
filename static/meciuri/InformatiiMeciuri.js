import MeniuPrincipal from "../MeniuPrincipal.js";
import SubsolPrincipal from "../SubsolPrincipal.js";
import GameCard from "./GameCard.js";

class CustomDate {
    constructor(dateString){
        let date = dateString.split(".");
        
        if(date.length !== 3)
        {
            this.day = 0;
            this.month = 0;
            this.Year = 0
        }
        else {
            this.day = parseInt(date[0], 10);
            this.month = parseInt(date[1], 10);
            this.year = parseInt(date[2], 10);
        }
    }

    compareTo(customDate) {
        if(this.year > customDate.year)
        {
            return 1;
        }
        else 
            if(this.year < customDate.year) 
            {
                return -1;
            }
            else 
            {
                if(this.month > customDate.month)
                {
                    return 1;
                }
                else 
                    if(this.month < customDate.month) 
                    {
                        return -1;
                    }
                    else 
                    {
                        if(this.day > customDate.day)
                        {
                            return 1;
                        }
                        else 
                            if(this.day < customDate.day) 
                            {
                                return -1;
                            }
                            else
                            {
                                return 0;
                            }
                    }
            }
    }
}

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

    /**
     * 
     * @param dataDeReferinta data ce va fi limita superioara/inferioara pentru meciurile ce vor fi obtinute
     * @param numarMaximMeciuri numarul maxim de meciuri ce vor fi returnate
     * @param meciuriUlterioare daca != 0, atunci meciurile returnate se vor disputa pe o data mai mare decat dataDeReferinta; 
     *                          daca = 0, atunci meciurile returnate se vor disputa pe o data anterioara datei dataDeReferinta
     * @description returneaza informatiile despre 'numarMeciuri' meciuri
     */
    returneazaInformatiileDespreMeciuri(dataDeReferinta,numarMaximMeciuri,meciuriUlterioare) {
        const dataBase = [
            {
                numeAdversar: "AHC Potaissa Turda",
                siglaAdversar: "/static/imagini/echipe/AHC Potaissa Turda.jpg",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "Sala LPS Suceava",
                data: "14.10.2023, 17:30",
                scor: "31:37",
                meciAcasa: 1
            },            
            {
                numeAdversar: "CSM Vaslui",
                siglaAdversar: "/static/imagini/echipe/CSM Vaslui.jpg",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "Sala Sporturilor Vaslui",
                data: "22.10.2023, 18:00",
                scor: "31:32",
                meciAcasa: 0
            },
            {
                numeAdversar: "CSM Constanta",
                siglaAdversar: "/static/imagini/echipe/CSM Constanta.png",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "Sala LPS Suceava",
                data: "09.11.2023, 17:30",
                scor: "25:31",
                meciAcasa: 0
            },
            {
                numeAdversar: "CS Minaur Baia Mare",
                siglaAdversar: "/static/imagini/echipe/CS Minaur Baia Mare.png",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "Sala LPS Suceava",
                data: "14.11.2023, 17:30",
                scor: "30:37",
                meciAcasa: 1
            },
            {
                numeAdversar: "CSM București",
                siglaAdversar: "/static/imagini/echipe/CSM București.jpg",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "Sala Apollo",
                data: "19.11.2023, 17:30",
                scor: "34:24",
                meciAcasa: 0
            },
            {
                numeAdversar: "CSM Focșani 2007",
                siglaAdversar: "/static/imagini/echipe/CSM Focșani 2007.png",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "Sala Sporturilor Alin Moldoveanu",
                data: "03.12.2023, 18:30",
                scor: "33:30",
                meciAcasa: 0
            },            
            {
                numeAdversar: "CSM Bacău",
                siglaAdversar: "/static/imagini/echipe/CSM Bacău.jpg",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "Sala Sporturilor Narcisa Lecusanu",
                data: "10.12.2023, 18:00",
                scor: "27:29",
                meciAcasa: 0
            },
            {
                numeAdversar: "CS Universitatea Cluj",
                siglaAdversar: "/static/imagini/echipe/CS Universitatea Cluj.png",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "N/A",
                data: "04.02.2024, 00:00",
                scor: "0:0",
                meciAcasa: 1
            },
            {
                numeAdversar: "CSA Steaua București",
                siglaAdversar: "/static/imagini/echipe/CSA Steaua București.jpg",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "N/A",
                data: "11.02.2024, 00:00",
                scor: "0:0",
                meciAcasa: 0
            },
            {
                numeAdversar: "SCM Politehnica Timișoara",
                siglaAdversar: "/static/imagini/echipe/SCM Politehnica Timișoara.jpg",
                numeCampionat: "Liga Zimbrilor Masculin",
                locatie: "N/A",
                data: "18.02.2024, 00:00",
                scor: "0:0",
                meciAcasa: 0
            }
        ];

        let count = 0;
        const meciuriFiltrate = [];

        const dataDeInteres = new CustomDate(dataDeReferinta);

        if(meciuriUlterioare === true)
        {
            for(let i=0;i<dataBase.length;i++)
            {
                if(count < numarMaximMeciuri)
                {
                    const data_meci = new CustomDate(dataBase[i].data.split(",")[0]);

                    if(data_meci.compareTo(dataDeInteres) > 0)
                    {
                        meciuriFiltrate.push(dataBase[i]);
                        count++;
                    }
                }
                else {
                    break;
                }  
            }
        }
        else {
            for(let i=dataBase.length-1;i>=0;i--)
            {
                if(count < numarMaximMeciuri)
                {
                    const data_meci = new CustomDate(dataBase[i].data.split(",")[0]);

                    if(data_meci.compareTo(dataDeInteres) < 0)
                    {
                        meciuriFiltrate.splice(0,0,dataBase[i]);
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
        return meciAcasa === 1;
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

        if(this.meciulSeJoacaAcasa(gameData["meciAcasa"])) {
            numeEchipa1 = gameData["numeEchipa"];
            siglaEchipa1 = gameData["siglaEchipa"];
            numeEchipa2 = gameData["numeAdversar"];
            siglaEchipa2 = gameData["siglaAdversar"];
        }
        else {
            numeEchipa1 = gameData["numeAdversar"];
            siglaEchipa1 = gameData["siglaAdversar"];
            numeEchipa2 = gameData["numeEchipa"];
            siglaEchipa2 = gameData["siglaEchipa"];
        }

        gameCard.setAttribute("numeEchipa1",numeEchipa1);
        gameCard.setAttribute("siglaEchipa1",siglaEchipa1);
        gameCard.setAttribute("numeEchipa2",numeEchipa2);
        gameCard.setAttribute("siglaEchipa2",siglaEchipa2);
        gameCard.setAttribute("numeCampionat", gameData["numeCampionat"]);
        gameCard.setAttribute("data", gameData["data"]);
        gameCard.setAttribute("locatie", gameData["locatie"]);
        gameCard.setAttribute("scor", gameData["scor"]);
        gameCard.setAttribute("meciAcasa", gameData["meciAcasa"]);

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
                this.dataUltimuluiMeciAfisat = informatiiMeciuri[numarMeciuri-1].data.split(",")[0];

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
                this.dataPrimuluiMeciAfisat = informatiiMeciuri[0].data.split(",")[0];

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
    }
}
  
customElements.define('informatii-meciuri', InformatiiMeciuri);