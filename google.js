const FORM_ID = "1FAIpQLSeV-QY4T_a2E07ChO0i4emFPICWW8vhhB2T0j5hZGsRa6y8JA";
const ENTRY_ID = "entry.622568697"; 
const ENTRY_ID_2 = "entry.1021393218"; 

function inviaAGoogleForms(valoreQR) {
    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    const formData = new FormData();
    formData.append(ENTRY_ID, valoreQR);

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
    return  "QR letto e inviato correttamente ✅";
}    

function postToGoogleSheet2(name) {
    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    const formData = new FormData();
    formData.append(ENTRY_ID_2, name);

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
    return "Nome inviato correttamente ✅";
}

const SPREADSHEET_ID = "1Sgze-6dXkRYWNW0fJKTFlNAwXu0RgvfTkxOGvgQnBGw";
const SHEET_NAME = "1156890236";
const endpoint = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?` +
                 	`gid=${encodeURIComponent(SHEET_NAME)}` +
                 	`&tqx=out:json`;
//https://docs.google.com/spreadsheets/d/1Sgze-6dXkRYWNW0fJKTFlNAwXu0RgvfTkxOGvgQnBGw/gviz/tq?tqx=out:json&tq&gid=1156890236
	function extractGvizJson(text) {
  	// Risposta tipica: google.visualization.Query.setResponse({...});
  	const start = text.indexOf("{");
  	const end = text.lastIndexOf("}");
  	if (start === -1 || end === -1) throw new Error("Formato risposta inatteso");
  	return JSON.parse(text.slice(start, end + 1));
	}

	async function getLastRow() {
  	const res = await fetch(endpoint, { cache: "no-store" });
  	if (!res.ok) throw new Error(`HTTP ${res.status}`);
  	const raw = await res.text();
  	const json = extractGvizJson(raw);

  	// Riga = array di celle; ogni cella può essere null
  	const rows = (json.table?.rows || []).map(r =>
    	(r.c || []).map(cell => cell ? cell.v : null)
  	);

  	if (rows.length === 0) return null;

  	// Ultima riga "non vuota" (opzionale ma utile)
  	const lastNonEmpty = [...rows].reverse().find(r =>
    	r.some(v => v !== null && String(v).trim() !== "")
  	) || rows[rows.length - 1];

  	// Se vuoi anche le intestazioni:
  	const headers = (json.table?.cols || []).map(c => c.label || c.id);

  	return { headers, values: lastNonEmpty };
	}

