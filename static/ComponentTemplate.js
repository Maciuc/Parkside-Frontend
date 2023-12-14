let shadow;

class PanouStiri extends HTMLElement {
    render()
    {
        shadow.innerHTML = `
            <style>
                
            </style>
        `;
    }

    constructor() {
        super();
        shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    connectedCallback() {
    }
}
  
customElements.define('panou-stiri', PanouStiri);