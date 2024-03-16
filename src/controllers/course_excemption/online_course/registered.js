const { get_query_database, post_query_database } = require("../../../config/database_utils")

exports.get_registered = async(req, res)=>{
    try {
        const query = `SELECT r.id, cl.name,ms.register_number, ms.name, r.type, r.start_date, r.end_date, r.exam_date, r.mark, r.certificate_url, r.certificate_path, r.approval_status
        FROM ce_oc_registered r
        INNER JOIN ce_oc_courselist cl ON r.course = cl.id
        INNER JOIN master_students ms ON r.student = ms.id
        WHERE r.status = '1'`
        const registered_details = await get_query_database(query)
        res.status(200).json(registered_details)
    } catch (err) {
        console.error("Error fetching registered details: ", err)
        res.status(500).json({
            err:"Error fetching registered details"
        })
    }
}

exports.post_registered = async (req, res) => {
    const {
        course,
        student,
        type,
        start_date,
        end_date,
        exam_date,
        mark,
        certificate_url,
    } = req.body
    const certificate_path = req.body.pdf_path
    if (
        !course ||
        !student ||
        !type ||
        !start_date ||
        !end_date ||
        !exam_date ||
        !mark ||
        !certificate_url ||
        !certificate_path
    ) {
        return res.status(400).json({
            err: "course, student, type, start_date, end_date, exam_date, mark, certificate_url, and certificate_path are required"
        })
    }
    try {
        const query = `INSERT INTO ce_oc_registered (course, student, type, start_date, end_date, exam_date, mark, certificate_url, certificate_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const success_message = await post_query_database(query, [course, student, type, start_date, end_date, exam_date, mark, certificate_url, certificate_path])
        res.status(200).json({ message: success_message })
    } catch (err) {
        console.error("Error adding online course: ", err)
        res.status(500).json({
            err: "Error adding online course"
        })
    }
}
