/* eslint-disable no-tabs */
/* eslint-disable indent */
module.exports = {
	ServerEnum: {
		API_URL: 'http://localhost:5000/api/v1',

		RESPONSE_CONNECTION_ERROR: 'CONNECTION_ERROR',
		RESPONSE_SUCCESS: 'SUCCESS',
		RESPONSE_DATABASE_CONNECTION_ERROR: 'DATABASE_CONNECTION_ERROR',
		RESPONSE_PASSWORD_MISMATCH: 'PASSWORD_MISMATCH',
		RESPONSE_EMAIL_MISMATCH: 'EMAIL_MISMATCH',
		RESPONSE_OTP_MISMATCH: 'OTP_MISMATCH',
		RESPONSE_EMAIL_TAKEN: 'EMAIL_TAKEN',
		RESPONSE_PHONE_TAKEN: 'PHONE_TAKEN',
		RESPONSE_INVALID_JWT_TOKEN: 'INVALID_JWT_TOKEN',
		RESPONSE_INVALID_GOOGLE_TOKEN: 'INVALID_GOOGLE_TOKEN',
		RESPONSE_INVALID_PHONE_TOKEN: 'INVALID_PHONE_TOKEN',
		RESPONSE_GROUP_NOT_FOUND: 'TEAM NOT FOUND',

		MANAGER: 'MANAGER',
		DEVELOPER: 'DEVELOPER',
		ADMIN: 'ADMIN',

		FLASH_CARDS: 'Flash Cards',
		DICTATION: 'Dictation',

		WITHOUT_FORMULA: 'Without Formula',
		BIG_FRIENDS: 'Big Friends',
		SMALL_FRIENDS: 'Small Friends',
		COMBINED_FORMULA: 'Combined Formula',


		// speed is in milliseconds
		ADD_SPEED_VERY_SLOW: 4000,
		ADD_SPEED_SLOW: 3000,
		ADD_SPEED_MEDIUM: 2500,
		ADD_SPEED_FAST: 1500,

		SUB_SPEED_VERY_SLOW: 4000,
		SUB_SPEED_SLOW: 3000,
		SUB_SPEED_MEDIUM: 2500,
		SUB_SPEED_FAST: 1500,

		MUL_SPEED_VERY_SLOW: 4000,
		MUL_SPEED_SLOW: 3000,
		MUL_SPEED_MEDIUM: 2500,
		MUL_SPEED_FAST: 1500,

		DIV_SPEED_VERY_SLOW: 4000,
		DIV_SPEED_SLOW: 3000,
		DIV_SPEED_MEDIUM: 2500,
		DIV_SPEED_FAST: 1500,

		STATUS_ACTIVE: 'ACTIVE',
		STATUS_INACTIVE: 'INACTIVE',

		INVITE_TEACHER_TEXT:
			"Dear teacher,\nYou have been invited to join MathChamp, an automated Abacus and Math practice platform.\nClick the link below or copy and paste in a browser to complete your profile.\n\n https://mathchamp.in/login \n\nYour temporary password to access this link is 123456 . Kindly ensure to change your password once you login.\n\nHappy teaching.\nTeam MathChamp",
	},
};
