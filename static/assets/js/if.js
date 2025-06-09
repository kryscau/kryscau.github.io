const urlParams = new URLSearchParams(window.location.search);
const onLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const devNoJS = onLocalhost && urlParams.has('nojs');

// Default: JS is considered disabled if script does not run
window.jsEnabled = false;

document.addEventListener('DOMContentLoaded', () => {
	const noJS = document.querySelector('.no-js');
	const withJS = document.querySelector('.with-js');

	if (devNoJS) {
		console.log('[ifJS] 🛠️ DevMode ON (simulating no-JS locally)');

		// Hide JS-dependent content
		if (withJS) withJS.style.display = 'none';

		// Preview: inject <noscript> from <head> (e.g. CSS fallback)
		const noscriptHead = document.querySelector('head > noscript');
		if (noscriptHead) {
			const headNoscriptDiv = document.createElement('div');
			headNoscriptDiv.className = 'dev-noscript-head-preview';
			headNoscriptDiv.innerHTML = noscriptHead.textContent.trim();
			document.head.append(headNoscriptDiv);
			console.log('[ifJS] Injected <noscript> from <head>');
		}

		// Preview: inject <noscript.no-js> from body (HTML fallback)
		const noscriptBody = document.querySelector('body > noscript.no-js');
		if (noscriptBody) {
			const bodyNoscriptDiv = document.createElement('div');
			bodyNoscriptDiv.className = 'dev-noscript-body-preview';
			bodyNoscriptDiv.innerHTML = noscriptBody.textContent.trim();
			document.body.prepend(bodyNoscriptDiv);
			console.log('[ifJS] Injected <noscript.no-js> from <body>');
		}

		// Simulated JS-disabled state
		window.jsEnabled = false;
		return;
	}

	// Normal case: JS is enabled
	if (noJS) noJS.style.display = 'none';
	if (withJS) withJS.style.display = 'contents';
	window.jsEnabled = true;

	console.log('[ifJS] ✅ JS is enabled in the browser');
});
