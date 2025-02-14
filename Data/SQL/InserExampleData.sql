--  Use to reset a tables PK (Identity)
--dbcc checkident ('[Customers]', reseed, 0);


insert into Roles(RoleName)
Values
('Intern'),
('Junior'),
('Senior'),
('Admin'),
('Manager');

insert into Employees (FirstName, LastName, Email, PhoneNumber, RoleId)
Values
('Erik', 'Andersson', 'erik.andersson@comanydomain.com', '0101002030', 5),
('Sara', 'Nilsson', 'sara.nilsson@companydomain.com', '0101002040', 5),
('Peter', 'Yllersson', 'peter.yllersson@companydomain.com', '0101002050', 5),
('Klas', 'Hogersson', 'klas.hogersson@companydomain.com', '0101002060', 4),
('Ulf', 'Vigar', 'ulf.vigar@companydomain.com', '0101002070', 3),
('Fridolf', 'Drilsson', 'fridolf.drilsson@companydomain.com', '0101002080', 2),
('Klara', 'Olsson', 'klara.olsson@companydomain.com', '0101002090', 1);

insert into ServiceInfos (ServiceName, Price)
values
('Konsulttid', 1200),
('Utbildning', 5300),
('Web Rekonstruktion', 3500),
('Web Konstruktion', 3900),
('Server Hantering', 4800);

insert into Customers (CompanyName, Email)
values
('Acme AB', 'info@acmeab.com'),
('Globex AB', 'info@globexab.com'),
('Soylent Green AB', 'info@soylentgreen.com'),
('Initech AB', 'info@initech.com'),
('Umbrella CO', 'info@umbrella.com'),
('Hooli AG', 'info.no@hooli.com');


insert into ContactPersons (FirstName, LastName, Email, PhoneNumber, CustomerId)
values
('Vag', 'Springare', 'vaspr@acmeadb.com', '0102001010', 1),
('Lisa', 'Simpson', 'lisi@globexab.com', '0103001010', 2),
('Hiro', 'Soy', 'hiso@soylentgreen.com', '0104001010', 3),
('Bill', 'Lumbergh', 'bill.lumbergh@initech.com', '0105001010', 4),
('Jill', 'Valentine', 'jill.valentine@umbrella.com', '0106001010', 5),
('Peter', 'Gregory', 'pegr@hooli.com', '0107001010', 6);

