drop database if exists biblioteca_euchronia_in5cm;
create database biblioteca_euchronia_in5cm;
use biblioteca_euchronia_in5cm;

-- tablas de entidades

create table usuarios(
    id_usuario int primary key auto_increment,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    correo varchar(50) not null,
    telefono varchar(15) not null,
    fecha_registro date not null
);

create table categorias(
    id_categoria int primary key auto_increment,
    nombre_categoria varchar(50) not null,
    descripcion varchar(100) not null
);

create table editoriales(
    id_editorial int primary key auto_increment,
    nombre_editorial varchar(50) not null,
    pais_editorial varchar(50) not null
);

create table autores(
    id_autor int primary key auto_increment,
    nombre_autor varchar(50) not null,
    nacionalidad varchar(50) not null,
    fecha_nacimiento date not null
);

create table roles(
    id_rol int primary key auto_increment,
    nombre_rol varchar(50) not null,
    fk_id_usuario_rol int not null,
    constraint fk_id_usuario_rol
        foreign key (fk_id_usuario_rol)
        references usuarios(id_usuario)
        on delete cascade
);

create table libros(
    id_libro int primary key auto_increment,
    titulo varchar(100) not null,
    anio_publicacion year not null,
    stock_fisico int not null,
    archivo_digital varchar(100),
    fk_id_autor_libro int not null,
    fk_id_categoria_libro int not null,
    fk_id_editorial_libro int not null,
    constraint fk_id_autor_libro
        foreign key (fk_id_autor_libro)
        references autores(id_autor)
        on delete cascade,
    constraint fk_id_categoria_libro
        foreign key (fk_id_categoria_libro)
        references categorias(id_categoria)
        on delete cascade,
    constraint fk_id_editorial_libro
        foreign key (fk_id_editorial_libro)
        references editoriales(id_editorial)
        on delete cascade
);

create table ejemplares(
    id_ejemplar int primary key auto_increment,
    estado enum('disponible','prestado','reservado','danado') not null,
    fecha_adquisicion date not null,
    fk_id_libro_ejemplar int not null,
    constraint fk_id_libro_ejemplar
        foreign key (fk_id_libro_ejemplar)
        references libros(id_libro)
        on delete cascade
);

create table prestamos(
    id_prestamo int primary key auto_increment,
    fecha_prestamo date not null,
    fecha_devolucion date not null,
    estado enum('activo','devuelto','retrasado') not null,
    cantidad int not null,
    fk_id_usuario_prestamo int not null,
    fk_id_libro_prestamo int not null,
    constraint fk_id_usuario_prestamo
        foreign key (fk_id_usuario_prestamo)
        references usuarios(id_usuario)
        on delete cascade,
    constraint fk_id_libro_prestamo
        foreign key (fk_id_libro_prestamo)
        references libros(id_libro)
        on delete cascade
);

create table multas(
    id_multa int primary key auto_increment,
    monto decimal(10,2) not null,
    motivo varchar(100) not null,
    fecha_generacion date not null,
    estado_multa enum('pendiente','pagada','cancelada') not null,
    fk_id_prestamo_multa int not null,
    constraint fk_id_prestamo_multa
        foreign key (fk_id_prestamo_multa)
        references prestamos(id_prestamo)
        on delete cascade
);

create table reservas(
    id_reserva int primary key auto_increment,
    fecha_reserva date not null,
    estado_reserva enum(
        'nueva',
        'confirmada',
        'operacional',
        'completada',
        'cancelada',
        'no llego el cliente por el libro'
    ) not null,
    fk_id_usuario_reserva int not null,
    fk_id_libro_reserva int not null,
    constraint fk_id_usuario_reserva
        foreign key (fk_id_usuario_reserva)
        references usuarios(id_usuario)
        on delete cascade,
    constraint fk_id_libro_reserva
        foreign key (fk_id_libro_reserva)
        references libros(id_libro)
        on delete cascade
);

create table resenias(
    id_resenia int primary key auto_increment,
    comentario varchar(350) not null,
    calificacion int not null check (calificacion between 1 and 5),
    fk_id_usuario_resenia int not null,
    fk_id_libro_resenia int not null,
    constraint fk_id_usuario_resenia
        foreign key (fk_id_usuario_resenia)
        references usuarios(id_usuario)
        on delete cascade,
    constraint fk_id_libro_resenia
        foreign key (fk_id_libro_resenia)
        references libros(id_libro)
        on delete cascade
);

-- crud usuarios

delimiter $$

drop procedure if exists sp_insert_usuario$$
create procedure sp_insert_usuario(
    in p_nombre varchar(50),
    in p_apellido varchar(50),
    in p_correo varchar(50),
    in p_telefono varchar(15),
    in p_fecha_registro date
)
begin
    insert into usuarios(nombre, apellido, correo, telefono, fecha_registro)
    values(p_nombre, p_apellido, p_correo, p_telefono, p_fecha_registro);
end$$

delimiter ;

delimiter $$

drop procedure if exists sp_obtener_usuario$$
create procedure sp_obtener_usuario(
    in p_id_usuario int
)
begin
    select
        id_usuario,
        nombre,
        apellido,
        correo,
        telefono,
        fecha_registro
    from usuarios
    where id_usuario = p_id_usuario;
end$$

drop procedure if exists sp_listar_usuarios$$
create procedure sp_listar_usuarios()
begin
    select * from usuarios;
end$$

drop procedure if exists sp_actualizar_usuario$$
create procedure sp_actualizar_usuario(
    in p_id int,
    in p_nombre varchar(50),
    in p_apellido varchar(50),
    in p_correo varchar(50),
    in p_telefono varchar(15),
    in p_fecha_registro date
)
begin
    update usuarios
    set nombre=p_nombre,
        apellido=p_apellido,
        correo=p_correo,
        telefono=p_telefono,
        fecha_registro=p_fecha_registro
    where id_usuario=p_id;
end$$

drop procedure if exists sp_eliminar_usuario$$
create procedure sp_eliminar_usuario(
    in p_id int
)
begin
    delete from usuarios
    where id_usuario=p_id;
end$$

delimiter ;

-- crud roles

delimiter $$

drop procedure if exists sp_insert_rol$$
create procedure sp_insert_rol(
    in p_nombre varchar(50),
    in p_usuario int
)
begin
    insert into roles(nombre_rol,fk_id_usuario_rol)
    values(p_nombre,p_usuario);
end$$

drop procedure if exists sp_listar_roles$$
create procedure sp_listar_roles()
begin
    select * from roles;
end$$

drop procedure if exists sp_obtener_rol$$
create procedure sp_obtener_rol(
    in p_id_rol int
)
begin
    select *
    from roles
    where id_rol = p_id_rol;
end$$

drop procedure if exists sp_actualizar_rol$$
create procedure sp_actualizar_rol(
    in p_id int,
    in p_nombre varchar(50),
    in p_usuario int
)
begin
    update roles
    set nombre_rol=p_nombre,
        fk_id_usuario_rol=p_usuario
    where id_rol=p_id;
end$$

drop procedure if exists sp_eliminar_rol$$
create procedure sp_eliminar_rol(
    in p_id int
)
begin
    delete from roles
    where id_rol=p_id;
end$$

delimiter ;

-- crud autores

delimiter $$

drop procedure if exists sp_insert_autor$$
create procedure sp_insert_autor(
    in p_nombre varchar(50),
    in p_nacionalidad varchar(50),
    in p_fecha date
)
begin
    insert into autores(nombre_autor,nacionalidad,fecha_nacimiento)
    values(p_nombre,p_nacionalidad,p_fecha);
end$$

drop procedure if exists sp_obtener_autor$$
create procedure sp_obtener_autor(
    in p_id_autor int
)
begin
    select *
    from autores
    where id_autor = p_id_autor;
end$$

drop procedure if exists sp_listar_autores$$
create procedure sp_listar_autores()
begin
    select * from autores;
end$$

drop procedure if exists sp_actualizar_autor$$
create procedure sp_actualizar_autor(
    in p_id int,
    in p_nombre varchar(50),
    in p_nacionalidad varchar(50),
    in p_fecha date
)
begin
    update autores
    set nombre_autor=p_nombre,
        nacionalidad=p_nacionalidad,
        fecha_nacimiento=p_fecha
    where id_autor=p_id;
end$$

drop procedure if exists sp_eliminar_autor$$
create procedure sp_eliminar_autor(
    in p_id int
)
begin
    delete from autores
    where id_autor=p_id;
end$$

delimiter ;

-- crud categorias

delimiter $$

drop procedure if exists sp_insert_categoria$$
create procedure sp_insert_categoria(
    in p_nombre varchar(50),
    in p_descripcion varchar(100)
)
begin
    insert into categorias(nombre_categoria, descripcion)
    values(p_nombre, p_descripcion);
end$$

drop procedure if exists sp_obtener_categoria$$
create procedure sp_obtener_categoria(
    in p_id_categoria int
)
begin
    select *
    from categorias
    where id_categoria = p_id_categoria;
end$$

drop procedure if exists sp_listar_categorias$$
create procedure sp_listar_categorias()
begin
    select * from categorias;
end$$

drop procedure if exists sp_actualizar_categoria$$
create procedure sp_actualizar_categoria(
    in p_id int,
    in p_nombre varchar(50),
    in p_descripcion varchar(100)
)
begin
    update categorias
    set nombre_categoria = p_nombre,
        descripcion = p_descripcion
    where id_categoria = p_id;
end$$

drop procedure if exists sp_eliminar_categoria$$
create procedure sp_eliminar_categoria(
    in p_id int
)
begin
    delete from categorias
    where id_categoria = p_id;
end$$

delimiter ;

-- crud editorial

delimiter $$

drop procedure if exists sp_insert_editorial$$
create procedure sp_insert_editorial(
    in p_nombre varchar(50),
    in p_pais varchar(50)
)
begin
    insert into editoriales(nombre_editorial, pais_editorial)
    values(p_nombre, p_pais);
end$$

drop procedure if exists sp_obtener_editorial$$
create procedure sp_obtener_editorial(
    in p_id_editorial int
)
begin
    select *
    from editoriales
    where id_editorial = p_id_editorial;
end$$

drop procedure if exists sp_listar_editoriales$$
create procedure sp_listar_editoriales()
begin
    select * from editoriales;
end$$

drop procedure if exists sp_actualizar_editorial$$
create procedure sp_actualizar_editorial(
    in p_id int,
    in p_nombre varchar(50),
    in p_pais varchar(50)
)
begin
    update editoriales
    set nombre_editorial = p_nombre,
        pais_editorial = p_pais
    where id_editorial = p_id;
end$$

drop procedure if exists sp_eliminar_editorial$$
create procedure sp_eliminar_editorial(
    in p_id int
)
begin
    delete from editoriales
    where id_editorial = p_id;
end$$

delimiter ;

-- crud libros

delimiter $$

drop procedure if exists sp_insert_libro$$
create procedure sp_insert_libro(
    in p_titulo varchar(100),
    in p_anio year,
    in p_stock int,
    in p_archivo varchar(100),
    in p_autor int,
    in p_categoria int,
    in p_editorial int
)
begin
    insert into libros(
        titulo,
        anio_publicacion,
        stock_fisico,
        archivo_digital,
        fk_id_autor_libro,
        fk_id_categoria_libro,
        fk_id_editorial_libro
    )
    values(
        p_titulo,
        p_anio,
        p_stock,
        p_archivo,
        p_autor,
        p_categoria,
        p_editorial
    );
end$$

drop procedure if exists sp_listar_libros$$
create procedure sp_listar_libros()
begin
    select * from libros;
end$$

drop procedure if exists sp_obtener_libro$$
create procedure sp_obtener_libro(
    in p_id_libro int
)
begin
    select *
    from libros
    where id_libro = p_id_libro;
end$$

drop procedure if exists sp_actualizar_libro$$
create procedure sp_actualizar_libro(
    in p_id int,
    in p_titulo varchar(100),
    in p_anio year,
    in p_stock int,
    in p_archivo varchar(100),
    in p_autor int,
    in p_categoria int,
    in p_editorial int
)
begin
    update libros
    set titulo = p_titulo,
        anio_publicacion = p_anio,
        stock_fisico = p_stock,
        archivo_digital = p_archivo,
        fk_id_autor_libro = p_autor,
        fk_id_categoria_libro = p_categoria,
        fk_id_editorial_libro = p_editorial
    where id_libro = p_id;
end$$

drop procedure if exists sp_eliminar_libro$$
create procedure sp_eliminar_libro(
    in p_id int
)
begin
    delete from libros
    where id_libro = p_id;
end$$

delimiter ;

-- crud ejemplar

delimiter $$

drop procedure if exists sp_insert_ejemplar$$
create procedure sp_insert_ejemplar(
    in p_estado enum('disponible','prestado','reservado','danado'),
    in p_fecha date,
    in p_libro int
)
begin
    insert into ejemplares(
        estado,
        fecha_adquisicion,
        fk_id_libro_ejemplar
    )
    values(
        p_estado,
        p_fecha,
        p_libro
    );
end$$

drop procedure if exists sp_listar_ejemplares$$
create procedure sp_listar_ejemplares()
begin
    select * from ejemplares;
end$$

drop procedure if exists sp_obtener_ejemplar$$
create procedure sp_obtener_ejemplar(
    in p_id_ejemplar int
)
begin
    select *
    from ejemplares
    where id_ejemplar = p_id_ejemplar;
end$$

drop procedure if exists sp_actualizar_ejemplar$$
create procedure sp_actualizar_ejemplar(
    in p_id int,
    in p_estado enum('disponible','prestado','reservado','danado'),
    in p_fecha date,
    in p_libro int
)
begin
    update ejemplares
    set estado = p_estado,
        fecha_adquisicion = p_fecha,
        fk_id_libro_ejemplar = p_libro
    where id_ejemplar = p_id;
end$$

drop procedure if exists sp_eliminar_ejemplar$$
create procedure sp_eliminar_ejemplar(
    in p_id int
)
begin
    delete from ejemplares
    where id_ejemplar = p_id;
end$$

delimiter ;

-- crud prestamos

delimiter $$

drop procedure if exists sp_insert_prestamo$$
create procedure sp_insert_prestamo(
    in p_fecha_prestamo date,
    in p_fecha_devolucion date,
    in p_estado enum('activo','devuelto','retrasado'),
    in p_cantidad int,
    in p_usuario int,
    in p_libro int
)
begin
    insert into prestamos(
        fecha_prestamo,
        fecha_devolucion,
        estado,
        cantidad,
        fk_id_usuario_prestamo,
        fk_id_libro_prestamo
    )
    values(
        p_fecha_prestamo,
        p_fecha_devolucion,
        p_estado,
        p_cantidad,
        p_usuario,
        p_libro
    );
end$$

drop procedure if exists sp_listar_prestamos$$
create procedure sp_listar_prestamos()
begin
    select * from prestamos;
end$$

drop procedure if exists sp_obtener_prestamo$$
create procedure sp_obtener_prestamo(
    in p_id_prestamo int
)
begin
    select *
    from prestamos
    where id_prestamo = p_id_prestamo;
end$$

drop procedure if exists sp_actualizar_prestamo$$
create procedure sp_actualizar_prestamo(
    in p_id int,
    in p_fecha_prestamo date,
    in p_fecha_devolucion date,
    in p_estado enum('activo','devuelto','retrasado'),
    in p_cantidad int,
    in p_usuario int,
    in p_libro int
)
begin
    update prestamos
    set fecha_prestamo = p_fecha_prestamo,
        fecha_devolucion = p_fecha_devolucion,
        estado = p_estado,
        cantidad = p_cantidad,
        fk_id_usuario_prestamo = p_usuario,
        fk_id_libro_prestamo = p_libro
    where id_prestamo = p_id;
end$$

drop procedure if exists sp_eliminar_prestamo$$
create procedure sp_eliminar_prestamo(
    in p_id int
)
begin
    delete from prestamos
    where id_prestamo = p_id;
end$$

delimiter ;

-- crud multas

delimiter $$

drop procedure if exists sp_insert_multa$$
create procedure sp_insert_multa(
    in p_monto decimal(10,2),
    in p_motivo varchar(100),
    in p_fecha date,
    in p_estado enum('pendiente','pagada','cancelada'),
    in p_prestamo int
)
begin
    insert into multas(
        monto,
        motivo,
        fecha_generacion,
        estado_multa,
        fk_id_prestamo_multa
    )
    values(
        p_monto,
        p_motivo,
        p_fecha,
        p_estado,
        p_prestamo
    );
end$$

drop procedure if exists sp_listar_multas$$
create procedure sp_listar_multas()
begin
    select * from multas;
end$$

drop procedure if exists sp_obtener_multa$$
create procedure sp_obtener_multa(
    in p_id_multa int
)
begin
    select *
    from multas
    where id_multa = p_id_multa;
end$$

drop procedure if exists sp_actualizar_multa$$
create procedure sp_actualizar_multa(
    in p_id int,
    in p_monto decimal(10,2),
    in p_motivo varchar(100),
    in p_fecha date,
    in p_estado enum('pendiente','pagada','cancelada'),
    in p_prestamo int
)
begin
    update multas
    set monto = p_monto,
        motivo = p_motivo,
        fecha_generacion = p_fecha,
        estado_multa = p_estado,
        fk_id_prestamo_multa = p_prestamo
    where id_multa = p_id;
end$$

drop procedure if exists sp_eliminar_multa$$
create procedure sp_eliminar_multa(
    in p_id int
)
begin
    delete from multas
    where id_multa = p_id;
end$$

delimiter ;

-- crud reservas

delimiter $$

drop procedure if exists sp_insert_reserva$$
create procedure sp_insert_reserva(
    in p_fecha date,
    in p_estado enum(
        'nueva',
        'confirmada',
        'operacional',
        'completada',
        'cancelada',
        'no llego el cliente por el libro'
    ),
    in p_usuario int,
    in p_libro int
)
begin
    insert into reservas(
        fecha_reserva,
        estado_reserva,
        fk_id_usuario_reserva,
        fk_id_libro_reserva
    )
    values(
        p_fecha,
        p_estado,
        p_usuario,
        p_libro
    );
end$$

drop procedure if exists sp_listar_reservas$$
create procedure sp_listar_reservas()
begin
    select * from reservas;
end$$

drop procedure if exists sp_obtener_reserva$$
create procedure sp_obtener_reserva(
    in p_id_reserva int
)
begin
    select *
    from reservas
    where id_reserva = p_id_reserva;
end$$

drop procedure if exists sp_actualizar_reserva$$
create procedure sp_actualizar_reserva(
    in p_id int,
    in p_fecha date,
    in p_estado enum(
        'nueva',
        'confirmada',
        'operacional',
        'completada',
        'cancelada',
        'no llego el cliente por el libro'
    ),
    in p_usuario int,
    in p_libro int
)
begin
    update reservas
    set fecha_reserva = p_fecha,
        estado_reserva = p_estado,
        fk_id_usuario_reserva = p_usuario,
        fk_id_libro_reserva = p_libro
    where id_reserva = p_id;
end$$

drop procedure if exists sp_eliminar_reserva$$
create procedure sp_eliminar_reserva(
    in p_id int
)
begin
    delete from reservas
    where id_reserva = p_id;
end$$

delimiter ;

-- crud reseñas

delimiter $$

drop procedure if exists sp_insert_resenia$$
create procedure sp_insert_resenia(
    in p_comentario varchar(350),
    in p_calificacion int,
    in p_usuario int,
    in p_libro int
)
begin
    insert into resenias(
        comentario,
        calificacion,
        fk_id_usuario_resenia,
        fk_id_libro_resenia
    )
    values(
        p_comentario,
        p_calificacion,
        p_usuario,
        p_libro
    );
end$$

drop procedure if exists sp_listar_resenias$$
create procedure sp_listar_resenias()
begin
    select * from resenias;
end$$

drop procedure if exists sp_obtener_resenia$$
create procedure sp_obtener_resenia(
    in p_id_resenia int
)
begin
    select *
    from resenias
    where id_resenia = p_id_resenia;
end$$

drop procedure if exists sp_actualizar_resenia$$
create procedure sp_actualizar_resenia(
    in p_id int,
    in p_comentario varchar(350),
    in p_calificacion int,
    in p_usuario int,
    in p_libro int
)
begin
    update resenias
    set comentario = p_comentario,
        calificacion = p_calificacion,
        fk_id_usuario_resenia = p_usuario,
        fk_id_libro_resenia = p_libro
    where id_resenia = p_id;
end$$

drop procedure if exists sp_eliminar_resenia$$
create procedure sp_eliminar_resenia(
    in p_id int
)
begin
    delete from resenias
    where id_resenia = p_id;
end$$

delimiter ;

-- Registros

-- usuarios

call sp_insert_usuario('Will','Aster','will@euchronia.com','55510001','2025-01-10');
call sp_insert_usuario('Strohl','Rin','strohl@euchronia.com','55510002','2025-01-11');
call sp_insert_usuario('Hulkenberg','Eisen','hulkenberg@euchronia.com','55510003','2025-01-12');
call sp_insert_usuario('Gallica','Lumen','gallica@euchronia.com','55510004','2025-01-13');
call sp_insert_usuario('Junah','Lys','junah@euchronia.com','55510005','2025-01-14');
call sp_insert_usuario('Heismay','Noct','heismay@euchronia.com','55510006','2025-01-15');
call sp_insert_usuario('Basilio','Aureus','basilio@euchronia.com','55510007','2025-01-16');
call sp_insert_usuario('Fidelio','Aureus','fidelio@euchronia.com','55510008','2025-01-17');

call sp_insert_usuario('Makoto','Niijima','makoto@euchronia.com','55510009','2025-01-18');
call sp_insert_usuario('Ren','Amamiya','ren@euchronia.com','55510010','2025-01-19');
call sp_insert_usuario('Ann','Takamaki','ann@euchronia.com','55510011','2025-01-20');
call sp_insert_usuario('Yusuke','Kitagawa','yusuke@euchronia.com','55510012','2025-01-21');
call sp_insert_usuario('Futaba','Sakura','futaba@euchronia.com','55510013','2025-01-22');

call sp_insert_usuario('2B','YoRHa','2b@euchronia.com','55510014','2025-01-23');
call sp_insert_usuario('9S','YoRHa','9s@euchronia.com','55510015','2025-01-24');
call sp_insert_usuario('A2','Prototype','a2@euchronia.com','55510016','2025-01-25');
call sp_insert_usuario('Emil','Karyal','emil@euchronia.com','55510017','2025-01-26');
call sp_insert_usuario('Kaine','Replicant','kaine@euchronia.com','55510018','2025-01-27');

call sp_insert_usuario('Noah','Keves','noah@euchronia.com','55510019','2025-01-28');
call sp_insert_usuario('Mio','Agnus','mio@euchronia.com','55510020','2025-01-29');
call sp_insert_usuario('Eunie','Keves','eunie@euchronia.com','55510021','2025-01-30');
call sp_insert_usuario('Taion','Agnus','taion@euchronia.com','55510022','2025-01-31');
call sp_insert_usuario('Sena','Agnus','sena@euchronia.com','55510023','2025-02-01');

call sp_insert_usuario('Shulk','Monado','shulk@euchronia.com','55510024','2025-02-02');
call sp_insert_usuario('Rex','Salvager','rex@euchronia.com','55510025','2025-02-03');

-- categoria

call sp_insert_categoria('Videojuegos','Libros relacionados con videojuegos.');
call sp_insert_categoria('Art Books','Libros de arte e ilustraciones oficiales.');
call sp_insert_categoria('Mangas','Historietas japonesas.');
call sp_insert_categoria('Novelas Ligeras','Novelas ligeras japonesas.');
call sp_insert_categoria('Revistas Japonesas','Revistas publicadas en Japón.');
call sp_insert_categoria('Guías Oficiales','Guías estratégicas de videojuegos.');
call sp_insert_categoria('Bandas Sonoras','Libretos y colecciones musicales.');
call sp_insert_categoria('Diseño de Personajes','Concept art y diseño de personajes.');
call sp_insert_categoria('Fantasía','Obras de fantasía.');
call sp_insert_categoria('Ciencia Ficción','Obras de ciencia ficción.');
call sp_insert_categoria('Terror','Historias de horror.');
call sp_insert_categoria('Romance','Historias románticas.');
call sp_insert_categoria('Aventura','Obras de aventura.');
call sp_insert_categoria('Drama','Historias dramáticas.');
call sp_insert_categoria('Acción','Historias de acción.');
call sp_insert_categoria('Misterio','Obras de misterio.');
call sp_insert_categoria('JRPG','Material relacionado con videojuegos JRPG.');
call sp_insert_categoria('Anime','Libros y publicaciones sobre anime.');
call sp_insert_categoria('Ilustración','Colecciones de ilustraciones.');
call sp_insert_categoria('Concept Art','Arte conceptual de videojuegos y anime.');
call sp_insert_categoria('Coleccionables','Ediciones especiales y de colección.');
call sp_insert_categoria('Mitología','Libros sobre mitologías.');
call sp_insert_categoria('Folclore Japonés','Historias y leyendas japonesas.');
call sp_insert_categoria('Pixel Art','Arte basado en gráficos pixelados.');
call sp_insert_categoria('Desarrollo de Videojuegos','Diseño y programación de videojuegos.');
	
-- editorial 

call sp_insert_editorial('Planeta','España');
call sp_insert_editorial('Santillana','España');
call sp_insert_editorial('Pearson','Estados Unidos');
call sp_insert_editorial('McGraw-Hill','Estados Unidos');
call sp_insert_editorial('Anaya','España');
call sp_insert_editorial('Alfaguara','España');
call sp_insert_editorial('Norma','Colombia');
call sp_insert_editorial('Océano','México');
call sp_insert_editorial('Trillas','México');
call sp_insert_editorial('Kapelusz','Argentina');
call sp_insert_editorial('SM','España');
call sp_insert_editorial('Edebé','España');
call sp_insert_editorial('Debolsillo','España');
call sp_insert_editorial('Minotauro','España');
call sp_insert_editorial('Penguin Random House','Estados Unidos');
call sp_insert_editorial('Cátedra','España');
call sp_insert_editorial('Akal','España');
call sp_insert_editorial('Ariel','España');
call sp_insert_editorial('Limusa','México');
call sp_insert_editorial('Marcombo','España');
call sp_insert_editorial('Springer','Alemania');
call sp_insert_editorial('O''Reilly','Estados Unidos');
call sp_insert_editorial('Packt','Reino Unido');
call sp_insert_editorial('Addison-Wesley','Estados Unidos');
call sp_insert_editorial('Prentice Hall','Estados Unidos');

-- autor

call sp_insert_autor('Yoko Taro','Japón','1970-06-06');
call sp_insert_autor('Tetsuya Nomura','Japón','1970-10-08');
call sp_insert_autor('Shigenori Soejima','Japón','1974-09-24');
call sp_insert_autor('Kazutaka Kodaka','Japón','1978-07-08');
call sp_insert_autor('George Kamitani','Japón','1966-08-08');
call sp_insert_autor('Hidetaka Miyazaki','Japón','1974-01-01');
call sp_insert_autor('Yusuke Kozaki','Japón','1978-05-26');
call sp_insert_autor('Akihiko Yoshida','Japón','1967-02-15');
call sp_insert_autor('Yoshitaka Amano','Japón','1952-03-26');
call sp_insert_autor('Masashi Kishimoto','Japón','1974-11-08');
call sp_insert_autor('Eiichiro Oda','Japón','1975-01-01');
call sp_insert_autor('Kentaro Miura','Japón','1966-07-11');
call sp_insert_autor('Tsugumi Ohba','Japón','1969-01-01');
call sp_insert_autor('Takeshi Obata','Japón','1969-02-11');
call sp_insert_autor('Makoto Shinkai','Japón','1973-02-09');
call sp_insert_autor('Sui Ishida','Japón','1986-12-28');
call sp_insert_autor('Hajime Isayama','Japón','1986-08-29');
call sp_insert_autor('Gen Urobuchi','Japón','1972-12-20');
call sp_insert_autor('Ryo Mizuno','Japón','1963-07-13');
call sp_insert_autor('Reki Kawahara','Japón','1974-08-17');
call sp_insert_autor('Kugane Maruyama','Japón','1980-01-01');
call sp_insert_autor('Fuse','Japón','1979-01-23');
call sp_insert_autor('Aneko Yusagi','Japón','1981-01-01');
call sp_insert_autor('Nisio Isin','Japón','1981-01-01');
call sp_insert_autor('Ryohgo Narita','Japón','1980-05-30');

-- roles

call sp_insert_rol('Administrador',1);
call sp_insert_rol('Bibliotecario',2);
call sp_insert_rol('Cliente',3);
call sp_insert_rol('Cliente',4);
call sp_insert_rol('Cliente',5);
call sp_insert_rol('Cliente',6);
call sp_insert_rol('Cliente',7);
call sp_insert_rol('Cliente',8);
call sp_insert_rol('Cliente',9);
call sp_insert_rol('Cliente',10);
call sp_insert_rol('Cliente',11);
call sp_insert_rol('Cliente',12);
call sp_insert_rol('Cliente',13);
call sp_insert_rol('Cliente',14);
call sp_insert_rol('Cliente',15);
call sp_insert_rol('Cliente',16);
call sp_insert_rol('Cliente',17);
call sp_insert_rol('Cliente',18);
call sp_insert_rol('Cliente',19);
call sp_insert_rol('Cliente',20);
call sp_insert_rol('Cliente',21);
call sp_insert_rol('Cliente',22);
call sp_insert_rol('Cliente',23);
call sp_insert_rol('Cliente',24);
call sp_insert_rol('Supervisor',25);

-- LIBROS

call sp_insert_libro('NieR Art Book','2021',5,'nier_artbook.pdf',1,2,15);
call sp_insert_libro('Grimoire NieR','2020',4,'grimoire.pdf',1,15,15);
call sp_insert_libro('Final Fantasy XVI Ultimania','2023',6,'ffxvi.pdf',2,2,1);
call sp_insert_libro('Persona 5 Official Design Works','2019',8,'p5.pdf',3,8,15);
call sp_insert_libro('Metaphor ReFantazio Art Book','2024',5,'metaphor.pdf',3,2,15);
call sp_insert_libro('Dragon''s Crown Artworks','2014',3,'dcrown.pdf',5,2,15);
call sp_insert_libro('Elden Ring Official Art Book','2022',7,'elden.pdf',6,20,15);
call sp_insert_libro('Fire Emblem Awakening Artbook','2015',4,'fea.pdf',7,20,15);
call sp_insert_libro('Bravely Default Design Works','2013',2,'bd.pdf',8,2,15);
call sp_insert_libro('Final Fantasy Illustration','2018',6,'ffart.pdf',9,19,1);
call sp_insert_libro('Naruto Vol.1','1999',12,'naruto1.pdf',10,3,4);
call sp_insert_libro('One Piece Vol.1','1997',15,'op1.pdf',11,3,4);
call sp_insert_libro('Berserk Deluxe Vol.1','1990',4,'berserk.pdf',12,3,4);
call sp_insert_libro('Death Note Black Edition','2004',6,'dn.pdf',13,3,4);
call sp_insert_libro('Death Note Illustrations','2006',3,'dnart.pdf',14,20,4);
call sp_insert_libro('Your Name','2016',9,'yourname.pdf',15,4,2);
call sp_insert_libro('Tokyo Ghoul Vol.1','2011',5,'tg.pdf',16,3,4);
call sp_insert_libro('Attack on Titan Vol.1','2009',8,'aot.pdf',17,3,4);
call sp_insert_libro('Fate Zero','2012',5,'fz.pdf',18,4,2);
call sp_insert_libro('Record of Lodoss War','1988',3,'lodoss.pdf',19,4,2);
call sp_insert_libro('Sword Art Online Vol.1','2009',10,'sao.pdf',20,4,2);
call sp_insert_libro('Overlord Vol.1','2012',7,'overlord.pdf',21,4,2);
call sp_insert_libro('That Time I Got Reincarnated as a Slime','2014',8,'slime.pdf',22,4,2);
call sp_insert_libro('The Rising of the Shield Hero','2013',7,'shieldhero.pdf',23,4,2);
call sp_insert_libro('Monogatari Series','2006',5,'monogatari.pdf',24,4,2);

-- ejemplares 

call sp_insert_ejemplar('disponible','2025-01-10',1);
call sp_insert_ejemplar('prestado','2025-01-11',2);
call sp_insert_ejemplar('disponible','2025-01-12',3);
call sp_insert_ejemplar('reservado','2025-01-13',4);
call sp_insert_ejemplar('disponible','2025-01-14',5);
call sp_insert_ejemplar('disponible','2025-01-15',6);
call sp_insert_ejemplar('prestado','2025-01-16',7);
call sp_insert_ejemplar('disponible','2025-01-17',8);
call sp_insert_ejemplar('danado','2025-01-18',9);
call sp_insert_ejemplar('disponible','2025-01-19',10);
call sp_insert_ejemplar('prestado','2025-01-20',11);
call sp_insert_ejemplar('disponible','2025-01-21',12);
call sp_insert_ejemplar('reservado','2025-01-22',13);
call sp_insert_ejemplar('disponible','2025-01-23',14);
call sp_insert_ejemplar('prestado','2025-01-24',15);
call sp_insert_ejemplar('disponible','2025-01-25',16);
call sp_insert_ejemplar('disponible','2025-01-26',17);
call sp_insert_ejemplar('prestado','2025-01-27',18);
call sp_insert_ejemplar('disponible','2025-01-28',19);
call sp_insert_ejemplar('reservado','2025-01-29',20);
call sp_insert_ejemplar('disponible','2025-01-30',21);
call sp_insert_ejemplar('prestado','2025-01-31',22);
call sp_insert_ejemplar('disponible','2025-02-01',23);
call sp_insert_ejemplar('danado','2025-02-02',24);
call sp_insert_ejemplar('disponible','2025-02-03',25);

-- prestamos

call sp_insert_prestamo('2025-02-01','2025-02-08','devuelto',1,3,1);
call sp_insert_prestamo('2025-02-02','2025-02-09','devuelto',1,4,2);
call sp_insert_prestamo('2025-02-03','2025-02-10','activo',1,5,3);
call sp_insert_prestamo('2025-02-04','2025-02-11','activo',1,6,4);
call sp_insert_prestamo('2025-02-05','2025-02-12','retrasado',1,7,5);
call sp_insert_prestamo('2025-02-06','2025-02-13','devuelto',1,8,6);
call sp_insert_prestamo('2025-02-07','2025-02-14','activo',1,9,7);
call sp_insert_prestamo('2025-02-08','2025-02-15','devuelto',1,10,8);
call sp_insert_prestamo('2025-02-09','2025-02-16','retrasado',1,11,9);
call sp_insert_prestamo('2025-02-10','2025-02-17','activo',1,12,10);
call sp_insert_prestamo('2025-02-11','2025-02-18','devuelto',1,13,11);
call sp_insert_prestamo('2025-02-12','2025-02-19','activo',1,14,12);
call sp_insert_prestamo('2025-02-13','2025-02-20','devuelto',1,15,13);
call sp_insert_prestamo('2025-02-14','2025-02-21','activo',1,16,14);
call sp_insert_prestamo('2025-02-15','2025-02-22','retrasado',1,17,15);
call sp_insert_prestamo('2025-02-16','2025-02-23','devuelto',1,18,16);
call sp_insert_prestamo('2025-02-17','2025-02-24','activo',1,19,17);
call sp_insert_prestamo('2025-02-18','2025-02-25','devuelto',1,20,18);
call sp_insert_prestamo('2025-02-19','2025-02-26','activo',1,21,19);
call sp_insert_prestamo('2025-02-20','2025-02-27','retrasado',1,22,20);
call sp_insert_prestamo('2025-02-21','2025-02-28','devuelto',1,23,21);
call sp_insert_prestamo('2025-02-22','2025-03-01','activo',1,24,22);
call sp_insert_prestamo('2025-02-23','2025-03-02','devuelto',1,25,23);
call sp_insert_prestamo('2025-02-24','2025-03-03','activo',1,2,24);
call sp_insert_prestamo('2025-02-25','2025-03-04','retrasado',1,1,25);

-- multas

call sp_insert_multa(0.00,'Sin multa','2025-02-08','pagada',1);
call sp_insert_multa(0.00,'Sin multa','2025-02-09','pagada',2);
call sp_insert_multa(15.00,'Entrega tardía','2025-02-10','pendiente',3);
call sp_insert_multa(0.00,'Sin multa','2025-02-11','pagada',4);
call sp_insert_multa(25.00,'Retraso de devolución','2025-02-12','pendiente',5);
call sp_insert_multa(0.00,'Sin multa','2025-02-13','pagada',6);
call sp_insert_multa(10.00,'Entrega fuera de tiempo','2025-02-14','pendiente',7);
call sp_insert_multa(0.00,'Sin multa','2025-02-15','pagada',8);
call sp_insert_multa(35.00,'Libro devuelto tarde','2025-02-16','pendiente',9);
call sp_insert_multa(0.00,'Sin multa','2025-02-17','pagada',10);
call sp_insert_multa(0.00,'Sin multa','2025-02-18','pagada',11);
call sp_insert_multa(15.00,'Entrega tardía','2025-02-19','pendiente',12);
call sp_insert_multa(0.00,'Sin multa','2025-02-20','pagada',13);
call sp_insert_multa(20.00,'Retraso','2025-02-21','pendiente',14);
call sp_insert_multa(40.00,'No devolvió a tiempo','2025-02-22','pendiente',15);
call sp_insert_multa(0.00,'Sin multa','2025-02-23','pagada',16);
call sp_insert_multa(0.00,'Sin multa','2025-02-24','pagada',17);
call sp_insert_multa(0.00,'Sin multa','2025-02-25','pagada',18);
call sp_insert_multa(0.00,'Sin multa','2025-02-26','pagada',19);
call sp_insert_multa(18.00,'Retraso','2025-02-27','pendiente',20);
call sp_insert_multa(0.00,'Sin multa','2025-02-28','pagada',21);
call sp_insert_multa(12.00,'Entrega tardía','2025-03-01','pendiente',22);
call sp_insert_multa(0.00,'Sin multa','2025-03-02','pagada',23);
call sp_insert_multa(0.00,'Sin multa','2025-03-03','pagada',24);
call sp_insert_multa(30.00,'Retraso de devolución','2025-03-04','pendiente',25);

-- reservas

call sp_insert_reserva('2025-03-01','confirmada',5,3);
call sp_insert_reserva('2025-03-01','nueva',8,5);
call sp_insert_reserva('2025-03-02','completada',12,1);
call sp_insert_reserva('2025-03-02','cancelada',15,9);
call sp_insert_reserva('2025-03-03','confirmada',18,7);
call sp_insert_reserva('2025-03-03','operacional',20,10);
call sp_insert_reserva('2025-03-04','nueva',9,15);
call sp_insert_reserva('2025-03-04','confirmada',11,20);
call sp_insert_reserva('2025-03-05','completada',7,18);
call sp_insert_reserva('2025-03-05','nueva',2,12);
call sp_insert_reserva('2025-03-06','confirmada',13,6);
call sp_insert_reserva('2025-03-06','operacional',21,14);
call sp_insert_reserva('2025-03-07','cancelada',19,4);
call sp_insert_reserva('2025-03-07','confirmada',3,2);
call sp_insert_reserva('2025-03-08','nueva',24,22);
call sp_insert_reserva('2025-03-08','completada',10,8);
call sp_insert_reserva('2025-03-09','operacional',1,24);
call sp_insert_reserva('2025-03-09','confirmada',4,16);
call sp_insert_reserva('2025-03-10','nueva',6,25);
call sp_insert_reserva('2025-03-10','confirmada',17,11);
call sp_insert_reserva('2025-03-11','cancelada',14,19);
call sp_insert_reserva('2025-03-11','operacional',22,17);
call sp_insert_reserva('2025-03-12','confirmada',23,13);
call sp_insert_reserva('2025-03-12','completada',25,21);
call sp_insert_reserva('2025-03-13','nueva',16,23);

-- reseñas

call sp_insert_resenia('El art book de NieR tiene ilustraciones impresionantes. Cada página transmite la esencia del juego.',5,3,1);

call sp_insert_resenia('Grimoire NieR amplía muchísimo el lore. Una lectura obligatoria para cualquier fan.',5,5,2);

call sp_insert_resenia('Final Fantasy XVI Ultimania explica muchos detalles del desarrollo del juego. Excelente edición.',5,8,3);

call sp_insert_resenia('Persona 5 Official Design Works muestra el proceso creativo detrás de los Phantom Thieves. Muy recomendado.',5,12,4);

call sp_insert_resenia('Metaphor ReFantazio tiene uno de los estilos artísticos más bonitos que he visto en un JRPG.',5,15,5);

call sp_insert_resenia('Dragon''s Crown tiene un apartado artístico espectacular gracias a George Kamitani.',5,18,6);

call sp_insert_resenia('Las ilustraciones de Elden Ring transmiten perfectamente la atmósfera del juego.',5,20,7);

call sp_insert_resenia('Fire Emblem Awakening sigue teniendo uno de mis estilos favoritos.',4,9,8);

call sp_insert_resenia('Bravely Default posee diseños de personajes increíbles.',5,11,9);

call sp_insert_resenia('Yoshitaka Amano nunca decepciona. Su arte es simplemente legendario.',5,14,10);

call sp_insert_resenia('Naruto es un clásico del shonen. Nunca pasa de moda.',5,2,11);

call sp_insert_resenia('One Piece tiene un mundo gigantesco y muy bien construido.',5,7,12);

call sp_insert_resenia('Berserk tiene un dibujo espectacular y una historia inolvidable.',5,13,13);

call sp_insert_resenia('Death Note mantiene la tensión desde el primer capítulo.',5,17,14);

call sp_insert_resenia('Las ilustraciones oficiales de Death Note son preciosas.',4,19,15);

call sp_insert_resenia('Your Name es una novela muy emotiva y fácil de recomendar.',5,21,16);

call sp_insert_resenia('Tokyo Ghoul combina acción con una excelente evolución de personajes.',5,24,17);

call sp_insert_resenia('Attack on Titan sorprende constantemente con sus giros argumentales.',5,6,18);

call sp_insert_resenia('Fate Zero tiene una narrativa madura y personajes memorables.',5,1,19);

call sp_insert_resenia('Record of Lodoss War es una joya para quienes disfrutan la fantasía clásica.',4,4,20);

call sp_insert_resenia('Sword Art Online fue una puerta de entrada al mundo de las novelas ligeras para muchos lectores.',4,10,21);

call sp_insert_resenia('Overlord presenta uno de los protagonistas más interesantes del género.',5,16,22);

call sp_insert_resenia('Una novela ligera muy divertida y con excelentes ilustraciones.',5,18,23);

call sp_insert_resenia('The Rising of the Shield Hero mejora mucho conforme avanza la historia.',4,22,24);

call sp_insert_resenia('Monogatari destaca por sus diálogos, personajes y estilo visual único.',5,25,25);