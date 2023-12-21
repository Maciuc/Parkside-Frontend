import MeniuPrincipal from "../MeniuPrincipal.js";
import SubsolPrincipal from "../SubsolPrincipal.js";
import GameCard from "./GameCard.js";

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
                }

                .tabel-meciuri {
                    width: 100%;
                    border-collapse: collapse;                   
                }

                .tabel-meciuri tr {
                    height: fit-content;
                }

                .tabel-meciuri td {
                    border: 1px solid #ddd;
                }

                @media screen and (max-width: 900px)  {
                    .tabel-meciuri tr {
                        display: flex;
                        flex-direction: column;
                    }
                }
            </style>

            <meniu-principal>
            </meniu-principal>
            <div class="componenta">
                <table class="tabel-meciuri">
                </table>
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
     * @param numarMeciuri numarul de meciuri ce vor fi returnate
     * @param meciuriUlterioare daca != 0, atunci meciurile returnate se vor disputa pe o data mai mare decat dataDeReferinta; 
     *                          daca = 0, atunci meciurile returnate se vor disputa pe o data anterioara datei dataDeReferinta
     * @description returneaza informatiile despre 'numarMeciuri' meciuri
     */
    returneazaInformatiileDespreMeciuri(dataDeReferinta,numarMeciuri,meciuriUlterioare) {
        return [
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
    } 

    meciulSeJoacaAcasa(meciAcasa) {
        return meciAcasa === 1;
    }
    /**
     * 
     * @param destination referinta tag 'td'
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

    incarcaContinutulPaginii() {
        let tabel = shadow.querySelector(".tabel-meciuri");

        let dateleEchipei = this.returneazaDateleEchipei(); 

        let informatiiMeciuri = this.returneazaInformatiileDespreMeciuri(null,null,null);

        let numarMeciuri = informatiiMeciuri.length;
        for(let i=0;i<numarMeciuri/2;i++) {
            let linieTabel = document.createElement("tr");

            for(let j=0;j<2;j++) {
                let informatiiMeci = Object.assign(informatiiMeciuri[i*2 + j],dateleEchipei);

                let tableData = document.createElement("td");

                this.incarcaContinutulMeciului(tableData,informatiiMeci);

                linieTabel.appendChild(tableData);
            }

            tabel.appendChild(linieTabel);
        }
    }

    connectedCallback() {

        this.incarcaContinutulPaginii();
    }
}
  
customElements.define('informatii-meciuri', InformatiiMeciuri);