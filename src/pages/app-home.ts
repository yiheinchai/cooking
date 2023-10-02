import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {
  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = "Yi Hein's recipies!";

  static get styles() {
    return [
      styles,
      css`
        #welcomeBar {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        #welcomeCard,
        #infoCard {
          padding: 18px;
          padding-top: 0px;
        }

        sl-card::part(footer) {
          display: flex;
          justify-content: flex-end;
        }

        @media (min-width: 750px) {
          sl-card {
            width: 70vw;
          }
        }

        @media (horizontal-viewport-segments: 2) {
          #welcomeBar {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
          }

          #welcomeCard {
            margin-right: 64px;
          }
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    console.log('This is your home page');
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: "Yi Hein's recipes",
        text: "Check out Yi Hein's recipes!",
        url: 'https://github.com/yiheinchai/cook',
      });
    }
  }

  render() {
    return html`
      <app-header></app-header>

      <main>
        <div id="welcomeBar">
          <sl-card id="welcomeCard">
            <div slot="header">
              <h2>${this.message}</h2>
            </div>

            <sl-tab-group>
              <sl-tab slot="nav" panel="chicken rice">Chicken rice</sl-tab>
              <sl-tab slot="nav" panel="kung pao chicken"
                >Kung pao chicken</sl-tab
              >
              <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
              <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

              <sl-tab-panel name="chicken rice"
                ><iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/5Zdklg2CgPk?si=lh5iJJFn8dfqyrei"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe
              ></sl-tab-panel>
              <sl-tab-panel name="kung pao chicken"
                ><iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/QqdcCHQlOe0?si=PXO0LQfOQ8nLAdt0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe
              ></sl-tab-panel>
              <sl-tab-panel name="advanced"
                >This is the advanced tab panel.</sl-tab-panel
              >
              <sl-tab-panel name="disabled"
                >This is a disabled tab panel.</sl-tab-panel
              >
            </sl-tab-group>

            ${'share' in navigator
              ? html`<sl-button
                  slot="footer"
                  variant="primary"
                  @click="${this.share}"
                  >Share this recipe!</sl-button
                >`
              : null}
          </sl-card>

          <sl-button href="${resolveRouterPath('about')}" variant="primary"
            >About</sl-button
          >
        </div>
      </main>
    `;
  }
}

