const express = require("express")
const { get_available } = require("../../controllers/course_excemption/available")
const course_type = require("../../controllers/course_excemption/online_course/course_type")
const router = express.Router()

router.get("/available", get_available)

// Online course

router.get("/dropdown/course-type", course_type.get_course_type)
module.exports = router;