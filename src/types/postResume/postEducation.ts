import { EducationLevelType } from "../postApply/resumeDetailItem"

export type PostEducationType = {
	education_level : EducationLevelType // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
	school_id : number,
	major : string,
	gpa : number,
	start_date : string // yyyy-MM-dd
	end_date : string // yyyy-MM-dd
	grade : number
}

export type InitailEducationType = {
	education_level : EducationLevelType | '' // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
	school_id : number,
	major : string,
	gpa : number,
	start_date : string // yyyy-MM-dd
	end_date : string // yyyy-MM-dd
	grade : number
}