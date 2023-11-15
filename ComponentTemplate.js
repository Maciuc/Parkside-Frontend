class PanouStiri extends HTMLElement {
    render()
    {
        this.shadowRoot.innerHTML = `
            <style>
                
            </style>
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
  
customElements.define('panou-stiri', PanouStiri);