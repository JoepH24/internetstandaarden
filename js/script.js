// De startwaarden voor de variabelen hopeloosheid, vermoeidheid en honger
let hopeloosheid = 0;
let vermoeidheid = 0;
let honger = 0;

// Elementen in de HTML ophalen via hun ID, zodat we ze kunnen updaten of gebruiken
// → getElementById geleerd van de lessen Slides week 1
const motivatieEl = document.getElementById("motivatie");
const energieEl = document.getElementById("energie");
const hongerEl = document.getElementById("honger");
const bartjeImg = document.getElementById("bartje");

// Alle <button>-elementen ophalen (er worden meerdere knoppen gebruikt)
// → querySelectorAll van W3Schools: https://www.w3schools.com/jsref/met_document_queryselectorall.asp
const knoppen = document.querySelectorAll("button");
x

// Geluidsbestanden ophalen via hun ID's, geleerd van de slides en W3schools
const koffieAudio = document.getElementById("koffieAudio");
const etenAudio = document.getElementById("etenAudio");
const pauzeAudio = document.getElementById("pauzeAudio");

// Functie om muziek af te spelen of te pauzeren
// → Muziek toggle logica gebaseerd op W3Schools audio voorbeelden: https://www.w3schools.com/tags/av_prop_paused.asp
function toggleMusic() {
  const music = document.getElementById("backgroundMusic");
  if (music.paused) {
    music.muted = false;
    music.volume = 0.5;
    music.play();
  } else {
    music.pause();
  }
}

// Functie om tijdelijk een afbeelding en geluid te tonen/spelen, daarna renderen
// Hulp gekregen van docent bij het opzetten van deze functie (tijdelijke acties met afbeelding en voor het geluid eigen onderzoek via W3schools)
function toonTijdelijkeAfbeelding(actieSrc, geluid) {
  bartjeImg.src = actieSrc;      // Verander de afbeelding naar de actie
  geluid.play();                 // Speel het bijpassende geluid af
  setTimeout(() => {
    render();                  // Na 1 seconde: pagina updaten
  }, 1000);
}

// Gebruik van eventhandlers (onclick) beschreven in W3Schools: https://www.w3schools.com/jsref/event_onclick.asp
// Knop 0 (bijvoorbeeld koffie) vermindert hopeloosheid, dit herhaalt zich bij de knoppen
// Het inklikken van de knoppen met als resultaat een bijpassende afbeelding en audio, 
// hierbij begon ik met hulp van de docent waarna ik met mijn eigen onderzoek via W3schools heb uitgevogeld hoe ik de audio toevoegde
knoppen[0].onclick = () => {
  if (hopeloosheid > 0) hopeloosheid--;
  toonTijdelijkeAfbeelding("/images/7koffie.jpg", koffieAudio);
};
knoppen[1].onclick = () => {
  if (vermoeidheid > 0) vermoeidheid--;
  toonTijdelijkeAfbeelding("/images/5valtinslaap.jpg", pauzeAudio);
};
knoppen[2].onclick = () => {
  if (honger > 0) honger--;
  toonTijdelijkeAfbeelding("/images/6eten.jpg", etenAudio);
};


// Elke 3 seconden worden hopeloosheid, vermoeidheid en honger verhoogd
// → setInterval gebruikt zoals beschreven op W3Schools: https://www.w3schools.com/jsref/met_win_setinterval.asp
setInterval(() => {
  if (hopeloosheid < 30) hopeloosheid++;
  if (vermoeidheid < 30) vermoeidheid++;
  if (honger < 30) honger++;
  render();
}, 3000);

// De huidige waarden worden weergegeven in de HTML door de textContent van de elementen aan te passen.
// textContent wordt gebruikt om tekst in een element te zetten, zoals geleerd via W3Schools:
// https://www.w3schools.com/jsref/prop_node_textcontent.asp
function render() {
  motivatieEl.textContent = hopeloosheid;
  energieEl.textContent = vermoeidheid;
  hongerEl.textContent = honger;

  const totaal = hopeloosheid + vermoeidheid + honger;

  // Afbeelding wisselt afhankelijk van afhankelijk van Bartje z'n toestand, De "If Else" leerde we in de slides van Les 1b
  if (totaal <= 15) {
    bartjeImg.src = "/images/2vrolijk.jpg";
  } else if (totaal <= 30) {
    bartjeImg.src = "/images/1neutraal.jpg";
  } else if (totaal <= 45) {
    bartjeImg.src = "/images/4booshongerig.jpg";
  } else if (totaal <= 60) {
    bartjeImg.src = "/images/3chagrijnig.jpg";
  } else {
    bartjeImg.src = "/images/8kapot.jpg";
  }
}

