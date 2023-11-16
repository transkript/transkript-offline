import {Injectable, Renderer2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintReceiptService {

  constructor() { }

  document( renderer: Renderer2) {
    const html = `
    <h1>Hello, World!</h1>

    <p *ngFor="let i of [1, 2]">This is some HTML content. {{i}}</p>
    `;

    // Create a temporary div element
    const tempDiv = renderer.createElement('div');

    // Set the innerHTML of the div with your HTML source
    renderer.setProperty(tempDiv, 'innerHTML', html);

    // Retrieve the rendered HTML as a string
    const renderedHtml = tempDiv.innerHTML;
console.log(renderedHtml)
    return renderedHtml // Output the rendered HTML st
  }
}
