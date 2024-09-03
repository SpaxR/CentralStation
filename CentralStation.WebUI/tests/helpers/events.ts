export function click(element: HTMLElement){
  element.click();
  element.dispatchEvent(new Event('click'));
}

export function input(element: HTMLInputElement, value: string){
  element.value = value;
  element.dispatchEvent(new Event('input'));
}
