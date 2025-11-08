# Student Outing Management System

## Project Description
The **Student Outing Management System** is developed for **Indian Institute of Information Technology (IIIT), Dharwad** to enhance campus safety and streamline the student outing process. The system aims to solve security and student-related problems related to outings, including registering outings, updating outing forms, managing staff and student details, and more.

## Key Features
1. **Outing Form**: 
   - Allows students to register for outings, providing necessary details like date, time, roll number, department, etc.
   - Submission of forms for permission to leave the campus.
   
2. **Updating of Outing Form**: 
   - For security personnel to update outing records, including marking students’ return.
   - Sends automatic email alerts if students fail to return by a specific time.

3. **Staff Details**: 
   - Displays essential details of campus staff such as name, cabin number, phone number, and email.

4. **Student Details**: 
   - Secure access to basic student details like roll number, name, department, and more.
   - Accessible only with valid credentials.

5. **Previous Year Student Details**: 
   - Maintains records of alumni and provides their placement information for networking purposes.

6. **Normal Outing Students**: 
   - Tracks students who have left the campus and haven’t returned by a specific time.
   - Helps campus security ensure student safety.

7. **Change Password**: 
   - Allows users to change their password to maintain account security.
8️ **Security Module**:
The security personnel can enter a student’s roll number and fetch or close (deactivate) the corresponding student’s record from the database for verification or access control purposes.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, EJS (Embedded JavaScript)
- **Database**: MongoDB (or any other relevant database system)
- **Agile Methodology**: The project followed an iterative development process, including continuous feedback and testing cycles.

## Setup Instructions<br>
1. Clone the repository:
   ```bash
   git clone https://github.com/CHIDARISAIKRISHNA/Student_Outing_Management
2. Install the required dependencies:
   ```bash
   npm install
3. Run the Application:
   ```bash
   npm start
   ```
   This will launch the application, and you should be able to access it on your local server (usually at http://localhost:3000).
## Usage
Visit the homepage to access different functionalities such as registering for outings, updating forms, viewing staff and student details, etc.
Security personnel can use secure access to update outing information.
Students and staff can update their account passwords to ensure security.

## Future Enhancements
- Integration of Faculty Biometric System and Student Biometric System for secure access.
- Addition of Student Results management system.
- Query Block for student-related queries.
- Expansion of alumni networking features.
