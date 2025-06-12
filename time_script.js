// Lire le fichier JSON et choisir une règle aléatoire
fetch('time_rules.json')
  .then(response => response.json())
  .then(rules => {
    const randomRule = rules[Math.floor(Math.random() * rules.length)];
    const lang = (typeof language !== "undefined" && language === "en") ? "en" : "fr";

    // Sélection du type (rule ou axiom)
    const isAxiom = randomRule.type === "axiom";
    const label = isAxiom
      ? (lang === "en" ? "Temporal Axiom" : "Axiome temporel")
      : (lang === "en" ? "Temporal Rule" : "Règle temporelle");

    // Affichage dans le HTML
    document.getElementById('title').innerHTML = `${label}<br>N° ${randomRule.num}`;
    document.getElementById('rule').innerHTML = randomRule[lang].replace(/\n/g, "<br>");

    // ✅ Si un fichier PDF est associé à la règle, on déclenche le téléchargement
    if (randomRule.pdf) {
      const link = document.createElement("a");
      link.href = randomRule.pdf;
      link.download = randomRule.pdf.split("/").pop(); // nom du fichier = nom original
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  })
  .catch(error => {
    document.getElementById('title').textContent = "Erreur";
    document.getElementById('rule').textContent = "Impossible de charger les règles.";
    console.error("Erreur de chargement du fichier JSON :", error);
  });


  //    { "num": 666, "en": "Hélène likes to have a hickey on her neck.", "fr": "Hélène aime avoir un suçon dans le cou." },