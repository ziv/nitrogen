import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import type { Code } from '../components/code';
import { toPng } from './imagify';
import Nitrogen, { nitroDef, nitroForm } from './nitrogen';
import { highlight, init } from './highlight';

@Injectable({providedIn: 'root'})
export class Nitro {
    readonly form = nitroForm(inject(FormBuilder), new Nitrogen());
    readonly formDefinition = nitroDef();
    component!: Code;

    get value() {
        return this.form.value as unknown as Nitrogen;
    }

    constructor() {
    // load the highlighter lib
        init();
    }

    init(component: Code) {
        this.component = component;
        return this;
    }

    highlight() {
        this.assert();
        this.component.el.removeAttribute('data-highlighted');
        highlight(this.component?.el);
    }

    async download() {
        this.assert();
        const {sizing} = this.value.export;
        const node = document.querySelector('.workspace') as HTMLElement;
        const png = await toPng(node, {sizing});
        const link = document.createElement('a');
        link.download = 'nitrogen.png';
        link.href = png;
        document.body.appendChild(link);
        link.click();
    }

    private assert() {
        if (!this.component) {
            throw new Error('There is no code element to highlight. Make sure you put the <nit-code> element');
        }
    }
}
