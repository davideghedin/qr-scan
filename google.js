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

const webAppUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRehVbW704F9njWYTtCosZSCsVCorlgevGbm8wsSOU8Z_7kK-1a8MUKFHwcPOxtqpxmipaGj71_r07M/pubhtml?gid=1156890236&amp;single=true&amp;widget=true&amp;headers=false"; // Incolla qui l'URL di Google

function getLastRecord() {

    fetch(webAppUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData
    }
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
}
