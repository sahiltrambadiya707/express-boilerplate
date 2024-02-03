const Joi = require('joi');
const { objectId } = require('./custom.validation');

const insertGeneralProfileInformation = {
  body: Joi.object().keys({
    voornaam: Joi.string(),
    tussenvoegsel: Joi.string(),
    achternaam: Joi.string(),
    geslacht: Joi.string().valid('man', 'vrouw', 'neutraal', 'zeg_ik_liever_niet'),
    postcode: Joi.string(),
    huisnr: Joi.string(),
    straat: Joi.string(),
    woonplaats: Joi.string(),
    website: Joi.string()
      .pattern(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_.~#?&/=]*)$/,
        ' ',
      )
      .allow('', null),
    telefoonnummer: Joi.string(),
  }),
};

const updateUserRole = {
  body: Joi.object().keys({
    role: Joi.string().required(),
  }),
};

const updateGeneralProfileInformation = {
  body: Joi.object().keys({
    voornaam: Joi.string(),
    tussenvoegsel: Joi.string(),
    achternaam: Joi.string(),
    geslacht: Joi.string().valid('man', 'vrouw', 'neutraal', 'zeg_ik_liever_niet'),
    postcode: Joi.string(),
    huisnr: Joi.string(),
    straat: Joi.string(),
    woonplaats: Joi.string(),
    website: Joi.string()
      .pattern(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_.~#?&/=]*)$/,
        ' ',
      )
      .allow('', null),
    telefoonnummer: Joi.string(),
    wizard_step: Joi.number(),
    wizard_completed: Joi.boolean(),
  }),
};

const updateSocialProfileInformation = {
  body: Joi.array().items(
    Joi.object().keys({
      _id: Joi.string().optional(),
      name: Joi.string().required(),
      link: Joi.string()
        .pattern(
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_.~#?&/=]*)$/,
          ' ',
        )
        .required(),
      icon_name: Joi.string().allow(null, '').optional(),
      is_valid_link: Joi.boolean().optional(),
      is_extra: Joi.boolean().optional(),
    }),
  ),
};

const updateBiography = {
  body: Joi.object().keys({
    biografie: Joi.string(),
    biografie_is_hidden: Joi.boolean(),
  }),
};

const insertWorkExperience = {
  body: Joi.object().keys({
    functie: Joi.string(),
    is_current: Joi.boolean(),
    profession_code_id: Joi.string(),
    profession_name: Joi.string(),
    start_date: Joi.date(),
    end_date: Joi.when('is_current', {
      is: false,
      then: Joi.date(),
    }),
    skills: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string(),
          code_id: Joi.string(),
          category: Joi.string(),
          is_extra: Joi.boolean(),
          checked: Joi.boolean(),
        }),
      )
      .min(1),
  }),
};

const updateWorkExperience = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    functie: Joi.string().required(),
    is_current: Joi.boolean(),
    profession_code_id: Joi.string().required(),
    profession_name: Joi.string(),
    start_date: Joi.date().required(),
    end_date: Joi.when('is_current', {
      is: false,
      then: Joi.date().required(),
    }),
    skills: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          code_id: Joi.string().required(),
          category: Joi.string().required(),
          is_extra: Joi.boolean(),
          checked: Joi.boolean(),
        }),
      )
      .min(1),
  }),
};

const retrieveWorkExperienceById = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const retrieveCourses = {
  query: Joi.object().keys({
    filter: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
    descending: Joi.boolean(),
    sortBy: Joi.string(),
  }),
};

const retrieveCourseDetail = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const insertEducation = {
  body: Joi.object().keys({
    opleidingsniveau: Joi.string().required(),
    studierichting: Joi.string().required(),
    opleidingsinstelling: Joi.string().required(),
    locatie: Joi.string().required(),
    nogbezig: Joi.boolean().required(),
    niet_afgerond: Joi.boolean().required(),
    van: Joi.date().required(),
    tot: Joi.date().required(),
  }),
};

const insertCourse = {
  body: Joi.object().keys({
    cursus: Joi.string().required(),
    nogbezig: Joi.boolean().required(),
    omschrijving: Joi.string().required(),
  }),
};

const updateEducation = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    opleidingsniveau: Joi.string().required(),
    studierichting: Joi.string().required(),
    opleidingsinstelling: Joi.string().required(),
    locatie: Joi.string().required(),
    nogbezig: Joi.boolean().required(),
    niet_afgerond: Joi.boolean().required(),
    van: Joi.date().required(),
    tot: Joi.date().required(),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    cursus: Joi.string().required(),
    nogbezig: Joi.boolean().required(),
    omschrijving: Joi.string().required(),
  }),
};

const deleteEducation = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const deleteCourse = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateInstellingen = {
  body: Joi.object().keys({
    wizard: Joi.object({
      wizard_huidige_stap: Joi.number(),
      wizard_huidige_sub_stap: Joi.number(),
      wizard_stap_afgerond: Joi.boolean(),
      wizard_sub_stap_afgerond: Joi.boolean(),
    }),
    updates: Joi.object({
      deusgmartkplaats: Joi.boolean(),
      deusgstore: Joi.boolean(),
      decommunity: Joi.boolean(),
    }),
    interesse: Joi.object({
      opdrachten: Joi.boolean(),
      administratie: Joi.boolean(),
      verzekeringen: Joi.boolean(),
      marketing: Joi.boolean(),
      werkprivbalans: Joi.boolean(),
      netwerken: Joi.boolean(),
      financin: Joi.boolean(),
      ontwikkeling: Joi.boolean(),
      sales: Joi.boolean(),
      ondernemen: Joi.boolean(),
    }),
    jobpreferences: Joi.object({
      uurtariefminimaal: Joi.number(),
      uurtariefmaximaal: Joi.number(),
      urenminimaal: Joi.number(),
      urenmaximaal: Joi.number(),
      afstandminimaal: Joi.number(),
      afstandmaximaal: Joi.number(),
    }),
    toonmijncursussen: Joi.boolean(),
    profiel100compleet: Joi.boolean(),
    toonmijnopleidingen: Joi.boolean(),
    gevonden_en_feedback: Joi.object({
      gevonden_via: Joi.string().valid('Via website Younited', 'Via Social media'),
      wil_je_benaderd_worden_voor_onderzoek__feedback: Joi.boolean(),
    }),
    nieuwsbrief_younite: Joi.object({
      signup: Joi.boolean(),
    }),
    toonmijnvaardigheden: Joi.boolean(),
    toonmijnwerkervering: Joi.boolean(),
    ikwilwordenverwijderd: Joi.boolean(),
    profile100compleetdatum: Joi.string(),
    voorwaardengeaccepteerd: Joi.boolean(),
    communityconnectiegoedkeuring: Joi.boolean(),
    ikwilgevondenwordenindecommunity: Joi.boolean(),
    diensten_die_ik_zelf_geregeld_heb: Joi.object({
      urenregistratie: Joi.boolean(),
      facturatie: Joi.boolean(),
      boekhouding: Joi.boolean(),
      bedrijfsaansprakelijkheidsverzekering: Joi.boolean(),
      pensioen: Joi.boolean(),
      overig_namelijk: Joi.boolean(),
      overige: Joi.array().items(Joi.string()),
    }),
    datumaanmakenssoaccountopleidingnl: Joi.string(),
    ikbennietbeschikbaarvooropdrachten: Joi.boolean(),
    ikwilmijngegevensdelenopyounitednl: Joi.boolean(),
    ikwilgevondenwordendoorintermediairs: Joi.boolean(),
    ikwilgevondenkunnenwordendooropdrachtgevers: Joi.boolean(),
    selecteerhierevtdedatumwanneerjeweerbeschikbaarbent: Joi.string(),
    heeft_een_eigen_profielfoto_toegevoegd_aan_profiel: Joi.boolean(),
    ikhebtoestemminggegevenommijngegevenstedelenmetopleidingnl: Joi.boolean(),
  }),
};

module.exports = {
  insertGeneralProfileInformation,
  updateGeneralProfileInformation,
  updateSocialProfileInformation,
  updateBiography,
  insertWorkExperience,
  retrieveWorkExperienceById,
  updateWorkExperience,
  retrieveCourses,
  retrieveCourseDetail,
  insertEducation,
  insertCourse,
  updateEducation,
  updateCourse,
  deleteEducation,
  deleteCourse,
  updateInstellingen,
  updateUserRole,
};
