import { Link } from "react-router-dom";
import { PageLegale, Section, Valeur } from "@/components/legal/PageLegale";
import { AGE_MINIMUM, EDITEUR, SITE } from "@/data/legal";

const SOMMAIRE = [
  { id: "objet", titre: "L'objet" },
  { id: "acces", titre: "L'accès au site" },
  { id: "compte", titre: "Votre compte" },
  { id: "sante", titre: "Ce que le site n'est pas" },
  { id: "contenus", titre: "Les contenus" },
  { id: "usage", titre: "Le bon usage" },
  { id: "responsabilite", titre: "Responsabilité" },
  { id: "changements", titre: "Changements" },
  { id: "droit", titre: "Droit applicable" },
];

const Cgu = () => (
  <PageLegale
    titre="Conditions d'utilisation"
    intro={`Les règles qui s'appliquent quand vous utilisez ${SITE}. En utilisant le site, vous les acceptez.`}
    sommaire={SOMMAIRE}
  >
    <Section id="objet" titre="L'objet">
      <p>
        {SITE} présente l'Ayurveda d'après ses textes anciens. Il propose des
        explications, un quiz pour connaître sa constitution, des conseils pour
        les saisons et la journée, et des recettes. Ces conditions encadrent
        l'utilisation de ces contenus et de l'espace membre.
      </p>
    </Section>

    <Section id="acces" titre="L'accès au site">
      <p>
        Le site est gratuit. Vous pouvez tout lire et faire le quiz sans compte.
        Un compte sert seulement à garder vos bilans et à les retrouver sur un
        autre appareil.
      </p>
      <p>
        Nous faisons notre possible pour que le site reste disponible, sans
        pouvoir le garantir. Il peut être interrompu pour une maintenance ou une
        panne.
      </p>
    </Section>

    <Section id="compte" titre="Votre compte">
      <ul>
        <li>Il faut avoir au moins {AGE_MINIMUM} ans pour créer un compte.</li>
        <li>
          Donnez une adresse e-mail qui vous appartient, et gardez votre mot de
          passe pour vous.
        </li>
        <li>
          Votre compte est personnel. Vous êtes responsable de ce qui s'y fait.
        </li>
        <li>
          Vous pouvez supprimer votre compte à tout moment en écrivant à{" "}
          <Valeur v={EDITEUR.email} />.
        </li>
        <li>
          Nous pouvons suspendre un compte qui ne respecte pas ces conditions,
          après vous avoir prévenu sauf en cas d'abus grave.
        </li>
      </ul>
      <p>
        Ce que nous faisons de vos données est expliqué sur la page{" "}
        <Link to="/confidentialite">Confidentialité</Link>.
      </p>
    </Section>

    <Section id="sante" titre="Ce que le site n'est pas">
      <p className="border-l-4 border-citron bg-surface px-5 py-4">
        Le site n'est pas un service médical. Le quiz décrit votre constitution
        selon l'Ayurveda, il ne pose pas de diagnostic. Les conseils sont
        généraux et ne tiennent pas compte de votre santé particulière.
      </p>
      <ul>
        <li>
          Ne remplacez pas un traitement par ce que vous lisez ici, et ne
          l'arrêtez pas sans l'avis de votre médecin.
        </li>
        <li>
          Si vous êtes enceinte, si vous allaitez, si vous suivez un traitement
          ou si vous avez une maladie chronique, demandez conseil avant de
          changer votre alimentation.
        </li>
        <li>
          Si vous avez des symptômes, consultez un médecin. En cas d'urgence,
          appelez le 15 ou le 112.
        </li>
      </ul>
    </Section>

    <Section id="contenus" titre="Les contenus">
      <p>
        Nos contenus s'appuient sur les traités anciens de l'Ayurveda, cités
        avec leurs références. Nous les vérifions avec soin, mais les éditions
        et les traductions de ces textes varient. Si vous repérez une erreur,
        écrivez-nous.
      </p>
      <p>
        Les textes, les illustrations et le design du site sont protégés. Les
        conditions de reproduction sont dans les{" "}
        <Link to="/mentions-legales">mentions légales</Link>.
      </p>
    </Section>

    <Section id="usage" titre="Le bon usage">
      <p>En utilisant le site, vous vous engagez à ne pas</p>
      <ul>
        <li>tenter d'accéder au compte de quelqu'un d'autre ;</li>
        <li>
          perturber le fonctionnement du site ou chercher à en contourner la
          sécurité ;
        </li>
        <li>copier les contenus de façon automatique ou en masse.</li>
      </ul>
    </Section>

    <Section id="responsabilite" titre="Responsabilité">
      <p>
        Vous restez seul juge de ce que vous faites des informations du site.
        L'éditeur ne peut pas être tenu responsable d'une décision prise sur
        leur seul fondement, ni d'une interruption du site. Rien dans ces
        conditions ne limite les droits que la loi vous accorde.
      </p>
    </Section>

    <Section id="changements" titre="Changements">
      <p>
        Nous pouvons modifier ces conditions, par exemple quand le site évolue.
        La date en haut de la page indique la dernière version. Un changement
        important vous sera signalé sur le site avant de s'appliquer.
      </p>
    </Section>

    <Section id="droit" titre="Droit applicable">
      <p>
        Ces conditions sont soumises au droit français. En cas de désaccord,
        écrivez-nous d'abord à <Valeur v={EDITEUR.email} /> pour trouver une
        solution à l'amiable. À défaut, les tribunaux français sont compétents.
      </p>
    </Section>
  </PageLegale>
);

export default Cgu;
