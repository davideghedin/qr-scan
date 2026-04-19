

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
