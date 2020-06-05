# Redirection Rules
1. `nolanoshea.com` will load resources from the JSONresume service. 200 status code makes this a **rewrite**, so the browser's address bar still displays `nolanoshea.com`
2. This rule fixed a bug with the email button. JSONresume uses a slightly different path for these assets, so the proxy needs to account for that.
3. `nolanoshea.com/garbage` will now redirect to nolanoshea.com removing the garbage from the address bar, for clean, pretty urls.
