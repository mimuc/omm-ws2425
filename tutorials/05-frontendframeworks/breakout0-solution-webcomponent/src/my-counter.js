(function() {

    class MyCounter extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            // Import the shared template to create the slots for tabs and panels.
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            new Controller(this.shadowRoot);
        }

    }

    /**
     * The model holds all data plus accessors and mutators
     */
    var Model = /** @class */ (function () {
        function Model() {
            this.c = 0;
        }
        Model.prototype.notify = function () {
            this.observer(this);
        };
        Object.defineProperty(Model.prototype, "count", {
            /** Current counter value */
            get: function () {
                return this.c;
            },
            enumerable: true,
            configurable: true
        });
        /** Increment the counter */
        Model.prototype.inc = function () {
            this.c++;
            this.notify();
        };
        /** Decrement the counter */
        Model.prototype.dec = function () {
            this.c--;
            this.notify();
        };
        return Model;
    }());
    /**
     * The view manages all interaction with the DOM:
     * - Attaching event listeners
     * - Updating outputs
     */
    var View = /** @class */ (function () {
        function View(initalModel, shadowRoot) {
            this.output = shadowRoot.getElementById('output');
            shadowRoot.getElementById('incBtn').addEventListener('click', function () {
                shadowRoot.dispatchEvent(new Event('increment counter'));
            });
            shadowRoot.getElementById('decBtn').addEventListener('click', function () {
                shadowRoot.dispatchEvent(new Event('decrement counter'));
            });
        }
        View.prototype.update = function (model) {
            this.output.innerText = model.count.toString(10);
        };
        return View;
    }());
    /**
     * The controller is the bridge between model and view,
     * passing around updates and events.
     */
    var Controller = /** @class */ (function () {
        function Controller(shadowRoot) {
            var model = new Model();
            var view = new View(model, shadowRoot);
            model.observer = function (m) { return view.update(m); };
            shadowRoot.addEventListener('increment counter', function () { return model.inc(); });
            shadowRoot.addEventListener('decrement counter', function () { return model.dec(); });
        }
        return Controller;
    }());




    // To avoid invoking the parser with `.innerHTML` for every new instance, a
    // template for the contents of the shadow DOM is shared by all
    // `<howto-tabs>` instances.
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
          .counter {
            display: flex;
            flex-direction: column;
            min-height: 24rem;
            padding: 1rem;
            margin: 1rem;
          
            background-color: #fff;
            box-shadow:
              0 1px 2px rgba(0, 0, 0, .18),
              0 2px 4px rgba(0, 0, 0, .12),
              0 3px 8px rgba(0, 0, 0, .06);
            border-radius: 4px;
          }
          
          .counter-state {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 5rem;
          }
          
          .buttons {
            display: flex;
          }
          
          button {
            flex: 1;
            padding: 1rem;
            margin: 1rem;
          
            background-color: rgb(255, 67, 67);
            color: #fff;
            font-size: 2rem;
            border: none;
            border-radius: 8px;
          }
        </style>
        <div class="counter">
            <span id="output" class="counter-state"></span>
            <div class="buttons">
                <button id="incBtn">+</button>
                <button id="decBtn">-</button>
            </div>
        </div>
      `;

    window.customElements.define('my-counter', MyCounter);

})();
