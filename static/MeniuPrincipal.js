import {font_family_default} from "./index.js";

class MeniuPrincipal extends HTMLElement {

    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .container-meniu {
                    z-index: 1;
                    position: sticky;
                    top: 0px;
                    left: 0px;
                    transition: top linear 0.5s;
                    background-color: white;
                }

                .meniu {
                    display: flex;
                    justify-content: space-around;
                    background-color: white;
                    flex-direction: row;
                    align-items: center;
                    height: 5rem;
                    box-shadow: 0px 2px 0.5rem grey;
                    margin-bottom: 5px;
                }

                .logo {
                    display: flex;
                    height: 90%;
                    justify-content: center;
                    margin-left: 1rem;
                }

                .logo > a {
                    display: flex;
                }

                .meniu-a {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .meniu-a a{
                    background-color: white;
                    text-decoration: none;
                    height: 100%;
                    color: #3E4095;
                    font-size: 1.8rem;
                    font-family: ${font_family_default};
                    display: flex;
                    flex-direction: row;
                    margin: 1rem;
                    padding: 0.5rem 1rem;
                }      
                
                .meniu-a a:hover{
                    border-bottom: 0.5rem solid #3E4095;
                }

                .logo:hover {
                    height: 98%;
                }
            </style>

            <div class="container-meniu">
                <div class="meniu">
                    <div class="logo">
                        <a href="/acasa.html">
                            <img src="/static/imagini/logo.png" alt="Logo">
                        </a>
                    </div>
                    <div class="meniu-a">
                        <a href="/static/echipa/echipa.html">Echipa</a>
                        <a href="/static/meciuri/meciuri.html">Meciuri</a>
                        <a href="/static/clasament/clasament.html">Clasament</a>
                        <a href="/static/PaginaStiri/Stiri.html">Stiri</a>
                        <a href="/static/istorie/istorie.html">Istorie</a>
                        <a href="/static/logare/signup.html">Login</a>
                    </div>
                </div>
                <slot>
                </slot>
            </div>    
        `;
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.render();
    }

    /**
     * @description la defilarea paginii in sus meniul este ascuns, la defilarea paginii in jos, meniul este afisat
     */
    adaugaRutinaDeTratareAEvenimentuluiDeDefilareAPaginii() {
        window.addEventListener ("wheel",(WheelEvent) => {
            let referintContaineraMeniu = this.shadowRoot.querySelector(".container-meniu");

            if(WheelEvent.deltaY > 0) {
                referintContaineraMeniu.style.top = '-5.5rem';
            }
            else {
                referintContaineraMeniu.style.top = '0rem';
            }
        });
    }

    connectedCallback() {
        this.adaugaRutinaDeTratareAEvenimentuluiDeDefilareAPaginii();
    }
  }
  
  customElements.define('meniu-principal', MeniuPrincipal);

  export default MeniuPrincipal;