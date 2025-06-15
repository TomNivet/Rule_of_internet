// Lire le fichier JSON et choisir une règle aléatoire
fetch('rules.json')
  .then(response => response.json())
  .then(rules => {
    const lang = (typeof language !== "undefined" && language === "en") ? "en" : "fr";
    const blocked = (typeof blockedCodes !== "undefined" && Array.isArray(blockedCodes))
      ? blockedCodes.map(code => code.toLowerCase())
      : [];

    // Filtrer les règles qui n'ont pas de codes bloqués
    const filteredRules = rules.filter(rule => {
      if (Array.isArray(rule.code)) {
        return !rule.code.some(code => blocked.includes(code.toLowerCase()));
      } else if (typeof rule.code === "string") {
        return !blocked.includes(rule.code.toLowerCase());
      }
      return true; // Pas de code = autorisé
    });

    if (filteredRules.length === 0) {
      document.getElementById('title').textContent = "Aucune règle disponible";
      document.getElementById('rule').textContent = "Toutes les règles sont bloquées.";
      return;
    }

    // Choisir une règle aléatoire parmi les règles autorisées
    const randomRule = filteredRules[Math.floor(Math.random() * filteredRules.length)];

    const label = (lang === "en") ? "Rule of internet" : "Règle d'internet";
    document.getElementById('title').innerHTML = `${label}<br>N° ${randomRule.num}`;
    document.getElementById('rule').innerHTML = randomRule[lang].replace(/\n/g, "<br>");
  })
  .catch(error => {
    document.getElementById('title').textContent = "Erreur";
    document.getElementById('rule').textContent = "Impossible de charger les règles.";
    console.error("Erreur de chargement du fichier JSON :", error);
  });