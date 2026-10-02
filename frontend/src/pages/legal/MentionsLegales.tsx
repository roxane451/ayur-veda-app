import { Link } from "react-router-dom";
import {
  Ligne,
  PageLegale,
  Section,
  Valeur,
} from "@/components/legal/PageLegale";
import { EDITEUR, HEBERGEUR, SITE } from "@/data/legal";

const SOMMAIRE = [
  { id: "editeur", titre: "L'éditeur" },
  { id: "hebergement", titre: "L'hébergement" },
  { id: "propriete", titre: "Propriété intellectuelle" },
  { id: "sante", titre: "Avertissement santé" },
  { id: "contact", titre: "Nous écrire" },
];

const MentionsLegales = () => (
  <PageLegale
    titre="Mentions légales"
    intro={`Qui publie ${SITE}, où le site est hébergé et à qui appartiennent ses contenus.`}
    sommaire={SOMMAIRE}
  >
    <Section id="editeur" titre="L'éditeur">
      <dl className="m-0">
        <Ligne intitule="Nom ou raison sociale">
          <Valeur v={EDITEUR.nom} />
        </Ligne>
        <Ligne intitule="Statut">
          <Valeur v={EDITEUR.statut} />
        </Ligne>
        <Ligne intitule="Adresse">
          <Valeur v={EDITEUR.adresse} />
        </Ligne>
        <Ligne intitule="SIRET">
          <Valeur v={EDITEUR.siret} />
        </Ligne>
        <Ligne intitule="Adresse e-mail">
          <Valeur v={EDITEUR.email} />
        </Ligne>
        <Ligne intitule="Téléphone">
          <Valeur v={EDITEUR.telephone} />
        </Ligne>
        <Ligne intitule="Directrice de la publication">
          <Valeur v={EDITEUR.directeurPublication} />
        </Ligne>
      </dl>
    </Section>

    <Section id="hebergement" titre="L'hébergement">
      <dl className="m-0">
        <Ligne intitule="Hébergeur">
          <Valeur v={HEBERGEUR.nom} />
        </Ligne>
        <Ligne intitule="Adresse">
          <Valeur v={HEBERGEUR.adresse} />
        </Ligne>
        <Ligne intitule="Téléphone">
          <Valeur v={HEBERGEUR.telephone} />
        </Ligne>
        <Ligne intitule="Pays des serveurs">
          <Valeur v={HEBERGEUR.pays} />
        </Ligne>
      </dl>
    </Section>

    <Section id="propriete" titre="Propriété intellectuelle">
      <p>
        Les textes, les illustrations, les motifs, le logo et la mise en page du
        site sont des créations de l'éditeur. L'illustration de Hanuman sur la
        page d'accueil est une œuvre originale de l'éditeur.
      </p>
      <p>
        Vous pouvez citer un court passage en indiquant la source et un lien
        vers la page. Toute autre reproduction, totale ou partielle, demande
        notre accord écrit.
      </p>
      <p>
        Les traités anciens cités sur le site (Charaka, Suśruta, Vāgbhaṭa,
        Bhāvaprakāśa) appartiennent au domaine public. Nos résumés, nos
        explications et nos traductions restent protégés. Les références exactes
        sont données sur chaque page et sur la page{" "}
        <Link to="/comprendre/textes">Les textes</Link>.
      </p>
    </Section>

    <Section id="sante" titre="Avertissement santé">
      <p>
        Les contenus de ce site présentent l'Ayurveda d'après ses textes
        anciens. Ils sont informatifs et ne remplacent ni un diagnostic, ni un
        traitement, ni l'avis d'un médecin ou d'un professionnel de santé. Ne
        modifiez pas un traitement en cours sans en parler à votre médecin.
      </p>
      <p>
        Avant de changer votre alimentation ou d'utiliser des épices en
        quantité, demandez conseil si vous êtes enceinte, si vous allaitez, si
        vous suivez un traitement ou si vous avez une maladie chronique.
      </p>
    </Section>

    <Section id="contact" titre="Nous écrire">
      <p>
        Pour toute question sur le site ou ses contenus, écrivez à{" "}
        <Valeur v={EDITEUR.email} />.
      </p>
      <p>
        Pour vos données personnelles, voyez la page{" "}
        <Link to="/confidentialite">Confidentialité</Link>. Pour les règles
        d'utilisation du site, voyez les{" "}
        <Link to="/cgu">conditions générales d'utilisation</Link>.
      </p>
    </Section>
  </PageLegale>
);

export default MentionsLegales;
