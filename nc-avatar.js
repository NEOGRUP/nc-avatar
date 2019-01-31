import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-material/paper-material-shared-styles.js';
import '@polymer/paper-styles/shadow.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/default-theme.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {PaperButtonBehavior} from '@polymer/paper-behaviors/paper-button-behavior.js';


class NcAvatar extends mixinBehaviors([PaperButtonBehavior], PolymerElement) {
  static get template() {
    return html`
      <style include="paper-material-shared-styles">
      :host {
        @apply --layout-vertical;
        @apply --layout-center-center;

        /* nc-avatar custom styles */
        @apply --shadow-transition;
        overflow: hidden;

        /* paper-fab default style */
        background: var(--nc-avatar-background, var(--accent-color));
        border-radius: 50%;
        box-sizing: border-box;
        color: var(--text-primary-color);
        cursor: pointer;
        height: var(--nc-avatar-size, 56px);
        min-width: 0;
        outline: none;
        position: relative;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        width: var(--nc-avatar-size, 56px);
        z-index: 0;

        /* NOTE: Both values are needed, since some phones require the value "transparent". */
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;

        @apply --nc-avatar;
      }

      [hidden] {
        display: none !important;
      }

      :host([mini]) {
        width: var(--nc-avatar-mini-size, 40px);
        height: var(--nc-avatar-mini-size, 40px);
        padding: 8px;

        @apply --nc-avatar-mini;
      }

      :host([disabled]) {
        color: var(--nc-avatar-disabled-text, var(--paper-grey-500));
        background: var(--nc-avatar-disabled-background, var(--paper-grey-300));

        @apply --nc-avatar-disabled;
      }

      iron-icon {
        @apply --nc-avatar-iron-icon;
      }

      iron-image {
        position: absolute;
        width: var(--nc-avatar-size, 56px);
        height: var(--nc-avatar-size, 56px);
        top: 0;
      }
      :host([mini]) iron-image {
        width: var(--nc-avatar-mini-size, 40px);
        height: var(--nc-avatar-mini-size, 40px);
      }

      span {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }

      :host(.keyboard-focus) {
        background: var(--nc-avatar-keyboard-focus-background, var(--paper-pink-900));
      }
    </style>

    <iron-icon
      id="icon"
      hidden="{{!_computeIsIconFab(icon, iconSrc, label)}}"
      src="[[iconSrc]]"
      icon="[[icon]]"></iron-icon>
    <iron-image
      src="[[imageSrc]]"
      loaded="{{imageLoaded}}"
      preload
      sizing="[[imageSizing]]"
      fade></iron-image>
    <span hidden$="{{_computeIsIconFab(icon, iconSrc, label)}}">{{label}}</span>
    `;
  }
  static get properties() {
    return {
      imageLoaded: {
        type: Boolean
      },
      iconSrc: {
        type: String,
        value: ""
      },
      icon: {
        type: String,
        value: "social:person-outline"
      },
      imageSrc: {
        type: String
      },
      mini: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      label: {
        type: String,
        observer: "_labelChanged"
      },
      imageSizing: {
        type: String,
        value: "contain"
      }
    };
  }

  _labelChanged() {
    this.setAttribute('aria-label', this.label);
  }

  _computeIsIconFab(icon, src, label) {
    return !label && ((icon.length > 0) || (src.length > 0));
  }
}

window.customElements.define('nc-avatar', NcAvatar);
