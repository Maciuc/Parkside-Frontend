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
                    font-size: 3rem;
                }
            </style>

            <meniu-principal>
            </meniu-principal>
            <div class="content">
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

    connectedCallback() {
        let content = shadow.querySelector(".content");

        const id = new URLSearchParams(window.location.search).get('id');

        if(id!==null && id!=='') {
            content.innerHTML = `Informatii despre persoana cu id-ul ${id}`;
        }
        else {
            window.history.go(-1);//return to previous page
        }
    }
}
  
customElements.define('informatii-personal', InformatiiPersonal);