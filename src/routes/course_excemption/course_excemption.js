const express = require("express")
const available = require("../../controllers/course_excemption/available")
const oc_course_list = require("../../controllers/course_excemption/online_course/courselist")
const oc_platform = require("../../controllers/course_excemption/online_course/platform")
const oc_registered_details = require("../../controllers/course_excemption/online_course/registered")
const onecredit_registered_details = require("../../controllers/course_excemption/one_credit/registered")
const pdf_uploader_middleware = require("../../middleware/pdf_uploader_middleware");

const router = express.Router()

router.get("/", available.get_available)


router.get("/oc/courselist", oc_course_list.get_courselist)



router.get("/oc/platform", oc_platform.get_platform)



router.get("/oc/registered", oc_registered_details.get_registered)
router.post("/oc/registered", pdf_uploader_middleware ,oc_registered_details.post_registered)

router.get("/onecredit/registered", onecredit_registered_details.get_onecredit_registered)


module.exports = router;