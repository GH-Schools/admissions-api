const { generateRandomCharacters } = require("../utils/helpers");

/**
 * @class
 *
 */
class AdmissionFormsSchema {
  /**
   * 
   * @param {{
   *  userId: string;
   *  sessionId: string;
   *  reference: string;
   *  firstName: string;
   *  middleName: string;
   *  lastName: string;
   *  email: string;
   *  passportPhoto: string;
   *  residentialAddress: string;
   *  regionOfResidence: string;
   *  sex: string;
   *  dob: string;
   *  nationality: string;
   *  mobile1: string;
   *  mobile2?: string;
   *  nationalIDType: string;
   *  nationalIDNumber: string;
   *  currentJob: string;
   *  language: string;
   *  nameOfSchoolAttended1: string;
   *  locationOfSchoolAttended1: string;
   *  yearAttended1: string;
   *  qualification1: string;
   *  nameOfSchoolAttended2?: string;
   *  locationOfSchoolAttended2?: string;
   *  yearAttended2?: string;
   *  qualification2?: string;
   *  nameOfSchoolAttended3?: string;
   *  locationOfSchoolAttended3?: string;
   *  yearAttended3?: string;
   *  qualification3?: string;
   *  preferredCourse: string;
   *  courseSession: string;
   *  preferHostel: string;
   *  hasMedicalCondition: string;
   *  medicalCondition: string;
   *  hasDisability: string;
   *  disability: string;
   *  source: string;
   *  priorExperience: string;
   *  priorExperienceSpecialization: string;
   *  sponsorName: string;
   *  sponsorRelationship: string;
   *  sponsorOccupation: string;
   *  sponsorAddress: string;
   *  sponsorMobile: string;
   * }} payload 
   */
  constructor({
    userId,
    sessionId,
    reference,
    firstName,
    middleName,
    lastName,
    email,
    passportPhoto,
    residentialAddress,
    regionOfResidence,
    sex,
    dob,
    nationality,
    mobile1,
    mobile2,
    nationalIDType,
    nationalIDNumber,
    currentJob,
    language,
    nameOfSchoolAttended1,
    locationOfSchoolAttended1,
    yearAttended1,
    qualification1,
    nameOfSchoolAttended2,
    locationOfSchoolAttended2,
    yearAttended2,
    qualification2,
    nameOfSchoolAttended3,
    locationOfSchoolAttended3,
    yearAttended3,
    qualification3,
    preferredCourse,
    courseSession,
    preferHostel,
    hasMedicalCondition,
    medicalCondition,
    hasDisability,
    disability,
    source,
    priorExperience,
    priorExperienceSpecialization,
    sponsorName,
    sponsorRelationship,
    sponsorOccupation,
    sponsorAddress,
    sponsorMobile,
  }) {
    this.formId = generateRandomCharacters(6, {
      lowercase: true,
      splitBy: "-",
      splitInterval: "3",
    });
    this.paymentReference = reference;
    this.userId = userId;
    this.sessionId = sessionId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.passportPhoto = passportPhoto;
    this.residentialAddress = residentialAddress;
    this.regionOfResidence = regionOfResidence;
    this.sex = sex;
    this.dob = dob;
    this.nationality = nationality;
    this.mobile1 = mobile1;
    this.mobile2 = mobile2;
    this.nationalIDType = nationalIDType;
    this.nationalIDNumber = nationalIDNumber;
    this.currentJob = currentJob;
    this.language = language;
    this.nameOfSchoolAttended1 = nameOfSchoolAttended1;
    this.locationOfSchoolAttended1 = locationOfSchoolAttended1;
    this.yearAttended1 = yearAttended1;
    this.qualification1 = qualification1;
    this.nameOfSchoolAttended2 = nameOfSchoolAttended2;
    this.locationOfSchoolAttended2 = locationOfSchoolAttended2;
    this.yearAttended2 = yearAttended2;
    this.qualification2 = qualification2;
    this.nameOfSchoolAttended3 = nameOfSchoolAttended3;
    this.locationOfSchoolAttended3 = locationOfSchoolAttended3;
    this.yearAttended3 = yearAttended3;
    this.qualification3 = qualification3;
    this.preferredCourse = preferredCourse;
    this.session = courseSession;
    this.preferHostel = preferHostel;
    this.hasMedicalCondition = hasMedicalCondition;
    this.medicalCondition = medicalCondition;
    this.hasDisability = hasDisability;
    this.disability = disability;
    this.source = source;
    this.priorExperience = priorExperience;
    this.priorExperienceSpecialization = priorExperienceSpecialization;
    this.sponsorName = sponsorName;
    this.sponsorRelationship = sponsorRelationship;
    this.sponsorOccupation = sponsorOccupation;
    this.sponsorAddress = sponsorAddress;
    this.sponsorMobile = sponsorMobile;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

module.exports = AdmissionFormsSchema;
