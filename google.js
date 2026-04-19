const FORM_ID = "1FAIpQLSeV-QY4T_a2E07ChO0i4emFPICWW8vhhB2T0j5hZGsRa6y8JA";
const ENTRY_ID = "entry.622568697"; 

function inviaAGoogleForms(valoreQR) {
    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    const formData = new FormData();
    formData.append(ENTRY_ID, valoreQR);

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    document.getElementById("status").innerText =
      "QR letto e inviato correttamente ✅";
}    

const webAppUrl = "URL_DELLA_TUA_WEB_APP_QUI"; // Incolla qui l'URL di Google

function getLastRecord() {

fetch(webAppUrl)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            document.getElementById('output').innerText = data.error;
        } else {
            // Unisce i valori delle colonne con un separatore
            document.getElementById('output').innerText = data.join(" | ");
        }
    })
    .catch(err => {
        console.error(err);
        document.getElementById('output').innerText = "Errore di connessione";
    });
