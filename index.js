// Vérification principale
function Verif() {

    let ok = true;

    // Récupération des valeurs
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let Cemail = document.getElementById("Cemail").value;
    let mdp = document.getElementById("mdp").value;
    let df = document.getElementById("df").value;
    let nbrM = parseInt(document.getElementById("nbrM").value);

    // Supprimer anciens messages(appelée avant les vérifications)
    supprimerErreurs();

    //  Nom / Prénom (Majuscule + lettres)
    let regexNom = /^[A-Z][A-Za-z\s\-]*$/;
          //.test() est une méthode des regex
    if (!regexNom.test(nom)) {
        afficherErreur("nom", "Nom invalide !");
        //Il y a une erreur, donc on bloque la suite
        ok = false;
    }

    if (!regexNom.test(prenom)) {
        afficherErreur("prenom", "Prénom invalide !");
        ok = false;
    }

    //  Email IPSAS
    //endsWith:C’est une méthode javascript qui vérifie si une chaîne se termine par une valeur donnée
    if (!email.endsWith("@ipsas.tn")) {
        afficherErreur("email", "Email doit finir par @ipsas.tn");
        ok = false;
    }

    //  Confirmation email
    if (email !== Cemail) {
        afficherErreur("Cemail", "Emails différents !");
        ok = false;
    }

    //  Mot de passe 
    //(?=condition)Vérifie que la condition est vraie après la position actuelle
    // . n'importe quel caractére
    //(?=.*[a-z])  Il doit exister au moins une minuscule
    //(?=.*[A-Z])  Il doit exister au moins une majuscule
    //\d en regex veut dire un chiffre entre 0 et 9 <=> [0-9]
    let regexMdp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regexMdp.test(mdp)) {
        afficherErreur("mdp", "Mot de passe faible !");
        ok = false;
    }

    //  Date (doit être passée)
    //Crée la date actuelle (aujourd’hui, avec l’heure).
    let today = new Date();
    //Transforme la valeur df (souvent une date venant d’un input) en objet Date.
    let dateFond = new Date(df);
       //dateFond = date saisie par l’utilisateur
    
    // CORRECTION ICI: On ajoute df === "" pour vérifier si l'utilisateur n'a rien saisi
    if (df === "" || dateFond.getTime() >= today.getTime()) {
        afficherErreur("df", "Date invalide !");
        ok = false;
    }

    //  Nombre membres
    if (isNaN(nbrM) || nbrM < 10 || nbrM > 100) {
        afficherErreur("nbrM", "Entre 10 et 100 !");
        ok = false;
    }

    //  Nom du club
    let nomC = document.getElementById("nomC").value;
    if (nomC.trim() === "") {
        afficherErreur("nomC", "Nom du club requis !");
        ok = false;
    }

    //  Catégorie (doit être différente de "select")
    let categorie = document.querySelector("select[name='categorie']").value;
    if (categorie === "select ") {
        afficherErreur("categorie", "Veuillez sélectionner une catégorie !");
        ok = false;
    }

    //  Adhésion (au moins une cochée)
    let adhesion = document.querySelector("input[name='adhesion']:checked");
    if (!adhesion) {
        alert("Choisir une adhésion (Ouverte ou Fermée) !");
        ok = false;
    }

    //  Activités (au moins une cochée)
    let activites = document.querySelectorAll("input[type='checkbox']:checked");
    if (activites.length === 0) {
        alert("Choisir au moins une activité !");
        ok = false;
    }

    return ok;
}
//Affichage des erreurs sous les champs
function afficherErreur(id, message) {
    let input = document.getElementById(id);

    let p = document.createElement("p");
    p.style.color = "red";
    p.textContent = message;
    // Ajoute le message dans le parent du champ
    //son parent (<div>) //appendChild(p) → ajouter <p> dedans
    input.parentNode.appendChild(p);
}
//Supprimer anciens messages
function supprimerErreurs() {
    let erreurs = document.querySelectorAll("p");
    erreurs.forEach(p => {
        if (p.style.color === "red") {
            p.remove();
        }
    });
}
//Q3.Vérification instantanée Email
document.getElementById("Cemail").addEventListener("input", function () {
    let email = document.getElementById("email").value;
    //Cemail:valeur du champ actuel //this = le champ où on écrit
    let Cemail = this.value;

    let msg = document.getElementById("msgEmail");

    if (!msg) {
        msg = document.createElement("p");
        msg.id = "msgEmail";
        msg.style.color = "red";
        this.parentNode.appendChild(msg);
    }

    if (email !== Cemail) {
        msg.textContent = "Emails non identiques !";
    } else {
        msg.textContent = "";
    }
});
//Q4.Champ "Autres" dynamique
//"change" = se déclenche quand on coche/décoche
document.getElementById("autres").addEventListener("change", function () {
     //On vérifie s’il y a déjà un champ ajouté
    //évite de créer plusieurs inputs
    let existing = document.getElementById("autreInput");

    if (this.checked) {
        //Si le champ n’existe pas
        if (!existing) {
            //Création du champ
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Autre activité";
            input.id = "autreInput";
           //this.parentNode= p
           //méthode2:HTML:<div id="activites"> Javascript:document.getElementById("activites").appendChild(input)
            this.parentNode.appendChild(input);
        }
    } else {
        if (existing) {
            existing.remove();
        }
    }
});
document.getElementById("form").addEventListener("submit", function(e) {
    if (!Verif()) {
        e.preventDefault(); // bloque l'envoi
    }
});