import MeniuPrincipal from "../MeniuPrincipal.js";
import SubsolPrincipal from "../SubsolPrincipal.js";

let shadow;

class ComponentaClasament extends HTMLElement {
    render()
    {
        shadow.innerHTML = `
            <style>
                .clasament {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0 7.5%;
                    margin-top: 2rem;
                }

                .tabel-clasament {
                    width: 100%;
                    border-width: 1px 1px 0 1px;
                    border-style: solid;
                    border-color: #ddd;
                    border-collapse: collapse;
                    font-size: 1.5rem;
                }

                .tabel-clasament thead {
                    background-color: #D5CBC8;
                }

                .tabel-clasament th,  .tabel-clasament td{
                    text-align: left;
                    padding: 8px;
                    border-bottom: 1px solid #ddd;
                }
            </style>

            <meniu-principal>
            </meniu-principal>
            <div class="clasament">
                <table class="tabel-clasament">
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
     * 
     * @returns un array de arrays, unde primul element reprezinta stringul afisat in tabel, iar al doilea element reprezinta descrierea sa
     */
    returneazaContinutulCapuluiDeTabel() {
        return [
            ["Poz.", "Pozitia"],
            ["Echipa", "Nume echipa"],
            ["MJ", "Meciuri jucate"],
            ["V", "Victorii"],
            ["E", "Egaluri"],
            ["Î", "Înfrangeri"],
            ["GM", "Goluri marcate"],
            ["GP", "Goluri primite"],
            ["GDif", "Goluri diferenta"],
            ["VA", "Victorii acasa"],
            ["EA", "Egaluri acasa"],
            ["VD", "Victorii deplasare"],
            ["ED", "Egaluri deplasare"],
            ["PctA", "Puncte acasa"],
            ["PctD", "Puncte deplasare"],
            ["Pct", "Puncte in total"]
        ];
    }

    /**
     * @returns un array de arrays, unde fiecare array contine informatiile aferente unei echipe din clasament
     */
    returneazaContinutulCorpuluiDeTabel() {
        return [ 
            ["CS Dinamo București",14,14,0,0,524,390,134,7,0,7,0,21,21,42],
            ["CS Minaur Baia Mare",14,10,2,2,443,395,48,5,1,5,1,16,16,32],
            ["CSM Constanta",13,10,1,2,382,333,49,5,1,5,0,16,15,31],
            ["CSM București",14,8,2,4,401,380,21,4,1,4,1,13,13,26],
            ["AHC Potaissa Turda",13,7,2,4,448,411,37,4,1,3,1,13,10,23],
            ["ACS HC Buzău 2012",14,7,2,5,436,426,10,6,0,1,2,18,5,23],
            ["CSM Bacău",13,5,3,5,377,403,-26,2,2,3,1,8,10,18],
            ["CSM Focșani 2007",13,5,2,6,364,394,-30,3,1,2,1,10,7,17],
            ["CSU din Suceava",13,5,0,8,411,453,-42,3,0,2,0,9,6,15],
            ["CSA Steaua București",13,3,2,8,373,400,-27,1,2,2,0,5,6,11],
            ["SCM Politehnica Timișoara",13,3,2,8,337,380,-43,3,1,0,1,10,1,11],
            ["CSM Sighisoara",13,3,0,10,328,368,-40,1,0,2,0,3,6,9],
            ["CS Universitatea Cluj",13,2,1,10,380,429,-49,2,0,0,1,6,1,7],
            ["CSM Vaslui",13,1,1,11,358,400,-42,0,0,1,1,0,4,4]
        ];
    }

    /**
     * @description preia numele campurilor, precum si inregistrarile tabelului clasament si populeaza tabelul clasament
     */
    populeazaTabelulClasament() {
        let referintaTabel = shadow.querySelector(".tabel-clasament");

        let capDeTabel = this.returneazaContinutulCapuluiDeTabel();

        let liniiTabel = this.returneazaContinutulCorpuluiDeTabel();

        let tableRow = document.createElement('tr');

        for(let i=0;i<capDeTabel.length;i++) {
            let tableHeader = document.createElement('td');
            tableHeader.innerText = capDeTabel[i][0];
            tableHeader.setAttribute('title',capDeTabel[i][1]);

            tableRow.appendChild(tableHeader);
        }

        let thead = document.createElement('thead');
        thead.appendChild(tableRow);
        referintaTabel.appendChild(thead);

        let tbody = document.createElement('tbody');

        for(let i=0;i<liniiTabel.length;i++) {
            tableRow = document.createElement('tr');

            let tableRowData = liniiTabel[i];

            tableRow.innerHTML = `<td>${i+1}</td>`;

            for(let j=0;j<tableRowData.length;j++) {
                let tableData = document.createElement('td');
                tableData.innerText = tableRowData[j];

                tableRow.appendChild(tableData);
            }

            tbody.appendChild(tableRow);
        }

        referintaTabel.appendChild(tbody);
    }

    connectedCallback() {
        this.populeazaTabelulClasament();
    }
}
  
customElements.define('componenta-clasament', ComponentaClasament);

/*const queryParams = {
    nameSearch: 'value1',
    param2: 'value2'
  };

fetch('https://localhost:7260/api/getPlayers?nameSearch=Ionescu&columnToSort=0&pageNumber=1&pageSize=10',{
    method: 'GET',	
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
    mode: 'no-cors'
})
.then(function (response) {
    if(response.ok) {
        return response.json();
    }else {
        return Promise.reject(response);
    }
}).then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log('Error: ',err)
});*/