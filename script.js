// Lire le fichier JSON et choisir une règle aléatoire
fetch('rules.json')
  .then(response => response.json())
  .then(rules => {
    const randomRule = rules[Math.floor(Math.random() * rules.length)];
    const lang = (typeof language !== "undefined" && language === "en") ? "en" : "fr";
    // Le label sans <br> !
    const label = (lang === "en") ? "Rule of internet" : "Règle d'internet";

    // innerHTML pour interpréter le <br>
    document.getElementById('title').innerHTML = `${label}<br>N° ${randomRule.num}`;

    // Remarque : si tu as des \n dans la règle, tu peux aussi convertir en <br> :
    // document.getElementById('rule').innerHTML = randomRule[lang].replace(/\n/g, '<br>');
    document.getElementById('rule').innerHTML = randomRule[lang].replace(/\n/g, "<br>");
  })
  .catch(error => {
    document.getElementById('title').textContent = "Erreur";
    document.getElementById('rule').textContent = "Impossible de charger les règles.";
    console.error("Erreur de chargement du fichier JSON :", error);
  });