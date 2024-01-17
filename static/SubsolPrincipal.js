import { font_family_default, border_radius_default } from "./index.js";

class SubsolPrincipal extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                .panou {
                    font-family: ${font_family_default};
                    background-color: white;
                }

                .title {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    color: black;
                    font-size: 3rem;
                    padding: 2rem;
                }

                button {
                    border-radius: 1rem;
                    padding: 1rem 1.5rem;
                    bisplay: block;
                    width: fit-content;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }

                .button-inapoi-sus {
                    padding: 0.5rem 1rem;
                    border-radius: 0.75rem;
                    border: 0.25rem solid black;
                    margin-right: 3rem;
                    float: right;
                    background-color: #3E4095;
                    color: white;
                    transition: transform ease-out 0.25s;
                    margin: 2rem 3rem;
                    font-size: 1.5rem;
                }

                .button-inapoi-sus:hover {
                    transform: scale(1.1,1.1);
                }

                .big-separator {
                    margin: 1rem 15rem;
                    height: 0.5rem;
                    background-color: #3E4095;
                    border-radius: 5rem;
                }

                .container-sponsori {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    gap: 2.5rem 5rem;
                    padding: 0 10rem;
                    padding-bottom: 2rem;
                    margin-top: 1rem;
                }

                .container-sponsori img {
                    object-fit: cover; 
                    height: 2rem;
                    transition: transform ease-out 0.5s;
                }

                .container-sponsori img:hover {
                    transform: scale(1.2,1.2);
                }

                .date-contact p {
                    font-size: 1.5rem;
                    margin: 0 4rem;
                }

                .social-media img {
                    object-fit: cover;
                    height: 2rem;
                    transition: transform ease-out 0.5s;
                }

                .social-media img:hover {
                    transform: scale(1.5,1.5);
                }

                .date-contact, .social-media {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                }

                .date-contact {
                    flex-direction: column;
                    margin-bottom: 2rem;
                }

                .social-media {
                    gap: 2rem;
                }

                .date-contact p {
                    margin: 1rem 0;
                }
            </style>

            <div class="panou">
                <div class="big-separator">
                </div>
                <div>
                    <div class="title">
                        <b>SPONSORI ȘI PARTENERI</b>
                    </div>
                    <div class="container-sponsori">
                    </div>
                </div>
               
                <div class="big-separator">
                </div>

                <div>
                    <div class="title">
                        <b>CONTACTEAZĂ-NE</b>
                    </div>
                    <div class="date-contact">
                    </div>
                </div>

                <div class="big-separator">
                </div>

                <div>
                    <div class="title">
                        <b>URMĂNEȘTE-NE PE SOCIAL MEDIA</b>
                    </div>
                    <div class="social-media">
                    </div>
                </div>

                <div class="button-inapoi-sus">
                    ÎNAPOI SUS
                </div>
            </div>
        `;
    }

    goOnTopOfPage() {
        window.scrollTo(0,0);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.render();
    }

    returneazaSponsorii() {
        return [
            ["/static/imagini/sponsori/suceava.png","http://cjsuceava.ro/ro/"],
            ["/static/imagini/sponsori/usv.png","https://usv.ro/"],
            ["/static/imagini/sponsori/celestin.png","https://www.tipografiacelestin.ro/"],
            ["/static/imagini/sponsori/pepenero.jpg","https://pepeneropizza.ro/"],
            ["/static/imagini/sponsori/vivendi.png","https://restaurantvivendi.ro/"],
            ["/static/imagini/sponsori/mihu.jpg","https://mihushop.ro/"],
            ["/static/imagini/sponsori/iuliusmall.png","https://suceava.iuliusmall.com/"],
            ["/static/imagini/sponsori/fiterman-pharma.png","https://www.fitermanpharma.ro/"],
            ["/static/imagini/sponsori/urban.jpg","https://www.urbanstreetfood.ro/"],
            ["/static/imagini/sponsori/expert-music.jpg","https://expertmusic.ro/ro/"]
        ];
    }

    actualizeazaSponsorii() {
        const informatiiSponsori = this.returneazaSponsorii();

        const containerSponsori = this.shadowRoot.querySelector(".container-sponsori");

        for(let i=0;i<informatiiSponsori.length;i++) {
            let informatiiSponsor = informatiiSponsori[i];

            const a = document.createElement("a");
            a.setAttribute("target","_blank");
            a.setAttribute("href",informatiiSponsor[1]);
            a.innerHTML = `<img src="${informatiiSponsor[0]}">`;

            containerSponsori.appendChild(a);
        }
    }

    returneazaDateleDeContact() {
        return {
            Adresa: "str. Universităţii, nr. 13",
            Telefon: "0230 522 819"
        };
    }

    actualizeazaDateleDeContact() {
        const dateContact = this.returneazaDateleDeContact();

        const containerDateContact = this.shadowRoot.querySelector(".date-contact");

        const keys = Object.keys(dateContact);
        for(let i=0;i<keys.length;i++) {
            let key = keys[i];

            containerDateContact.innerHTML += `<p><b>${key}:    </b>${dateContact[key]}</p>`
        }
    }

    returneazaDateleDeSocialMedia() {
        return [
            ["/static/imagini/social-media/facebook.png","https://www.facebook.com/CSUSuceava/?locale=ro_RO"],
            ["/static/imagini/social-media/instagram.png","https://www.instagram.com/csusuceava/?hl=ro"]
        ];
    }

    actualizeazaDateleDeSocialMedia() {
        const dateSocialMedia = this.returneazaDateleDeSocialMedia();

        const containerSocialMedia = this.shadowRoot.querySelector(".social-media");

        for(let i=0;i<dateSocialMedia.length;i++) {
            let socialMedia = dateSocialMedia[i];
            const a = document.createElement("a");
            a.setAttribute("target","_blank");
            a.setAttribute("href",socialMedia[1]);

            a.innerHTML = `<img src="${socialMedia[0]}">`;

            containerSocialMedia.appendChild(a);
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".button-inapoi-sus").addEventListener("click",this.goOnTopOfPage);
    
        this.actualizeazaSponsorii();
        this.actualizeazaDateleDeContact();
        this.actualizeazaDateleDeSocialMedia();
    }
}
  
customElements.define('subsol-principal', SubsolPrincipal);

export default SubsolPrincipal;