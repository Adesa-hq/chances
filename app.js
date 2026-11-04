const accessPage = location.pathname.endsWith('/early-access.html');
if (accessPage) {
  document.body.classList.add('access-view');
  document.title = 'Get early access — CHANCES';
  document.querySelector('#landing-content').hidden = true;
  document.querySelector('#access-content').hidden = false;
}
const mount = document.querySelector(accessPage ? '#access-form-mount' : '#form-mount');
const field = (name, label, type = 'text', required = false, autocomplete = '') => `<label class="field" for="${name}">${label}<input id="${name}" name="${name}" type="${type}" ${required ? 'required' : ''} ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${type === 'tel' ? 'pattern="[+0-9() .-]{7,20}" title="Enter a valid phone number (7–20 characters)."' : ''}></label>`;
mount.innerHTML = `<form class="signup-form"><h3>Get on the list</h3><div class="form-grid">${field('firstName', accessPage ? 'First name *' : 'First name *', 'text', true, 'given-name')}${field('phone', accessPage ? 'Phone Number *' : 'Phone number *', 'tel', true, 'tel')}${field('email', accessPage ? 'Email *' : 'Email (optional)', 'email', accessPage, 'email')}${field('state', accessPage ? 'State (Optional)' : 'State *', 'text', !accessPage, 'address-level1')}${accessPage ? '' : field('employment', 'Employment Status') + field('alternativePhone', 'Alternative Number', 'tel')}</div><div class="consents"><label class="check"><input type="checkbox" name="adult" required><span>I am 18 or older.</span></label><label class="check"><input type="checkbox" name="consent" required><span>I agree to be contacted about CHANCES and to how my details are used.</span></label></div><button type="submit" class="submit">Count me in</button><p class="form-status" role="status" aria-live="polite"></p></form>`;
mount.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const status = form.querySelector('.form-status');
  try {
    const entry = Object.fromEntries(new FormData(form));
    entry.savedAt = new Date().toISOString();
    localStorage.setItem('chances-early-access-draft', JSON.stringify(entry));
    status.textContent = 'Your details have been saved on this device only. Online registration is not connected yet; you have not been added to the early-access list.';
  } catch {
    status.textContent = 'Your browser could not save your details. Online registration is not connected yet. Please try again later.';
  }
});
const dialog = document.querySelector('#info-dialog');
const content = {
  privacy: ['Privacy Policy', 'This preview stores form details only in this browser on this device. No registration details are sent to a server. The official CHANCES privacy policy must be provided before online registration launches.'],
  terms: ['Terms & Conditions', 'CHANCES is for adults aged 18 and older. Joining the early-access list is free. Official participation rules and terms will be provided before launch.'],
  contact: ['Contact', 'Official CHANCES contact details will be available here before launch.']
};
document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
  const [title, body] = content[button.dataset.dialog];
  dialog.querySelector('h2').textContent = title;
  dialog.querySelector('p').textContent = body;
  dialog.showModal();
}));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
