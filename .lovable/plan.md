# Editable site details and enquiry package tracking

## Goal
Keep the current Selva Captures design and flows unchanged while updating the business number and adding focused admin controls for contact details, packages, prices, and gallery images.

## Changes
- Replace the displayed phone and WhatsApp number everywhere with `+91 9344160526`, including all call and WhatsApp links.
- Add Lovable Cloud tables for:
  - Public site settings: contact number and WhatsApp number.
  - Public package entries: existing names, prices, order, and crossed-out original price.
  - Public gallery entries: uploaded image URL, description, and display order.
- Keep public read access limited to these non-sensitive site settings. Restrict all create, update, and delete actions to authenticated admins through existing role checks.
- Add a secure gallery storage bucket so admins can upload replacement images from the dashboard while visitors can only view them.
- Seed the editable records from the current contact details, package list, and gallery images so the website looks unchanged immediately after deployment.
- Update public pages to read editable contact, package, and gallery data, with current built-in values as safe fallbacks if loading fails.
- Extend the existing enquiry form with a package selector while retaining the existing service field and all current fields.
- Store the selected package permanently with each enquiry.
- Extend the existing admin dashboard with three simple sections:
  - Contact details: phone and WhatsApp numbers.
  - Packages: package name, price, and optional crossed-out price.
  - Gallery: upload, replace, reorder, and remove images.
- Keep the current enquiry list and edit/delete controls, and clearly show customer name, phone, event date, event type, selected package, and message.

## Security and compatibility
- Preserve the existing admin login and role model.
- Keep customer enquiries private to admins; anonymous visitors retain insert-only access.
- Use row-level database policies and explicit grants for every new table.
- Do not expose private keys or introduce customer accounts, payments, or unrelated dashboard features.

## Verification
- Confirm public contact links use the new number.
- Submit a test enquiry and verify the selected package appears in the admin dashboard.
- Verify an admin can update contact details and packages, upload/change gallery images, and see changes on public pages.
- Check desktop and mobile layouts, build status, and browser errors.
