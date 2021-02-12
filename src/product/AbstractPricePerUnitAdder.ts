import { getQuantityDescriptor, isPriceEligeableForCalculation } from "../price";
import { PricePerUnitAdder } from "./PricePerUnitAdder";
import { PricePerUnitDescriptor } from "../calculation/PricePerUnitDescriptor";

export const PRICE_PER_UNIT_CLASS = "utkonos-assistant-price-per-unit";

export abstract class AbstractPricePerUnitAdder implements PricePerUnitAdder {
  protected abstract getProductName(element: HTMLElement): string;

  protected abstract getProductPrice(element: HTMLElement): string;

  protected abstract setPricePerUnit(element: HTMLElement, pricePerUnitDescriptor: PricePerUnitDescriptor): void;

  protected createPricePerUnitContainer(pricePerUnitDescriptor: PricePerUnitDescriptor): HTMLElement {
    const pricePerUnitContainer = document.createElement("span");
    pricePerUnitContainer.classList.add(PRICE_PER_UNIT_CLASS);
    pricePerUnitContainer.title = pricePerUnitDescriptor.describe();
    pricePerUnitContainer.textContent = pricePerUnitDescriptor.pricePerUnitText();
    return pricePerUnitContainer;
  }

  matches(element: HTMLElement): boolean {
    return element.querySelector(`.${PRICE_PER_UNIT_CLASS}`) == null;
  }

  handle(element: HTMLElement): void {
    const priceText = this.getProductPrice(element);
    const nameText = this.getProductName(element);
    const isPriceEligiable = isPriceEligeableForCalculation(priceText);
    const quantityDescriptor = getQuantityDescriptor(nameText);
    if (isPriceEligiable && quantityDescriptor != null) {
      const pricePerUnitDescriptor = new PricePerUnitDescriptor(priceText, quantityDescriptor);
      this.setPricePerUnit(element, pricePerUnitDescriptor);
    }
  }
}
