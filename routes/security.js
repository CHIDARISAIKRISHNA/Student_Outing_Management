const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

function sendEmailReminder(student) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rakesharpenaboyina2004@gmail.com', 
            pass: 'ypuz qjej fibs udtw',    
        },
    });

    const mailOptions = {
        from: 'rakesharpenaboyina2004@gmail.com', 
        to: student.Email_id,         
        subject: 'Outing Reminder: Please Register Your Return Time',
        text: `Dear ${student.Name},\n\nIt seems you haven't registered your return time for the outing. Please ensure you update it as soon as possible.\n\nBest regards,\nSecurity Team.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
router.post('/send-late-emails', (req, res) => {
    const db = req.app.get('mysqlConnection');
    const sql = 'SELECT Reg_no, Name, Email_id FROM register WHERE Type_of_outing = "normal_outing" AND In_time_and_date IS NULL';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('No students to remind');
            return;
        }

        results.forEach((student) => {
            sendEmailReminder(student);
        });

        res.send('Email reminders sent');
    });
});


router.get('/', (req, res) => {
    res.render('security');
});



router.get('/registerform', (req, res) => {
    res.render('security/registerform.ejs');
});

router.post('/registerform', (req, res) => {
    const db = req.app.get('mysqlConnection');
    console.log(req.body);
    const {  
        Reg_no, Name, Dept_Name, Phone_no, Room_no,Out_time_and_date,Type_of_outing,Email_id  
    } = req.body;
    
    const q = 'INSERT INTO register (Reg_no, Name, Dept_Name, Phone_no, Room_no,Out_time_and_date,Type_of_outing,Email_id ) VALUES (?,?, ?, ?, ?, ?, ?,?)';
    const values=[Reg_no, Name, Dept_Name, Phone_no, Room_no,Out_time_and_date,Type_of_outing,Email_id ];
    db.query( q, values, (err, results) => {
            if (err) {
                console.error("Error inserting register:", err);
                res.status(500).send("Error inserting register");
                return;
            }
            console.log("Register inserted successfully:", results);
            res.redirect('/se'); 
        }
    );
});


router.get('/security', (req, res) => {
    res.render('security/security.ejs');
});

// Route to update security (this is the submit button form)
router.post('/security/update', (req, res) => {
    const { Reg_no, In_time_and_date } = req.body;
    const db = req.app.get('mysqlConnection');
    
    const sql = 'UPDATE register SET In_time_and_date = ? WHERE Reg_no = ?';
    const values = [In_time_and_date, Reg_no];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating record:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) { 
            res.status(404).send('No student found with the given registration number');
            return;
        }

        res.redirect('/se/security'); // Redirect back to the form page
    });
});


router.get('/staff', (req, res) => {
    const db = req.app.get('mysqlConnection');
    const sql = 'SELECT * FROM staff';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('No staff records found');
            return;
        }

        res.render('security/staff', { staff: results });
    });
});

router.get('/connect', (req, res) => {
    const db = req.app.get('mysqlConnection');
    const sql = 'SELECT * FROM connect';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Anybody not found');
            return;
        }

 
        res.render('security/connect', { connect: results });
    });
});

router.get('/student', (req, res) => {
    const Reg_no = req.query.Reg_no;
    const password = req.query.password;
    const db = req.app.get('mysqlConnection');

    const sql = `
        SELECT 
            Reg_no, 
            Name, 
            DATE_FORMAT(DOB, '%d/%m/%Y') as DOB, 
            Dept_Name, 
            Blood_group, 
            gender, 
            Phone_no, 
            Parent_Name, 
            Parent_Phone_no 
        FROM 
            student 
        WHERE 
            Reg_no = ? and password = ?
    `;

    db.query(sql, [Reg_no,password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.length === 0) {
            res.status(404).send('No Student found');
            return;
        }

        res.render('security/student', {student: result});
});
});

router.get('/button', (req, res) => {
    res.render('security/button');
});

router.get('/demo', (req, res) => {
    const db = req.app.get('mysqlConnection');
    const sql = 'SELECT  Name,Reg_no,Phone_no,Room_no FROM register where Type_of_outing ="normal_outing" and In_time_and_date is null; ';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('No student records found');
            return;
        }

        res.render('security/demo', { demo: results });
    });
});
router.get('/password', (req, res) => {
    res.render('security/password');
});

router.get('/changepassword', (req, res) => {
    res.render('security/changepassword.ejs');
});
router.post('/changepassword', (req, res) => {
    const { Reg_no, password,passwords } = req.body;
    const db = req.app.get('mysqlConnection');

    const sql = 'UPDATE student SET password = ? WHERE Reg_no = ? and password= ?';
    const values = [ passwords,Reg_no, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) { 
            res.status(404).send('in correct password');
            return;
        }
        console.log('password changed successfully');
        res.redirect('/se');
});
});  

module.exports=router;

