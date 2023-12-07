import InfoCard from "./InfoCard.js";
import MeniuPrincipal from "../MeniuPrincipal.js";

let shadow;

class InformatiiEchipa extends HTMLElement {
    referintePersoaneFiltrate = [];//referinte catre cartonasele cu bordura distincta

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .interfata-cautare-persoana {
                    z-index: 1; 
                    display: none;  
                    position: sticky;
                    width: 100%;
                    top: 7.5rem; //inaltime+grosime_contur meniu
                    
                    font-size: 1.5rem;
                    background-color: white;
                    padding: 5rem 0 3rem 0;
                    border-bottom: 0.1rem solid black;
                }

                .interfata-cautare-persoana select {
                    width: 20rem;
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
                    margin: 2rem 2rem 0 2rem;
                    font-size: 1.5rem;
                    flex-wrap: wrap;
                }

                .button-ascunde-interfata-de-cautare {
                    position: absolute;
                    right: 1rem;
                    top: 2rem;
                }

                .button-cautare {
                    float: right;
                    margin: 2rem;
                }

                .stuff-container {
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    justify-content: space-around;  
                    flex-wrap: wrap;
                    gap: 5rem;
                    margin-top: 2rem;
                }    
            </style>

            <div class="page">
                <meniu-principal>
                </meniu-principal>
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
                    <button type="button" class="button-ascunde-interfata-de-cautare">
                        Ascunde interfata
                    </button>
                </div>
                <div style="display: flex; flex-direction: row-reverse;">
                    <button type="button" class="button-cautare">
                        Caută
                    </button>
                </div>
                <div class="stuff-container">
                </div>
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
     * @param numeCampionat string cu numele campionatului pentru care se doreste componenta staff-ului
     * @returns un vector de json cu componenta staff-ului aferent campionatului cu numele 'numeCampionat'
     */
    returneazaStafful(numeCampionat) {
        switch(numeCampionat) {
            case "Liga Nationala '23-'24":
                return [
                    {
                        Nume: "Gheorghescu",
                        Prenume: "Gheorghe",
                        Numar: "7",
                        Inaltime: "1.80 m",
        
                    },
                    {
                        Nume: "Zamfirescu",
                        Prenume: "Zamfir",
                        Numar: "9",
                        Inaltime: "1.83 m"
                    }
                ];
            case "Supercupa Romaniei '23-'24":
                return [
                    {
                        Nume: "Ionescu",
                        Prenume: "Ion",
                        Numar: "4",
                        Inaltime: "1.75 m"
                    },
                    {
                        Nume: "Ionescu",
                        Prenume: "Ionut",
                        Numar: "10",
                        Inaltime: "1.73 m"
                    }
                ];
            default:
                break;
        }
    }

    /**
     * @returns numele campionatului pentru care se va afisa staff-ul atunci cand este afisata pagina "Echipa"
     */
    returneazaNumeleCampionatuluiDefault() {
        return "Liga Nationala '23-'24";
    }


    /**
     * @description selecteaza campionatul default in campul de selectie al campionatului
     */
    selecteazaCampionatulDefaultInCampulDeSelectieAlCampionatului() {
        shadow.querySelector("#select-campionat").value = this.returneazaNumeleCampionatuluiDefault();
    }

    /**
     * @returns lista de campionate la care participa echipa
     */
    returneazaCampionateleLaCareParticipaEchipa() {
        return [
            "Liga Nationala '23-'24",
            "Supercupa Romaniei '23-'24"
        ];
    }

        /** 
     * @param jsonList un vector de json, fiecare element contine datele aferente unei persoane
     * @description foloseste parametrul primit pentru a crea in mod dinamic cartonasele ce prezinta staff-ul 
     */
    actualizeazaInformatiileDespreStaff(jsonList) {
        let numarInformatiiPrincipaleAfisate = 2;

        shadow.querySelector(".stuff-container").innerHTML = '';//eliminarea informatiilor afisate despre staff

        for(let k=0;k<10;k++)
        for(let i=0;i<jsonList.length;i++) {
            let persoana = jsonList[i];

            let infoCard = document.createElement('info-card');
            let k=0;
            for(let caracteristica in persoana) {
                if(k++ < numarInformatiiPrincipaleAfisate) {
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

            shadow.querySelector(".stuff-container").appendChild(infoCard);
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
    }

    /** 
     * @param jsonList un vector de json, fiecare element contine datele aferente unei persoane
     * @description actualizeza continutul tagurilor, prin intermediul carora se selecteaza numele si prenumele,
     * din interfata de cautare a unei persoane din staff
     */
    populeazaCuDateCampurileNumeSiPrenumeDinInterfataDeCautare(jsonList) {
        let sets = [new Set(), new Set()];

        for(let i=0;i<jsonList.length;i++) {
            let persoana = jsonList[i];

            sets[0].add(persoana["Nume"]);
            sets[1].add(persoana["Prenume"]);
        }

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
     * @description persoanele filtrate vor avea afisat un contur diferit
     */
    afiseazaDistinctiaPentruPersoaneleFiltrate() {
        for(let i=0;i<this.referintePersoaneFiltrate.length;i++) {
            this.referintePersoaneFiltrate[i].showADistinctAppearance();
        }
    }

    /**
     * @description persoanele filtrate nu vor mai fi distinse vizual de celelalte
     */
    ascundeDistinctiaPentruPersoaneleFiltrate() {
        for(let i=0;i<this.referintePersoaneFiltrate.length;i++) {
            this.referintePersoaneFiltrate[i].showTheDefaultAppearance();
        }
    }

    /**
     * @param _this referinta catre clasa curenta (InformatiiEchipa)
     * @description trateaza evenimentul click lansat de butonul "Cauta"
     */
    rutinaDeTratareAEvenimentuluiClickPentruButonulCauta(_this) {
        let interfataCautare = shadow.querySelector(".interfata-cautare-persoana");

        let buttonCautare = shadow.querySelector(".button-cautare");
    
        buttonCautare.style.display = 'none';

        interfataCautare.style.display = 'block';

        _this.afiseazaDistinctiaPentruPersoaneleFiltrate();
    }

    /**
     * @param _this referinta catre clasa curenta (InformatiiEchipa)
     * @description trateaza evenimentul click lansat de butonul "Ascunde interfata"
     */
    rutinaDeTratareAEvenimentuluiClickPentruButonulAscundeInterfata(_this) {
        let interfataCautare = shadow.querySelector(".interfata-cautare-persoana");
        let buttonCautare = shadow.querySelector(".button-cautare");
    
        interfataCautare.style.display = 'none';

        buttonCautare.style.display = 'inline-block';

        _this.ascundeDistinctiaPentruPersoaneleFiltrate(); 
    }

    /**
     * @description filtreaza staff-ul folosind numele si prenumele selectat de catre utilizator
     */
    filtreazaFunctieDeNumeleSiPrenumeleSelectat() {
        this.ascundeDistinctiaPentruPersoaneleFiltrate();

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
                    infoCards[i].showADistinctAppearance();
                    this.referintePersoaneFiltrate.push(infoCards[i]);
                }
            }
        }
    }

    /**
     * @param numeCampionatSelectat string cu numele campionatului selectat de catre utilizator
     * @description realizeaza actiunile asociate cu selectia de catre utilizator a altui campionat
     */
    trateazaModificareaCampionatuluiSelectat(numeCampionatSelectat) {
        shadow.querySelector("#select-nume").value = 'none';
        shadow.querySelector("#select-prenume").value = 'none';

        let staff = this.returneazaStafful(numeCampionatSelectat);
        this.actualizeazaInformatiileDespreStaff(staff);

        this.populeazaCuDateCampurileNumeSiPrenumeDinInterfataDeCautare(staff);
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

    connectedCallback() {
        let numeCampionatDefault = this.returneazaNumeleCampionatuluiDefault();
        this.selecteazaCampionatulDefaultInCampulDeSelectieAlCampionatului();

        let numeCampionate = this.returneazaCampionateleLaCareParticipaEchipa();
        this.populeazaCuDateCampulDeSelectieACampionatuluiDinInterfataDeCautare(numeCampionate);

        let stuff = this.returneazaStafful(numeCampionatDefault);

        this.actualizeazaInformatiileDespreStaff(stuff);

        this.populeazaCuDateCampurileNumeSiPrenumeDinInterfataDeCautare(stuff);

        shadow.querySelector(".button-cautare").addEventListener('click',()=>this.rutinaDeTratareAEvenimentuluiClickPentruButonulCauta(this))    
        shadow.querySelector(".button-ascunde-interfata-de-cautare").addEventListener('click',()=>this.rutinaDeTratareAEvenimentuluiClickPentruButonulAscundeInterfata(this));
        
        let selectTags = shadow.querySelectorAll(".user-input #select-nume, .user-input #select-prenume, .user-input #select-campionat");
        for(let i=0;i<selectTags.length;i++) {
            selectTags[i].addEventListener('change',(eventInfo)=>{this.rutinaDeTratareAEvenimentuluiDeShimbareAValoriiSelectate(eventInfo);});
        }
    }
}

customElements.define('informatii-echipa', InformatiiEchipa);