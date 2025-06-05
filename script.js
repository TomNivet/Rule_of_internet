// Lire le fichier JSON et choisir une règle aléatoire
fetch('rules.json')
  .then(response => response.json())
  .then(rules => {
    const randomRule = rules[Math.floor(Math.random() * rules.length)];
    const lang = (typeof language !== "undefined" && language === "en") ? "en" : "fr";
    const label = (lang === "en") ? "Rule n°" : "Règle n°";

    document.getElementById('title').textContent = `${label}${randomRule.num}`;
    document.getElementById('rule').textContent = randomRule[lang];
  })
  .catch(error => {
    document.getElementById('title').textContent = "Erreur";
    document.getElementById('rule').textContent = "Impossible de charger les règles.";
    console.error("Erreur de chargement du fichier JSON :", error);
  });