import { Link } from "react-router-dom";
import {
  Ligne,
  PageLegale,
  Section,
  Valeur,
} from "@/components/legal/PageLegale";
import { AGE_MINIMUM, EDITEUR, HEBERGEUR, SITE } from "@/data/legal";

const SOMMAIRE = [
  { id: "bref", titre: "En bref" },
  { id: "responsable", titre: "Qui est responsable" },
  { id: "donnees", titre: "Ce que nous gardons" },
  { id: "pourquoi", titre: "Pourquoi" },
  { id: "appareil", titre: "Sur votre appareil" },
  { id: "duree", titre: "Combien de temps" },
  { id: "acces", titre: "Qui y a accès" },
  { id: "securite", titre: "Sécurité" },
  { id: "droits", titre: "Vos droits" },
  { id: "mineurs", titre: "Les mineurs" },
  { id: "changements", titre: "Changements" },
];

const Confidentialite = () => (
  <PageLegale
    titre="Confidentialité"
    intro={`Ce que ${SITE} sait de vous, pourquoi, et comment le faire effacer.`}
    sommaire={SOMMAIRE}
  >
    <Section id="bref" titre="En bref">
      <ul>
        <li>Vous pouvez lire le site et faire le quiz sans créer de compte.</li>
        <li>
          Si vous créez un compte, nous gardons votre adresse e-mail, votre mot
          de passe sous forme chiffrée et vos bilans.
        </li>
        <li>
          Pas de cookie, pas de mesure d'audience, pas de publicité, pas de
          bouton de réseau social.
        </li>
        <li>Vos données ne sont ni vendues ni partagées.</li>
        <li>Vous pouvez tout effacer quand vous voulez.</li>
      </ul>
    </Section>

    <Section id="responsable" titre="Qui est responsable">
      <p>
        Le responsable du traitement est l'éditeur du site
        {EDITEUR.anonyme ? null : (
          <>
            , <Valeur v={EDITEUR.nom} />
          </>
        )}
        . Vous pouvez le joindre à <Valeur v={EDITEUR.email} />. Plus de détails
        dans les <Link to="/mentions-legales">mentions légales</Link>.
      </p>
    </Section>

    <Section id="donnees" titre="Ce que nous gardons">
      <p>Seulement si vous créez un compte.</p>
      <dl className="m-0">
        <Ligne intitule="Votre compte">
          Votre adresse e-mail et votre mot de passe. Votre prénom et votre nom
          si vous choisissez de les donner.
        </Ligne>
        <Ligne intitule="Vos bilans">
          Les résultats du quiz, c'est-à-dire vos scores Vata, Pitta et Kapha,
          le type de bilan (votre nature ou votre état du moment) et sa date.
        </Ligne>
        <Ligne intitule="Rien d'autre">
          Nous ne gardons ni votre historique de navigation, ni votre
          localisation, ni les pages que vous lisez.
        </Ligne>
      </dl>
      <p>
        Les résultats du quiz décrivent votre constitution selon l'Ayurveda. Ce
        ne sont pas des données médicales, mais ils vous concernent de près.
        C'est pourquoi ils ne servent qu'à vous les montrer.
      </p>
    </Section>

    <Section id="pourquoi" titre="Pourquoi">
      <ul>
        <li>
          <b>Faire fonctionner votre compte</b> et retrouver vos bilans d'un
          appareil à l'autre. C'est le service que vous demandez en créant un
          compte, dans le cadre des{" "}
          <Link to="/cgu">conditions d'utilisation</Link>.
        </li>
        <li>
          <b>Protéger les comptes.</b> Votre adresse IP sert un court instant à
          limiter le nombre de tentatives de connexion. Elle n'est pas
          enregistrée avec votre compte. C'est notre intérêt légitime à garder
          le site sûr.
        </li>
      </ul>
      <p>
        Nous ne vous envoyons pas de lettre d'information et nous ne faisons pas
        de profilage commercial.
      </p>
    </Section>

    <Section id="appareil" titre="Sur votre appareil">
      <p>
        Le site ne dépose aucun cookie. Il range trois éléments dans le stockage
        local de votre navigateur. Ils restent sur votre appareil et ne nous
        sont jamais envoyés.
      </p>
      <dl className="m-0">
        <Ligne intitule="ayurveda.session.v1">
          Votre connexion, pour rester connecté. Effacé quand vous vous
          déconnectez.
        </Ligne>
        <Ligne intitule="ayurveda.profil.v1">
          Le résultat de votre quiz, pour le retrouver même sans compte. Effacé
          quand vous effacez votre profil.
        </Ligne>
        <Ligne intitule="ayurveda.installation.v1">
          Le nombre de vos visites et si vous avez fermé l'invitation à
          installer l'app, pour ne la montrer qu'à partir de la deuxième visite
          et plus jamais une fois fermée.
        </Ligne>
      </dl>
      <p>
        Les polices de caractères sont servies par notre propre serveur. Votre
        navigateur ne contacte aucun service tiers en lisant le site.
      </p>
    </Section>

    <Section id="duree" titre="Combien de temps">
      <p>
        Nous gardons votre compte et vos bilans tant que votre compte existe.
        Quand vous effacez vos bilans, ils sont supprimés tout de suite. Quand
        vous nous demandez de supprimer votre compte, nous supprimons votre
        compte et tous vos bilans.
      </p>
    </Section>

    <Section id="acces" titre="Qui y a accès">
      <p>
        Seul l'éditeur du site. Nos serveurs sont chez{" "}
        <Valeur v={HEBERGEUR.nom} />, en <Valeur v={HEBERGEUR.pays} />, qui les
        fait tourner sans utiliser vos données. Aucune donnée n'est vendue,
        louée ou transmise à quelqu'un d'autre.
      </p>
    </Section>

    <Section id="securite" titre="Sécurité">
      <ul>
        <li>Le site est servi en HTTPS, la connexion est chiffrée.</li>
        <li>
          Votre mot de passe est haché avant d'être enregistré. Personne, pas
          même nous, ne peut le lire.
        </li>
        <li>Votre connexion expire au bout d'un temps limité.</li>
      </ul>
    </Section>

    <Section id="droits" titre="Vos droits">
      <p>
        Vous pouvez à tout moment accéder à vos données, les corriger, les faire
        effacer, en recevoir une copie, vous opposer à leur utilisation ou en
        limiter l'usage.
      </p>
      <ul>
        <li>
          Pour effacer votre profil et l'historique de vos bilans, utilisez le
          bouton prévu sur la page de votre résultat.
        </li>
        <li>
          Pour tout le reste, et pour supprimer votre compte, écrivez à{" "}
          <Valeur v={EDITEUR.email} />. Nous répondons dans un délai d'un mois.
        </li>
      </ul>
      <p>
        Si vous pensez que vos droits ne sont pas respectés, vous pouvez saisir
        la CNIL sur <a href="https://www.cnil.fr">cnil.fr</a>.
      </p>
    </Section>

    <Section id="mineurs" titre="Les mineurs">
      <p>
        Il faut avoir au moins {AGE_MINIMUM} ans pour créer un compte. Le site
        se lit sans compte à tout âge.
      </p>
    </Section>

    <Section id="changements" titre="Changements">
      <p>
        Si nous changeons la façon dont nous utilisons vos données, nous mettons
        cette page à jour et nous changeons sa date. Un changement important
        vous sera signalé sur le site avant de s'appliquer.
      </p>
    </Section>
  </PageLegale>
);

export default Confidentialite;
