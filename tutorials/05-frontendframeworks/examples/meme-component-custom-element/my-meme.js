(function() {

    // we inherit HTMLElement to create our own HTML element
    class MyMeme extends HTMLElement {

        // connectedCallback() fires when the element is inserted into the DOM
        connectedCallback() {
            this.attachShadow({mode: 'open'});
            // Import the shared template
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            // Cache the paragraph and image elements
            this.captionTopParagraph = this.shadowRoot.querySelector('p.captionTop');
            this.captionBottomParagraph = this.shadowRoot.querySelector('p.captionBottom');
            this.imageElement = this.shadowRoot.querySelector('img');

            // Checks for attribute values initially
            if (this.hasAttribute('captionTop')) {
                var captionTop = this.getAttribute('captionTop');
                this.setCaptionTop(captionTop);
            }
            if(this.hasAttribute('captionBottom')) {
                var captionBottom = this.getAttribute('captionBottom');
                this.setCaptionBottom(captionBottom);
            }
            if(this.hasAttribute('memeTemplateUrl')) {
                var memeTemplateUrl = this.getAttribute('memeTemplateUrl');
                this.setMemeTemplateUrl(memeTemplateUrl);
            }
        }

        // attributeChangedCallback() is called when any of the attributes in the observedAttributes array are changed
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'captionTop':
                    this.setCaptionTop(newValue);
                    break;
                case 'captionBottom':
                    this.setCaptionBottom(newValue);
                    break;
                case 'memeTemplateUrl':
                    this.setMemeTemplateUrl(newValue);
                    break;
            }
        }

        setCaptionTop(val) {
            this.captionTop = val;
            this.captionTopParagraph.textContent = this.captionTop;
        };
        setCaptionBottom(val) {
            this.captionBottom = val;
            this.captionBottomParagraph.textContent = this.captionBottom;
        };
        setMemeTemplateUrl(val) {
            this.memeTemplateUrl = val;
            this.imageElement.src = this.memeTemplateUrl;
        };

    }

    // To avoid invoking the parser with `.innerHTML` for every new instance, a
    // template for the contents of the shadow DOM is shared by all
    // <my-meme> instances.
    const template = document.createElement('template');
    template.innerHTML = `        
        <img src=""/>    
        <p class="caption captionTop"></p>
        <p class="caption captionBottom"></p> 
        <style>
            .caption{
                position: absolute;
                z-index: 1000;
                font-weight: bold;
                color: white;
                font-size: xx-large;
                left: 0px;
                width:100%;
                text-align: center;
                font-family: "Arial Black";
            }
            .captionTop{
                top: 10px;
            }
            .captionBottom{
                bottom: 10px;
            }
            img {
                width: 100%;
            }
            :host{  /* This references the DOM node of your component, here my-meme */
                width:500px;
                height:auto;
                display: block;
                overflow: hidden;
                position: relative;
            }
        </style>`;

    // register the new component in the web browser
    window.customElements.define('my-meme', MyMeme);

})();
