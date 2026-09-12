# Refine the Selva Captures color theme

## Goal
Keep the website’s current layout, photography, wording, navigation, enquiry flow, and admin functionality unchanged while making the visual system more restrained and cinematic.

## Changes
- Shift light page sections and cards to deep matte charcoal so black/charcoal covers roughly 85–90% of the experience.
- Replace bright yellow-gold and metallic gradients with one muted champagne-gold accent system.
- Use warm ivory for headings and body copy, reserving champagne gold for small labels, rules, borders, prices, icons, active links, and button details.
- Restyle filled gold buttons as restrained champagne accents and refine outlined controls with subtle borders and quieter hover states.
- Harmonize header, footer, service cards, package cards, contact panels, forms, gallery borders, floating WhatsApp button, and admin screens with the same tokens.
- Preserve existing responsive behavior and ensure controls remain readable and easy to tap.

## Technical details
- Update semantic color, gradient, border, surface, and shadow tokens in the global stylesheet.
- Keep existing utility and component class names where possible so structure and functionality do not change.
- Replace the few raw component colors with semantic theme utilities.
- Verify the main public pages and mobile presentation, then confirm the preview has no build or runtime errors.
