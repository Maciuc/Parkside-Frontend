import MeniuPrincipal from "../MeniuPrincipal.js";
import SubsolPrincipal from "../SubsolPrincipal.js";

let shadow;

class Istorie extends HTMLElement {
    render()
    {
        shadow.innerHTML = `
            <style>
                .componenta {
                    margin: 2rem 10%;
                    display: flex;
                    justify-content: center;
                }
                .Viziune
                {
                    background-color: white;
                    padding: 20px;
                    margin-top: 170px;
                    margin-left: 20px;
                    margin-right: 20px;
                }

                .Istorie
                {
                    background-color: white;
                    padding: 20px;
                    margin-top: 20px;
                    margin-left: 20px;
                    margin-right: 20px;
                }

                .Trofee
                {
                    background-color: white;
                    padding: 20px;
                    margin-top: 20px;
                    margin-left: 20px;
                    margin-right: 20px;
                    margin-bottom: 20px;
                }
                .tab {
                    margin-block-start: 1em;
                    margin-left: 50px; 
                    margin-right: 50px;
                    tab-size: 4;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
            </style>

            <meniu-principal>
            </meniu-principal>
            <div class="componenta">
                <div class="Viziune">
                    <h2>Viziune</h2>
                     <p class="tab">&ensp; &ensp; &ensp; &ensp;Scopul principal al CLUBULUI SPORTIV UNIVERSITATEA DIN SUCEAVA este de a organiza şi desfăşura activităţi sportive de performanţă şi de masă cu studenţii, cadrele didactice şi alte categorii de personal din Universitatea “Ştefan cel Mare” Suceava, precum şi cu alte categorii de cetăţeni care respectă statutul clubului.</p>
                     <p class="tab">&ensp; &ensp; &ensp; &ensp;CSU Suceava (Clubul Sportiv Universitar din Suceava) este o echipă de handbal din municipiul Suceava, România. Cea mai mare performanță a echipei este accederea în finala Cupei Challenge, pierdută în fața echipei CS UCM Reșița. În competițiile interne, CSU Suceava a câștigat medalia de bronz în Liga Națională, în sezonul 2010-2011, s-a clasat pe locul III în Cupa României, în sezonul 2022-2023.</p>
                </div> 
        
                <div class="Istorie">
                    <h2>Istorie</h2>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;CSU Suceava participă în prima ligă de handbal masculin a României, Liga Zimbrilor. De-a lungul istoriei sale, formația suceveană a avut performanțe remarcabile pe plan național și internațional, cum ar fi calificarea în finala Challenge Cup, în sezonul 2008-2009, câștigarea medaliei de bronz în Liga Națională, în sezonul 2010-2011, și clasarea pe locul III în Cupa României, în sezonul 2022-2023. În 2023, CSU Suceava a câștigat titlul de campioană europeană universitară pentru a treia oară, repetând performanța din 2017, înregistrată la Malaga (Spania), și pe cea din anul 2022, înregistrată la Lotz (Polonia). În anul 2018, jucătorii noștri au cucerit medaliile de bronz, la finalul campionatului de la Coimbra (Portugalia).</p> 

                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;CSU Suceava se remarcă în fiecare an prin performanțe deosebite la toate categoriile de vârstă. În sezonul 2022-2023 ne-am reconfirmat statutul de cel mai puternic centru de copii și juniori din handbalul masculin românesc, prin câștigarea campionatelor naționale de juniori I și juniori II. De altfel, handbaliștii suceveni sunt majoritari în loturile naționale de tineret și juniori ale României.</p>
                        
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;Primăria Municipiului Suceava și Universitatea "Ștefan cel Mare" Suceava sunt finanțatorii principali ai clubului CSU Suceava. Încercăm să răsplătim sprijinul comunității locale printr-un joc spectaculos. Mediatizarea intensă în presa locală și națională, faptul că televiziunile naționale aleg de multe ori să transmită în direct meciurile noastre și atmosfera incendiară atunci când jucăm acasă ne confirmă că suntem pe direcția cea bună. Odată cu finalizarea viitoarei săli polivalente a Sucevei, cu 5.000 de locuri, suntem convinși că fenomenul CSU Suceava va căpăta o amploare și mai mare, iar handbalul va deveni sportul numărul 1 în județul Suceava.</p>
                        
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;- 1959 – Echipa de handbal masculin, Victoria Suceava, devine campioana regiunii Suceava.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;- 1972 – 1981 – Echipa de handbal masculin CSU Suceava activează în Campionatul Naţional, divizia B, fiind antrenată de lectorul universitar Pop Şerban.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;- 1976 – 13 iunie – La Suceava se desfăşoară, în aer liber, întâlnirea internaţională de handbal între echipa CSU Suceava şi reprezentativa Republicii Arabe Egipt.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;- 1999 – Echipa de handbal masculin a Liceului cu Program Sportiv Suceava se clasează pe primul loc în finala Campionatului Naţional de Juniori III, antrenori Senciuc Gabriel si Brânduşe Petru.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;- 2001 – Vaslui – Echipa de handbal a Liceului cu Program Sportiv Suceava devine Campioana naţională la juniori. Antrenori: Petru Ghervan şi Dumitru Bernicu.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;- 2002 – se înfiinţează C.S. UNIVERSITATEA SUCEAVA, scopul fiind păstrarea  “acasă” a valorilor sportului sucevean la ramurile de sport care activau în cadrul clubului.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;- 2005 – s-a înfiinţat CLUBUL SPORTIV UNIVERSITATEA DIN SUCEAVA, de drept public, sub tutela Ministerului Educaţiei, Cercetării şi Tineretului, în cadrul căruia funcţionează trei secţii: atletism, handbal, volei.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;Scopul principal al CLUBULUI SPORTIV UNIVERSITATEA DIN SUCEAVA este de a organiza şi desfăşura activităţi sportive de performanţă şi de masă cu studenţii, cadrele didactice şi alte categorii de personal din Universitatea “Ştefan cel Mare” Suceava, precum şi cu alte categorii de cetăţeni care respectă statutul clubului.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;Echipa de handbal masculin Ambro Bucovina, actuala Universitatea Suceava, promovează în Campionatul Ligii Naţionale Universitare. Antrenori : Petru Ghervan si Petru Branduse</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;În trecut a existat Asociaţia Sportivă Universitară (ASU), în cadrul căreia funcţionau trei secţii: atletism, handbal, volei. Sportivii acestor secţii au obţinut performanţe notabile în competiţiile naţionale şi internaţionale.</p>
                    <p class="tab">&ensp; &ensp; &ensp; &ensp;La atletism, sub conducerea antrenorului Barbălată Constantin, s-au obţinut performanţe importante de către următorii sportivi: Doina Beşliu Melinte, Grigoraş Constantin, Ioniţă Ştefan, Jianu Rodica, Codreanu Petru, Cuciureanu Viorica.</p>
                    <p class="tab"> &ensp; &ensp; &ensp; &ensp;La handbal, echipa activa în divizia B, fiind angrenată tot timpul în lupta pentru promovarea în divizia A.</p> 
                    <p class="tab">&ensp; &ensp; &ensp; &ensp;De asemenea, echipa de volei a activat în divizia B.</p>  
                    <p class="tab">&ensp; &ensp; &ensp; &ensp;Prin înfiinţarea în anul 2002 a C.S. UNIVERSITATEA SUCEAVA s-a creat un mediu propice pentru performanţă, scopul fiind de a păstra acasă valorile sportului sucevean la ramurile de sport care activau în cadrul clubului.</p>
                    <p class="tab">&ensp; &ensp; &ensp; &ensp; Din anul 2005 s-a înfiinţat CLUBUL SPORTIV UNIVERSITATEA DIN SUCEAVA, de drept public, sub tutela Ministerului Educaţiei, Cercetării şi Tineretului, în cadrul căruia funcţioneaza trei secţii: atletism, handbal, volei.</p>
                </div>  
                <div class="Trofee">
                    <h2>Trofee</h2> 
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
}

customElements.define('informatii-istorie', Istorie);