import { Component } from "./component";
import { isNodeOrElement, clearElement } from "../utils/dom";
import { TabGuardCtrl, ITabGuard } from "./tabGuardCtrl";

export class TabGuardComp extends Component {

    private eTopGuard: HTMLElement;
    private eBottomGuard: HTMLElement;
    private eFocusableElement: HTMLElement;

    protected tabGuardCtrl: TabGuardCtrl;

    protected initialiseTabGuard(params: {
        focusInnerElement?: (fromBottom: boolean) => void;
        shouldStopEventPropagation?: () => boolean;
        onFocusIn?: (e: FocusEvent) => void;
        onFocusOut?: (e: FocusEvent) => void;
        onTabKeyDown?: (e: KeyboardEvent) => void;
        handleKeyDown?: (e: KeyboardEvent) => void;
    }) {
        this.eTopGuard = this.createTabGuard('top');
        this.eBottomGuard = this.createTabGuard('bottom');
        this.eFocusableElement = this.getFocusableElement();

        const tabGuards = [this.eTopGuard, this.eBottomGuard];

        const compProxy: ITabGuard = {
            setTabIndex: tabIndex => {
                tabGuards.forEach(tabGuard => tabIndex != null ? tabGuard.setAttribute('tabIndex', tabIndex) : tabGuard.removeAttribute('tabIndex'));
            }
        }

        this.addTabGuards(this.eTopGuard, this.eBottomGuard);

        this.tabGuardCtrl = this.createManagedBean(new TabGuardCtrl({
            comp: compProxy,
            eTopGuard: this.eTopGuard,
            eBottomGuard: this.eBottomGuard,
            eFocusableElement: this.eFocusableElement,
            
            onFocusIn: params.onFocusIn,
            onFocusOut: params.onFocusOut,
            focusInnerElement: params.focusInnerElement,
            handleKeyDown: params.handleKeyDown,
            onTabKeyDown: params.onTabKeyDown,
            shouldStopEventPropagation: params.shouldStopEventPropagation
        }));
    }

    private createTabGuard(side: 'top' | 'bottom'): HTMLElement {
        const tabGuard = document.createElement('div');

        tabGuard.classList.add('ag-tab-guard');
        tabGuard.classList.add(`ag-tab-guard-${side}`);
        tabGuard.setAttribute('role', 'presentation');

        return tabGuard;
    }

    private addTabGuards(topTabGuard: HTMLElement, bottomTabGuard: HTMLElement): void {
        this.eFocusableElement.insertAdjacentElement('afterbegin', topTabGuard);
        this.eFocusableElement.insertAdjacentElement('beforeend', bottomTabGuard);
    }

    protected removeAllChildrenExceptTabGuards(): void {
        const tabGuards: [HTMLElement, HTMLElement] = [this.eTopGuard, this.eBottomGuard];
        clearElement(this.getFocusableElement());
        this.addTabGuards(...tabGuards);
    }

    public forceFocusOutOfContainer(): void {
        this.tabGuardCtrl.forceFocusOutOfContainer();
    }

    public appendChild(newChild: HTMLElement | Component, container?: HTMLElement): void {
        if (!isNodeOrElement(newChild)) {
            newChild = (newChild as Component).getGui();
        }

        const { eBottomGuard: bottomTabGuard } = this;

        if (bottomTabGuard) {
            bottomTabGuard.insertAdjacentElement('beforebegin', newChild as HTMLElement);
        } else {
            super.appendChild(newChild, container);
        }
    }
}