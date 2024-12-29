create table parents (
	parent_id int identity(1,1) primary key,
	first_name varchar(30),
	surname varchar(30),
	phone_number varchar(20),
)

create table student_parent (
	id int identity(1,1) primary key,
	student_id int,
	parent_id int,
	constraint fk1 foreign key (student_id) references students (student_id),
	constraint fk2 foreign key (parent_id) references parents (parent_id),
)

create table teachers (
	teacher_id int identity(1,1) primary key,
	username varchar(20) unique,
	first_name varchar(30),
	surname varchar(30),
	phone_number varchar(20),
	active bit,
)

create table subjects (
	subject_id int identity(1,1) primary key,
	subject_name varchar(20),
	price money,
	teacher_id int,
	constraint fk3 foreign key (teacher_id) references teachers (teacher_id),
)

create table teacher_commissions (
	teacher_commission_id int identity(1,1) primary key,
	teacher_id int,
	subject_id int,
	commission_amount money,
	commision_type varchar(10)
)

create table payments (
	payment_id int identity(1,1) primary key,
	student_id int,
	amount money,
	due_amount money,
	balance money,
	payment_date datetime,
	paid bit,
	constraint fk4 foreign key (student_id) references students (student_id),
)

create table attendance (
	attendance_id int identity(1,1) primary key,
	student_id int,
	subject_id int,
	attendance_date datetime,
	attendace_status varchar(10),
	constraint fk5 foreign key (student_id) references students (student_id),

)

