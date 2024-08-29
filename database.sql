use security_checking;
drop table register;
show tables;
desc register;
drop table register;
create table register(
Reg_no varchar(30),
Name varchar(200) not null,
Dept_Name varchar(200) not null,
Phone_no int ,
Room_no int not null,
In_time_and_date datetime,
Out_time_and_date datetime not null,
Type_of_outing varchar(30) not null,
Email_id varchar(100),
primary key(Reg_no,Phone_no));
desc register;
create table staff(
Name varchar(200) not null,
Cabin_no int not null,
Phone_no int ,
Email_id varchar(30));
create table student(
Reg_no varchar(30),
Name varchar(200) not null,
DOB date,
Dept_Name varchar(200) not null,
Blood_group varchar(30),
gender varchar(20),
Phone_no int ,
Parent_Name varchar(255),
Parent_Phone_no int);
	create table connect(
	Name varchar(200) not null,
	Phone_no int ,
	Email_id varchar(30),
	Company_Name varchar(200) not null);
		alter table student add password varchar(30);