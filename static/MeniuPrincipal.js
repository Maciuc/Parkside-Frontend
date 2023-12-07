import {font_family_default,border_radius_default} from "./index.js";

class MeniuPrincipal extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .meniu {
                    z-index: 1;
                    display: flex;
                    position: sticky;
                    top: 0px;
                    left: 0px;
                    margin-top: 0.5rem;
                    background-color: white;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-around;
                    height: 7rem;
                    width: 100%;
                    border-bottom: 0.5rem solid #F9C74F;
                }

                .logo {
                    display: flex;
                    width: 15%;
                    height: 90%;
                    justify-content: center;
                }

                .logo > a {
                    display: flex;
                }

                .meniu-stanga, .meniu-dreapta {
                    width: 40%;
                    height: 55%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .meniu-stanga > a, .meniu-dreapta > a{
                    display: flex;
                    background-color: #F9C74F;
                    text-decoration: none;
                    border-radius: ${border_radius_default};
                    width: 30%;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: black;
                    font-size: 1.5rem;
                    font-family: ${font_family_default};
                }      
                
                .meniu a:hover{
                    background-color: #36486B;
                    color: white;
                }
            </style>

            <div class="meniu">
                <div class="meniu-stanga">
                    <a href="/static/PaginaInformatiiEchipa/InformatiiEchipa.html">Echipa</a>
                    <a href="">Calendar</a>
                    <a href="">Clasament</a>
                </div>
                
                <div class="logo">
                    <a href="../../templates/index.html">
                        <img src="/static/Images/logo.png" alt="Logo">
                    </a>
                </div>

                <div class="meniu-dreapta">
                    <a href="../../static/PaginaStiri/Stiri.html">Stiri</a>
                    <a href="">Istorie</a>
                    <a href="../../templates/start.html">Login</a>
                </div>
            </div>    
        `;
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.render();
    }

    connectedCallback() {
        
    }
  }
  
  customElements.define('meniu-principal', MeniuPrincipal);

  export default MeniuPrincipal;