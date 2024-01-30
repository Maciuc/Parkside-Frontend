import MeniuPrincipal from "../MeniuPrincipal.js";
import SubsolPrincipal from "../SubsolPrincipal.js";
import {backendServerAddress } from "../index.js";

let shadow;

class ComponentaClasament extends HTMLElement {
    render()
    {
        shadow.innerHTML = `
            <style>
                .clasament {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    margin: 2rem 7.5%;
                    overflow-x: auto;
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
        return new Promise((resolve, reject) => {
            new Promise((resolve) => {
                fetch(backendServerAddress + "api/Ranking/updateRankings", {
                    method: "PUT"
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }  

                    return;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                })
                .then(() => {
                    resolve();
                });
            })
            .then(() => {
                fetch(backendServerAddress + "api/Ranking/getRankings")
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

        });
    }

    /**
     * @description preia numele campurilor, precum si inregistrarile tabelului clasament si populeaza tabelul clasament
     */
    populeazaTabelulClasament() {
        this.returneazaContinutulCorpuluiDeTabel()
        .then(liniiTabel => {
            let referintaTabel = shadow.querySelector(".tabel-clasament");

            let capDeTabel = this.returneazaContinutulCapuluiDeTabel();

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

            const keys = Object.keys(liniiTabel[0]);

            for(let i=0;i<liniiTabel.length;i++) {
                tableRow = document.createElement('tr');

                let tableRowData = liniiTabel[i];

                for(let j=0;j<keys.length;j++) {
                    let tableData = document.createElement('td');
                    tableData.innerText = tableRowData[keys[j]];

                    tableRow.appendChild(tableData);
                }

                tbody.appendChild(tableRow);
            }

            referintaTabel.appendChild(tbody);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    connectedCallback() {
        this.populeazaTabelulClasament();
    }
}
  
customElements.define('componenta-clasament', ComponentaClasament);