const express = require('express');
const axios = require('axios');
const { parse } = require('node-html-parser');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Careers
 *   description: Operations related to open positions at Actian
 */

/**
 * @swagger
 *   /open-positions:
 *     get:
 *       summary: Get job titles of all open positions in a specified department
 *       tags: [Careers]
 *       parameters:
 *         - in: query
 *           name: department
 *           required: true
 *           description: The department to get job titles for
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 department: engineering
 *                 jobTitles:
 *                   - Full Stack Developer
 *                   - Cloud Engineer
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 error: Department is required!
 *         '404':
 *           description: Department not found
 *           content:
 *             application/json:
 *               example:
 *                 error: No department found!
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 error: Internal Server Error
 */

router.get('/', async (req, res) => {
    const department = req.query.department;
    const url = 'https://www.actian.com/company/careers';

    if (!department) {
        return res.status(400).json({ error: 'Department is required!' });
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'text/hmtl'
            }
        });

        const root = parse(response.data);

        // Find all job openings in requested department
        const departmentPosting = root.querySelectorAll('.job-posting').filter(posting => {
            const departmentName = posting.querySelector('.department');
            return departmentName && departmentName.text.trim().toLowerCase() === department.toLowerCase();
        });

        if (!departmentPosting.length) {
            return res.status(404).json({ error: 'No department found!' });
        }

        // Extract job titles from all job openings in requested department
        const jobTitles = departmentPosting.flatMap(posting => posting.querySelectorAll('.job-name').map(job => job.text.trim()));

        res.status(200).json({ department, jobTitles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;