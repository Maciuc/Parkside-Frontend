import GrupareRol from "./GrupareRol.js";
import InfoCard from "./InfoCard.js";
import MeniuPrincipal from "../MeniuPrincipal.js";
import SubsolPrincipal from "../SubsolPrincipal.js";

let shadow;

const roluri = ["CENTRU","PIVOT","INTER","EXTREMĂ","PORTAR","ANTRENOR"];
const roluriPersonalMedical = ["KINETOTERAPEUT"];
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

                .buttons {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: end;
                }

                .buttons button {
                    width: fit-content;
                    margin: 0.5rem;
                }

                .button-treci-la-persoana-urmatoare,
                .button-treci-la-persoana-anterioara {
                    visibility: hidden;
                }

                .button-cautare {
                    float: right;
                    margin: 2rem;
                }

                .stuff-container {
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
                <div class="stuff-container">
                    <grupare-rol class="grupare-centrali" rol="CENTRALI">
                    </grupare-rol>
                    <grupare-rol class="grupare-pivoti" rol="PIVOȚI">
                    </grupare-rol>
                    <grupare-rol class="grupare-interi" rol="INTERI">
                    </grupare-rol>
                    <grupare-rol class="grupare-extreme" rol="EXTREME">
                    </grupare-rol>
                    <grupare-rol class="grupare-portari" rol="PORTARI">
                    </grupare-rol>
                    <grupare-rol class="grupare-antrenori" rol="ANTRENORI">
                    </grupare-rol>
                    <grupare-rol class="grupare-personal-medical" rol="PERSONAL MEDICAL">
                    </grupare-rol>
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
     * @param numeCampionat string cu numele campionatului pentru care se doreste componenta staff-ului
     * @returns un vector de json cu componenta staff-ului aferent campionatului cu numele 'numeCampionat'
     */
    returneazaStafful(numeCampionat) {
        switch(numeCampionat) {
            case "Liga Nationala '23-'24":
                return [
                    {
                        id: 1,
                        Nume: "Dascălu",
                        Prenume: "Codrin",
                        Numar: "99",
                        Inaltime: "1.80 m",
                        rol: "INTER STÂNGA",
                        imagine: "/static/imagini/staff/DascăluCodrin_IS.jpg"
                    },
                    {
                        id: 2,
                        Nume: "Leonte",
                        Prenume: "Ștefan",
                        Numar: "95",
                        Inaltime: "1.83 m",
                        rol: "PORTAR",
                        imagine: "/static/imagini/staff/LeonteȘtefan_PO.jpg"
                    },
                    {
                        id: 3,
                        Nume: "Reuț",
                        Prenume: "Alexandru",
                        Numar: "89",
                        Inaltime: "1.83 m",
                        rol: "INTER STÂNGA",
                        imagine: "/static/imagini/staff/ReuțAlexandru_IS.jpg"
                    },
                    {
                        id: 4,
                        Nume: "Rusu",
                        Prenume: "Eduard",
                        Numar: "27",
                        Inaltime: "1.83 m",
                        rol: "EXTREMĂ DREAPTĂ",
                        imagine: "/static/imagini/staff/RusuEduard_ED.jpg"
                    },
                    {
                        id: 5,
                        Nume: "Zăpodianu",
                        Prenume: "Nicolas",
                        Numar: "24",
                        Inaltime: "1.83 m",
                        rol: "PIVOT",
                        imagine: "/static/imagini/staff/ZăpodianuNicolas_PI.jpg"
                    },
                    {
                        id: 6,
                        Nume: "Ostafe",
                        Prenume: "Rareș",
                        Numar: "22",
                        Inaltime: "1.83 m",
                        rol: "CENTRU",
                        imagine: "/static/imagini/staff/OstafeRareș_C.jpg"
                    },
                    {
                        id: 7,
                        Nume: "Niculaie",
                        Prenume: "Bogdan",
                        Numar: "98",
                        Inaltime: "1.83 m",
                        rol: "CENTRU",
                        imagine: "/static/imagini/staff/NiculaieBogdan_C.jpg"
                    },
                    {
                        id: 8,
                        Nume: "Focșăneanu",
                        Prenume: "Alexandru",
                        Numar: "78",
                        Inaltime: "1.83 m",
                        rol: "PIVOT",
                        imagine: "/static/imagini/staff/FocșăneanuAlexandru_PI.jpg"
                    },
                    {
                        id: 9,
                        Nume: "Țivichi",
                        Prenume: "Alexandru",
                        Numar: "42",
                        Inaltime: "1.83 m",
                        rol: "EXTREMĂ STÂNGA",
                        imagine: "/static/imagini/staff/ȚivichiAlexandru_ES.jpg"
                    },
                    {
                        id: 10,
                        Nume: "Radu",
                        Prenume: "Codrin",
                        Numar: "21",
                        Inaltime: "1.83 m",
                        rol: "INTER DREAPTA",
                        imagine: "/static/imagini/staff/RaduCodrin_ID.jpg"
                    },
                    {
                        id: 11,
                        Nume: "Ilucă",
                        Prenume: "Teodor",
                        Numar: "18",
                        Inaltime: "1.83 m",
                        rol: "EXTREMĂ STÂNGĂ",
                        imagine: "/static/imagini/staff/IlucăTeodor_ES.jpg"
                    },
                    {
                        id: 12,
                        Nume: "Pășcuț",
                        Prenume: "Ionuț",
                        Numar: "14",
                        Inaltime: "1.83 m",
                        rol: "EXTREMĂ DREAPTĂ",
                        imagine: "/static/imagini/staff/PășcuțIonuț_ED.jpg"
                    },
                    {
                        id: 13,
                        Nume: "Moșneagu",
                        Prenume: "Teodor",
                        Numar: "36",
                        Inaltime: "1.83 m",
                        rol: "INTER DREAPTA",
                        imagine: "/static/imagini/staff/MoșneaguTeodor_ID.jpg"
                    },
                    {
                        id: 14,
                        Nume: "Rîpă",
                        Prenume: "Răzvan",
                        Numar: "16",
                        Inaltime: "1.83 m",
                        rol: "PORTAR",
                        imagine: "/static/imagini/staff/RîpăRăzvan_PO.jpg"
                    },
                    {
                        id: 15,
                        Nume: "Grigore",
                        Prenume: "Sorin",
                        Numar: "9",
                        Inaltime: "1.83 m",
                        rol: "EXTREMĂ DREAPTĂ",
                        imagine: "/static/imagini/staff/GrigoreSorin_ED.jpg"
                    },
                    {
                        id: 16,
                        Nume: "Podovei",
                        Prenume: "Dragoș",
                        Numar: "12",
                        Inaltime: "1.83 m",
                        rol: "PORTAR",
                        imagine: "/static/imagini/staff/PodoveiDragoș_PO.jpg"
                    },
                    {
                        id: 17,
                        Nume: "Rață",
                        Prenume: "Andrei",
                        Numar: "11",
                        Inaltime: "1.83 m",
                        rol: "CENTRU",
                        imagine: "/static/imagini/staff/RațăAndrei_C.jpg"
                    },
                    {
                        id: 18,
                        Nume: "Șerban",
                        Prenume: "Emanuel",
                        Numar: "5",
                        Inaltime: "1.83 m",
                        rol: "PIVOT",
                        imagine: "/static/imagini/staff/ȘerbanEmanuel_PI.jpg"
                    },
                    {
                        id: 19,
                        Nume: "Roșu",
                        Prenume: "Iulian",
                        Numar: "4",
                        Inaltime: "1.83 m",
                        rol: "EXTREMĂ STÂNGĂ",
                        imagine: "/static/imagini/staff/RoșuIulian_ES.jpg"
                    },
                    {
                        id: 20,
                        Nume: "Vornicu",
                        Prenume: "Mihai",
                        Inaltime: "1.83 m",
                        rol: "KINETOTERAPEUT",
                        imagine: "/static/imagini/staff/VornicuMihai_K.jpg"
                    },
                    {
                        id: 21,
                        Nume: "Tcaciuc",
                        Prenume: "Ioan",
                        Inaltime: "1.83 m",
                        rol: "ANTRENOR",
                        imagine: "/static/imagini/staff/TcaciucIoan_A.jpg"
                    },
                    {
                        id: 22,
                        Nume: "Boca",
                        Prenume: "Vasile",
                        Inaltime: "1.83 m",
                        rol: "ANTRENOR",
                        imagine: "/static/imagini/staff/BocaVasile_A.jpg"
                    }
                ];
            case "Supercupa Romaniei '23-'24":
                return [
                    {
                        id: 3,
                        Nume: "Ionescu",
                        Prenume: "Ion",
                        Numar: "4",
                        Inaltime: "1.75 m",                        
                        rol: "PIVOT",
                        imagine: "/static/imagini/staff/FocșăneanuAlexandru_PI.jpg"
                    },
                    {
                        id: 4,
                        Nume: "Ionescu",
                        Prenume: "Ionut",
                        Numar: "10",
                        Inaltime: "1.73 m",
                        rol: "PORTAR",
                        imagine: "/static/imagini/staff/RoșuIulian_ES.jpg"
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

    returneazaIndexulRolului(numeRol) {
        return roluri.indexOf(numeRol.split(' ')[0]);
    }

        /** 
     * @param jsonList un vector de json, fiecare element contine datele aferente unei persoane
     * @description foloseste parametrul primit pentru a crea in mod dinamic cartonasele ce prezinta staff-ul 
     */
    actualizeazaInformatiileDespreStaff(jsonList) {
        let numarInformatiiPrincipaleAfisate = 2;

        for(let i=0;i<this.containereRoluri.length;i++) {
            this.containereRoluri[i].innerHTML = '';//golirea listei de persoane pentru fiecare rol
        }

        for(let i=0;i<jsonList.length;i++) {
            let persoana = jsonList[i];

            let infoCard = document.createElement('info-card');
            infoCard.shadowRoot.querySelector(".referinta-pagina-detalii").href = `personal/personal.html?id=${persoana['id']}`;

            const keys = Object.keys(persoana);

            for(let k=1;k<keys.length-2;k++) {
                let caracteristica = keys[k];

                if(k < numarInformatiiPrincipaleAfisate + 1) {
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
            
            let imagine = persoana["imagine"];

            infoCard.setAttribute("imagine",imagine);

            const rol = persoana["rol"];

            const indexRol = this.returneazaIndexulRolului(rol);

            if(indexRol !== -1) {
                this.containereRoluri[indexRol].appendChild(infoCard);
            }
            else {
                if(roluriPersonalMedical.indexOf(rol) !== -1) {
                    this.containereRoluri[this.containereRoluri.length-1].appendChild(infoCard);
                }
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

    connectedCallback() {
        this.containereRoluri.push(this.shadowRoot.querySelector(".grupare-centrali"));
        this.containereRoluri.push(this.shadowRoot.querySelector(".grupare-pivoti"));
        this.containereRoluri.push(this.shadowRoot.querySelector(".grupare-interi"));
        this.containereRoluri.push(this.shadowRoot.querySelector(".grupare-extreme"));
        this.containereRoluri.push(this.shadowRoot.querySelector(".grupare-portari"));
        this.containereRoluri.push(this.shadowRoot.querySelector(".grupare-antrenori"));
        this.containereRoluri.push(this.shadowRoot.querySelector(".grupare-personal-medical"));
        
        let numeCampionatDefault = this.returneazaNumeleCampionatuluiDefault();
        this.selecteazaCampionatulDefaultInCampulDeSelectieAlCampionatului();

        let numeCampionate = this.returneazaCampionateleLaCareParticipaEchipa();
        this.populeazaCuDateCampulDeSelectieACampionatuluiDinInterfataDeCautare(numeCampionate);

        let stuff = this.returneazaStafful(numeCampionatDefault);

        this.actualizeazaInformatiileDespreStaff(stuff);

        this.populeazaCuDateCampurileNumeSiPrenumeDinInterfataDeCautare(stuff);

        shadow.querySelector(".button-cautare").addEventListener('click',this.rutinaDeTratareAEvenimentuluiClickPentruButonulCauta.bind(this))    
        
        this.shadowRoot.querySelector(".button-treci-la-persoana-urmatoare").addEventListener('click',this.rutinaDeTrecereLaUrmatoareaPersoanaFiltrata.bind(this));
        this.shadowRoot.querySelector(".button-treci-la-persoana-anterioara").addEventListener('click',this.rutinaDeTrecereLaAnterioaraPersoanaFiltrata.bind(this));

        shadow.querySelector(".button-ascunde-interfata-de-cautare").addEventListener('click',this.rutinaDeTratareAEvenimentuluiClickPentruButonulAscundeInterfata.bind(this));
        
        let selectTags = shadow.querySelectorAll(".user-input #select-nume, .user-input #select-prenume, .user-input #select-campionat");
        for(let i=0;i<selectTags.length;i++) {
            selectTags[i].addEventListener('change',(eventInfo)=>{this.rutinaDeTratareAEvenimentuluiDeShimbareAValoriiSelectate(eventInfo);});
        }
    }
}

customElements.define('informatii-echipa', InformatiiEchipa);