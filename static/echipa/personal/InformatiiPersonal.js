/*Informatii detaliate despre o persoana din staff*/

import MeniuPrincipal from "/static/MeniuPrincipal.js";
import SubsolPrincipal from "/static/SubsolPrincipal.js";
import { backendServerAddress } from "/static/index.js";

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

                .dot:nth-child(2n+0) .year{
                    margin-top: -5rem;
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
                    height: fit-content;
                    width: fit-content;
                    background-color: white;
                    display: none;
                    border-radius: 1rem;
                    box-shadow: 0 0 1.5rem gray;
                    padding: 1rem 1rem 0.5rem 1rem;
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

                .info .year {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .info .year-info {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    margin-top: 4rem;
                }

                .year-info p {
                    margin: 0.5rem 0;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    background-color: #3E4095;
                    color: white;
                    padding: 1rem;
                }

                .year-info .c1 {
                    justify-content: flex-start;
                    border-radius: 1rem 0 0 1rem;
                }

                .year-info .c2 {
                    justify-content: flex-end;
                    border-radius: 0 1rem 1rem 0;
                }

                .dots {
                    width: calc(100% - 15rem);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute; 
                }

                .line {
                    width: 100%;
                    border-bottom: 0.1rem solid #bbb;
                }

                .info .trofee {
                    margin: 0.5rem 0;
                    padding: 1rem;
                    border-radius: 1rem;
                    background-color: #3E4095;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .trofee p {
                    margin: 0.5rem 0;
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

    fillPageWithPersonDetails(personId,isPlayer) {
        return new Promise((resolve) => {
            fetch(backendServerAddress + (isPlayer?"api/Player/getPlayer/":"api/Stuff/getStuff/") + personId)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }  
                return response.json();
            })
            .then(personInfo => {
                return new Promise((resolve) => {
                    this.shadowRoot.querySelector(".header img").setAttribute("src",personInfo.ImageBase64);

                    const mainInfoContainer = this.shadowRoot.querySelector(".main-info table");
    
                    const dataNastere = new Date(personInfo.BirthDate);
                    const zi = dataNastere.getDate();
                    const luna = dataNastere.getMonth() + 1;
                    const an = dataNastere.getFullYear();
    
    
                    let dataNastereToString = (Math.floor(zi/10)===0?("0"):"") + zi + "." + (Math.floor(luna/10)===0?("0"):"") + luna + "." + an;
    
                    mainInfoContainer.innerHTML = `
                        <tr class="main-info-row">
                            <td class="property">
                                Nume
                            </td>
                            <td class="property-value">
                                ${personInfo.LastName}
                            </td>
                        </tr>
                        <tr class="main-info-row">
                            <td class="property">
                                Prenume
                            </td>
                            <td class="property-value">
                                ${personInfo.FirstName}
                            </td>
                        </tr>
                        <tr class="main-info-row">
                            <td class="property">
                                Naționalitate
                            </td>
                            <td class="property-value">
                                ${personInfo.Nationality}
                            </td>
                        </tr>
                        <tr class="main-info-row">
                            <td class="property">
                                Dată de naștere
                            </td>
                            <td class="property-value">
                                ${dataNastereToString}
                            </td>
                        </tr>
                        <tr class="main-info-row">
                            <td class="property">
                                Înălțime
                            </td>
                            <td class="property-value">
                                ${personInfo.Height}
                            </td>
                        </tr>
                        ${isPlayer?
                        `<tr class="main-info-row">
                            <td class="property">
                                Număr
                            </td>
                            <td class="property-value">
                                ${personInfo.Number}
                            </td>
                        </tr>`
                        :``}`;
    
                    if(personInfo.Description !== undefined && personInfo.Description.length !== 0)
                    {
                        const infoContainer = this.shadowRoot.querySelector(".info-container");
    
                        const descriere = document.createElement("div");
                        descriere.setAttribute("class","descriere");
    
                        const textDescriere = document.createElement("div");
                        textDescriere.setAttribute("class","text");
                        textDescriere.innerText = personInfo.Description;
                        descriere.appendChild(textDescriere);
    
                        infoContainer.appendChild(descriere);
                    }

                    resolve();
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            })
            .then(() => {  
                let personHist;
                let personTrof = [];

                new Promise((resolve) => {
                    fetch(backendServerAddress + (isPlayer?"api/PlayerHistory/getHomePagePlayerHistory/":"api/StuffHistory/getHomePageStuffHistory/") + personId)
                    .then(response => {
                        if (!response.ok) {
                        throw new Error('Network response was not ok');
                        }  
                        return response.json();
                    })
                    .then(personHistory => {
                        personHist = personHistory; 
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    })
                    .then(() => {
                        resolve();
                    });
                })
                .then(() => {
                    return new Promise((resolve) => {
                        if(isPlayer) {
                            fetch(backendServerAddress + "api/PlayerTrofee/getHomePagePlayerTrofees/" + personId)
                            .then(response => {
                                if (!response.ok) {
                                throw new Error('Network response was not ok');
                                }  
                                return response.json();
                            })
                            .then(playerTrofees => {
                                personTrof = playerTrofees;
                            })
                            .catch(error => {
                                console.error('There was a problem with the fetch operation:', error);
                            }).then(() => {
                                resolve();
                            });
                        }
                        else {
                            resolve();
                        }    
                    });
                })
                .then(() => {
                    personHist.sort((a,b) => {
                        return a.Year - b.Year;
                    });

                    personTrof.sort((a,b) => {
                        return a.Year - b.Year;
                    });

                    let i = 0;
                    let j = 0;

                    let data = [];
                    let count = 0;

                    while(i < personHist.length) {
                        data.push({"An":personHist[i].Year,"Rol":isPlayer?personHist[i].PlayerRole:personHist[i].Role,"Echipa":personHist[i].TeamName,"Trofee":[]});
                        
                        while(j < personTrof.length) {
                            if(personHist[i].Year === personTrof[j].Year) {
                                data[count]["Trofee"].push([personTrof[j].ChampionshipName,personTrof[j].TrofeeName]);
                                ++j;
                            }
                            else {
                                break;
                            }
                        }

                        ++i;
                        ++count;
                    }

                    console.log(data)

                    const dots = this.shadowRoot.querySelector(".dots");

                    for(let i=0;i<data.length;i++) {
                        let div = document.createElement("div");
                        div.setAttribute("class","dot");
                        
                        let info = ``;

                        const keys = Object.keys(data[i]);

                        for(let j=1;j<keys.length-1;j++) {
                            info += `
                            <p class="c1">${keys[j]}</p> 
                            <p class="c2">${data[i][keys[j]]}</p>`;
                        }

                        let trof = ``;
                        const trofee = data[i][keys[keys.length-1]];

                        if(trofee.length !== 0) {
                            trof += `<p>Trofee</p>`;

                            for(let j=0;j<trofee.length;j++) {
                                trof += `<p> ${trofee[j][0]} - ${trofee[j][1]}`;
                            }
                        }

                        div.innerHTML = `
                            <div class="year">
                                ${data[i].An}
                            </div>
                            <div class="info">
                                <div class="year">
                                    ${data[i].An}
                                </div>
                                <div class="close">
                                    X
                                </div>
                                <div class="year-info">
                                    ${info}
                                </div>
                                ${trofee.length !== 0?`
                                <div class="trofee">
                                    ${trof}
                                </div>`
                            :``}
                            </div>`;

                        dots.appendChild(div);
                    }

                    if(data.length === 1) {
                        dots.style.justifyContent = "center";
                    }
                })
                .then(() => {
                    resolve();
                }); 
            });
        });
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
        const esteJucator = new URLSearchParams(window.location.search).get('jucator');
        if(id!==null && id!=='' && esteJucator!==null) {
            this.fillPageWithPersonDetails(id,esteJucator==="true"?true:false)
            .then(() => {
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
            });
        }
        else {
            window.history.go(-1);//return to previous page
        }
    }
}
  
customElements.define('informatii-personal', InformatiiPersonal);