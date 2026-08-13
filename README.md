# Purelane Shopify Homepage

Shopify theme implementation created for the Troopod AI Product Engineer assignment.

Built on **Shopify Dawn 16.0.0** and converted from the supplied static HTML prototype into configurable Shopify theme sections.

## Live Implementation

- Shopify development store: to be added before submission
- GitHub: https://github.com/abhayjavaregowda/troopod-purelane

## Implemented Sections

1. Purelane Hero
2. Reviews Rail
3. Best Selling Combos
4. Bundle Tiers
5. Product Grid

Each section can be managed independently from the Shopify Theme Editor.

## Shopify Integration

The static prototype was adapted to use real Shopify data instead of hardcoded product information.

Implemented:

- Shopify product objects
- Product images
- Product and compare-at pricing
- Product availability
- Available variants
- Add to Cart functionality
- Configurable product selectors
- Configurable fallback collections
- Merchant-editable section settings and blocks

## Hero

The hero includes:

- 1 / 2 / 3 product presentation states
- Automatic rotation
- Manual navigation dots
- Real Shopify product imagery and pricing
- Compare-at price and savings
- Merchant-configurable products
- Fallback collection support
- Reduced-motion support

## Best Selling Combos

Combo cards are implemented as configurable Shopify blocks.

Merchants can control:

- Products shown in each combo
- Product benefit labels
- Card copy
- Pricing text
- CTA configuration

The combo rail supports horizontal scrolling on smaller screens.

## Bundle Tiers

The Starter, Most Popular and Whole Home tiers support merchant-selected Shopify products and configurable tier content.

No fake custom bundle checkout logic was introduced. Bundle CTAs remain configurable so they can be connected to an appropriate bundle/product flow.

## Product Grid

The product grid uses products from a configurable Shopify collection.

It handles:

- Available products
- Sold-out products
- Compare-at pricing
- Add to Cart
- Long product titles
- Products without featured images
- Responsive card layouts

Test data intentionally includes:

- A sold-out product
- A product with no image
- A product with a long title

## Responsive Design

The homepage was tested at:

- 1440px
- 1024px
- 768px
- 375px

The layout adapts across desktop, tablet and mobile while horizontal rails remain swipeable where intended.

## Accessibility

Implementation includes:

- Semantic controls
- Accessible labels
- Keyboard-friendly interactions
- Reduced-motion handling using `prefers-reduced-motion`
- Image alt text sourced from Shopify product data where available

## Changes From The Static Prototype

The supplied HTML prototype was tightly coupled to one page and contained hardcoded product information and interactions.

For Shopify, I converted the design into reusable sections with:

- Shopify schema settings
- Theme Editor blocks
- Shopify product and collection objects
- Section-scoped styling
- Shopify-compatible Add to Cart behavior
- Responsive and reduced-motion handling

This allows merchants to add, remove, reorder and configure sections without editing source code.

## Tradeoffs

- Custom multi-product bundle checkout logic was intentionally not implemented because the prototype does not define a real bundle product/discount model.
- Bundle and combo CTAs are configurable links so they can be connected to the merchant's preferred bundle flow.
- Product imagery in the development store was prepared specifically to demonstrate the storefront presentation and edge cases.

## AI Usage

I used ChatGPT and Codex to accelerate implementation, troubleshoot Liquid/CSS issues, debug responsive behavior and iterate on visual fidelity.

I reviewed the generated changes, configured the Shopify products and Theme Editor data, tested the storefront across breakpoints, debugged integration issues and made the final implementation decisions.

AI-assisted product mockups were also used for presentation in the development store.

## Validation

The custom Purelane implementation passes Shopify Theme Check without blocking errors.

Remaining warning-level results originate from unchanged Dawn core files.