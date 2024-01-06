/*Informatii detaliate despre o persoana din staff*/

import MeniuPrincipal from "/static/MeniuPrincipal.js";
import SubsolPrincipal from "/static/SubsolPrincipal.js";

let shadow;

class InformatiiPersonal extends HTMLElement {
    render()
    {
        shadow.innerHTML = `
            <style>
                .content {
                    background: radial-gradient(circle at top, white 20% , #3E4095) top;
                    font-family: "Unica77-LL-TT",Helvetica,Arial,sans-serif;
                    padding-left: 2rem;
                    padding-bottom: 1rem;
                    margin-bottom: 5rem;
                }

                .header {
                    height: 40rem;
                }

                .header img
                {
                    height: 100%;
                    width: 100%;
                    object-fit: contain;
                }

                .body {
                    box-shadow: 0 0 2rem grey;
                    background-color: white;
                }

                .info-container {
                    padding: 0 3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .main-info, .descriere {
                    width: calc(100% - 5rem); 
                    padding: 1rem 2.5rem;
                    display: flex;
                    flex-direction: row;
                }

                .main-info {
                    justify-content: flex-end;  
                }

                .main-info table {
                    border-radius: 0.5rem;
                    width: fit-content;
                }

                .main-info td {
                    padding: 0.25rem 2.5rem;
                }

                .main-info-row td {
                    font-size: 1.5rem;
                }

                .property {
                    color: #bbb;
                }

                .descriere .text {
                    padding: 0.25rem 2.5rem;
                    width: 60%;
                    justify-content: flex-start; 
                    font-size: 1.5rem;
                }

                .timeline {
                    width: calc(100% - 15rem);
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 0 7.5rem;
                    height: 10rem;
                    background-color: white;
                }

                .dot {
                    position: relative;
                    height: 2rem;
                    width: 2rem;
                    background-color: #bbb;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all ease-in 0.25s;
                }

                .dot:hover {
                    height: 3rem;
                    width: 3rem;
                }

                .dot .year {
                    position: absolute;
                    font-size: 2rem;
                    margin-top: 5rem;
                    pointer-events: none;
                }

                .info {
                    position: absolute;
                    font-size: 2rem;
                    height: 30rem;
                    width: 30rem;
                    background-color: #e1e6ed;
                    display: none;
                    border-radius: 1rem;
                }

                .info .close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    color: black;
                    background-color: transparent;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                

                .info .close:hover {
                    color: white;
                    background-color: black;
                    cursor: pointer;
                }

                .dots {
                    width: calc(100% - 15rem);
                    position: absolute;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .line {
                    width: 100%;
                    border-bottom: 0.1rem solid #bbb;
                }
            </style>

            <meniu-principal>
            </meniu-principal>
            <div class="content">
                <div class="header">
                 <img>
                </div>
                <div class="body">
                    <div class="info-container">
                        <div class="main-info">
                            <table>      
                            </table>
                        </div>
                    </div>
                    <div class="timeline">
                        <div class="line">
                        </div>
                        <div class="dots">
                            <div class="dot">
                                <div class="year">
                                    2010
                                </div>
                                <div class="info">
                                    <div class="close">
                                        X
                                    </div>
                                </div>
                            </div>
                            <div class="dot">
                                <div class="year">
                                    2013
                                </div>
                                <div class="info">
                                    <div class="close">
                                        X
                                    </div>    
                                </div>
                            </div>
                            <div class="dot">
                                <div class="year">
                                    2015
                                </div>
                                <div class="info">
                                    <div class="close">
                                        X
                                    </div>
                                </div>
                            </div>
                            <div class="dot">
                                <div class="year">
                                    2019
                                </div>
                                <div class="info">
                                    <div class="close">
                                        X
                                    </div>
                                </div>
                            </div>
                            <div class="dot">
                                <div class="year">
                                    2022
                                </div>
                                <div class="info">
                                    <div class="close">
                                        X
                                    </div>
                                </div>
                            </div>
                        </div>
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

    personal = [
        {
            Nume: "Dascălu",
            Prenume: "Codrin",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inălțime: "1.80 m",
            Rol: "INTER STÂNGA",
            descriere: "Pasionat de mic de handbal, în urma probelor la care a fost supus, la vârsta de 8 ani a fost selectat în echipa de juniori ai CSU Suceava. De atunci și până în prezent ocupa postul de Inter Stânga în echipa de juniori ai CSU Suceava.",
            imagine: "/static/imagini/staff/DascăluCodrin_IS.jpg"
        },
        {
            Nume: "Leonte",
            Prenume: "Ștefan",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "PORTAR",
            descriere: "",
            imagine: "/static/imagini/staff/LeonteȘtefan_PO.png"
        },
        {
            Nume: "Reuț",
            Prenume: "Alexandru",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "INTER STÂNGA",
            descriere: "",
            imagine: "/static/imagini/staff/ReuțAlexandru_IS.png"
        },
        {
            Nume: "Rusu",
            Prenume: "Eduard",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "EXTREMĂ DREAPTĂ",
            descriere: "",
            imagine: "/static/imagini/staff/RusuEduard_ED.png"
        },
        {
            Nume: "Zăpodianu",
            Prenume: "Nicolas",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "PIVOT",
            descriere: "",
            imagine: "/static/imagini/staff/ZăpodianuNicolas_PI.png"
        },
        {
            Nume: "Ostafe",
            Prenume: "Rareș",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "CENTRU",
            descriere: "",
            imagine: "/static/imagini/staff/OstafeRareș_C.png"
        },
        {
            Nume: "Niculaie",
            Prenume: "Bogdan",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "CENTRU",
            descriere: "",
            imagine: "/static/imagini/staff/NiculaieBogdan_C.png"
        },
        {
            Nume: "Focșăneanu",
            Prenume: "Alexandru",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "PIVOT",
            descriere: "",
            imagine: "/static/imagini/staff/FocșăneanuAlexandru_PI.png"
        },
        {
            Nume: "Țivichi",
            Prenume: "Alexandru",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "EXTREMĂ STÂNGA",
            descriere: "",
            imagine: "/static/imagini/staff/ȚivichiAlexandru_ES.png"
        },
        {
            Nume: "Radu",
            Prenume: "Codrin",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "INTER DREAPTA",
            descriere: "",
            imagine: "/static/imagini/staff/RaduCodrin_ID.png"
        },
        {
            Nume: "Ilucă",
            Prenume: "Teodor",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "EXTREMĂ STÂNGĂ",
            descriere: "",
            imagine: "/static/imagini/staff/IlucăTeodor_ES.png"
        },
        {
            Nume: "Pășcuț",
            Prenume: "Ionuț",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "EXTREMĂ DREAPTĂ",
            descriere: "",
            imagine: "/static/imagini/staff/PășcuțIonuț_ED.png"
        },
        {
            Nume: "Moșneagu",
            Prenume: "Teodor",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "INTER DREAPTA",
            descriere: "",
            imagine: "/static/imagini/staff/MoșneaguTeodor_ID.png"
        },
        {
            Nume: "Rîpă",
            Prenume: "Răzvan",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "PORTAR",
            descriere: "",
            imagine: "/static/imagini/staff/RîpăRăzvan_PO.png"
        },
        {
            Nume: "Grigore",
            Prenume: "Sorin",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "EXTREMĂ DREAPTĂ",
            descriere: "",
            imagine: "/static/imagini/staff/GrigoreSorin_ED.png"
        },
        {
            Nume: "Podovei",
            Prenume: "Dragoș",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "PORTAR",
            descriere: "",
            imagine: "/static/imagini/staff/PodoveiDragoș_PO.png"
        },
        {
            Nume: "Rață",
            Prenume: "Andrei",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "CENTRU",
            descriere: "",
            imagine: "/static/imagini/staff/RațăAndrei_C.png"
        },
        {
            Nume: "Șerban",
            Prenume: "Emanuel",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "PIVOT",
            descriere: "",
            imagine: "/static/imagini/staff/ȘerbanEmanuel_PI.png"
        },
        {
            Nume: "Roșu",
            Prenume: "Iulian",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "EXTREMĂ STÂNGĂ",
            descriere: "",
            imagine: "/static/imagini/staff/RoșuIulian_ES.png"
        },
        {
            Nume: "Vornicu",
            Prenume: "Mihai",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "KINETOTERAPEUT",
            descriere: "",
            imagine: "/static/imagini/staff/VornicuMihai_K.png"
        },
        {
            Nume: "Tcaciuc",
            Prenume: "Ioan",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "ANTRENOR",
            descriere: "",
            imagine: "/static/imagini/staff/TcaciucIoan_A.png"
        },
        {
            Nume: "Boca",
            Prenume: "Vasile",
            Naționalitate: "Română",
            "Data nașterii": "30.10.2008",
            Inaltime: "1.83 m",
            Rol: "ANTRENOR",
            descriere: "",
            imagine: "/static/imagini/staff/BocaVasile_A.png"
        }
    ];

    getPersonInfo(personId) {
        return this.personal[personId-1];
    }

    fillPageWithPersonDetails(personInfo) {
        this.shadowRoot.querySelector(".header img").setAttribute("src",personInfo.imagine);

        const mainInfoContainer = this.shadowRoot.querySelector(".main-info table");

        let innerHTML = "";

        const keys = Object.keys(personInfo);
        for(let i=0;i<keys.length-2;i++)
        {
            let key = keys[i];

            innerHTML += `
            <tr class="main-info-row">
                <td class="property">
                    ${key}
                </td>
                <td class="property-value">
                    ${personInfo[key]}
                </td>
            </tr>`
        }

        mainInfoContainer.innerHTML = innerHTML;

        if(personInfo.descriere !== undefined && personInfo["descriere"].length !== 0)
        {
            const infoContainer = this.shadowRoot.querySelector(".info-container");

            const descriere = document.createElement("div");
            descriere.setAttribute("class","descriere");

            const textDescriere = document.createElement("div");
            textDescriere.setAttribute("class","text");
            textDescriere.innerText = personInfo["descriere"];
            descriere.appendChild(textDescriere);

            infoContainer.appendChild(descriere);
        }
    }

    lastDotSelected = undefined;
    lastDotInfoViewed = undefined;

    dotMouseEnter() {
        const timeline = this.shadowRoot.querySelector(".timeline");
        this.lastDotInfoViewed = this.lastDotSelected.querySelector(".info");

        this.lastDotSelected.removeChild(this.lastDotInfoViewed);
        timeline.appendChild(this.lastDotInfoViewed);

        this.lastDotInfoViewed.style.display = "block";
    }

    dotMouseLeave() {
        const timeline = this.shadowRoot.querySelector(".timeline");
        this.lastDotInfoViewed.style.display = "none";
        timeline.removeChild(this.lastDotInfoViewed);

        this.lastDotSelected.appendChild(this.lastDotInfoViewed);
        this.lastDotSelected = undefined;
    }


    connectedCallback() {
        const id = new URLSearchParams(window.location.search).get('id');

        if(id!==null && id!=='') {
            const personInfo = this.getPersonInfo(id);

            this.fillPageWithPersonDetails(personInfo);

            const dots = this.shadowRoot.querySelectorAll(".dot");
            for(let i=0;i<dots.length;i++)
            {
                dots[i].addEventListener(`click`,(eventInfo)=>{
                    if(this.lastDotSelected === undefined) {
                        this.lastDotSelected = eventInfo.target;
                    this.dotMouseEnter();
                    }
                });
                dots[i].querySelector(".info .close").addEventListener(`click`,this.dotMouseLeave.bind(this));
            }
        }
        else {
            window.history.go(-1);//return to previous page
        }
    }
}
  
customElements.define('informatii-personal', InformatiiPersonal);