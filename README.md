<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Scanner QR Code</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Libreria ufficiale -->
  <script src="https://unpkg.com/html5-qrcode"></script>

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
      background: #f2f2f7;
      text-align: center;
      padding: 20px;
    }

    #reader {
      width: 100%;
      max-width: 350px;
      margin: auto;
      display: none;
    }

    button {
      margin-top: 20px;
      padding: 14px 20px;
      font-size: 18px;
      border: none;
      border-radius: 12px;
      background: #007aff;
      color: white;
      cursor: pointer;
    }

    #result {
      margin-top: 20px;
      font-size: 18px;
      word-break: break-all;
    }

    .success {
      color: #34c759;
      font-size: 22px;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <h2>Scansiona QR Code</h2>

  <button id="startBtn">📷 Avvia scansione</button>

  <div id="reader"></div>

  <div id="result"></div>

  <script>
    const startBtn = document.getElementById("startBtn");
    const readerDiv = document.getElementById("reader");
    const resultDiv = document.getElementById("result");

    let scanner;

    startBtn.addEventListener("click", () => {
      readerDiv.style.display = "block";
      startBtn.style.display = "none";

      scanner = new Html5Qrcode("reader");

      scanner.start(
        { facingMode: "environment" }, // ✅ camera posteriore
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          scanner.stop();

          readerDiv.style.display = "none";
          resultDiv.innerHTML = `
            <div class="success">✔ QR Code letto</div>
            <div>${decodedText}</div>
          `;

          window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeV-QY4T_a2E07ChO0i4emFPICWW8vhhB2T0j5hZGsRa6y8JA/viewform?usp=pp_url&entry.622568697=" + encodeURIComponent(decodedText);
        }
      ).catch(err => {
        resultDiv.innerText = "Errore fotocamera: " + err;
      });
    });
  </script>

</body>
</html>
