import GrupareRol from "./GrupareRol.js";
import InfoCard from "./InfoCard.js";
import MeniuPrincipal from "../MeniuPrincipal.js";
import SubsolPrincipal from "../SubsolPrincipal.js";
import {backendServerAddress} from "../index.js";

let shadow;

const roluriPlayeri = ["CENTRU","PIVOT","INTER","EXTREMA","PORTAR"];
const roluriAntrenori = ["ANTRENOR","KINETOTERAPEUT"];
const inaltimeInterfataCautare = 20;//in rem

class InformatiiEchipa extends HTMLElement {
    referintePersoaneFiltrate = [];//referinte catre cartonasele cu bordura distincta
    indexCurentPersoanaFiltrata;
    containereRoluri = [];

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .interfata-cautare-persoana {
                    display: none;  
                    position: sticky;
                    font-size: 1.5rem;
                    background-color: white;
                    padding: 2rem;
                    border-bottom: 0.35rem solid #3E4095;
                    justify-content: space-between;
                }

                .interfata-cautare-persoana select {
                    width: ${inaltimeInterfataCautare}rem;
                    font-size: 1.5rem;
                }

                .user-input {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .user-input .user-input-group {
                    display: flex;
                    flex-direction: row;
                    align-items: baseline;
                    margin: 0 2rem;
                    font-size: 1.5rem;
                    flex-wrap: wrap;
                    margin: 1rem;
                }

                .user-input-group #select-campionat{ 
                    width: 28rem;
                }

                .buttons {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: end;
                }

                .buttons button {
                    width: fit-content;
                    margin: 0.5rem;
                    background-color: #3E4095;
                    color: white;
                    border-radius: 0.25rem;
                }

                .button-treci-la-persoana-urmatoare,
                .button-treci-la-persoana-anterioara {
                    visibility: hidden;
                }

                .button-cautare {
                    float: right;
                    margin: 2rem;
                    background-color: #3E4095;
                    color: white;
                    border-radius: 0.25rem;
                }

                .team-container {
                    padding: 0 10%;
                    width: 80%;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: space-around;  
                    margin-top: 2rem;
                }    
            </style>

            <div class="component">
                <meniu-principal>
                    <div class="interfata-cautare-persoana">
                        <div class="user-input">
                            <div class="user-input-group">
                                <label for="select-nume">Nume:</label>
                                <select id="select-nume">
                                </select>
                            </div>
                            <div class="user-input-group">
                                <label for="select-prenume">Prenume:</label>
                                <select id="select-prenume">
                                    <option value="none" selected disabled hidden>
                                        Selecteaza un prenume
                                    </option>
                                </select>
                            </div>
                            <div class="user-input-group">
                                <label for="select-campionat">Campionat:</label>
                                <select id="select-campionat">
                                </select>
                            </div>
                        </div>
                        <div class="buttons">
                            <button type="button" class="button-ascunde-interfata-de-cautare">
                                Ascunde interfata
                            </button>
                            <div style="display: flex;">
                                <button type="button" class="button-treci-la-persoana-anterioara">
                                    Ant.
                                </button>
                                <button type="button" class="button-treci-la-persoana-urmatoare">
                                    Urm.
                                </button>
                            </div>
                        </div>
                    </div>
                </meniu-principal>
                <div style="display: flex; flex-direction: row-reverse;">
                    <button type="button" class="button-cautare">
                        Caută
                    </button>
                </div>
                <div class="team-container">
                </div>
                <subsol-principal>
                </subsol-principal>
            </div>
        `;
    }

    constructor() {
        super();
        shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    /**
     * 
     * @param numeCampionat string cu numele campionatului pentru care se doreste componenta echipei
     * @returns un vector de json cu componenta echipei aferent campionatului cu numele 'numeCampionat'
     */
    returneazaComponentaEchipei(numeCampionat) {
        const players = [];
        const stuff = [];
        const data = [players,stuff];

        let temp = numeCampionat.split("-")[0];
        const campionat = temp.substring(0,temp.length-5);
        const an = temp.substring(temp.length-4,temp.length);

        for(let i=0;i<this.playersHistoryDataBase.length;i++) {
            if(this.playersHistoryDataBase[i]["Year"] === an && this.playersHistoryDataBase[i]["ChampionshipName"] === campionat) {
                players.push(this.playersHistoryDataBase[i]);
            }
        }

        for(let i=0;i<this.stuffHistoryDataBase.length;i++) {
            if(this.stuffHistoryDataBase[i]["Year"] === an) {
                stuff.push(this.stuffHistoryDataBase[i]);
            }
        }

        return data;
    }

    /**
     * @description selecteaza campionatul default in campul de selectie al campionatului
     */
    selecteazaCampionatulDefaultInCampulDeSelectieAlCampionatului() {
        shadow.querySelector("#select-campionat").value = this.returneazaNumeleCampionatuluiDefault();
    }

    /**
     * @returns lista de campionate la care a participat echipa
     */
    returneazaCampionateleLaCareAParticipatEchipa() {
        let setCampionate = new Set();

        for(let i=0;i<this.playersHistoryDataBase.length;i++) {
            let year = parseInt(this.playersHistoryDataBase[i]["Year"])
            setCampionate.add(this.playersHistoryDataBase[i]["ChampionshipName"] + " " + year + "-" + (year+1));
        }

        return Array.from(setCampionate).sort((a,b) => {
                return b.substring(b.length-5,4) - a.substring(a.length-5,4);
            }
        );
    }

        /** 
     * @param data doi vectori de json, fiecare element din vector contine datele aferente unei persoane
     * @description foloseste parametrul primit pentru a crea in mod dinamic cartonasele ce prezinta formatia echipei 
     */
    actualizeazaInformatiileDespreEchipa(data) {
        for(let i=0;i<this.containereRoluri.length;i++) {
            this.containereRoluri[i].innerHTML = '';//golirea listei de persoane pentru fiecare rol
        }

        let repeat = 2;
        do {
            let jsonList = data[2-repeat];

            for(let i=0;i<jsonList.length;i++) {
                let persoana = jsonList[i];
    
                let infoCard = document.createElement('info-card');
                infoCard.shadowRoot.querySelector(".referinta-pagina-detalii").href = `personal/personal.html?jucator=${repeat === 2}&id=${(repeat===2)?persoana['PlayerId']:persoana['StuffId']}`;
    
                infoCard.shadowRoot.querySelector(".main-info").innerHTML = `
                    <div class="content">
                        <b>Nume:</b> ${(repeat === 2)?persoana["PlayerLastName"]:persoana["StuffLastName"]}
                    </div>
                    <div class="content">
                        <b>Prenume:</b> ${(repeat === 2)?persoana["PlayerFirstName"]:persoana["StuffFirstName"]}
                    </div>`;

                infoCard.shadowRoot.querySelector(".detailed-info").innerHTML += `
                <div class="content">
                    <b>Naționalitate:</b> ${persoana["Nationality"]}
                </div>
                <div class="content">
                    <b>Înălțime:</b> ${persoana["Height"]}
                </div>
                <div class="content">
                    <b>Dată naștere:</b> ${persoana["BirthDate"]}
                </div>` + (repeat === 1?
                    `<div class="content">
                        <b>Rol:</b> ${persoana.Role}
                    </div>`
                    :"");
                
                let imagine = (repeat === 2)?persoana["PlayerImageBase64"]:persoana["StuffImageBase64"];
    
                infoCard.setAttribute("imagine",imagine);
    
                const rol = ((repeat === 2)?persoana["PlayerRole"]:persoana["Role"]).toUpperCase();
    
                let indexRol = roluriPlayeri.indexOf(rol.split(' ')[0]);
    
                let isPlayer = true;

                if(indexRol === -1) {
                    isPlayer = false;   
                    
                    indexRol = roluriAntrenori.indexOf(rol);
                }

                if(indexRol !== -1) {
                    if(isPlayer) {
                        this.containereRoluri[indexRol].appendChild(infoCard);
                    }
                    else {
                        this.containereRoluri[this.containereRoluri.length-1].appendChild(infoCard);
                    }
                }
            }

            repeat--;
        }while(repeat != 0);

        const teamContainer = this.shadowRoot.querySelector(".team-container");
        teamContainer.innerHTML = "";//remove children

        for(let i=0;i<this.containereRoluri.length;i++) {
            if(this.containereRoluri[i].children.length !== 0) {
                teamContainer.appendChild(this.containereRoluri[i]);
            }
        }
    }

    /**
     * @param numeCampionate un vector de stringuri cu numele campionatelor la care participa echipa
     * @description actualizeaza tagul (prin intermediul caruia se selecteaza campionatul) cu numele campionatelor 
    */
    populeazaCuDateCampulDeSelectieACampionatuluiDinInterfataDeCautare(numeCampionate) {
        let selectCampionatTag = shadow.querySelector("#select-campionat");

        for(let i=0;i<numeCampionate.length;i++) {
            let numeCampionat = numeCampionate[i];
            let option = document.createElement("option");
            option.setAttribute('value',numeCampionat);
            option.innerHTML = numeCampionat;

            selectCampionatTag.appendChild(option);
        }

        if(numeCampionate.length != 0) {
            selectCampionatTag.firstElementChild.selected = true;
        }   
    }

    /** 
     * @param data doi vectori de json, fiecare element din vector contine datele aferente unei persoane
     * @description actualizeza continutul tagurilor, prin intermediul carora se selecteaza numele si prenumele,
     * din interfata de cautare a unei persoane din staff
     */
    populeazaCuDateCampurileNumeSiPrenumeDinInterfataDeCautare(data) {
        let sets = [new Set(), new Set()];

        let repeat = 2;
        do {
            let jsonList = data[2-repeat];

            for(let i=0;i<jsonList.length;i++) {
                let persoana = jsonList[i];
    
                sets[0].add((repeat === 2)?persoana["PlayerLastName"]:persoana["StuffLastName"]);
                sets[1].add((repeat === 2)?persoana["PlayerFirstName"]:persoana["StuffFirstName"]);
            }

            repeat--;
        }while(repeat != 0);

        let selectTags = shadow.querySelectorAll(".user-input #select-nume, .user-input #select-prenume");

        for(let i=0;i<selectTags.length;i++) {
            
            selectTags[i].innerHTML = `<option value="" selected></option>`;

            const setIterator = sets[i].values();

            let setElement = setIterator.next();
            
            while(!setElement.done) {
                let temp = setElement.value;

                let option = document.createElement('option');
                option.setAttribute('value',temp);
                option.innerHTML = temp;

                selectTags[i].appendChild(option);

                setElement = setIterator.next();
            }
        }
    }

    /**
     * @description persoana curenta dintre persoanele filtrate va avea afisat un contur diferit
     */
    afiseazaDistinctiaPentruPersoanaCurenta() {
        const numarPersoaneFiltrate = this.referintePersoaneFiltrate.length;
        
        if(numarPersoaneFiltrate !== 0) {
            this.referintePersoaneFiltrate[this.indexCurentPersoanaFiltrata].showADistinctAppearance();

            const data = this.referintePersoaneFiltrate[this.indexCurentPersoanaFiltrata].getBoundingClientRect();
            window.scrollBy(0,data.top - (window.innerHeight/2 - data.height/2));

            if(numarPersoaneFiltrate > 1) {
                const butonAnt = this.shadowRoot.querySelector(".button-treci-la-persoana-anterioara");
                const butonUrm = this.shadowRoot.querySelector(".button-treci-la-persoana-urmatoare");
    
                if(this.indexCurentPersoanaFiltrata>0) {
                    butonAnt.style.visibility = 'visible';
                }
                else {
                    butonAnt.style.visibility = 'hidden';
                }
                
                if(this.indexCurentPersoanaFiltrata<numarPersoaneFiltrate-1) {
                    butonUrm.style.visibility = 'visible';
                }
                else {
                    butonUrm.style.visibility = 'hidden';
                }
            }
        }
    }

    /**
     * @description persoanele curenta dintre persoanele filtrate nu va mai fi distinsa vizual de celelalte
     */
    ascundeDistinctiaPentruPersoanaCurenta() {
        const numarPersoaneFiltrate = this.referintePersoaneFiltrate.length;
        
        if(numarPersoaneFiltrate !== 0) {
        this.referintePersoaneFiltrate[this.indexCurentPersoanaFiltrata].showTheDefaultAppearance();
        }
    }

    /**
     * @description trateaza evenimentul click lansat de butonul "Cauta"
     */
    rutinaDeTratareAEvenimentuluiClickPentruButonulCauta() {
        let interfataCautare = shadow.querySelector(".interfata-cautare-persoana");

        let buttonCautare = shadow.querySelector(".button-cautare");
    
        buttonCautare.style.display = 'none';

        interfataCautare.style.display = 'flex';

        this.afiseazaDistinctiaPentruPersoanaCurenta();
    }

    /**
     * @description trateaza evenimentul click lansat de butonul "Ascunde interfata"
     */
    rutinaDeTratareAEvenimentuluiClickPentruButonulAscundeInterfata() {
        let interfataCautare = shadow.querySelector(".interfata-cautare-persoana");
        let buttonCautare = shadow.querySelector(".button-cautare");
    
        interfataCautare.style.display = 'none';

        buttonCautare.style.display = 'inline-block';

        this.ascundeDistinctiaPentruPersoanaCurenta(); 
    }

    /**
     * @description filtreaza staff-ul folosind numele si prenumele selectat de catre utilizator
     */
    filtreazaFunctieDeNumeleSiPrenumeleSelectat() {
        this.ascundeDistinctiaPentruPersoanaCurenta();

        this.referintePersoaneFiltrate.length = 0;//clear array

        let numeSelectat = shadow.querySelector("#select-nume").value;
        let prenumeSelectat = shadow.querySelector("#select-prenume").value;

        let binaryIndicator = (numeSelectat!==''?2:0) + (prenumeSelectat!==''?1:0);

        if(binaryIndicator !=0) {
            let infoCards = shadow.querySelectorAll("info-card");

            for(let i=0;i<infoCards.length;i++) {
                let referintaContinutDeInteres = infoCards[i].shadowRoot.querySelectorAll(".main-info .content");
    
                let numePersoana = referintaContinutDeInteres[0].innerText.split(' ')[1];
                let prenumePersoana = referintaContinutDeInteres[1].innerText.split(' ')[1];
    
                let persoanaCautata = false;

                switch(binaryIndicator) {
                    case 3:
                        if(numePersoana === numeSelectat && prenumePersoana === prenumeSelectat) {
                            persoanaCautata = true;
                        }
                        break;
                    case 2:
                        if(numePersoana === numeSelectat) {
                            persoanaCautata = true;
                        }
                        break;
                    case 1:
                        if(prenumePersoana === prenumeSelectat) {
                            persoanaCautata = true;
                        }
                        break;
                    default: 
                        break;
                }

                if(persoanaCautata) {
                    this.referintePersoaneFiltrate.push(infoCards[i]);
                }
            }

            this.indexCurentPersoanaFiltrata = 0;
            this.afiseazaDistinctiaPentruPersoanaCurenta();
        }
        else {
            this.shadowRoot.querySelector(".button-treci-la-persoana-anterioara").style.display = "none";
            this.shadowRoot.querySelector(".button-treci-la-persoana-urmatoare").style.display = "none";
        }
    }

    /**
     * @param numeCampionatSelectat string cu numele campionatului selectat de catre utilizator
     * @description realizeaza actiunile asociate cu selectia de catre utilizator a altui campionat
     */
    trateazaModificareaCampionatuluiSelectat(numeCampionatSelectat) {
        shadow.querySelector("#select-nume").value = 'none';
        shadow.querySelector("#select-prenume").value = 'none';

        let echipa = this.returneazaComponentaEchipei(numeCampionatSelectat);
        this.actualizeazaInformatiileDespreEchipa(echipa);

        this.populeazaCuDateCampurileNumeSiPrenumeDinInterfataDeCautare(echipa);
    }

    /**
     * @param detaliiEveniment detalii despre eveniment
     * @description este apelata atunci cand utilizatorul selecteaza alta valoare in oricare dintre campurile de selectie
     */
    rutinaDeTratareAEvenimentuluiDeShimbareAValoriiSelectate(detaliiEveniment) {
        let idSursa = detaliiEveniment.target.getAttribute('id');
        
        switch(idSursa) {
            case 'select-nume':
            case 'select-prenume':
                this.filtreazaFunctieDeNumeleSiPrenumeleSelectat();
                break;
            case 'select-campionat':
                this.trateazaModificareaCampionatuluiSelectat(detaliiEveniment.target.value)
                break;
            default:
                break;
        }
    }

    seteazaZIndexulMeniului(zIndexValue) {
        let referintaMeniu = document.querySelector("informatii-echipa").shadowRoot.querySelector("meniu-principal").shadowRoot.querySelector(".meniu");
        referintaMeniu.style.zIndex = zIndexValue;
    }

    rutinaDeTrecereLaUrmatoareaPersoanaFiltrata() {
        this.ascundeDistinctiaPentruPersoanaCurenta();
        this.indexCurentPersoanaFiltrata++; 
        this.afiseazaDistinctiaPentruPersoanaCurenta();
    }

    rutinaDeTrecereLaAnterioaraPersoanaFiltrata() {
        this.ascundeDistinctiaPentruPersoanaCurenta();
        this.indexCurentPersoanaFiltrata--; 
        this.afiseazaDistinctiaPentruPersoanaCurenta();
    }

    returneazaIstoriculJucatorilor() {
        return new Promise((resolve, reject) => {
            fetch(backendServerAddress + "api/PlayerHistory/getPlayerHistories?TeamName=CSU%20Suceava%20Seniori&PageNumber=1&PageSize=100")
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

    returneazaIstoriculStaffului() {
        return new Promise((resolve, reject) => {
            fetch(backendServerAddress + "api/StuffHistory/getStuffHistories?TeamName=CSU%20Suceava%20Seniori&PageNumber=1&PageSize=50")
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

    playersHistoryDataBase = [];
    stuffHistoryDataBase = [];

    connectedCallback() {
        new Promise((resolve) => {
            this.returneazaIstoriculJucatorilor()
            .then(istoricJucatori => {
                this.playersHistoryDataBase = istoricJucatori.Items;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            })
            .then(() => {
                resolve();
            });
        })
        .then(() => {
            new Promise((resolve) => {
                this.returneazaIstoriculStaffului()
                .then(istoricStaff => {
                    this.stuffHistoryDataBase = istoricStaff.Items;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                })
                .then(() => {
                    resolve();
                });            
            })
            .then(() => {
                let grupare;
    
                grupare = document.createElement("grupare-rol");
                grupare.setAttribute("rol","CENTRALI");
                this.containereRoluri.push(grupare);
    
                grupare = document.createElement("grupare-rol");
                grupare.setAttribute("rol","PIVOȚI");
                this.containereRoluri.push(grupare);
    
                grupare = document.createElement("grupare-rol");
                grupare.setAttribute("rol","INTERI");
                this.containereRoluri.push(grupare);
    
                grupare = document.createElement("grupare-rol");
                grupare.setAttribute("rol","EXTREME");
                this.containereRoluri.push(grupare);

                grupare = document.createElement("grupare-rol");
                grupare.setAttribute("rol","PORTARI");
                this.containereRoluri.push(grupare);
    
                grupare = document.createElement("grupare-rol");
                grupare.setAttribute("rol","ANTRENORI");
                this.containereRoluri.push(grupare);
    
                let numeCampionate = this.returneazaCampionateleLaCareAParticipatEchipa();

                if(numeCampionate.length !== 0) {
                    this.populeazaCuDateCampulDeSelectieACampionatuluiDinInterfataDeCautare(numeCampionate);
    
                    let formatieEchipa = this.returneazaComponentaEchipei(numeCampionate[0]);
    
                    this.actualizeazaInformatiileDespreEchipa(formatieEchipa);
                    this.populeazaCuDateCampurileNumeSiPrenumeDinInterfataDeCautare(formatieEchipa);
    
                    shadow.querySelector(".button-cautare").addEventListener('click',this.rutinaDeTratareAEvenimentuluiClickPentruButonulCauta.bind(this))    
            
                    this.shadowRoot.querySelector(".button-treci-la-persoana-urmatoare").addEventListener('click',this.rutinaDeTrecereLaUrmatoareaPersoanaFiltrata.bind(this));
                    this.shadowRoot.querySelector(".button-treci-la-persoana-anterioara").addEventListener('click',this.rutinaDeTrecereLaAnterioaraPersoanaFiltrata.bind(this));
    
                    shadow.querySelector(".button-ascunde-interfata-de-cautare").addEventListener('click',this.rutinaDeTratareAEvenimentuluiClickPentruButonulAscundeInterfata.bind(this));
                    
                    let selectTags = shadow.querySelectorAll(".user-input #select-nume, .user-input #select-prenume, .user-input #select-campionat");
                    for(let i=0;i<selectTags.length;i++) {
                        selectTags[i].addEventListener('change',(eventInfo)=>{this.rutinaDeTratareAEvenimentuluiDeShimbareAValoriiSelectate(eventInfo);});
                    }
                }  
            });
        });  
    }
}

customElements.define('informatii-echipa', InformatiiEchipa);